// ==============================
// CONFIG
// ==============================

const STORAGE_KEY = "power_calculator_v3";

const ROUTINE = [
  "Push A",
  "Pull A",
  "Legs A",
  "Push B",
  "Pull B",
  "Legs B"
];

const TEMPLATES = {
  "Push A": [
    { name: "Barbell Bench Press", sets: 4, reps: 8, startWeight: "135", collapsed: false },
    { name: "Standing Barbell Shoulder Press", sets: 4, reps: 8, startWeight: "75", collapsed: true },
    { name: "Cable Fly", sets: 3, reps: 12, startWeight: "40", collapsed: true },
    { name: "Cable Lateral Raise", sets: 4, reps: 15, startWeight: "10", collapsed: true },
    { name: "Tricep Pushdown", sets: 3, reps: 12, startWeight: "50", collapsed: true },
    { name: "Overhead Tricep Extension", sets: 3, reps: 12, startWeight: "35", collapsed: true }
  ],
  "Pull A": [
    { name: "Barbell Row", sets: 4, reps: 8, startWeight: "115", collapsed: false },
    { name: "Pullups", sets: 3, reps: 8, startWeight: "", collapsed: true },
    { name: "Seated Row", sets: 3, reps: 10, startWeight: "100", collapsed: true },
    { name: "Barbell Curl", sets: 3, reps: 10, startWeight: "50", collapsed: true },
    { name: "Hammer Curl", sets: 3, reps: 12, startWeight: "25", collapsed: true },
    { name: "Face Pull", sets: 3, reps: 15, startWeight: "30", collapsed: true }
  ],
  "Legs A": [
    { name: "Back Squat", sets: 4, reps: 8, startWeight: "185", collapsed: false },
    { name: "Romanian Deadlift", sets: 3, reps: 10, startWeight: "135", collapsed: true },
    { name: "Walking Lunges", sets: 3, reps: 12, startWeight: "25", collapsed: true },
    { name: "Seated Leg Curl", sets: 3, reps: 12, startWeight: "95", collapsed: true },
    { name: "Standing Calf Raise", sets: 4, reps: 15, startWeight: "135", collapsed: true }
  ],
  "Push B": [
    { name: "Incline Barbell Press", sets: 4, reps: 8, startWeight: "95", collapsed: false },
    { name: "Arnold Press", sets: 4, reps: 10, startWeight: "25", collapsed: true },
    { name: "Pec Deck", sets: 3, reps: 12, startWeight: "100", collapsed: true },
    { name: "Upright Row", sets: 3, reps: 10, startWeight: "45", collapsed: true },
    { name: "Dips", sets: 3, reps: 8, startWeight: "", collapsed: true },
    { name: "Overhead Tricep Extension", sets: 3, reps: 12, startWeight: "35", collapsed: true }
  ],
  "Pull B": [
    { name: "Deadlift", sets: 3, reps: 6, startWeight: "185", collapsed: false },
    { name: "Chest Supported Row", sets: 4, reps: 10, startWeight: "90", collapsed: true },
    { name: "Lat Pulldown", sets: 3, reps: 10, startWeight: "100", collapsed: true },
    { name: "Preacher Curl", sets: 3, reps: 10, startWeight: "50", collapsed: true },
    { name: "Cable Curl", sets: 3, reps: 12, startWeight: "35", collapsed: true },
    { name: "Rear Delt Fly", sets: 3, reps: 15, startWeight: "20", collapsed: true }
  ],
  "Legs B": [
    { name: "Front Squat", sets: 4, reps: 8, startWeight: "135", collapsed: false },
    { name: "Bulgarian Split Squat", sets: 3, reps: 10, startWeight: "25", collapsed: true },
    { name: "Hip Thrust", sets: 3, reps: 10, startWeight: "135", collapsed: true },
    { name: "Leg Extension", sets: 3, reps: 12, startWeight: "100", collapsed: true },
    { name: "Seated Calf Raise", sets: 4, reps: 15, startWeight: "90", collapsed: true }
  ]
};

const DAY_EXERCISE_OPTIONS = {
  "Push A": [
    "Barbell Bench Press", "Standing Barbell Shoulder Press", "Cable Fly", "Cable Lateral Raise",
    "Tricep Pushdown", "Overhead Tricep Extension", "Pec Deck", "Dips", "Incline Barbell Press", "Arnold Press"
  ],
  "Pull A": [
    "Barbell Row", "Pullups", "Seated Row", "Barbell Curl", "Hammer Curl", "Face Pull",
    "Lat Pulldown", "Chest Supported Row", "Preacher Curl", "Cable Curl", "Rear Delt Fly", "Deadlift"
  ],
  "Legs A": [
    "Back Squat", "Romanian Deadlift", "Walking Lunges", "Seated Leg Curl", "Standing Calf Raise",
    "Front Squat", "Bulgarian Split Squat", "Hip Thrust", "Leg Extension", "Seated Calf Raise"
  ],
  "Push B": [
    "Incline Barbell Press", "Arnold Press", "Pec Deck", "Upright Row", "Dips",
    "Overhead Tricep Extension", "Barbell Bench Press", "Cable Fly", "Cable Lateral Raise", "Tricep Pushdown"
  ],
  "Pull B": [
    "Deadlift", "Chest Supported Row", "Lat Pulldown", "Preacher Curl", "Cable Curl", "Rear Delt Fly",
    "Barbell Row", "Pullups", "Seated Row", "Hammer Curl", "Face Pull"
  ],
  "Legs B": [
    "Front Squat", "Bulgarian Split Squat", "Hip Thrust", "Leg Extension", "Seated Calf Raise",
    "Back Squat", "Romanian Deadlift", "Walking Lunges", "Seated Leg Curl", "Standing Calf Raise"
  ]
};

