# Aiphone Training Suite — Architectural Review

**Scope:** Complete read-only review of the repository as of 2026-07-22, prior to any refactoring. No code was changed to produce this document.

---

## 0. Executive Summary

Aiphone is a single-user, client-side-only fitness tracking PWA-in-spirit: three static HTML pages sharing one 3,691-line JavaScript file (`app.js`) and one 1,821-line stylesheet (`styles.css`), with all data persisted to a single `localStorage` key. There is no backend, no build step, no package manager, no tests, and no CI.

The domain logic is genuinely mature for a single-file hobby project — double-progression weight suggestions, automatic deload detection, PR detection, readiness/recovery scoring, and weekly muscle-group volume tracking are all implemented and wired together. The biggest problems are architectural, not conceptual: two large files with no module boundaries, a "re-render everything on every keystroke" rendering model that has produced at least one real input bug, duplicated logic between the two workout-logging flows (Tracker and Quick Log), and personal hardcoded content (one specific person's training program and injury history) baked directly into the application source.

Nothing here is urgent from a data-safety standpoint except the points noted in §6 (Highest-Risk Areas). The recommended path is incremental: fix the two concrete bugs first, de-duplicate logic in place, then modularize — never a rewrite.

---

## 1. Project Structure Map

### 1.1 Repository layout

```
Aiphone/
├── README.md              (empty, 0 bytes)
└── docs/                   ← published directly as the GitHub Pages site
    ├── index.html          (72 lines)  — "Power Calculator" page
    ├── workout.html         (180 lines) — "Workout Tracker" page
    ├── quicklog.html        (72 lines)  — "Quick Log" page
    ├── styles.css           (1,821 lines) — single shared stylesheet
    └── app.js               (3,691 lines) — single shared script
```

Five files total. No `package.json`, no `.gitignore`, no build tooling, no `manifest.json`, no service worker, no test directory, no `.github/workflows`. This is a zero-dependency static site: it works by opening the HTML files directly or serving `docs/` as-is (which is exactly what GitHub Pages does, per the git history — `d27e2e9 Move site files into docs for GitHub Pages`).

### 1.2 File-by-file responsibilities

| File | Responsibility |
|---|---|
| `README.md` | Empty — no project documentation exists today. |
| `docs/index.html` | Power Calculator page shell: header/nav, hero stat strip (Next/Sessions/Streak/Last), and three empty mount-point `<div>`s (`#powerPanel`, `#maxesPanel`, `#bodyMetricsPanel`) that `app.js` fills in entirely via `innerHTML`. |
| `docs/workout.html` | Workout Tracker page shell: rest-timer widget, session-timer pill, stat strip, tab bar mount point, coach/readiness/celebration mount points, the Active Session form (day/date/bodyweight/focus inputs, exercise toolbar, exercise list container, save button, notes), and the Session History sidebar (export/import controls, history list container). |
| `docs/quicklog.html` | Quick Log page shell: date/bodyweight inputs, day-chip mount point, exercise-list mount point, add-exercise dropdown mount point, notes, and a fixed save bar. |
| `docs/styles.css` | All visual styling for all three pages and every dynamically-generated component. Roughly half organized with section comments (from line ~1057 on), half an unorganized flat block (lines 1–1056). |
| `docs/app.js` | Everything else: static training-program data, all state/persistence logic, all business logic (scoring, progression, coaching), and all DOM rendering/event wiring for all three pages, gated by `document.body.dataset.page`. |

### 1.3 Dependencies between files

- All three HTML pages load the **same** `styles.css` and the **same** `app.js` — there is no per-page JS or CSS file. Page identity is established purely by `<body data-page="power|workout|quicklog">`, which `app.js` reads once at load (`const currentPage = document.body?.dataset?.page`) and uses to route initialization (`init()` at the bottom of the file calls `initPowerPage()` / `initWorkoutPage()` / `initQuickLogPage()`).
- The only external dependency is Google Fonts, loaded via `<link>` tags to `fonts.googleapis.com`/`fonts.gstatic.com` (Rajdhani, Outfit, DM Mono), duplicated identically in all three `<head>`s.
- No page-to-page navigation dependency beyond standard `<a href>` links in the shared nav; no shared iframe/postMessage/import mechanism — each page load is a fresh document, and all cross-page continuity happens through `localStorage`.
- Internally, `app.js` is organized into 15 comment-delimited sections (grep-verified):

| Line | Section |
|---|---|
| 2 | CONFIG (static data: splits, templates, exercise metadata, ranks, video links) |
| 613 | STATE (module-level mutable globals) |
| 636 | STORAGE (`loadState`/`saveState`/`defaultState`/`normalizeSettings`) |
| 704 | HELPERS (formatting, name matching, misc utilities) |
| 875 | POWER / BODY MODEL (scoring functions) |
| 1252 | PANELS (Power/Maxes/Body-Metrics panel rendering) |
| 1549 | DRAFTS (autosave for in-progress workouts) |
| 1604 | TIMERS (session timer + rest timer) |
| 1741 | PERFORMANCE / SUGGESTIONS (`suggestWeight`, deload logic) |
| 1851 | TRAINING INTELLIGENCE (readiness, volume tracking, PR detection, insights) |
| 2248 | EXERCISE ACTIONS (add/move/remove/reorder exercises) |
| 2416 | RENDER (all page-section render functions — the largest section) |
| 3110 | LOAD / SAVE WORKOUT |
| 3208 | EXPORT (JSON export/import) |
| 3286 | BUTTONS (one-time button wiring for the workout page) |
| 3334 | QUICK LOG (fully independent third rendering pipeline) |
| 3635 | INIT (page router) |

This gives a reasonably legible *conceptual* structure even though it lives in one physical file — the sections are a good map for a future module split (see §6).

---

## 2. Technical Debt Catalog

### 2.1 Duplicate logic (JavaScript)

1. **`saveWorkout()` (app.js:3146–3193) vs `qlSaveWorkout()` (app.js:3580–3632)** — near line-for-line duplicates. Both: snapshot prior workouts → run `detectPRs` → `state.workouts.unshift(workout)` → compute `nextWorkout()` → `saveState()` → `generateCoachingInsight()` → toast. Only the DOM/model scraping and the post-save UI differ. **This is the clearest extraction candidate in the codebase** — a shared `commitWorkout(workout)` helper would remove ~40 lines of duplication and guarantee both flows stay behaviorally identical.
2. **`renderMaxesPanel` (1430–1477) vs `renderBodyMetricsPanel` (1489–1546)** — structurally identical collapsible "title + toggle + grid of labeled numeric inputs + blur-save" pattern, differing only in field lists.
3. **Two sparkline implementations** — the generic, reusable `sparklineHTML()` (2446–2476) used by the per-exercise analytics panel, vs. a separate bespoke inline sparkline block hand-built inside `renderPowerPanel` (1259–1271). Same concept, two implementations.
4. **Two independent per-exercise card builders** — the Workout Tracker's inline card markup inside `renderWorkout` (2936–3103) and Quick Log's `qlBuildCard` (3399–3505) both render "an exercise with N sets," using unrelated markup, state shapes, and event wiring, sharing only the pure logic functions underneath (`suggestWeight`, `findLastPerformance`).
5. **Two independent hardcoded power-scoring weight tables** — the multiplier constants inside `calcPowerData` (~1105–1249) and the separate `POWER_ABS_MULT`/`POWER_REL_MULT`/`POWER_LEAN_MULT` tables defined just above `calcLiftInsights` (2194–2197). Both encode "how much each lift matters" for related-but-different purposes, with no shared source of truth — a future change to how much squat "counts" would need to be made in two places.
6. **Repeated "mutate `exercises` → persist → re-render" pattern** across six functions: `addExerciseFromSelection`, `moveExercise`, `removeExercise`, `toggleExerciseCard`, `expandAll`, `collapseAll` (2251–2289) — each is a one-line-different variation of the same three-step sequence.

### 2.2 Duplicate/inconsistent CSS

- **Literal duplicate selector definitions** where a later block silently overrides an earlier one at a distant line: `.exercise-toolbar` defined at both 555–560 and 884–889; `.setRow` defined at both 624–630 and 907–909. Anyone editing the *first* definition of either will see no effect — a genuine footgun.
- **Recurring "kicker/label" pattern** (uppercase, muted, letter-spaced small text) independently declared at least 8 times: `.pill-label`, `.stat-label`, `.power-kicker`/`.power-section-title`/`.power-focus-label`, `.eyebrow`, `.progress-kicker`, `.readiness-kicker`/`.celebrate-kicker`, `.coach-volume-title`, `.ql-stepper-label`.
- **Recurring "progress track/fill bar" pattern** duplicated 3 times (`.power-progress-*`, `.progress-*`, `.volume-*`) and **"sparkline bar" pattern** duplicated 2 times (`.power-sparkline*`, `.mini-spark*`).
- **"Active tab/chip" style** (gold border/background/text triplet) copy-pasted byte-for-byte 3 times: `.tab.active`, `.page-link.active`, `.ql-chip.active`.
- **"Dark card surface" gradient background** reimplemented 5 times with only alpha values differing: `.hero`, `.card`, `.exercise-card`, `.ql-card`, `.celebrate-card`.
- **`X.hidden{display:none}` reinvented 9 separate times** per-component instead of one generic `.hidden` utility, even though all nine are toggled via the same `classList.toggle("hidden", …)` idiom in JS and would work identically as one shared rule.
- **Hardcoded color literals instead of custom properties**: the gold RGB triplet matching `--gold` appears as a raw `rgba(200,169,107,*)` literal 20+ times instead of a `--gold-rgb` variable; a brighter "success green" (`#7fda9d`) and two different "danger red" shades (`#ff8a8a`, `#e08787`) are hardcoded 3–5 times each despite `--success`/`--danger` already existing in `:root` — meaning the registered variable palette and the colors actually used for status indicators have quietly diverged.
- **File organization**: only the last ~45% of `styles.css` (from line 1057) has section comments; the first ~55% (lines 1–1056, covering hero/stats/tabs/cards/forms/buttons/the entire Power Calculator widget/exercise editor/rest timer/toasts) is one undifferentiated block. The duplicate `.exercise-toolbar`/`.setRow` definitions sit exactly at the seam between the two eras, reinforcing that later feature work was appended rather than integrated.
- **Responsive breakpoints scattered non-contiguously**: 10 `@media` blocks across 6 separate locations, with `max-width: 720px` reused 5 separate times in 5 different places rather than consolidated — easy to add a rule in the wrong spot (as already happened) or miss an existing one.
- **Naming convention drift**: three different prefixing conventions correlate with three build eras (flat/generic earliest, `power-` prefixed, then per-component ad hoc prefixes like `readiness-`/`coach-`/`volume-`, then `ql-` most recently and most consistently). `setRow` is the only camelCase class name in an otherwise all-kebab-case file.
- **Dead CSS**: `.exercise-actions` (891–895) is defined but referenced nowhere, static or dynamic.
- **Classes used in JS-generated markup with zero CSS backing** (rely on bare element/utility styling only, likely copy-paste-without-matching-rule): `.suggest-line`, `.demo-btn`, `.warmup-btn`, `.edit-select`, `.preset-weight`, `.analytics-toggle`.

### 2.3 Overly large files / functions

| Unit | Size | Note |
|---|---|---|
| `app.js` | 3,691 lines | Single file, no modules |
| `styles.css` | 1,821 lines | Single file, no modules |
| `renderWorkout()` | 187 lines | Largest function; builds every exercise card's full DOM tree and wires ~12 handlers per card, all inline |
| `renderPowerPanel()` | 164 lines | Single-shot template-string assembly of the entire Power page |
| `calcPowerData()` | 145 lines | Combines session/volume/streak/strength/body-metric scoring in one function |
| `renderCoachPanel()` | 107 lines | Settings selectors + volume bars + split-specific copy, re-wires handlers every call |
| `qlBuildCard()` | 107 lines | One Quick Log card with steppers/chips, ~7 inline handlers |
| `detectPRs()` | 84 lines | Nested loops: per-exercise × per-prior-workout × per-set |
| `suggestWeight()` | 80 lines | Dense branching progression/deload logic |

### 2.4 Dead code / unused functions

**None found.** A full call-site grep across all ~108 top-level functions in `app.js` showed every function referenced at least once beyond its own definition (spot-checked the lowest-reference-count functions manually to confirm). This is worth stating as a genuine positive — despite organic, single-file growth, the codebase has not accumulated orphaned logic.

The only dead artifact found anywhere is the `.exercise-actions` CSS rule (§2.2).

### 2.5 Performance concerns

1. **Likely real input bug**: `setsInput.oninput` and `repsInput.oninput` inside `renderWorkout` (~3057–3069) each call `renderWorkout()` synchronously — but `renderWorkout()` starts by clearing and rebuilding the entire exercise-list DOM (`container.innerHTML = ""`), including the very `<input>` the user is typing into. A newly-created input cannot hold keyboard focus from the event that spawned it, so typing a second digit into Sets or Target Reps is likely to be silently dropped. This should be verified live and is the single highest-priority functional finding in this review (see Phase 0/1 of the modernization plan).
2. **Unconditional full render cascade on every save**: `saveState()` (685–696) calls 9 render functions and re-serializes the *entire* app state (including full workout history) to `localStorage` on every single call, regardless of which field actually changed — e.g., editing one body-metric field re-runs the full power-score recomputation (`calcPowerData`, itself several passes over all workout history) even though only two derived numbers depend on it.
3. **Repeated history scans per render**: `renderWorkout()` calls `findLastPerformance` and `suggestWeight` (which itself calls `calcExerciseStats`) for every exercise card, and `calcExerciseStats` again for the analytics panel — roughly 2–3 full scans of workout history *per exercise, per render*.
4. **Duplicate/overlapping event listeners**: Set 1's weight input has **three** separate `"input"` listeners bound to it simultaneously (two inside `wireSetSuggestionInputs`, one from the blanket `attachDraftAutoSave` binding), so every keystroke there triggers `persistDraftForDay()` twice and `renderTrackerProgress()`/`updateSetSuggestionUI()` twice each. Other rows get two listeners instead of three. Since `persistDraftForDay()` itself calls `saveState()` (a localStorage write plus the full render cascade above), this is measurable redundant work per keystroke, not just a style nit.
5. **`renderTrackerProgress()`** re-queries every `.setRow` in the live DOM on every call, and is itself invoked from inside the redundant listeners above.
6. **`deepClone` via `JSON.parse(JSON.stringify(...))`** is the pervasive clone idiom for the (small) `exercises` array — cheap today, but the same idiom pattern would not scale if ever applied to the (unbounded, growing) `workouts` history array.

None of these are likely to be user-visibly slow *today* at realistic personal-tracker data volumes (hundreds, not tens of thousands, of workouts) — except finding #1, which is a correctness bug, not a scaling concern.

### 2.6 localStorage issues

- All persistence lives under one key, `power_calculator_v3` (`STORAGE_KEY`), accessed from exactly two places in the whole file (`loadState()` line 660, `saveState()` line 686) — genuinely well-centralized, no stray direct access anywhere else.
- The `_v3` suffix in the key name implies the schema has been through prior breaking revisions elsewhere (this repo's own git history only ever shows `_v3`, so any `_v1`/`_v2` predecessor predates this repository). There is **no migration logic** in the current code to carry data forward from an older key — if the schema needs to change again, the current pattern (rename the key) would silently orphan existing users' data rather than migrate it.
- `loadState()` catches JSON-parse failures and falls back to `defaultState()` — this prevents a crash, but it means a corrupted or truncated `localStorage` value is silently and irreversibly replaced with an empty state, with no backup/recovery path other than a manual export the user may not have made.
- No schema/version validation on `importLog()` beyond "the parsed JSON has a `workouts` array" — a same-shape-but-wrong-source JSON file would be accepted and would wholesale-replace live state (the only other place besides `loadState()` that reassigns `state` rather than mutating a field of it).
- No archiving, pagination, or size cap on `workouts` — the array grows forever and is re-serialized in full on every save.

### 2.7 Hardest-to-maintain areas

- **Content-as-code**: `TEMPLATES`, `EXERCISE_VIDEO_SEARCH` (~70 manually maintained hardcoded YouTube search URLs), and `buildKyleNotesHTML()` (one specific person's injury timeline, PR log, and program notes, hardcoded directly in the render layer and only shown when `settings.split === "kyle"`) blur the line between generic app logic and one user's personal data. This makes the app harder to reuse or hand to another user, and means personal/sensitive-ish content lives in source control mixed with business logic.
- **Three parallel "workout" data shapes**: the Tracker's live `exercises` array, Quick Log's `qlEntries` array, and the persisted `workout.exercises` shape each require their own translation logic for what is conceptually one feature (log a set of exercises for a day).
- **No enforced state-update boundary**: `state.*` is mutated directly in at least 15+ scattered call sites across drafts, maxes, body metrics, coach settings, workout save, and import — every site individually remembers to call `saveState()` afterward (and, in the code as it stands today, always does), but nothing enforces this going forward; it is pure convention.

---

## 3. Feature Inventory

| Feature | Where | Category |
|---|---|---|
| Workout logging (Tracker: add/edit/reorder exercises, sets, save) | `renderWorkout`, `saveWorkout` | **Core** |
| Exercise templates per split/day (5 splits, ~20 template days) | `TEMPLATES`, `SPLITS` | **Core** |
| Double-progression weight suggestion + automatic deload on 3-session plateau | `suggestWeight` | **Core** — primary value proposition |
| Workout history + localStorage persistence | `loadState`/`saveState`, `renderHistory` | **Core** |
| JSON export / import (only backup mechanism given no backend) | `exportLog`/`importLog` | **Core** — essential given no backend |
| Power Calculator (composite score, rank, breakdown, trend) | `calcPowerData`, `renderPowerPanel` | **Core** — flagship/differentiating page |
| Quick Log (mobile tap-to-fill fast-entry flow) | `qlBuildCard`, `qlSaveWorkout`, quicklog.html | **Core** — distinct, deliberate mobile use case |
| Rest timer (widget + 3 trigger points + presets) | Timers section | Optional |
| Session (elapsed-time) timer | Timers section | Optional |
| Draft autosave for in-progress Tracker workouts | Drafts section | Optional (Quick Log has no equivalent — inconsistent parity) |
| PR detection (volume/1RM/heaviest/reps) | `detectPRs` | Optional, but well-integrated in both save flows |
| Celebration/PR banner on save | `renderCelebrationPanel`, Quick Log's `qlSaved` equivalent | Optional |
| Post-workout coaching insight (natural-language heuristics) | `generateCoachingInsight` | Optional |
| Readiness/recovery scoring | `calcRecoveryData`, `renderReadinessCard` | Optional |
| Weekly muscle-group volume tracking vs. hard-set targets | `calcWeeklyMuscleSets`, `renderCoachPanel` | Optional |
| Per-exercise lifetime analytics (best lifts, sparklines) | `calcExerciseStats`, `buildAnalyticsHTML` | Optional |
| "Lift Intelligence" (strongest/weakest/fastest-improving/focus lift) | `calcLiftInsights` | Optional |
| Auto warm-up ramp calculator | `buildWarmupHTML` | Optional |
| Exercise demo video links (~70 hardcoded YouTube search URLs) | `EXERCISE_VIDEO_SEARCH`, `openExerciseDemo` | Optional — high maintenance cost for low functional value (search-query links, not curated videos) |
| Coach settings (days/week + split switching, mismatch nudge) | `renderCoachPanel`, `applyCoachSettings` | Optional |
| **Kyle's hardcoded personal program + injury/PR notes** | `TEMPLATES` (Kyle entries), `buildKyleNotesHTML` | **Candidate for removal/consolidation** — should become user-editable data, not hardcoded source, or be removed from the shared app entirely |
| Duplicate power-scoring weight tables | `calcPowerData` internals + `POWER_*_MULT` | **Candidate for consolidation** |
| Duplicate sparkline implementations | `renderPowerPanel` inline block vs. `sparklineHTML` | **Candidate for consolidation** |
| `.exercise-actions` CSS | styles.css:891–895 | **Candidate for removal** — confirmed dead |
| "Load Selected" vs. "Load Next" dual buttons | workout.html toolbar | **Candidate for UX consolidation** (see §5) |

---

## 4. Data Architecture

### 4.1 localStorage schema

Everything lives under one key: `power_calculator_v3`. The stored JSON object (`state`), per `defaultState()`/`loadState()`:

```js
{
  workouts: [],            // array of saved workout sessions, newest inserted at index 0
                            //   each entry: { name, date, bodyWeight, notes, exercises: [
                            //     { name, sets: [ { weight, reps }, ... ], ... }
                            //   ], ...PR/celebration metadata computed at save time }
  nextWorkout: "Push A",    // string — which template day is up next in the rotation
  customLayouts: {},        // { [dayName]: exercise[] } — per-day user overrides of TEMPLATES
  drafts: {},               // { [dayName]: exercise[] snapshot } — autosaved in-progress Tracker session
  userMaxes: {               // manual override 1RMs, used if higher than auto-detected best lift
    bench: "", squat: "", deadlift: "", press: "", pull: ""
  },
  bodyMetrics: {              // used for relative-strength / lean-mass scoring
    height: "", bodyWeight: "", bodyFat: "", age: ""
  },
  settings: {
    daysPerWeek: 6,          // clamped 2–6
    split: "ppl"             // one of: fullbody | upperlower | ppl | rehab | kyle
  }
}
```

Note: **Quick Log's in-progress entries (`qlEntries`) are never persisted as a draft** — only the Tracker's `drafts` object survives a page reload mid-session. This is an intentional-or-accidental feature-parity gap between the two logging flows.

### 4.2 Data flow

```
User input (DOM)
   │
   ▼
In-memory session state
  Tracker:    module-level `exercises` array (+ `selectedDay`)
  Quick Log:  module-level `qlEntries` array (+ `qlDay`)
   │
   ▼ (on every keystroke, Tracker only)
persistDraftForDay() → state.drafts[selectedDay] = snapshot → saveState()
   │
   ▼ (on Save Workout / Save in Quick Log)
Build final workout object from live DOM/model
   → detectPRs(workout, priorWorkouts)
   → state.workouts.unshift(workout)
   → state.nextWorkout = nextWorkout(currentDay)
   → clear the day's draft (Tracker only)
   → saveState()
        → localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
        → renderStats / renderHistory / renderTabs / renderPowerPanel /
          renderMaxesPanel / renderBodyMetricsPanel / renderTrackerProgress /
          renderReadinessCard / renderCoachPanel   (all 9, unconditionally)
   → generateCoachingInsight() → celebration banner → toast
```

Export/import is the same `state` object serialized to/from a downloaded `.json` file, with `importLog()` performing the only other full-object reassignment of `state` besides `loadState()` itself.

**Per-day layout resolution** (`getLayoutForDay`, used by `loadTemplate`) follows an implicit three-tier fallback that is not documented anywhere in code or comments: **draft (if present) → customLayout (if present) → TEMPLATES\[day\] (baseline)**. A future maintainer has to read `loadTemplate`/`getLayoutForDay`/`getDraftForDay` together to discover this precedence.

### 4.3 Unnecessary complexity

- **Three parallel "workout in progress" representations** (`exercises`, `qlEntries`, and the eventual persisted `workout.exercises`) instead of one shared session model rendered two ways.
- **Undocumented three-tier layout fallback** (draft > customLayout > template) — implicit, not centrally validated, discoverable only by reading multiple functions together.
- **Feature-parity gap**: draft autosave exists for Tracker but not Quick Log, with no comment explaining why — looks like an oversight rather than a deliberate design choice.
- **No schema versioning/migration**, despite a version number embedded in the storage key name (§2.6) — the version number exists but does no work.
- **Full-state overwrite on import** with only "has a `workouts` array" as validation — no defense against a well-formed-but-wrong JSON file silently replacing real data.

---

## 5. User Experience Evaluation

Enumerated every interactive control on `workout.html` and `quicklog.html` (56 total interactive elements/behaviors across the two pages) to evaluate workflow complexity. Notable friction points:

1. **Rest timer has three independent trigger points** doing the same thing: the floating `#restFab`, the `#openRestBtn` in the exercise toolbar, and a per-set "Rest" button inside every single set row. Functionally harmless (all open the same widget), but it's three UI affordances plus three code paths for one piece of state, which is more surface area than the feature needs.
2. **Expand/collapse has three affordances** per exercise card: global "Expand All," global "Collapse All," and click-to-toggle on each card's own head. A single stateful "Expand All ↔ Collapse All" toggle button would reduce this to one control with the same coverage.
3. **"Load Selected" vs. "Load Next" are two adjacent, similarly-worded buttons with a subtle semantic difference** (the day currently highlighted in the tab bar vs. the app's computed next-in-rotation day) — this requires the user to hold a small mental model of "what's selected right now vs. what the app thinks is next," which works against the stated goal of a fast pre-workout action.
4. **Quick Log's per-exercise interaction is richer than its "a few taps" pitch suggests**: each exercise offers a weight stepper, a reps stepper, a variable-length row of per-set tap-to-decrement chips, and a skip toggle — realistically 4–6 taps per exercise to reflect any deviation from the prefilled defaults, which is faster than the full Tracker's raw text inputs but not dramatically so for a multi-exercise day.
5. **The suspected Sets/Reps focus-loss bug (§2.5, finding #1)** is itself the single worst UX issue if confirmed live: it would mean a core editing field (changing an exercise's target set/rep count) silently fails to accept multi-digit input.
6. Export/Import (visible buttons + hidden file input) is a standard, low-friction pattern — no complaint there.

---

## 6. Architecture Report

### 6.1 Current Strengths

- **Persistence is genuinely well-centralized** — exactly two `localStorage` touchpoints in 3,691 lines, both inside `loadState`/`saveState`, with defensive try/catch fallback on parse failure.
- **No dead code anywhere in the JavaScript** — every one of ~108 top-level functions is reachable from at least one call site, despite years of organic single-file growth. This is a real discipline strength worth preserving through any refactor.
- **Zero-dependency deployment** — no build pipeline, no bundler, no package manager to break; the entire app is trivially servable as static files (which is exactly how it's deployed, via GitHub Pages from `docs/`).
- **Mature, genuinely useful domain logic** for a single-file hobby project: double progression, deload detection, PR detection across four PR types, readiness/recovery scoring, and weekly volume-vs-target tracking are all implemented and cross-wired between the Tracker and Quick Log save paths.
- **A real (if inconsistently applied) design-token layer** — `:root` CSS custom properties exist and cover the base chrome; the gaps are in the newer "status" colors, not the foundation.
- **Defensive state loading** — `normalizeSettings`/`loadState` clamp and fall back sensibly on malformed stored data rather than crashing.

### 6.2 Biggest Weaknesses

- Two monolithic files (`app.js`, `styles.css`) with no module boundaries, mixing static config data, business logic, rendering, and event wiring in one place each.
- A full-page/full-section "clear `innerHTML` and rebuild" rendering model with no scoped updates, which has produced at least one likely real input bug and measurable redundant work per keystroke.
- Meaningful logic duplication between the Tracker and Quick Log save/render paths.
- Zero automated test coverage and no CI — every domain function (power scoring, progression suggestion, PR detection) is currently pure and easily testable, but nothing tests them today.
- One specific person's personal training program and injury history hardcoded directly into shared application source.
- CSS grown by append rather than edit-in-place, producing literal duplicate selector definitions where the later one silently wins.

### 6.3 Highest-Risk Areas (ranked)

1. **Suspected Sets/Reps input focus-loss bug** — needs live verification first; if real, it's a correctness defect in a core editing path, not just a style issue.
2. **Single localStorage key with no versioning/migration and no schema validation on import** — the only backup path is a manual export the user may never have made; a parse failure or bad import silently and irreversibly replaces the entire history.
3. **`saveState()`'s unconditional 9-function render cascade + full-state re-serialization on every mutation** — currently invisible at personal-tracker data volumes, but a structural coupling that will degrade as workout history grows, and that makes every future feature addition inherit the same "re-render the whole world" cost by default.
4. **Duplicated save/render logic between Tracker and Quick Log** — any future change to save behavior (e.g., a new PR type, a new validation rule) must be remembered and applied in two places or the two flows will silently diverge.
5. **Three divergent in-flight "workout" data shapes** (`exercises`, `qlEntries`, persisted `workout.exercises`) — any future schema change to what a "workout" or "exercise" contains needs coordinated updates across all three.

### 6.4 Recommended Project Structure (target — for eventual, incremental modularization; not to be done all at once)

```
docs/
├── index.html
├── workout.html
├── quicklog.html
├── styles/
│   └── ... (component-scoped CSS files, plain @import — no build step required)
├── data/
│   └── personal-programs.js      ← Kyle's program + notes, extracted, clearly marked as user data
└── src/
    ├── config/
    │   ├── splits.js              (SPLITS, TEMPLATES, DAY_EXERCISE_OPTIONS)
    │   └── exercise-data.js       (EXERCISE_DEFAULTS, EXERCISE_RULES, EXERCISE_MUSCLES,
    │                               MUSCLE_TARGETS, EXERCISE_VIDEO_SEARCH)
    ├── state/
    │   ├── schema.js              (defaultState, normalizeSettings, version/migration)
    │   └── storage.js             (loadState, saveState — the only localStorage touchpoints)
    ├── domain/
    │   ├── power.js                (calcPowerData, getRankInfo, calcBodyData — pure functions)
    │   ├── progression.js          (suggestWeight, deload detection, buildSetWeightSuggestions)
    │   ├── analytics.js            (calcExerciseStats, detectPRs, calcLiftInsights)
    │   └── coaching.js             (calcRecoveryData, calcWeeklyMuscleSets, generateCoachingInsight)
    ├── ui/
    │   ├── shared/                 (sparklineHTML, toast, collapsible-panel, tab-bar helpers)
    │   ├── timers.js               (session timer + rest timer)
    │   ├── power-page.js
    │   ├── workout-page.js
    │   └── quicklog-page.js
    └── app.js                      (thin page router / init only)
```

### 6.5 Suggested Module Breakdown

- **Config/data** — pure data, no logic, safe to edit without touching behavior.
- **State/storage** — the schema, defaults, migration, and the only two `localStorage` calls in the app.
- **Domain** — pure, DOM-free business logic (scoring, progression, analytics, coaching); the highest-value place to add tests first, since none of it touches rendering.
- **UI/shared** — the currently-duplicated small components (sparkline, collapsible metric panel, toast) extracted once and reused by every page.
- **UI/page controllers** — one per page, thin, wiring domain output to DOM.

### 6.6 Priority List of Refactoring Tasks

**P0 — verify and fix functional bugs (small, contained, high value)**
1. Confirm the Sets/Reps input focus-loss bug live; fix by not calling `renderWorkout()` from inside its own field's `input` handler.
2. Remove the duplicate/overlapping `input` listeners on set-row weight/reps fields (currently double- or triple-bound).

**P1 — small, isolated, no architectural change**
3. Delete dead `.exercise-actions` CSS; add missing CSS backing for `.suggest-line`/`.demo-btn`/`.warmup-btn`/`.edit-select`/`.preset-weight`/`.analytics-toggle`.
4. Consolidate the duplicate `.exercise-toolbar`/`.setRow` CSS definitions into single, correctly-located rule blocks.
5. Extract a shared `commitWorkout()` helper used by both `saveWorkout()` and `qlSaveWorkout()`.
6. Consolidate the two power-scoring weight tables into one constant source of truth.
7. Consolidate the two sparkline implementations onto the existing `sparklineHTML()`.

**P2 — moderate, structural but incremental, still in the current files**
8. Extract a shared "collapsible metric grid" helper for `renderMaxesPanel`/`renderBodyMetricsPanel`.
9. Introduce one `.hidden { display: none }` utility class; delete the nine duplicated per-component hidden rules.
10. Register the informally-reused gold/green/red shades as CSS custom properties.
11. Move Kyle's hardcoded program/notes out of `app.js` into a clearly-labeled, separately-editable data structure.
12. Add a minimal state-version field + migration function to `loadState()`.

**P3 — larger, do only once P0–P2 are stable and ideally covered by tests**
13. Add a lightweight test layer for the already-pure domain functions (power scoring, `suggestWeight`, `detectPRs`) — no DOM dependency, no framework needed, highest test-value-per-effort in the codebase.
14. Unify the Tracker (`exercises`) and Quick Log (`qlEntries`) in-progress models into one shared session model rendered by two different UI layers.
15. Split `app.js` into ES modules per §6.4, one module at a time, verifying each page after every extraction.
16. Split `styles.css` into component-scoped files.
17. Introduce a small state-update abstraction (a single `setState`-style function) to replace the ~15+ scattered direct `state.x = y; saveState()` call sites.

---

## 7. Phased Modernization Plan

> Every phase should land as small, individually-revertible commits. No phase should change user-visible behavior except where explicitly stated (Phase 1's bug fixes).

### Phase 0 — Safety net (before touching anything)
- Manual smoke-test pass of all three pages against current `main`, recording expected behavior for every feature in §3 (there are no existing tests to rely on).
- Verify the suspected Sets/Reps focus-loss bug in a live browser session — establish ground truth before assuming it's a defect.
- Stand up a minimal test harness targeting the pure domain functions only (`calcPowerData`, `suggestWeight`, `detectPRs`, `calcExerciseStats`) — zero risk, since none of them touch the DOM, and they're the functions most valuable to protect before refactoring around them.

### Phase 1 — Non-breaking bug fixes and cleanup
- Fix the confirmed input focus-loss bug (P0 items).
- Fix the duplicate/overlapping event listeners on set-row inputs.
- Remove dead CSS; add missing CSS for currently-unstyled dynamic classes.
- Consolidate the duplicate `.exercise-toolbar`/`.setRow` CSS definitions.
- No feature changes; purely correctness and cleanup.

### Phase 2 — De-duplicate logic in place
- Extract `commitWorkout()` shared by both save flows.
- Consolidate the two power-scoring weight tables.
- Consolidate the two sparkline implementations.
- Extract the shared collapsible-metric-panel helper.
- Still one file each for JS/CSS, still no build step — pure refactor-in-place, protected by the Phase 0 tests.

### Phase 3 — Data/content separation
- Move Kyle's hardcoded program and personal notes into a separate, clearly user-editable data file, decoupled from shared app logic.
- Add a schema-version field and a migration function to `loadState()`.
- Add an explicit "you haven't exported recently" reminder given the single-key, no-backup persistence model.

### Phase 4 — Modularization (only once Phases 1–3 are stable in production)
- Introduce `<script type="module">` and split `app.js` along the §6.4 breakdown, one module at a time, verifying every page after each extraction.
- Split `styles.css` into component-scoped partials via plain CSS `@import` (no bundler required, at the cost of a few extra requests — acceptable for a static, low-traffic personal site).

### Phase 5 — Optional platform upgrades (only after Phases 1–4, and only if desired)
- Real PWA support: add an actual `manifest.json` and service worker for genuine offline installability (today only the `apple-mobile-web-app-*` meta tags exist — there is no manifest and no service worker, so the app is not actually installable/offline-capable despite looking like it's trying to be).
- Optional lightweight build step (e.g., esbuild) if the module split makes multi-file loading unwieldy in production.
- Optional introduction of a small scoped-update/reactive layer to eliminate the "re-render everything on every keystroke" pattern at its root, once module boundaries make this safe to attempt incrementally rather than all at once.

---

*This document reflects the state of the repository at commit `3321a9e` on branch `main`. No source files were modified to produce it.*
