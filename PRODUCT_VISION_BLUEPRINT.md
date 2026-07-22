# Aiphone — Product Vision & Architecture Blueprint

**Status:** Foundational document. This is the single source of truth for every future decision about Aiphone — what to build, what to refuse, and why. When a feature request, refactor, or design choice conflicts with this document, this document wins until it is deliberately revised.

---

## 1. Product Vision

**What is Aiphone?**

Aiphone is a personal strength-training system that behaves like a coach, not a notebook. It doesn't just record what you lifted — it tells you what to lift next, notices when you've stalled, celebrates when you've broken a record, and keeps a weekly accounting of whether every muscle group is getting enough work. The logging is the byproduct; the coaching is the product.

**Who is it for?**

One serious lifter — someone running a structured program (a push/pull/legs split, an upper/lower split, a rehab-focused block, a fully custom day-by-day layout) who trains multiple days a week and cares about progressive overload. Not a casual gym-goer looking for motivation via badges. Not a beginner who needs to be taught how to squat. The audience is narrow and known — today, literally the person who built it and the people they train. Aiphone is not trying to be everyone's app; it is trying to be exactly the right app for a small number of people who train seriously.

**What problem does it solve?**

Most fitness software sits at one of two extremes. On one end: a spreadsheet or a bare logging app — infinitely flexible, but it never tells you anything, and you have to do all the thinking yourself, every single session, forever. On the other end: a heavily gamified consumer app — streaks, badges, social feeds, subscriptions — that spends its engineering budget on engagement mechanics instead of the one thing that actually matters, which is telling you the right weight to load on the bar today. Aiphone exists in the gap between those two: all the memory and computation of a spreadsheet, with none of the manual thinking, and none of the gamified noise.

**What makes it different from every other fitness tracker?**

- **It decides. It doesn't just display.** Every other number in the app exists to produce a decision — the next weight, the next deload, the next focus lift, the next thing to prioritize this week. A chart with no decision behind it doesn't belong in Aiphone.
- **It is private and local by default.** There is no account, no server, no company reading your training data. Your history lives on your device, in a file you control, that you can export and own outright.
- **It has no reason to keep you engaged.** There is no streak-for-streak's-sake, no social feed, no notification begging you to open the app. It is a tool you pick up because it's useful, not because it's designed to be sticky.
- **It respects the actual moment of use** — a phone in one sweaty hand between sets, not a couch-browsing session. Every design decision defers to that moment.

---

## 2. Design Philosophy

These are not slogans. Each one is a standing instruction for every future decision.

**Fast over flashy.** The value of a suggestion is inversely proportional to how long it takes to see it. Animation, decoration, and visual flourish are acceptable only when they cost nothing in speed to the number the user actually needs. If a design choice makes the app feel more impressive but slower to use mid-set, the design choice loses.

**Data over gimmicks.** Every number shown must be either a direct measurement (a weight, a rep count, a date) or a transparent derivation of one (an estimated 1RM, a weekly set count, a composite score whose formula could be explained in one sentence). Nothing is shown because it looks good on a dashboard. If a metric can't be explained to the user in a sentence, it doesn't ship.

**Coach over notebook.** A notebook records. A coach recommends, warns, and remembers on your behalf. Every screen should default to answering "what should I do right now," not just "what did I do before." When in doubt about whether a feature is a notebook feature or a coaching feature, push it toward coaching.

**Simple first, powerful second.** The default state of any screen is the minimum information needed to act. Depth — history, analytics, breakdowns — is opt-in, one tap away, never forced onto the primary view. Complexity is allowed to exist, but it must be earned by the user asking for it, not imposed by the app up front.

**Mobile-first, gym-first.** The primary context is standing in a gym, one hand occupied, attention split between the phone and the next set. Every workflow is designed for that context first; anything that only makes sense on a desk (long-form review, program planning, data export) is secondary and can be less optimized.