const EXERCISE_DEFAULTS = {
  "Barbell Bench Press": { sets: 4, reps: 8, startWeight: "135" },
  "Standing Barbell Shoulder Press": { sets: 4, reps: 8, startWeight: "75" },
  "Cable Fly": { sets: 3, reps: 12, startWeight: "40" },
  "Cable Lateral Raise": { sets: 4, reps: 15, startWeight: "10" },
  "Tricep Pushdown": { sets: 3, reps: 12, startWeight: "50" },
  "Overhead Tricep Extension": { sets: 3, reps: 12, startWeight: "35" },
  "Barbell Row": { sets: 4, reps: 8, startWeight: "115" },
  "Pullups": { sets: 3, reps: 8, startWeight: "" },
  "Seated Row": { sets: 3, reps: 10, startWeight: "100" },
  "Barbell Curl": { sets: 3, reps: 10, startWeight: "50" },
  "Hammer Curl": { sets: 3, reps: 12, startWeight: "25" },
  "Face Pull": { sets: 3, reps: 15, startWeight: "30" },
  "Back Squat": { sets: 4, reps: 8, startWeight: "185" },
  "Romanian Deadlift": { sets: 3, reps: 10, startWeight: "135" },
  "Walking Lunges": { sets: 3, reps: 12, startWeight: "25" },
  "Seated Leg Curl": { sets: 3, reps: 12, startWeight: "95" },
  "Standing Calf Raise": { sets: 4, reps: 15, startWeight: "135" },
  "Incline Barbell Press": { sets: 4, reps: 8, startWeight: "95" },
  "Arnold Press": { sets: 4, reps: 10, startWeight: "25" },
  "Pec Deck": { sets: 3, reps: 12, startWeight: "100" },
  "Upright Row": { sets: 3, reps: 10, startWeight: "45" },
  "Dips": { sets: 3, reps: 8, startWeight: "" },
  "Deadlift": { sets: 3, reps: 6, startWeight: "185" },
  "Chest Supported Row": { sets: 4, reps: 10, startWeight: "90" },
  "Lat Pulldown": { sets: 3, reps: 10, startWeight: "100" },
  "Preacher Curl": { sets: 3, reps: 10, startWeight: "50" },
  "Cable Curl": { sets: 3, reps: 12, startWeight: "35" },
  "Rear Delt Fly": { sets: 3, reps: 15, startWeight: "20" },
  "Front Squat": { sets: 4, reps: 8, startWeight: "135" },
  "Bulgarian Split Squat": { sets: 3, reps: 10, startWeight: "25" },
  "Hip Thrust": { sets: 3, reps: 10, startWeight: "135" },
  "Leg Extension": { sets: 3, reps: 12, startWeight: "100" },
  "Seated Calf Raise": { sets: 4, reps: 15, startWeight: "90" }
};

const EXERCISE_RULES = {
  "Barbell Bench Press": 5,
  "Standing Barbell Shoulder Press": 5,
  "Cable Fly": 5,
  "Cable Lateral Raise": 5,
  "Tricep Pushdown": 5,
  "Overhead Tricep Extension": 5,
  "Barbell Row": 5,
  "Pullups": 0,
  "Seated Row": 10,
  "Barbell Curl": 5,
  "Hammer Curl": 5,
  "Face Pull": 5,
  "Back Squat": 10,
  "Romanian Deadlift": 10,
  "Walking Lunges": 5,
  "Seated Leg Curl": 10,
  "Standing Calf Raise": 10,
  "Incline Barbell Press": 5,
  "Arnold Press": 5,
  "Pec Deck": 10,
  "Upright Row": 5,
  "Dips": 0,
  "Deadlift": 10,
  "Chest Supported Row": 10,
  "Lat Pulldown": 10,
  "Preacher Curl": 5,
  "Cable Curl": 5,
  "Rear Delt Fly": 5,
  "Front Squat": 10,
  "Bulgarian Split Squat": 5,
  "Hip Thrust": 10,
  "Leg Extension": 10,
  "Seated Calf Raise": 10
};

const USER_MAXES_DEFAULT = {
  bench: "",
  squat: "",
  deadlift: "",
  press: "",
  pull: ""
};

const BODY_METRICS_DEFAULT = {
  height: "",     // inches
  bodyWeight: "", // lbs
  bodyFat: "",    // percent
  age: ""
};

const POWER_LIFT_GROUPS = {
  bench: ["Barbell Bench Press", "Incline Barbell Press", "Dips"],
  squat: ["Back Squat", "Front Squat", "Bulgarian Split Squat"],
  deadlift: ["Deadlift", "Romanian Deadlift", "Hip Thrust"],
  press: ["Standing Barbell Shoulder Press", "Arnold Press"],
  pull: ["Barbell Row", "Chest Supported Row", "Lat Pulldown", "Seated Row", "Pullups"]
};

const RANKS = [
  { rank: "F", min: 0, max: 999 },
  { rank: "E", min: 1000, max: 1999 },
  { rank: "D", min: 2000, max: 3499 },
  { rank: "C", min: 3500, max: 5499 },
  { rank: "B", min: 5500, max: 7999 },
  { rank: "A", min: 8000, max: 10999 },
  { rank: "S", min: 11000, max: Infinity }
];

const EXERCISE_VIDEO_SEARCH = {
  "Barbell Bench Press": "https://www.youtube.com/results?search_query=Jeff+Nippard+barbell+bench+press+tutorial",
  "Standing Barbell Shoulder Press": "https://www.youtube.com/results?search_query=Jeff+Nippard+standing+barbell+shoulder+press+tutorial",
  "Cable Fly": "https://www.youtube.com/results?search_query=Renaissance+Periodization+cable+fly+tutorial",
  "Cable Lateral Raise": "https://www.youtube.com/results?search_query=Renaissance+Periodization+cable+lateral+raise+tutorial",
  "Tricep Pushdown": "https://www.youtube.com/results?search_query=Renaissance+Periodization+tricep+pushdown+tutorial",
  "Overhead Tricep Extension": "https://www.youtube.com/results?search_query=Renaissance+Periodization+overhead+tricep+extension+tutorial",
  "Barbell Row": "https://www.youtube.com/results?search_query=Jeff+Nippard+barbell+row+tutorial",
  "Pullups": "https://www.youtube.com/results?search_query=Jeff+Nippard+pullup+tutorial",
  "Seated Row": "https://www.youtube.com/results?search_query=Jeff+Nippard+seated+row+tutorial",
  "Barbell Curl": "https://www.youtube.com/results?search_query=Jeff+Nippard+barbell+curl+tutorial",
  "Hammer Curl": "https://www.youtube.com/results?search_query=Jeff+Nippard+hammer+curl+tutorial",
  "Face Pull": "https://www.youtube.com/results?search_query=Jeff+Nippard+face+pull+tutorial",
  "Back Squat": "https://www.youtube.com/results?search_query=Jeff+Nippard+back+squat+tutorial",
  "Romanian Deadlift": "https://www.youtube.com/results?search_query=Jeff+Nippard+romanian+deadlift+tutorial",
  "Walking Lunges": "https://www.youtube.com/results?search_query=Jeff+Nippard+walking+lunge+tutorial",
  "Seated Leg Curl": "https://www.youtube.com/results?search_query=seated+leg+curl+tutorial",
  "Standing Calf Raise": "https://www.youtube.com/results?search_query=standing+calf+raise+tutorial",
  "Incline Barbell Press": "https://www.youtube.com/results?search_query=Jeff+Nippard+incline+barbell+press+tutorial",
  "Arnold Press": "https://www.youtube.com/results?search_query=Arnold+press+tutorial",
  "Pec Deck": "https://www.youtube.com/results?search_query=pec+deck+tutorial",
  "Upright Row": "https://www.youtube.com/results?search_query=upright+row+tutorial",
  "Dips": "https://www.youtube.com/results?search_query=Jeff+Nippard+dips+tutorial",
  "Deadlift": "https://www.youtube.com/results?search_query=Jeff+Nippard+deadlift+tutorial",
  "Chest Supported Row": "https://www.youtube.com/results?search_query=chest+supported+row+tutorial",
  "Lat Pulldown": "https://www.youtube.com/results?search_query=Jeff+Nippard+lat+pulldown+tutorial",
  "Preacher Curl": "https://www.youtube.com/results?search_query=preacher+curl+tutorial",
  "Cable Curl": "https://www.youtube.com/results?search_query=cable+curl+tutorial",
  "Rear Delt Fly": "https://www.youtube.com/results?search_query=rear+delt+fly+tutorial",
  "Front Squat": "https://www.youtube.com/results?search_query=Jeff+Nippard+front+squat+tutorial",
  "Bulgarian Split Squat": "https://www.youtube.com/results?search_query=Jeff+Nippard+bulgarian+split+squat+tutorial",
  "Hip Thrust": "https://www.youtube.com/results?search_query=Jeff+Nippard+hip+thrust+tutorial",
  "Leg Extension": "https://www.youtube.com/results?search_query=leg+extension+tutorial",
  "Seated Calf Raise": "https://www.youtube.com/results?search_query=seated+calf+raise+tutorial"
};

// ==============================
// STATE
// ==============================

let state = loadState();
let exercises = [];
let selectedDay = state.nextWorkout || "Push A";

let sessionStart = null;
let sessionInterval = null;
let sessionElapsed = 0;
let sessionPaused = false;
let sessionHidden = false;

let restSeconds = 90;
let restRemaining = 90;
let restInterval = null;
let restRunning = false;
let restHidden = true;

let maxesCollapsed = true;
let bodyMetricsCollapsed = true;

// ==============================
// STORAGE
// ==============================

function defaultState() {
  return {
    workouts: [],
    nextWorkout: "Push A",
    customLayouts: {},
    drafts: {},
    userMaxes: { ...USER_MAXES_DEFAULT },
    bodyMetrics: { ...BODY_METRICS_DEFAULT }
  };
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultState();

  try {
    const parsed = JSON.parse(raw);
    return {
      workouts: Array.isArray(parsed.workouts) ? parsed.workouts : [],
      nextWorkout: parsed.nextWorkout || "Push A",
      customLayouts: parsed.customLayouts && typeof parsed.customLayouts === "object" ? parsed.customLayouts : {},
      drafts: parsed.drafts && typeof parsed.drafts === "object" ? parsed.drafts : {},
      userMaxes: parsed.userMaxes && typeof parsed.userMaxes === "object"
        ? { ...USER_MAXES_DEFAULT, ...parsed.userMaxes }
        : { ...USER_MAXES_DEFAULT },
      bodyMetrics: parsed.bodyMetrics && typeof parsed.bodyMetrics === "object"
        ? { ...BODY_METRICS_DEFAULT, ...parsed.bodyMetrics }
        : { ...BODY_METRICS_DEFAULT }
    };
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderStats();
  renderHistory();
  renderTabs();
  renderPowerPanel();
  renderMaxesPanel();
  renderBodyMetricsPanel();
}

function persistCurrentLayout() {
  state.customLayouts[selectedDay] = deepClone(exercises);
  saveState();
}

// ==============================
// HELPERS
// ==============================

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function todayString() {
  return new Date().toISOString().split("T")[0];
}

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function normalizeExerciseName(name) {
  return String(name || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\//g, " ")
    .replace(/-/g, " ")
    .replace(/\([^)]*\)/g, " ")
    .replace(/\bbarbell\b/g, "")
    .replace(/\bcable\b/g, "")
    .replace(/\bmachine\b/g, "")
    .replace(/\bseated\b/g, "")
    .replace(/\bstanding\b/g, "")
    .replace(/\btricep\b/g, "triceps")
    .replace(/\bpullups\b/g, "pull up")
    .replace(/\bpull-ups\b/g, "pull up")
    .replace(/\s+/g, " ")
    .trim();
}

function namesMatch(a, b) {
  const aa = normalizeExerciseName(a);
  const bb = normalizeExerciseName(b);
  return aa === bb || aa.includes(bb) || bb.includes(aa);
}

function nextWorkout(day) {
  const i = ROUTINE.indexOf(day);
  if (i === -1) return ROUTINE[0];
  return ROUTINE[(i + 1) % ROUTINE.length];
}

function getDefaultExercise(name) {
  const d = EXERCISE_DEFAULTS[name] || { sets: 3, reps: 10, startWeight: "" };
  return {
    name,
    sets: d.sets,
    reps: d.reps,
    startWeight: d.startWeight,
    collapsed: false
  };
}

function getDayOptions(day, currentName = "") {
  const opts = [...(DAY_EXERCISE_OPTIONS[day] || [])];
  if (currentName && !opts.includes(currentName)) opts.unshift(currentName);
  return opts;
}

function showToast(message, type = "") {
  const wrap = document.getElementById("toastWrap");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`.trim();
  toast.textContent = message;
  wrap.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

function parseNum(v) {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

function bindBlurSave(id, handler) {
  const el = document.getElementById(id);
  if (!el) return;
  el.onblur = handler;
  el.onkeydown = (e) => {
    if (e.key === "Enter") {
      el.blur();
    }
  };
}

// ==============================
// POWER / BODY MODEL
// ==============================

function est1RM(weight, reps) {
  const w = parseFloat(weight);
  const r = parseFloat(reps);
  if (isNaN(w) || isNaN(r) || w <= 0 || r <= 0) return 0;
  return w * (1 + r / 30);
}

function calcTotalVolume(workouts) {
  let total = 0;
  workouts.forEach(workout => {
    (workout.exercises || []).forEach(ex => {
      (ex.sets || []).forEach(set => {
        const w = parseFloat(set.weight);
        const r = parseFloat(set.reps);
        if (!isNaN(w) && !isNaN(r) && w > 0 && r > 0) {
          total += w * r;
        }
      });
    });
  });
  return total;
}

function calcStreakDays(workouts) {
  const dates = [...new Set(workouts.map(w => w.date).filter(Boolean))].sort().reverse();
  if (!dates.length) return 0;

  let streak = 0;
  let expected = todayString();

  for (const d of dates) {
    if (d === expected) {
      streak++;
      const dt = new Date(expected);
      dt.setDate(dt.getDate() - 1);
      expected = dt.toISOString().split("T")[0];
    } else if (d < expected) {
      break;
    }
  }

  return streak;
}

function bestLiftForNames(workouts, names) {
  let best = 0;
  workouts.forEach(workout => {
    (workout.exercises || []).forEach(ex => {
      if (!names.some(n => namesMatch(ex.name, n))) return;
      (ex.sets || []).forEach(set => {
        best = Math.max(best, est1RM(set.weight, set.reps));
      });
    });
  });
  return best;
}

function getRankInfo(score) {
  const current = RANKS.find(r => score >= r.min && score <= r.max) || RANKS[0];
  const idx = RANKS.findIndex(r => r.rank === current.rank);
  const next = idx < RANKS.length - 1 ? RANKS[idx + 1] : null;
  const progress = next
    ? Math.max(0, Math.min(100, ((score - current.min) / (next.min - current.min)) * 100))
    : 100;

  return {
    current,
    next,
    progress,
    remaining: next ? Math.max(0, next.min - score) : 0
  };
}

function calcBodyData() {
  const bw = parseNum(state.bodyMetrics?.bodyWeight);
  const bf = parseNum(state.bodyMetrics?.bodyFat);
  const height = parseNum(state.bodyMetrics?.height);
  const age = parseNum(state.bodyMetrics?.age);

  const bodyFatDecimal = bf > 0 ? Math.min(Math.max(bf / 100, 0), 0.6) : 0;
  const leanMass = bw > 0 ? bw * (1 - bodyFatDecimal) : 0;

  let heightModifier = 1;
  if (height > 0) {
    // 70 inches baseline, very small effect
    heightModifier = 1 + ((70 - height) * 0.004);
    heightModifier = Math.max(0.9, Math.min(1.1, heightModifier));
  }

  let bodyFatModifier = 1;
  if (bf > 0) {
    // Leaner gets slightly rewarded, but not too aggressively
    bodyFatModifier = 1 + ((15 - bf) * 0.01);
    bodyFatModifier = Math.max(0.85, Math.min(1.15, bodyFatModifier));
  }

  let ageModifier = 1;
  if (age > 0) {
    // tiny modifier only, keep it light
    ageModifier = 1 + ((30 - age) * 0.002);
    ageModifier = Math.max(0.92, Math.min(1.08, ageModifier));
  }

  return {
    bodyWeight: bw,
    bodyFat: bf,
    height,
    age,
    leanMass,
    heightModifier,
    bodyFatModifier,
    ageModifier
  };
}

function calcPowerData() {
  const workouts = state.workouts || [];
  const sessionCount = workouts.length;
  const totalVolume = calcTotalVolume(workouts);
  const streak = calcStreakDays(workouts);

  const autoBench = bestLiftForNames(workouts, POWER_LIFT_GROUPS.bench);
  const autoSquat = bestLiftForNames(workouts, POWER_LIFT_GROUPS.squat);
  const autoDeadlift = bestLiftForNames(workouts, POWER_LIFT_GROUPS.deadlift);
  const autoPress = bestLiftForNames(workouts, POWER_LIFT_GROUPS.press);
  const autoPull = bestLiftForNames(workouts, POWER_LIFT_GROUPS.pull);

  const userBench = parseNum(state.userMaxes?.bench);
  const userSquat = parseNum(state.userMaxes?.squat);
  const userDeadlift = parseNum(state.userMaxes?.deadlift || state.userMaxes?.hinge);
  const userPress = parseNum(state.userMaxes?.press);
  const userPull = parseNum(state.userMaxes?.pull);

  const bestBench = Math.max(userBench, autoBench);
  const bestSquat = Math.max(userSquat, autoSquat);
  const bestDeadlift = Math.max(userDeadlift, autoDeadlift);
  const bestPress = Math.max(userPress, autoPress);
  const bestPull = Math.max(userPull, autoPull);

  const body = calcBodyData();
  const bw = body.bodyWeight || 0;
  const lbm = body.leanMass || 0;

  const sessionPoints = Math.min(sessionCount * 120, 2400);
  const volumePoints = Math.min(Math.floor(totalVolume / 100), 3000);
  const streakPoints = Math.min(streak * 90, 900);

  const absoluteStrengthPoints =
    Math.floor(bestBench * 1.7) +
    Math.floor(bestSquat * 1.9) +
    Math.floor(bestDeadlift * 1.9) +
    Math.floor(bestPress * 1.5) +
    Math.floor(bestPull * 1.4);

  const relativeStrengthRaw =
    (bw > 0 ? bestBench / bw : 0) * 210 +
    (bw > 0 ? bestSquat / bw : 0) * 250 +
    (bw > 0 ? bestDeadlift / bw : 0) * 250 +
    (bw > 0 ? bestPress / bw : 0) * 170 +
    (bw > 0 ? bestPull / bw : 0) * 160;

  const leanMassEfficiencyRaw =
    (lbm > 0 ? bestBench / lbm : 0) * 160 +
    (lbm > 0 ? bestSquat / lbm : 0) * 185 +
    (lbm > 0 ? bestDeadlift / lbm : 0) * 185 +
    (lbm > 0 ? bestPress / lbm : 0) * 130 +
    (lbm > 0 ? bestPull / lbm : 0) * 125;

  const physiqueAdjustedRelative =
    Math.floor(relativeStrengthRaw * body.heightModifier * body.bodyFatModifier * body.ageModifier);

  const leanAdjusted =
    Math.floor(leanMassEfficiencyRaw * body.bodyFatModifier);

  const score =
    sessionPoints +
    volumePoints +
    streakPoints +
    absoluteStrengthPoints +
    physiqueAdjustedRelative +
    leanAdjusted;

  const rank = getRankInfo(score);

  return {
    score,
    rank,
    streak,
    sessionCount,
    totalVolume,
    bestBench: Math.round(bestBench),
    bestSquat: Math.round(bestSquat),
    bestDeadlift: Math.round(bestDeadlift),
    bestPress: Math.round(bestPress),
    bestPull: Math.round(bestPull),
    relativeStrength: Math.round(relativeStrengthRaw),
    leanEfficiency: Math.round(leanMassEfficiencyRaw),
    body
  };
}

// ==============================
// PANELS
// ==============================

function renderPowerPanel() {
  const panel = document.getElementById("powerPanel");
  const p = calcPowerData();

  panel.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap">
      <div>
        <div style="font-size:.72rem;color:var(--muted);text-transform:uppercase;letter-spacing:.08em">Power Rank</div>
        <div style="font-family:'Rajdhani',sans-serif;font-size:2rem;font-weight:700;color:var(--gold);line-height:1">${p.rank.current.rank}</div>
        <div style="font-size:.85rem;color:var(--muted);margin-top:2px">
          Power Index: <span style="color:var(--text);font-weight:600">${p.score.toLocaleString()}</span>
        </div>
      </div>

      <div style="flex:1;min-width:220px">
        <div style="display:flex;justify-content:space-between;gap:8px;font-size:.78rem;color:var(--muted);margin-bottom:6px">
          <span>${p.rank.current.rank} Rank</span>
          <span>${p.rank.next ? `${p.rank.remaining.toLocaleString()} to ${p.rank.next.rank}` : "Max Rank"}</span>
        </div>
        <div style="height:10px;background:rgba(255,255,255,.08);border-radius:999px;overflow:hidden">
          <div style="height:100%;width:${p.rank.progress}%;background:linear-gradient(90deg,var(--gold),var(--accent))"></div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:10px;font-size:.76rem;color:var(--muted)">
          <div>Sessions<br><span style="color:var(--text);font-weight:600">${p.sessionCount}</span></div>
          <div>Streak<br><span style="color:var(--text);font-weight:600">${p.streak}</span></div>
          <div>Volume<br><span style="color:var(--text);font-weight:600">${p.totalVolume.toLocaleString()}</span></div>
          <div>LBM<br><span style="color:var(--text);font-weight:600">${p.body.leanMass ? Math.round(p.body.leanMass) : "—"}</span></div>
        </div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin-top:12px;font-size:.72rem;color:var(--muted)">
      <div>Bench<br><span style="color:var(--text);font-weight:600">${p.bestBench || "—"}</span></div>
      <div>Squat<br><span style="color:var(--text);font-weight:600">${p.bestSquat || "—"}</span></div>
      <div>Deadlift<br><span style="color:var(--text);font-weight:600">${p.bestDeadlift || "—"}</span></div>
      <div>Press<br><span style="color:var(--text);font-weight:600">${p.bestPress || "—"}</span></div>
      <div>Pull<br><span style="color:var(--text);font-weight:600">${p.bestPull || "—"}</span></div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:12px;font-size:.72rem;color:var(--muted)">
      <div>Relative Strength<br><span style="color:var(--text);font-weight:600">${p.relativeStrength || "—"}</span></div>
      <div>Lean Efficiency<br><span style="color:var(--text);font-weight:600">${p.leanEfficiency || "—"}</span></div>
    </div>
  `;
}

function toggleMaxesPanel() {
  maxesCollapsed = !maxesCollapsed;
  renderMaxesPanel();
}

function saveUserMax(field, value) {
  state.userMaxes[field] = value;
  saveState();
}

function renderMaxesPanel() {
  const panel = document.getElementById("maxesPanel");
  const m = state.userMaxes || USER_MAXES_DEFAULT;

  panel.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
      <div>
        <div style="font-size:.72rem;color:var(--muted);text-transform:uppercase;letter-spacing:.08em">Manual Power Maxes</div>
        <div style="font-size:.84rem;color:var(--muted)">Primary strength inputs for the power model.</div>
      </div>
      <button class="ghost mini" id="toggleMaxesBtn" type="button">${maxesCollapsed ? "Show Maxes" : "Hide Maxes"}</button>
    </div>

    <div id="maxesBody" style="display:${maxesCollapsed ? "none" : "block"};margin-top:12px;">
      <div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px">
        <div>
          <label>Bench</label>
          <input id="max-bench" class="mono" type="number" inputmode="numeric" value="${m.bench || ""}" placeholder="225" />
        </div>
        <div>
          <label>Squat</label>
          <input id="max-squat" class="mono" type="number" inputmode="numeric" value="${m.squat || ""}" placeholder="315" />
        </div>
        <div>
          <label>Deadlift</label>
          <input id="max-deadlift" class="mono" type="number" inputmode="numeric" value="${m.deadlift || m.hinge || ""}" placeholder="405" />
        </div>
        <div>
          <label>Press</label>
          <input id="max-press" class="mono" type="number" inputmode="numeric" value="${m.press || ""}" placeholder="135" />
        </div>
        <div>
          <label>Pull</label>
          <input id="max-pull" class="mono" type="number" inputmode="numeric" value="${m.pull || ""}" placeholder="185" />
        </div>
      </div>
    </div>
  `;

  document.getElementById("toggleMaxesBtn").onclick = toggleMaxesPanel;

  if (!maxesCollapsed) {
    ["bench", "squat", "deadlift", "press", "pull"].forEach(key => {
      bindBlurSave(`max-${key}`, () => saveUserMax(key, document.getElementById(`max-${key}`).value.trim()));
    });
  }
}

function toggleBodyMetricsPanel() {
  bodyMetricsCollapsed = !bodyMetricsCollapsed;
  renderBodyMetricsPanel();
}

function saveBodyMetric(field, value) {
  state.bodyMetrics[field] = value;
  saveState();
}

function renderBodyMetricsPanel() {
  let panel = document.getElementById("bodyMetricsPanel");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "bodyMetricsPanel";
    panel.style.marginTop = "12px";
    panel.style.padding = "12px";
    panel.style.border = "1px solid var(--border)";
    panel.style.borderRadius = "16px";
    panel.style.background = "rgba(255,255,255,.025)";
    const hero = document.querySelector(".hero");
    hero.appendChild(panel);
  }

  const b = state.bodyMetrics || BODY_METRICS_DEFAULT;
  const body = calcBodyData();

  panel.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
      <div>
        <div style="font-size:.72rem;color:var(--muted);text-transform:uppercase;letter-spacing:.08em">Body Metrics</div>
        <div style="font-size:.84rem;color:var(--muted)">Used for relative strength, lean mass, and physique-adjusted power.</div>
      </div>
      <button class="ghost mini" id="toggleBodyMetricsBtn" type="button">${bodyMetricsCollapsed ? "Show Metrics" : "Hide Metrics"}</button>
    </div>

    <div id="bodyMetricsBody" style="display:${bodyMetricsCollapsed ? "none" : "block"};margin-top:12px;">
      <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px">
        <div>
          <label>Height (in)</label>
          <input id="metric-height" class="mono" type="number" inputmode="numeric" value="${b.height || ""}" placeholder="71" />
        </div>
        <div>
          <label>Bodyweight</label>
          <input id="metric-bodyWeight" class="mono" type="number" inputmode="decimal" value="${b.bodyWeight || ""}" placeholder="204" />
        </div>
        <div>
          <label>Body Fat %</label>
          <input id="metric-bodyFat" class="mono" type="number" inputmode="decimal" value="${b.bodyFat || ""}" placeholder="18" />
        </div>
        <div>
          <label>Age</label>
          <input id="metric-age" class="mono" type="number" inputmode="numeric" value="${b.age || ""}" placeholder="30" />
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:12px;font-size:.72rem;color:var(--muted)">
        <div>Lean Body Mass<br><span style="color:var(--text);font-weight:600">${body.leanMass ? Math.round(body.leanMass) + " lbs" : "—"}</span></div>
        <div>Height Mod<br><span style="color:var(--text);font-weight:600">${body.height ? body.heightModifier.toFixed(2) : "—"}</span></div>
        <div>Body Fat Mod<br><span style="color:var(--text);font-weight:600">${body.bodyFat ? body.bodyFatModifier.toFixed(2) : "—"}</span></div>
        <div>Age Mod<br><span style="color:var(--text);font-weight:600">${body.age ? body.ageModifier.toFixed(2) : "—"}</span></div>
      </div>
    </div>
  `;

  document.getElementById("toggleBodyMetricsBtn").onclick = toggleBodyMetricsPanel;

  if (!bodyMetricsCollapsed) {
    ["height", "bodyWeight", "bodyFat", "age"].forEach(key => {
      bindBlurSave(`metric-${key}`, () => saveBodyMetric(key, document.getElementById(`metric-${key}`).value.trim()));
    });
  }
}

// ==============================
// DRAFTS
// ==============================

function persistDraftForDay() {
  const cards = [...document.querySelectorAll(".exercise-card")];

  state.drafts[selectedDay] = {
    date: document.getElementById("wkDate").value || todayString(),
    bodyWeight: document.getElementById("bodyWt").value || "",
    focusNotes: document.getElementById("focusNotes").value || "",
    sessionNotes: document.getElementById("wkNotes").value || "",
    exercises: cards.map(card => ({
      name: card.querySelector(".edit-select").value,
      sets: parseInt(card.querySelector(".edit-sets").value || "1", 10),
      reps: parseInt(card.querySelector(".edit-reps").value || "1", 10),
      startWeight: card.querySelector(".preset-weight").value || "",
      collapsed: card.querySelector(".exercise-body").classList.contains("hidden"),
      entries: [...card.querySelectorAll(".setRow")].map(row => ({
        weight: row.querySelector(".weight").value || "",
        reps: row.querySelector(".reps").value || ""
      }))
    }))
  };

  saveState();
}

function clearDraftForDay(day) {
  delete state.drafts[day];
  saveState();
}

function getDraftForDay(day) {
  const draft = state.drafts?.[day];
  if (!draft || !Array.isArray(draft.exercises)) return null;
  return deepClone(draft);
}

function attachDraftAutoSave() {
  document.querySelectorAll("#exList input, #exList select").forEach(el => {
    el.addEventListener("input", persistDraftForDay);
    el.addEventListener("change", persistDraftForDay);
  });

  ["wkDate", "bodyWt", "focusNotes", "wkNotes"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.oninput = persistDraftForDay;
    el.onchange = persistDraftForDay;
  });
}