**Every feature must have a purpose someone will actually use.** Not "might use," not "could be nice" — will actually change a decision or save real effort for the specific people this app serves. A feature that exists because it seemed clever, or because a similar app has it, does not belong.

**Minimize taps and cognitive load, always.** Every additional control, every additional screen, every additional decision point the user has to hold in their head is a cost that must be justified by the value it returns. When two designs solve the same problem, the one with fewer taps and less to remember wins by default — even if the other is technically more powerful.

**Personal, not generic.** Aiphone is allowed to be opinionated and specific to how its actual users train, rather than generically accommodating every possible training philosophy. It does not need a setting for every edge case; it needs to be excellent for its real, known audience.

**No feature outlives its justification.** If a feature's purpose disappears — the person it was built for stops using it, the workflow it served gets replaced — the feature should be removed, not preserved out of inertia. An unused feature is not neutral; it is a permanent tax on every future change.

---

## 3. Core Product Pillars

A pillar is a permanent area of responsibility — not a screen, not a feature, a *domain of ownership*. Aiphone has six. Nutrition, social, and gamification are deliberately not among them (see §9).

### 3.1 Workout Engine
**Purpose:** Let the user plan and log a training session with minimum friction, in whatever mode fits the moment — full editing control at a desk-adjacent bench, or fast tap-to-fill when the phone barely leaves a pocket.
**Responsibilities:** Program/split definitions, per-day exercise templates, live session editing (add/reorder/remove exercises and sets), draft persistence so an interrupted session isn't lost, and the act of committing a finished session to history.
**Belongs here:** Anything about *capturing* a workout — templates, custom day layouts, the full editor, the fast-entry mode, set/rep/weight input, session notes.
**Does NOT belong here:** Deciding what weight to suggest (Coaching Intelligence), scoring the session afterward (Progress & Analytics), or anything about the person's body rather than the workout (Body Metrics).

### 3.2 Coaching Intelligence
**Purpose:** This is Aiphone's reason for existing. It turns raw logged history into an active recommendation: what to lift next, when to back off, what's stalling, what's been neglected.
**Responsibilities:** Progressive-overload weight/rep suggestions, plateau and deload detection, PR detection, weekly muscle-group volume accounting against targets, readiness/recovery signal, and the plain-language insight generated after a session.
**Belongs here:** Any logic that looks at history and produces a *recommendation or warning*, regardless of which screen displays it.
**Does NOT belong here:** The UI that displays the recommendation (Workout Engine or Progress & Analytics render it); raw data storage (Data Management); anything that requires input the user hasn't given (Coaching Intelligence works with what's actually logged, it doesn't invent data).

### 3.3 Progress & Power Analytics
**Purpose:** Give the user a single, trustworthy sense of "am I getting stronger," at both the whole-person level (a composite score and rank) and the single-lift level (lifetime bests, trend, history).
**Responsibilities:** The composite Power score and rank, per-lift and per-exercise trend analysis, and the visual presentation of long-run progress.
**Belongs here:** Anything that answers "how am I doing, over time," derived transparently from logged history and body metrics.
**Does NOT belong here:** Generating recommendations from that data (Coaching Intelligence) — Progress & Analytics reports the past and present; it doesn't tell the user what to do about it.

### 3.4 Body Metrics
**Purpose:** Maintain the small set of physical facts about the person — bodyweight, body fat, height, age — that other pillars need to make their numbers meaningful. This pillar is intentionally small and quiet; it exists to feed the others, not to be a destination in itself.
**Responsibilities:** Storing and lightly validating the handful of physical inputs the user chooses to provide.
**Belongs here:** Only measurements about the body that other pillars actually consume.
**Does NOT belong here:** Anything that isn't consumed elsewhere (this pillar has no reason to grow features of its own) — and explicitly not calorie/macro/nutrition tracking (see §9).