// ==============================
// TIMERS
// ==============================

function startSessionTimer() {
  clearInterval(sessionInterval);
  sessionStart = Date.now();
  sessionElapsed = 0;
  sessionPaused = false;
  updateSessionTimer();
  sessionInterval = setInterval(updateSessionTimer, 1000);
  document.getElementById("sessionPauseBtn").textContent = "Pause";
}

function updateSessionTimer() {
  const display = document.getElementById("sessionDisplay");
  if (sessionPaused) {
    display.textContent = formatTime(sessionElapsed);
    return;
  }
  if (!sessionStart) return;
  const secs = sessionElapsed + Math.floor((Date.now() - sessionStart) / 1000);
  display.textContent = formatTime(secs);
}

function toggleSessionPause() {
  const btn = document.getElementById("sessionPauseBtn");

  if (!sessionStart && sessionElapsed === 0) {
    startSessionTimer();
    return;
  }

  if (sessionPaused) {
    sessionPaused = false;
    sessionStart = Date.now();
    clearInterval(sessionInterval);
    sessionInterval = setInterval(updateSessionTimer, 1000);
    btn.textContent = "Pause";
    updateSessionTimer();
    return;
  }

  sessionElapsed += Math.floor((Date.now() - sessionStart) / 1000);
  sessionPaused = true;
  clearInterval(sessionInterval);
  btn.textContent = "Resume";
  updateSessionTimer();
}

function resetSessionTimer() {
  clearInterval(sessionInterval);
  sessionStart = Date.now();
  sessionElapsed = 0;
  sessionPaused = false;
  updateSessionTimer();
  sessionInterval = setInterval(updateSessionTimer, 1000);
  document.getElementById("sessionPauseBtn").textContent = "Pause";
}

function stopSessionTimer() {
  clearInterval(sessionInterval);
  sessionInterval = null;
  sessionStart = null;
  sessionElapsed = 0;
  sessionPaused = false;
  document.getElementById("sessionDisplay").textContent = "0:00";
  document.getElementById("sessionPauseBtn").textContent = "Pause";
}

function toggleSessionVisibility() {
  sessionHidden = !sessionHidden;
  const pill = document.getElementById("sessionPill");
  const pause = document.getElementById("sessionPauseBtn");
  const reset = document.getElementById("sessionResetBtn");
  pill.style.display = sessionHidden ? "none" : "flex";
  pause.style.display = sessionHidden ? "none" : "inline-flex";
  reset.style.display = sessionHidden ? "none" : "inline-flex";
  document.getElementById("sessionHideBtn").textContent = sessionHidden ? "Show" : "Hide";
}

function updateRestTimerUI() {
  document.getElementById("restDisplay").textContent = formatTime(restRemaining);
}