### 3.5 Program Configuration
**Purpose:** Let the user define how they train — the split, the days per week, the exact exercises and order for each day — as a durable, editable configuration rather than a one-time setup.
**Responsibilities:** Split selection, days-per-week, per-day custom exercise layouts, and program-level settings such as which day comes next in rotation.
**Belongs here:** Anything that shapes *what a training day is supposed to contain*, before it's ever logged.
**Does NOT belong here:** One specific person's personal program content hardcoded as if it were generic app logic — program *content* the user creates belongs here; program content baked into the source code does not belong anywhere in the shipped product (see §9 and the roadmap).

### 3.6 Data Management
**Purpose:** Be the invisible, unglamorous foundation that guarantees nothing is ever silently lost — the pillar with the least UI and the most responsibility.
**Responsibilities:** The persistence schema and its versioning, backup via export, restoration via import, and the integrity checks that prevent a bad file or a corrupted value from destroying history without warning.
**Belongs here:** Anything about *whether the user's data survives* — schema shape, migration, backup, restore.
**Does NOT belong here:** Anything about what the data means (that's every other pillar) — Data Management doesn't interpret, it only protects.

---

## 4. User Experience Principles

Every screen in Aiphone should feel the same way, regardless of which pillar it belongs to:

- **Minimal by default.** The first thing the user sees is the smallest useful set of information. Everything else is one deliberate tap away.
- **Fast to the number that matters.** The single most important piece of information on any screen — the next weight, the streak, the score — should never require scrolling or a second screen to find.
- **Information-rich without clutter.** Depth is available, but density is chosen, not accidental. A screen with twelve numbers on it should have twelve numbers because twelve decisions depend on them, not because twelve numbers were easy to add.
- **Usable one-handed, mid-set.** Every primary action during an active workout must be reachable and legible with one thumb, without requiring the user to set the phone down or use two hands.
- **Large, forgiving touch targets.** Anything tapped between sets, out of breath, with sweaty hands, must be large enough to hit reliably on the first try.
- **Consistent navigation everywhere.** The same gesture, the same button, the same place on screen does the same thing on every page. A user should never have to relearn how to get back, save, or cancel.
- **Minimal scrolling for anything time-sensitive.** Rest-timer, current set, next suggested weight — these must be visible without scrolling. Historical and reflective content can scroll; active, in-the-moment content cannot.
- **One way to do one thing.** Where the current app offers three ways to trigger the same timer or three ways to expand a card, the target experience offers one clear way — redundant affordances are a sign the design hasn't committed to a decision, not a sign of flexibility.
- **The app never makes the user do arithmetic.** If a percentage, a rounded weight, or a rep target can be computed, it is computed and shown — never left as a mental-math exercise mid-set.

---

## 5. Architecture Principles

These are engineering rules, not suggestions. A change that violates one of these needs a deliberate, written exception — not a quiet workaround.

- **Single source of truth for every fact.** Every piece of business logic — how a score is weighted, how a deload is triggered, what counts as a PR — is defined exactly once. If the same concept needs to be used in two places, the two places call the same function; they do not each encode their own copy of the rule.
- **No duplicate business logic, ever.** Two workflows that do conceptually the same thing (logging a workout from a detailed editor versus logging it from a fast-entry flow, for instance) share the same underlying commit logic and differ only in their input surface — never in their own separately-maintained copy of what happens when a workout is saved.
- **One responsibility per module.** A unit of code is either data, or state/storage, or business logic, or rendering — never more than one of those at once. A function that both computes a recommendation and builds the DOM to show it is doing two jobs and should be two functions.
- **Shared components for shared patterns.** If a visual or interaction pattern (a collapsible panel, a trend sparkline, a status pill) appears more than once, it is built once and reused — never re-implemented per screen.
- **Business logic is pure and UI-independent.** Anything that computes a number or a recommendation must be testable without a browser, a DOM, or a rendered page. If it can't be tested without opening the app, it's not separated correctly yet.
- **Styling is modular and token-driven.** Visual decisions (color, spacing, type scale) are expressed through a small set of shared tokens, not repeated as literal values scattered through the styling — a color used for one meaning is defined once and referenced everywhere it's needed.
- **State changes go through one door.** The application's data is mutated through a single, well-defined update path — never by many scattered call sites each independently remembering to persist and re-render.
- **Every feature must justify its ongoing complexity.** A feature is not just judged at launch; it is re-judged by whether it keeps earning its maintenance cost. A feature that requires constant manual upkeep (a hand-maintained list, hardcoded personal content) for marginal benefit is architectural debt from day one, however small it looks.
- **Prefer deletion to accumulation.** When a feature, a code path, or a visual pattern is superseded, the old one is removed — not left alongside the new one "just in case."

---

## 6. Data Philosophy

**What should be stored.** Only the facts the user actually provided or actually did: logged sets (exercise, weight, reps), session metadata (date, day name, notes, bodyweight-on-that-day), body metrics the user chose to enter, program configuration the user chose to set, and manual overrides the user explicitly typed in (like a known 1RM). If it was typed, tapped, or lifted, it's a fact and it's stored.

**What should be derived, never stored.** Anything computable from the facts above is computed on demand and never persisted as its own source of truth: estimated one-rep maxes, the composite Power score, weekly volume per muscle group, readiness/recovery levels, PR flags, streaks, trend lines. Storing a derived number invites the two copies (stored vs. recomputed) to drift apart; deriving it fresh every time guarantees they can't.

**How data should flow.** Input happens once, at the point of logging. From there, it flows one direction — into the historical record — and every other number in the app is a read-only projection of that record, recomputed as needed. Nothing "writes back" into history except the act of logging or explicitly editing a past entry.

**Future-proofing.** The stored schema carries an explicit version. Any change to what a stored fact means or how it's shaped comes with a migration step that carries old data forward — a schema change is never allowed to silently orphan a user's existing history.

**Backup philosophy.** Because Aiphone is local-first with no server backing it up, export is not a peripheral feature — it is the backup system. The app should periodically and unobtrusively remind the user that their only copy of months or years of training history lives in one place, and should make exporting a full backup a one-tap action from anywhere reasonable, not something buried in a menu.

**Import/export philosophy.** Export produces the complete, faithful record — everything needed to reconstruct the app's state exactly, on this device or a new one. Import is treated as a potentially destructive action and is validated against the schema before anything is overwritten, with the user always shown clearly what will happen before it happens. Import/export is also the intended path for a user to move between devices — Aiphone does not need an account system to be portable, it needs a trustworthy file.

---

## 7. Long-Term Roadmap

Each version describes a goal for the product, not a list of engineering tasks. None of this is committed to a timeline; it's committed to an order — each version's foundation must be solid before the next is attempted.

**Version 1 — Prove the Foundation**
Make everything that already exists completely trustworthy before adding anything new. Every known bug is fixed, every logging path behaves identically and predictably, and the user can trust that what they log is what gets saved — every time, without exception. Nothing new ships in this version; its entire goal is confidence in what's already there.

**Version 2 — One System, Not Two**
Unify the underlying logic so that the different ways of logging a workout are truly two views onto one system, not two separately-maintained systems that happen to look similar. Invisible to the user, this version is what makes every future version cheaper and safer to build.

**Version 3 — The Coach Gets Sharper**
Deepen the recommendation engine without adding new screens: smarter, more individualized progression logic per exercise rather than one-size-fits-all rules; a more meaningful readiness signal; a Power model refined by real usage. The measure of success for this version is that recommendations feel noticeably smarter, not that the app looks different.

**Version 4 — The Whole Person**
Extend coaching beyond the barbell into recovery — how well-rested, how sore, how ready the person actually is going into a session — captured as simply as possible and folded into the same recommendation engine. Body-metric integration deepens. Anything touching food or nutrition is only considered here, and only in the narrowest possible form: a signal that helps the coach reason ("this block needs more fuel"), never a calorie-counting feature in its own right.

**Version 5 — A Genuine Personal Trainer**
Pattern recognition across a long history — months and years, not weeks — surfacing things a human coach would notice: a program that's stopped working, a lift that's been quietly neglected for a season, a recovery trend worth flagging before it becomes an injury. The ambition at this stage is a system that occasionally proposes a change to the program itself, not just the next number on the bar — always as a suggestion the user approves, never an automatic change made behind their back.

---

## 8. Feature Evaluation Framework

No feature is added to Aiphone until it can honestly answer yes to every question below. This checklist is permanent — it applies to every future proposal, including ones from the person who owns the product.

- [ ] Does this solve a real problem a real user of this app actually has — not a hypothetical user, not a feature another app happens to have?
- [ ] Is it consistent with the product vision — does it make Aiphone *decide* something, or is it just another thing to *display*?
- [ ] Can it reuse an existing system, model, or component rather than introducing a new one?
- [ ] Is it as simple as it can possibly be while still solving the problem?
- [ ] Would the app's actual, known users use this every week — not "might," actually would?
- [ ] Is it worth maintaining forever — including the manual upkeep cost, if any, of keeping it correct?
- [ ] Does it cost the user extra taps, extra screens, or extra things to remember — and if so, is the value clearly larger than that cost?
- [ ] Can its purpose be explained in one plain sentence, with no jargon?
- [ ] Would removing it be a loss to the actual user, or only a loss on a feature list?

If any answer is no, the feature is not ready — either it needs to be simplified until it passes, or it needs to be rejected.

---

## 9. Out of Scope

These are not gaps to fill later. They are deliberate refusals, consistent with what Aiphone is trying to be.

- **Social feeds, friends, following, or any shared timeline.** Aiphone is a private tool for one person's training, not a platform for other people's approval.
- **Gamification for its own sake** — badges, achievement pop-ups, point stores, leaderboards. A plain factual counter (like a streak) is data; turning it into a rewards system is a gimmick, and gimmicks are explicitly rejected by the design philosophy.
- **Bloated dashboards** — screens that accumulate metrics because they're technically available, rather than because each one drives a decision.
- **Generic calorie/macro/nutrition tracking.** This category is already served exhaustively by dedicated apps; duplicating it would add enormous ongoing complexity for a purpose Aiphone's coaching model doesn't need in its general form (see Version 4 for the one narrow exception).
- **Multi-user accounts, cloud sync, or a server-backed backend**, unless a future data-safety need genuinely can't be met any other way. The local-first, no-account model is a deliberate feature, not a limitation waiting to be fixed.
- **One person's personal program content hardcoded into shared source.** Program content is data the user configures (Program Configuration, §3.5); it is never code that ships baked into the app for everyone.
- **A large, hand-maintained content library** (curated video links, exercise encyclopedias) whose upkeep cost is disproportionate to the decision it enables.
- **Wearable/device integrations, monetization, ads, or subscriptions** — none of these serve the mission, and each would pull engineering effort away from the coaching core.
- **Any feature that fails the checklist in §8.** This is the actual, standing filter — the bullets above are simply its most predictable outcomes.

---

## 10. Aiphone Mission Statement

Aiphone is not trying to be the biggest fitness app. It is not trying to have the most features, the most users, or the most screens. It is trying to be something much narrower and much harder: the most thoughtfully designed personal training system possible — a tool so well-matched to how its actual user trains that it feels less like software and more like a coach who happens to live in their pocket.

Every decision this document sets out — fast over flashy, coach over notebook, one system instead of two, deletion over accumulation — exists in service of that single narrow goal. Aiphone will not always do the most; it will always try to do the right amount, exactly right. When it has to choose between adding something impressive and keeping something simple, it chooses simple. When it has to choose between a feature that looks good on a list and one that changes a real decision on a real training day, it chooses the decision.

If Aiphone is ever unsure what to build next, the answer is written above: solve a real problem for the person actually using it, reuse what already exists, keep every screen fast and every tap justified, protect the data like it's the only copy — because it is — and never, ever mistake more for better.