function toggleRestTimer() {
  const btn = document.getElementById("restToggleBtn");

  if (restRunning) {
    restRunning = false;
    clearInterval(restInterval);
    btn.textContent = "Resume";
    return;
  }

  restRunning = true;
  btn.textContent = "Pause";
  clearInterval(restInterval);

  restInterval = setInterval(() => {
    restRemaining -= 1;
    if (restRemaining <= 0) {
      restRemaining = 0;
      restRunning = false;
      clearInterval(restInterval);
      btn.textContent = "Start";
      showToast("Rest complete", "success");
    }
    updateRestTimerUI();
  }, 1000);
}

function resetRestTimer() {
  clearInterval(restInterval);
  restRunning = false;
  restRemaining = restSeconds;
  updateRestTimerUI();
  document.getElementById("restToggleBtn").textContent = "Start";
}

function startRestTimer(customSeconds = null) {
  if (customSeconds) restSeconds = customSeconds;
  restRemaining = restSeconds;
  updateRestTimerUI();
  if (restHidden) toggleRestVisibility();
  clearInterval(restInterval);
  restRunning = false;
  document.getElementById("restToggleBtn").textContent = "Start";
  toggleRestTimer();
}

function toggleRestVisibility() {
  restHidden = !restHidden;
  document.getElementById("restWidget").classList.toggle("hidden", restHidden);
  document.getElementById("restFab").classList.toggle("hidden", !restHidden);
}

// ==============================
// PERFORMANCE / SUGGESTIONS
// ==============================

function findLastPerformance(exerciseName) {
  for (const workout of state.workouts) {
    for (const ex of (workout.exercises || [])) {
      if (!namesMatch(ex.name, exerciseName)) continue;
      if (!Array.isArray(ex.sets) || !ex.sets.length) continue;
      const valid = ex.sets.find(s => s.weight && s.reps);
      if (valid) return valid;
    }
  }
  return null;
}

function suggestWeight(exerciseName, last, startWeight = "") {
  if (!last) return String(startWeight || "");
  const weight = parseFloat(last.weight);
  const reps = parseFloat(last.reps);
  if (isNaN(weight) || isNaN(reps)) return String(startWeight || "");

  const jump = EXERCISE_RULES[exerciseName] ?? 5;
  if (jump === 0) return String(weight);
  if (reps >= 8) return String(weight + jump);
  return String(weight);
}

// ==============================
// EXERCISE ACTIONS
// ==============================

function addExerciseFromSelection() {
  const select = document.getElementById("exerciseSelect");
  if (!select.value) return;
  exercises.push(getDefaultExercise(select.value));
  persistCurrentLayout();
  renderWorkout();
}

function moveExercise(index, direction) {
  const target = index + direction;
  if (target < 0 || target >= exercises.length) return;
  [exercises[index], exercises[target]] = [exercises[target], exercises[index]];
  persistCurrentLayout();
  renderWorkout();
}

function removeExercise(index) {
  exercises.splice(index, 1);
  persistCurrentLayout();
  renderWorkout();
}

function toggleExerciseCard(index) {
  exercises[index].collapsed = !exercises[index].collapsed;
  persistCurrentLayout();
  renderWorkout();
}

function expandAll() {
  exercises.forEach(ex => ex.collapsed = false);
  persistCurrentLayout();
  renderWorkout();
}

function collapseAll() {
  exercises.forEach(ex => ex.collapsed = true);
  persistCurrentLayout();
  renderWorkout();
}

function rebuildSetRows(body, count, suggested, entryValues = []) {
  body.querySelectorAll(".setRow").forEach(row => row.remove());

  for (let i = 0; i < count; i++) {
    const entry = entryValues[i] || {};
    const row = document.createElement("div");
    row.className = "setRow";
    row.innerHTML = `
      <span>Set ${i + 1}</span>
      <input class="weight" placeholder="weight" value="${entry.weight ?? suggested ?? ""}">
      <input class="reps" placeholder="reps" value="${entry.reps ?? ""}">
      <button class="ghost rest-btn" type="button">Rest</button>
    `;
    row.querySelector(".rest-btn").onclick = () => startRestTimer(90);
    body.appendChild(row);
  }
}

function applyPresetToRows(body, value) {
  body.querySelectorAll(".weight").forEach(input => {
    input.value = value;
  });
  persistDraftForDay();
}

// ==============================
// RENDER
// ==============================

function renderTabs() {
  const tabbar = document.getElementById("tabbar");
  tabbar.innerHTML = "";

  ROUTINE.forEach(day => {
    const btn = document.createElement("button");
    btn.className = `tab${day === selectedDay ? " active" : ""}`;
    btn.textContent = day;
    btn.onclick = () => loadTemplate(day);
    tabbar.appendChild(btn);
  });
}

function renderStats() {
  document.getElementById("nextStat").textContent = state.nextWorkout || "—";
  document.getElementById("sessionsStat").textContent = state.workouts.length;
  document.getElementById("streakStat").textContent = calcStreakDays(state.workouts);
  document.getElementById("lastStat").textContent = state.workouts[0]?.name || "—";
}

function renderHistory() {
  const list = document.getElementById("histList");
  list.innerHTML = "";

  if (!state.workouts.length) {
    list.innerHTML = `<div class="empty">No saved workouts yet.</div>`;
    return;
  }

  state.workouts.slice(0, 12).forEach((workout, index) => {
    const item = document.createElement("div");
    item.className = "hist-item";

    const exerciseNames = (workout.exercises || []).map(e => e.name).slice(0, 3).join(", ");

    item.innerHTML = `
      <div class="hist-head">
        <div>
          <strong>${workout.name}</strong>
          <div class="hist-meta">${workout.date || ""}${workout.bodyWeight ? ` · BW ${workout.bodyWeight}` : ""}</div>
          <div class="history-detail">${exerciseNames}${(workout.exercises || []).length > 3 ? "..." : ""}</div>
          ${workout.focusNotes ? `<div class="history-detail">Focus: ${workout.focusNotes}</div>` : ""}
          ${workout.notes ? `<div class="history-detail">Notes: ${workout.notes}</div>` : ""}
        </div>
        <button class="ghost mini" type="button" data-del="${index}">Delete</button>
      </div>
    `;

    list.appendChild(item);
  });

  list.querySelectorAll("[data-del]").forEach(btn => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.del);
      state.workouts.splice(idx, 1);
      saveState();
      showToast("Workout deleted");
    };
  });
}

function renderExerciseToolbar() {
  const toolbar = document.getElementById("exerciseToolbar");
  const options = getDayOptions(selectedDay);
  const first = options[0] || "";

  toolbar.innerHTML = `
    <div class="exercise-toolbar">
      <select id="exerciseSelect">
        ${options.map(opt => `<option value="${opt}" ${opt === first ? "selected" : ""}>${opt}</option>`).join("")}
      </select>
      <button class="primary" id="addExerciseBtn" type="button">+ Add Exercise</button>
    </div>
  `;

  document.getElementById("addExerciseBtn").onclick = addExerciseFromSelection;
}

function renderWorkout(draft = null) {
  renderExerciseToolbar();

  const container = document.getElementById("exList");
  container.innerHTML = "";

  if (!exercises.length) {
    container.innerHTML = `<div class="empty">No exercises loaded.</div>`;
    attachDraftAutoSave();
    return;
  }

  const draftExercises = draft?.exercises || [];

  exercises.forEach((ex, exIndex) => {
    const draftEx = draftExercises[exIndex] || null;
    const options = getDayOptions(selectedDay, ex.name);
    const last = findLastPerformance(ex.name);
    const suggested = suggestWeight(ex.name, last, ex.startWeight || "");

    const card = document.createElement("div");
    card.className = "exercise-card";

    const head = document.createElement("div");
    head.className = "exercise-head";
    head.innerHTML = `
      <div>
        <h3>${ex.name}</h3>
        <div class="exercise-meta">${last ? `Last: ${last.weight} x ${last.reps}` : "No previous log"}</div>
      </div>
      <div>${ex.collapsed ? "►" : "▼"}</div>
    `;
    head.onclick = () => toggleExerciseCard(exIndex);

    const body = document.createElement("div");
    body.className = `exercise-body${ex.collapsed ? " hidden" : ""}`;

    const editGrid = document.createElement("div");
    editGrid.className = "edit-grid";
    editGrid.innerHTML = `
      <div>
        <label>Exercise</label>
        <select class="edit-select">
          ${options.map(opt => `<option value="${opt}" ${opt === ex.name ? "selected" : ""}>${opt}</option>`).join("")}
        </select>
      </div>
      <div>
        <label>Sets</label>
        <input class="edit-sets" type="number" min="1" value="${ex.sets}">
      </div>
      <div>
        <label>Target Reps</label>
        <input class="edit-reps" type="number" min="1" value="${ex.reps}">
      </div>
      <button class="ghost" type="button">↑ Up</button>
      <button class="ghost" type="button">↓ Down</button>
      <button class="ghost" type="button">Remove</button>
    `;

const presetRow = document.createElement("div");
presetRow.className = "preset-row";
presetRow.innerHTML = `
  <div>
    <label>Preset / fallback weight</label>
    <input class="preset-weight" value="${ex.startWeight || ""}" placeholder="135">
  </div>
  <button class="ghost" type="button">Use Preset</button>
  <div class="exercise-suggest">Suggested: ${suggested || "—"}</div>
`;

const demoRow = document.createElement("div");
demoRow.style.display = "flex";
demoRow.style.gap = "8px";
demoRow.style.flexWrap = "wrap";
demoRow.style.marginBottom = "10px";
demoRow.innerHTML = `
  <button class="ghost" type="button">▶ Demo</button>
`;

body.appendChild(editGrid);
body.appendChild(presetRow);
body.appendChild(demoRow);

    rebuildSetRows(body, ex.sets, suggested, draftEx?.entries || []);

    const selectInput = editGrid.querySelector(".edit-select");
    const setsInput = editGrid.querySelector(".edit-sets");
    const repsInput = editGrid.querySelector(".edit-reps");
    const moveUpBtn = editGrid.querySelectorAll("button")[0];
    const moveDownBtn = editGrid.querySelectorAll("button")[1];
    const removeBtn = editGrid.querySelectorAll("button")[2];
const presetInput = presetRow.querySelector(".preset-weight");
const usePresetBtn = presetRow.querySelector("button");
const suggestText = presetRow.querySelector(".exercise-suggest");
const demoBtn = demoRow.querySelector("button");

    selectInput.onchange = () => {
      const next = getDefaultExercise(selectInput.value);
      exercises[exIndex] = {
        ...next,
        collapsed: false
      };
      persistCurrentLayout();
      renderWorkout();
      persistDraftForDay();
    };

    setsInput.oninput = () => {
      exercises[exIndex].sets = Math.max(1, parseInt(setsInput.value || "1", 10));
      persistCurrentLayout();
      renderWorkout();
      persistDraftForDay();
    };

    repsInput.oninput = () => {
      exercises[exIndex].reps = Math.max(1, parseInt(repsInput.value || "1", 10));
      persistCurrentLayout();
      persistDraftForDay();
    };

    moveUpBtn.onclick = () => moveExercise(exIndex, -1);
    moveDownBtn.onclick = () => moveExercise(exIndex, 1);
    removeBtn.onclick = () => removeExercise(exIndex);

    presetInput.oninput = () => {
      exercises[exIndex].startWeight = presetInput.value.trim();
      const liveSuggested = suggestWeight(ex.name, findLastPerformance(ex.name), exercises[exIndex].startWeight || "");
      suggestText.textContent = `Suggested: ${liveSuggested || "—"}`;
      persistCurrentLayout();
      persistDraftForDay();
    };

    usePresetBtn.onclick = () => {
      applyPresetToRows(body, presetInput.value.trim());
    };
demoBtn.onclick = () => {
  openExerciseDemo(selectInput.value || ex.name);
};
    card.appendChild(head);
    card.appendChild(body);
    container.appendChild(card);
  });

  attachDraftAutoSave();
}

// ==============================
// LOAD / SAVE WORKOUT
// ==============================

function getLayoutForDay(day) {
  const custom = state.customLayouts?.[day];
  if (Array.isArray(custom) && custom.length) return deepClone(custom);
  return deepClone(TEMPLATES[day] || []);
}

function loadTemplate(day) {
  if (!TEMPLATES[day]) return;

  selectedDay = day;
  document.getElementById("wkName").value = day;

  const draft = getDraftForDay(day);

  exercises = draft?.exercises?.map(d => ({
    name: d.name,
    sets: d.sets,
    reps: d.reps,
    startWeight: d.startWeight || "",
    collapsed: !!d.collapsed
  })) || getLayoutForDay(day);

  document.getElementById("wkDate").value = draft?.date || todayString();
  document.getElementById("bodyWt").value = draft?.bodyWeight || "";
  document.getElementById("focusNotes").value = draft?.focusNotes || "";
  document.getElementById("wkNotes").value = draft?.sessionNotes || "";

  renderWorkout(draft);
  renderTabs();
  startSessionTimer();
}

function saveWorkout() {
  const workout = {
    name: selectedDay,
    date: document.getElementById("wkDate").value || todayString(),
    bodyWeight: document.getElementById("bodyWt").value.trim(),
    focusNotes: document.getElementById("focusNotes").value.trim(),
    notes: document.getElementById("wkNotes").value.trim(),
    exercises: []
  };

  document.querySelectorAll(".exercise-card").forEach(card => {
    const name = card.querySelector(".edit-select").value;
    const sets = [];

    card.querySelectorAll(".setRow").forEach(row => {
      const weight = row.querySelector(".weight").value.trim();
      const reps = row.querySelector(".reps").value.trim();
      if (weight && reps) sets.push({ weight, reps });
    });

    workout.exercises.push({ name, sets });
  });

  persistCurrentLayout();
  state.workouts.unshift(workout);
  state.nextWorkout = nextWorkout(selectedDay);
  clearDraftForDay(selectedDay);
  saveState();

  showToast(`Saved. Next: ${state.nextWorkout}`, "success");
  stopSessionTimer();
  loadTemplate(state.nextWorkout);
}

function clearSession() {
  clearDraftForDay(selectedDay);
  exercises = getLayoutForDay(selectedDay);
  document.getElementById("wkDate").value = todayString();
  document.getElementById("bodyWt").value = "";
  document.getElementById("focusNotes").value = "";
  document.getElementById("wkNotes").value = "";
  renderWorkout();
  stopSessionTimer();
}

// ==============================
// EXPORT
// ==============================

function exportLog() {
  const payload = {
    exportedAt: new Date().toISOString(),
    nextWorkout: state.nextWorkout,
    customLayouts: state.customLayouts,
    drafts: state.drafts,
    userMaxes: state.userMaxes,
    bodyMetrics: state.bodyMetrics,
    workouts: state.workouts
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `power-calculator-v3-log-${todayString()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);

  showToast("Log exported");
}

// ==============================
// BUTTONS
// ==============================

function wireButtons() {
  document.getElementById("saveBtn").onclick = saveWorkout;
  document.getElementById("loadNextBtn").onclick = () => loadTemplate(state.nextWorkout);
  document.getElementById("loadTplBtn").onclick = () => {
    const day = document.getElementById("wkName").value.trim();
    if (TEMPLATES[day]) loadTemplate(day);
    else showToast("That workout day does not exist", "warn");
  };

  document.getElementById("clearBtn").onclick = clearSession;
  document.getElementById("expandAllBtn").onclick = expandAll;
  document.getElementById("collapseAllBtn").onclick = collapseAll;
  document.getElementById("exportBtn").onclick = exportLog;

  document.getElementById("sessionPauseBtn").onclick = toggleSessionPause;
  document.getElementById("sessionResetBtn").onclick = resetSessionTimer;
  document.getElementById("sessionHideBtn").onclick = toggleSessionVisibility;

  document.getElementById("openRestBtn").onclick = toggleRestVisibility;
  document.getElementById("restHideBtn").onclick = toggleRestVisibility;
  document.getElementById("restFab").onclick = toggleRestVisibility;
  document.getElementById("restToggleBtn").onclick = toggleRestTimer;
  document.getElementById("restResetBtn").onclick = resetRestTimer;

  document.querySelectorAll("[data-rest]").forEach(btn => {
    btn.onclick = () => {
      restSeconds = parseInt(btn.dataset.rest, 10);
      restRemaining = restSeconds;
      restRunning = false;
      clearInterval(restInterval);
      updateRestTimerUI();
      document.getElementById("restToggleBtn").textContent = "Start";
    };
  });
}

// ==============================
// INIT
// ==============================

function init() {
  document.getElementById("wkDate").value = todayString();
  renderTabs();
  renderStats();
  renderHistory();
  renderPowerPanel();
  renderMaxesPanel();
  renderBodyMetricsPanel();
  wireButtons();
  updateRestTimerUI();
  loadTemplate(state.nextWorkout);

  window.addEventListener("beforeunload", () => {
    persistDraftForDay();
  });
}

init();
function openExerciseDemo(exerciseName) {

  const url = EXERCISE_VIDEO_SEARCH[exerciseName];

  if (url) {
    window.open(url, "_blank");
  } else {
    const fallback = "https://www.youtube.com/results?search_query=" + encodeURIComponent(exerciseName + " exercise tutorial");
    window.open(fallback, "_blank");
  }

}
