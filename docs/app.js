// ==============================
// CONFIG
// ==============================

const STORAGE_KEY = "power_calculator_v3";

const currentPage = document.body?.dataset?.page || "workout";

const SPLITS = {
  fullbody: {
    label: "Full Body",
    frequency: "2–3 days / week",
    routine: ["Full Body A", "Full Body B"]
  },
  upperlower: {
    label: "Upper / Lower",
    frequency: "4 days / week",
    routine: ["Upper A", "Lower A", "Upper B", "Lower B"]
  },
  ppl: {
    label: "Push / Pull / Legs",
    frequency: "5–6 days / week",
    routine: ["Push A", "Pull A", "Legs A", "Push B", "Pull B", "Legs B"]
  },
  rehab: {
    label: "Rehab Bodybuilding",
    frequency: "3–4 days / week",
    routine: ["Rehab Upper A", "Rehab Lower A", "Rehab Upper B", "Rehab Lower B"]
  },
  kyle: {
    label: "Kyle's Program",
    frequency: "5 days / week",
    routine: ["Kyle Chest", "Kyle Legs", "Kyle Back", "Kyle Shoulders", "Kyle Arms"]
  }
};

function splitForDays(days) {
  if (days <= 3) return "fullbody";
  if (days === 4) return "upperlower";
  return "ppl";
}

function getRoutine() {
  const split = SPLITS[state?.settings?.split] || SPLITS.ppl;
  return split.routine;
}

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
    { name: "Machine Shoulder Press", sets: 3, reps: 10, startWeight: "70", collapsed: true },
    { name: "Pec Deck", sets: 3, reps: 12, startWeight: "100", collapsed: true },
    { name: "Upright Row", sets: 3, reps: 10, startWeight: "45", collapsed: true },
    { name: "Machine Press", sets: 3, reps: 10, startWeight: "90", collapsed: true },
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
  ],
  "Full Body A": [
    { name: "Back Squat", sets: 3, reps: 8, startWeight: "185", collapsed: false },
    { name: "Barbell Bench Press", sets: 3, reps: 8, startWeight: "135", collapsed: true },
    { name: "Barbell Row", sets: 3, reps: 8, startWeight: "115", collapsed: true },
    { name: "Standing Barbell Shoulder Press", sets: 2, reps: 10, startWeight: "75", collapsed: true },
    { name: "Barbell Curl", sets: 2, reps: 12, startWeight: "50", collapsed: true },
    { name: "Standing Calf Raise", sets: 3, reps: 15, startWeight: "135", collapsed: true }
  ],
  "Full Body B": [
    { name: "Deadlift", sets: 3, reps: 6, startWeight: "185", collapsed: false },
    { name: "Incline Barbell Press", sets: 3, reps: 8, startWeight: "95", collapsed: true },
    { name: "Lat Pulldown", sets: 3, reps: 10, startWeight: "100", collapsed: true },
    { name: "Machine Shoulder Press", sets: 2, reps: 10, startWeight: "70", collapsed: true },
    { name: "Leg Extension", sets: 2, reps: 12, startWeight: "100", collapsed: true },
    { name: "Tricep Pushdown", sets: 2, reps: 12, startWeight: "50", collapsed: true }
  ],
  "Upper A": [
    { name: "Barbell Bench Press", sets: 4, reps: 8, startWeight: "135", collapsed: false },
    { name: "Barbell Row", sets: 4, reps: 8, startWeight: "115", collapsed: true },
    { name: "Standing Barbell Shoulder Press", sets: 3, reps: 10, startWeight: "75", collapsed: true },
    { name: "Lat Pulldown", sets: 3, reps: 10, startWeight: "100", collapsed: true },
    { name: "Barbell Curl", sets: 3, reps: 12, startWeight: "50", collapsed: true },
    { name: "Tricep Pushdown", sets: 3, reps: 12, startWeight: "50", collapsed: true }
  ],
  "Lower A": [
    { name: "Back Squat", sets: 4, reps: 8, startWeight: "185", collapsed: false },
    { name: "Romanian Deadlift", sets: 3, reps: 10, startWeight: "135", collapsed: true },
    { name: "Walking Lunges", sets: 3, reps: 12, startWeight: "25", collapsed: true },
    { name: "Seated Leg Curl", sets: 3, reps: 12, startWeight: "95", collapsed: true },
    { name: "Standing Calf Raise", sets: 4, reps: 15, startWeight: "135", collapsed: true }
  ],
  "Upper B": [
    { name: "Incline Barbell Press", sets: 4, reps: 8, startWeight: "95", collapsed: false },
    { name: "Chest Supported Row", sets: 4, reps: 10, startWeight: "90", collapsed: true },
    { name: "Arnold Press", sets: 3, reps: 10, startWeight: "25", collapsed: true },
    { name: "Pullups", sets: 3, reps: 8, startWeight: "", collapsed: true },
    { name: "Hammer Curl", sets: 3, reps: 12, startWeight: "25", collapsed: true },
    { name: "Overhead Tricep Extension", sets: 3, reps: 12, startWeight: "35", collapsed: true }
  ],
  "Lower B": [
    { name: "Deadlift", sets: 3, reps: 6, startWeight: "185", collapsed: false },
    { name: "Front Squat", sets: 3, reps: 8, startWeight: "135", collapsed: true },
    { name: "Hip Thrust", sets: 3, reps: 10, startWeight: "135", collapsed: true },
    { name: "Leg Extension", sets: 3, reps: 12, startWeight: "100", collapsed: true },
    { name: "Seated Calf Raise", sets: 4, reps: 15, startWeight: "90", collapsed: true }
  ],
  // Rehab Bodybuilding: posture primers open every session, pressing is
  // machine-biased and pulling neutral-grip to spare the bicep tendon,
  // and curls are slow-eccentric tendon loading
  "Rehab Upper A": [
    { name: "Chin Tuck", sets: 2, reps: 10, startWeight: "", collapsed: false },
    { name: "Band Pull-Apart", sets: 2, reps: 15, startWeight: "", collapsed: true },
    { name: "Machine Press", sets: 3, reps: 10, startWeight: "90", collapsed: true },
    { name: "Machine Shoulder Press", sets: 3, reps: 10, startWeight: "70", collapsed: true },
    { name: "Pec Deck", sets: 3, reps: 12, startWeight: "100", collapsed: true },
    { name: "Prone Y Raise", sets: 3, reps: 12, startWeight: "5", collapsed: true },
    { name: "Face Pull", sets: 3, reps: 15, startWeight: "30", collapsed: true },
    { name: "Eccentric Curl (Slow Negatives)", sets: 2, reps: 12, startWeight: "15", collapsed: true }
  ],
  "Rehab Lower A": [
    { name: "Chin Tuck", sets: 2, reps: 10, startWeight: "", collapsed: false },
    { name: "Thoracic Extension (Foam Roller)", sets: 2, reps: 10, startWeight: "", collapsed: true },
    { name: "Back Squat", sets: 3, reps: 8, startWeight: "185", collapsed: true },
    { name: "Romanian Deadlift", sets: 3, reps: 10, startWeight: "135", collapsed: true },
    { name: "Seated Leg Curl", sets: 3, reps: 12, startWeight: "95", collapsed: true },
    { name: "Standing Calf Raise", sets: 3, reps: 15, startWeight: "135", collapsed: true },
    { name: "Wall Slide", sets: 2, reps: 10, startWeight: "", collapsed: true }
  ],
  "Rehab Upper B": [
    { name: "Chin Tuck", sets: 2, reps: 10, startWeight: "", collapsed: false },
    { name: "Wall Slide", sets: 2, reps: 10, startWeight: "", collapsed: true },
    { name: "Chest Supported Row", sets: 3, reps: 12, startWeight: "90", collapsed: true },
    { name: "Lat Pulldown", sets: 3, reps: 10, startWeight: "100", collapsed: true },
    { name: "Rear Delt Fly", sets: 3, reps: 15, startWeight: "20", collapsed: true },
    { name: "Cable External Rotation", sets: 3, reps: 12, startWeight: "10", collapsed: true },
    { name: "Incline Dumbbell Curl", sets: 3, reps: 12, startWeight: "20", collapsed: true },
    { name: "Band Pull-Apart", sets: 2, reps: 15, startWeight: "", collapsed: true }
  ],
  "Rehab Lower B": [
    { name: "Chin Tuck", sets: 2, reps: 10, startWeight: "", collapsed: false },
    { name: "Thoracic Extension (Foam Roller)", sets: 2, reps: 10, startWeight: "", collapsed: true },
    { name: "Hip Thrust", sets: 3, reps: 10, startWeight: "135", collapsed: true },
    { name: "Bulgarian Split Squat", sets: 3, reps: 10, startWeight: "25", collapsed: true },
    { name: "Leg Extension", sets: 3, reps: 12, startWeight: "100", collapsed: true },
    { name: "Seated Calf Raise", sets: 3, reps: 15, startWeight: "90", collapsed: true },
    { name: "Prone Y Raise", sets: 2, reps: 12, startWeight: "5", collapsed: true }
  ],
  // Kyle's program — Mon Chest/Abs, Tue Legs (+triceps), Thu Back,
  // Fri Shoulders/Abs, Sat Arms. Weights are his current working loads;
  // duplicate slots are his heavy + back-off tiers.
  "Kyle Chest": [
    { name: "Barbell Bench Press", sets: 5, reps: 5, startWeight: "275", collapsed: false },
    { name: "Barbell Bench Press", sets: 3, reps: 8, startWeight: "245", collapsed: true },
    { name: "Incline Barbell Press", sets: 3, reps: 8, startWeight: "195", collapsed: true },
    { name: "Incline Barbell Press", sets: 3, reps: 10, startWeight: "155", collapsed: true },
    { name: "Machine Fly", sets: 3, reps: 10, startWeight: "115", collapsed: true },
    { name: "Dumbbell Chest Press", sets: 3, reps: 10, startWeight: "55", collapsed: true },
    { name: "Shoulder Complex", sets: 3, reps: 5, startWeight: "", collapsed: true },
    { name: "Pushups", sets: 3, reps: 8, startWeight: "", collapsed: true },
    { name: "Plank", sets: 3, reps: 30, startWeight: "", collapsed: true },
    { name: "Bicycle Crunch", sets: 3, reps: 20, startWeight: "", collapsed: true }
  ],
  "Kyle Legs": [
    { name: "Leg Press", sets: 5, reps: 5, startWeight: "450", collapsed: false },
    { name: "EZ Bar Tricep Extension", sets: 3, reps: 10, startWeight: "85", collapsed: true },
    { name: "Leg Press", sets: 3, reps: 8, startWeight: "360", collapsed: true },
    { name: "EZ Bar Tricep Extension", sets: 3, reps: 10, startWeight: "75", collapsed: true },
    { name: "Smith Squat with Calf Raise", sets: 3, reps: 10, startWeight: "120", collapsed: true },
    { name: "Tricep Pulldown", sets: 3, reps: 10, startWeight: "52.5", collapsed: true },
    { name: "Wall Sit", sets: 3, reps: 30, startWeight: "", collapsed: true },
    { name: "Leg Extension", sets: 3, reps: 12, startWeight: "", collapsed: true }
  ],
  "Kyle Back": [
    { name: "Deadlift", sets: 5, reps: 5, startWeight: "255", collapsed: false },
    { name: "Pause Plate Shrug", sets: 3, reps: 10, startWeight: "45", collapsed: true },
    { name: "Barbell Shrug", sets: 3, reps: 10, startWeight: "225", collapsed: true },
    { name: "Forearm Complex", sets: 3, reps: 5, startWeight: "", collapsed: true },
    { name: "Stiff-Leg Deadlift", sets: 3, reps: 8, startWeight: "155", collapsed: true },
    { name: "Pullups", sets: 3, reps: 8, startWeight: "", collapsed: true },
    { name: "Barbell Row", sets: 3, reps: 8, startWeight: "125", collapsed: true },
    { name: "Lat Pulldown", sets: 3, reps: 10, startWeight: "100", collapsed: true },
    { name: "Seated Row", sets: 3, reps: 10, startWeight: "100", collapsed: true }
  ],
  "Kyle Shoulders": [
    { name: "Machine Shoulder Press", sets: 5, reps: 5, startWeight: "230", collapsed: false },
    { name: "Machine Shoulder Press", sets: 3, reps: 8, startWeight: "160", collapsed: true },
    { name: "Dumbbell Shoulder Press", sets: 3, reps: 10, startWeight: "60", collapsed: true },
    { name: "Iso Shoulder Press", sets: 3, reps: 10, startWeight: "45", collapsed: true },
    { name: "Dumbbell Lateral Raise", sets: 3, reps: 12, startWeight: "30", collapsed: true },
    { name: "Barbell Bench Press", sets: 3, reps: 8, startWeight: "185", collapsed: true },
    { name: "Incline Barbell Press", sets: 3, reps: 10, startWeight: "135", collapsed: true },
    { name: "Crunch", sets: 3, reps: 20, startWeight: "", collapsed: true },
    { name: "Russian Twist", sets: 3, reps: 20, startWeight: "", collapsed: true }
  ],
  "Kyle Arms": [
    { name: "Barbell Curl", sets: 3, reps: 8, startWeight: "65", collapsed: false },
    { name: "Forearm Extension", sets: 3, reps: 10, startWeight: "45", collapsed: true },
    { name: "Dumbbell Curl", sets: 3, reps: 8, startWeight: "50", collapsed: true },
    { name: "Dumbbell Tricep Extension", sets: 3, reps: 10, startWeight: "50", collapsed: true },
    { name: "Dumbbell Curl", sets: 3, reps: 10, startWeight: "45", collapsed: true },
    { name: "Dumbbell Tricep Extension", sets: 3, reps: 10, startWeight: "45", collapsed: true },
    { name: "Outside Curl", sets: 3, reps: 10, startWeight: "25", collapsed: true },
    { name: "Forearm Complex", sets: 3, reps: 5, startWeight: "", collapsed: true },
    { name: "Stein Curl", sets: 3, reps: 10, startWeight: "25", collapsed: true },
    { name: "Tricep Pulldown", sets: 3, reps: 10, startWeight: "42.5", collapsed: true },
    { name: "Tricep Pulldown", sets: 3, reps: 12, startWeight: "37.5", collapsed: true }
  ]
};

const DAY_EXERCISE_OPTIONS = {
  "Push A": [
    "Barbell Bench Press", "Standing Barbell Shoulder Press", "Cable Fly", "Cable Lateral Raise",
    "Tricep Pushdown", "Overhead Tricep Extension", "Pec Deck", "Machine Press", "Machine Shoulder Press", "Dips", "Incline Barbell Press", "Arnold Press"
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
    "Overhead Tricep Extension", "Machine Press", "Machine Shoulder Press", "Barbell Bench Press", "Cable Fly", "Cable Lateral Raise", "Tricep Pushdown"
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
  "Machine Shoulder Press": { sets: 3, reps: 10, startWeight: "70" },
  "Pec Deck": { sets: 3, reps: 12, startWeight: "100" },
  "Machine Press": { sets: 3, reps: 10, startWeight: "90" },
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
  "Seated Calf Raise": { sets: 4, reps: 15, startWeight: "90" },
  "Chin Tuck": { sets: 2, reps: 10, startWeight: "" },
  "Band Pull-Apart": { sets: 2, reps: 15, startWeight: "" },
  "Wall Slide": { sets: 2, reps: 10, startWeight: "" },
  "Thoracic Extension (Foam Roller)": { sets: 2, reps: 10, startWeight: "" },
  "Prone Y Raise": { sets: 3, reps: 12, startWeight: "5" },
  "Cable External Rotation": { sets: 3, reps: 12, startWeight: "10" },
  "Eccentric Curl (Slow Negatives)": { sets: 2, reps: 12, startWeight: "15" },
  "Incline Dumbbell Curl": { sets: 3, reps: 12, startWeight: "20" },
  "Leg Press": { sets: 3, reps: 10, startWeight: "360" },
  "Machine Fly": { sets: 3, reps: 10, startWeight: "115" },
  "Dumbbell Chest Press": { sets: 3, reps: 10, startWeight: "55" },
  "Shoulder Complex": { sets: 3, reps: 5, startWeight: "" },
  "Pushups": { sets: 3, reps: 8, startWeight: "" },
  "EZ Bar Tricep Extension": { sets: 3, reps: 10, startWeight: "75" },
  "Dumbbell Tricep Extension": { sets: 3, reps: 10, startWeight: "45" },
  "Tricep Pulldown": { sets: 3, reps: 10, startWeight: "42.5" },
  "Smith Squat with Calf Raise": { sets: 3, reps: 10, startWeight: "120" },
  "Wall Sit": { sets: 3, reps: 30, startWeight: "" },
  "Pause Plate Shrug": { sets: 3, reps: 10, startWeight: "45" },
  "Barbell Shrug": { sets: 3, reps: 10, startWeight: "225" },
  "Forearm Complex": { sets: 3, reps: 5, startWeight: "" },
  "Stiff-Leg Deadlift": { sets: 3, reps: 8, startWeight: "155" },
  "Dumbbell Shoulder Press": { sets: 3, reps: 10, startWeight: "60" },
  "Iso Shoulder Press": { sets: 3, reps: 10, startWeight: "45" },
  "Dumbbell Lateral Raise": { sets: 3, reps: 12, startWeight: "30" },
  "Dumbbell Curl": { sets: 3, reps: 8, startWeight: "50" },
  "Outside Curl": { sets: 3, reps: 10, startWeight: "25" },
  "Stein Curl": { sets: 3, reps: 10, startWeight: "25" },
  "Forearm Extension": { sets: 3, reps: 10, startWeight: "45" },
  "Plank": { sets: 3, reps: 30, startWeight: "" },
  "Bicycle Crunch": { sets: 3, reps: 20, startWeight: "" },
  "Crunch": { sets: 3, reps: 20, startWeight: "" },
  "Russian Twist": { sets: 3, reps: 20, startWeight: "" }
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
  "Machine Shoulder Press": 10,
  "Pec Deck": 10,
  "Machine Press": 10,
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
  "Seated Calf Raise": 10,
  "Chin Tuck": 0,
  "Band Pull-Apart": 0,
  "Wall Slide": 0,
  "Thoracic Extension (Foam Roller)": 0,
  "Prone Y Raise": 5,
  "Cable External Rotation": 5,
  "Eccentric Curl (Slow Negatives)": 5,
  "Incline Dumbbell Curl": 5,
  "Leg Press": 10,
  "Machine Fly": 10,
  "Dumbbell Chest Press": 5,
  "Shoulder Complex": 0,
  "Pushups": 0,
  "EZ Bar Tricep Extension": 5,
  "Dumbbell Tricep Extension": 5,
  "Tricep Pulldown": 2.5,
  "Smith Squat with Calf Raise": 10,
  "Wall Sit": 0,
  "Pause Plate Shrug": 0,
  "Barbell Shrug": 10,
  "Forearm Complex": 0,
  "Stiff-Leg Deadlift": 10,
  "Dumbbell Shoulder Press": 5,
  "Iso Shoulder Press": 5,
  "Dumbbell Lateral Raise": 5,
  "Dumbbell Curl": 5,
  "Outside Curl": 5,
  "Stein Curl": 5,
  "Forearm Extension": 5,
  "Plank": 0,
  "Bicycle Crunch": 0,
  "Crunch": 0,
  "Russian Twist": 0
};

const EXERCISE_MUSCLES = {
  "Barbell Bench Press": ["chest"],
  "Incline Barbell Press": ["chest"],
  "Cable Fly": ["chest"],
  "Pec Deck": ["chest"],
  "Machine Press": ["chest"],
  "Dips": ["chest", "arms"],
  "Standing Barbell Shoulder Press": ["shoulders"],
  "Arnold Press": ["shoulders"],
  "Machine Shoulder Press": ["shoulders"],
  "Cable Lateral Raise": ["shoulders"],
  "Upright Row": ["shoulders"],
  "Rear Delt Fly": ["shoulders"],
  "Face Pull": ["shoulders"],
  "Barbell Row": ["back"],
  "Pullups": ["back"],
  "Seated Row": ["back"],
  "Lat Pulldown": ["back"],
  "Chest Supported Row": ["back"],
  "Deadlift": ["back", "hamstrings"],
  "Barbell Curl": ["arms"],
  "Hammer Curl": ["arms"],
  "Preacher Curl": ["arms"],
  "Cable Curl": ["arms"],
  "Tricep Pushdown": ["arms"],
  "Overhead Tricep Extension": ["arms"],
  "Back Squat": ["quads"],
  "Front Squat": ["quads"],
  "Leg Extension": ["quads"],
  "Walking Lunges": ["quads"],
  "Bulgarian Split Squat": ["quads"],
  "Romanian Deadlift": ["hamstrings"],
  "Seated Leg Curl": ["hamstrings"],
  "Hip Thrust": ["hamstrings"],
  "Standing Calf Raise": ["calves"],
  "Seated Calf Raise": ["calves"],
  "Chin Tuck": ["rehab"],
  "Band Pull-Apart": ["rehab"],
  "Wall Slide": ["rehab"],
  "Thoracic Extension (Foam Roller)": ["rehab"],
  "Prone Y Raise": ["rehab", "shoulders"],
  "Cable External Rotation": ["rehab"],
  "Eccentric Curl (Slow Negatives)": ["rehab", "arms"],
  "Incline Dumbbell Curl": ["arms"],
  "Leg Press": ["quads"],
  "Machine Fly": ["chest"],
  "Dumbbell Chest Press": ["chest"],
  "Shoulder Complex": ["rehab", "shoulders"],
  "Pushups": ["chest"],
  "EZ Bar Tricep Extension": ["arms"],
  "Dumbbell Tricep Extension": ["arms"],
  "Tricep Pulldown": ["arms"],
  "Smith Squat with Calf Raise": ["quads", "calves"],
  "Wall Sit": ["quads"],
  "Pause Plate Shrug": ["back"],
  "Barbell Shrug": ["back"],
  "Forearm Complex": ["rehab", "arms"],
  "Stiff-Leg Deadlift": ["hamstrings"],
  "Dumbbell Shoulder Press": ["shoulders"],
  "Iso Shoulder Press": ["shoulders"],
  "Dumbbell Lateral Raise": ["shoulders"],
  "Dumbbell Curl": ["arms"],
  "Outside Curl": ["arms"],
  "Stein Curl": ["arms"],
  "Forearm Extension": ["arms"],
  "Plank": ["core"],
  "Bicycle Crunch": ["core"],
  "Crunch": ["core"],
  "Russian Twist": ["core"]
};

// Weekly hard-set targets per muscle group (evidence-based hypertrophy ranges)
const MUSCLE_TARGETS = {
  chest: { label: "Chest", min: 10, max: 20 },
  back: { label: "Back", min: 10, max: 20 },
  shoulders: { label: "Shoulders", min: 8, max: 16 },
  arms: { label: "Arms", min: 8, max: 16 },
  quads: { label: "Quads", min: 8, max: 16 },
  hamstrings: { label: "Hams / Glutes", min: 8, max: 16 },
  calves: { label: "Calves", min: 6, max: 12 },
  // Rehab compliance target — only surfaced on the rehab split or when
  // rehab work was actually logged in the trailing week
  rehab: { label: "Rehab / Posture", min: 8, max: 30 },
  // Core surfaces only when ab work was logged in the trailing week
  core: { label: "Core", min: 6, max: 20 }
};

// PPL default keeps continuity for anyone already mid-rotation
const SETTINGS_DEFAULT = {
  daysPerWeek: 6,
  split: "ppl"
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
  press: ["Standing Barbell Shoulder Press", "Arnold Press", "Machine Shoulder Press", "Machine Press"],
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
  "Machine Shoulder Press": "https://www.youtube.com/results?search_query=machine+shoulder+press+tutorial",
  "Pec Deck": "https://www.youtube.com/results?search_query=pec+deck+tutorial",
  "Machine Press": "https://www.youtube.com/results?search_query=machine+chest+press+tutorial",
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
  "Seated Calf Raise": "https://www.youtube.com/results?search_query=seated+calf+raise+tutorial",
  "Chin Tuck": "https://www.youtube.com/results?search_query=chin+tuck+exercise+forward+head+posture",
  "Band Pull-Apart": "https://www.youtube.com/results?search_query=band+pull+apart+posture+tutorial",
  "Wall Slide": "https://www.youtube.com/results?search_query=scapular+wall+slide+exercise+tutorial",
  "Thoracic Extension (Foam Roller)": "https://www.youtube.com/results?search_query=thoracic+extension+foam+roller+exercise",
  "Prone Y Raise": "https://www.youtube.com/results?search_query=prone+Y+raise+lower+trap+exercise",
  "Cable External Rotation": "https://www.youtube.com/results?search_query=cable+external+rotation+rotator+cuff+exercise",
  "Eccentric Curl (Slow Negatives)": "https://www.youtube.com/results?search_query=eccentric+bicep+curl+tendonitis+rehab",
  "Incline Dumbbell Curl": "https://www.youtube.com/results?search_query=Jeff+Nippard+incline+dumbbell+curl",
  "Leg Press": "https://www.youtube.com/results?search_query=Jeff+Nippard+leg+press+tutorial",
  "Machine Fly": "https://www.youtube.com/results?search_query=machine+fly+chest+tutorial",
  "Dumbbell Chest Press": "https://www.youtube.com/results?search_query=dumbbell+chest+press+tutorial",
  "Shoulder Complex": "https://www.youtube.com/results?search_query=shoulder+prehab+complex+dumbbell",
  "Pushups": "https://www.youtube.com/results?search_query=perfect+pushup+form+tutorial",
  "EZ Bar Tricep Extension": "https://www.youtube.com/results?search_query=ez+bar+tricep+extension+tutorial",
  "Dumbbell Tricep Extension": "https://www.youtube.com/results?search_query=dumbbell+tricep+extension+tutorial",
  "Tricep Pulldown": "https://www.youtube.com/results?search_query=cable+tricep+pulldown+tutorial",
  "Smith Squat with Calf Raise": "https://www.youtube.com/results?search_query=smith+machine+squat+calf+raise",
  "Wall Sit": "https://www.youtube.com/results?search_query=wall+sit+exercise+form",
  "Pause Plate Shrug": "https://www.youtube.com/results?search_query=paused+plate+shrug+traps",
  "Barbell Shrug": "https://www.youtube.com/results?search_query=barbell+shrug+tutorial",
  "Forearm Complex": "https://www.youtube.com/results?search_query=forearm+strengthening+complex+dumbbell",
  "Stiff-Leg Deadlift": "https://www.youtube.com/results?search_query=stiff+leg+deadlift+tutorial",
  "Dumbbell Shoulder Press": "https://www.youtube.com/results?search_query=dumbbell+shoulder+press+tutorial",
  "Iso Shoulder Press": "https://www.youtube.com/results?search_query=alternating+iso+hold+dumbbell+shoulder+press",
  "Dumbbell Lateral Raise": "https://www.youtube.com/results?search_query=dumbbell+lateral+raise+tutorial",
  "Dumbbell Curl": "https://www.youtube.com/results?search_query=dumbbell+bicep+curl+tutorial",
  "Outside Curl": "https://www.youtube.com/results?search_query=offset+outside+dumbbell+curl",
  "Stein Curl": "https://www.youtube.com/results?search_query=stein+curl+forearm+bicep",
  "Forearm Extension": "https://www.youtube.com/results?search_query=forearm+extension+wrist+curl",
  "Plank": "https://www.youtube.com/results?search_query=plank+form+tutorial",
  "Bicycle Crunch": "https://www.youtube.com/results?search_query=bicycle+crunch+form+tutorial",
  "Crunch": "https://www.youtube.com/results?search_query=crunch+form+tutorial",
  "Russian Twist": "https://www.youtube.com/results?search_query=russian+twist+form+tutorial"
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
    qlDrafts: {},
    userMaxes: { ...USER_MAXES_DEFAULT },
    bodyMetrics: { ...BODY_METRICS_DEFAULT },
    settings: { ...SETTINGS_DEFAULT }
  };
}

function normalizeSettings(parsed) {
  const raw = parsed?.settings && typeof parsed.settings === "object" ? parsed.settings : {};
  const days = parseInt(raw.daysPerWeek, 10);
  const daysPerWeek = Number.isFinite(days) ? Math.min(6, Math.max(2, days)) : SETTINGS_DEFAULT.daysPerWeek;
  const split = SPLITS[raw.split] ? raw.split : splitForDays(daysPerWeek);
  return { daysPerWeek, split };
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultState();

  try {
    const parsed = JSON.parse(raw);
    const settings = normalizeSettings(parsed);
    const routine = SPLITS[settings.split].routine;
    return {
      workouts: Array.isArray(parsed.workouts) ? parsed.workouts : [],
      nextWorkout: routine.includes(parsed.nextWorkout) ? parsed.nextWorkout : routine[0],
      customLayouts: parsed.customLayouts && typeof parsed.customLayouts === "object" ? parsed.customLayouts : {},
      drafts: parsed.drafts && typeof parsed.drafts === "object" ? parsed.drafts : {},
      qlDrafts: parsed.qlDrafts && typeof parsed.qlDrafts === "object" ? parsed.qlDrafts : {},
      userMaxes: parsed.userMaxes && typeof parsed.userMaxes === "object"
        ? { ...USER_MAXES_DEFAULT, ...parsed.userMaxes }
        : { ...USER_MAXES_DEFAULT },
      bodyMetrics: parsed.bodyMetrics && typeof parsed.bodyMetrics === "object"
        ? { ...BODY_METRICS_DEFAULT, ...parsed.bodyMetrics }
        : { ...BODY_METRICS_DEFAULT },
      settings
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
  renderTrackerProgress();
  renderReadinessCard();
  renderCoachPanel();
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

function formatDateLocal(dt) {
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const d = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function todayString() {
  return formatDateLocal(new Date());
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function normalizeExerciseName(name) {
  // Punctuation/plural normalization only — equipment words (machine,
  // dumbbell, seated...) are meaningful and distinguish real variants,
  // so stripping them would merge unrelated lifts' histories
  return String(name || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\//g, " ")
    .replace(/-/g, " ")
    .replace(/\([^)]*\)/g, " ")
    .replace(/\btricep\b/g, "triceps")
    .replace(/\bpullups\b/g, "pull up")
    .replace(/\s+/g, " ")
    .trim();
}

function namesMatch(a, b) {
  const aa = normalizeExerciseName(a);
  const bb = normalizeExerciseName(b);
  if (aa === bb) return true;
  // Containment only counts when the contained name is specific enough
  // (two+ words) — otherwise "curl" would match every curl variant and
  // rehab movements would inherit heavy-lift history
  const shorter = aa.length <= bb.length ? aa : bb;
  const longer = aa.length <= bb.length ? bb : aa;
  return shorter.split(" ").length >= 2 && longer.includes(shorter);
}

function nextWorkout(day) {
  const routine = getRoutine();
  const i = routine.indexOf(day);
  if (i === -1) return routine[0];
  return routine[(i + 1) % routine.length];
}

function dayGroup(day) {
  const trimmed = String(day || "").replace(/\s+[AB]$/i, "").trim();
  return trimmed || String(day || "");
}

function daysSince(dateStr) {
  if (!dateStr) return null;
  const then = new Date(`${dateStr}T00:00:00`);
  if (isNaN(then.getTime())) return null;
  const now = new Date(`${todayString()}T00:00:00`);
  return Math.round((now - then) / 86400000);
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
  const opts = DAY_EXERCISE_OPTIONS[day]
    ? [...DAY_EXERCISE_OPTIONS[day]]
    : Object.keys(EXERCISE_DEFAULTS);
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

function roundToIncrement(value, increment) {
  if (!Number.isFinite(value)) return NaN;
  if (!increment || increment <= 0) return Math.max(0, Math.round(value));
  return Math.max(0, Math.round(value / increment) * increment);
}

function formatSuggestedWeight(value) {
  if (!Number.isFinite(value)) return "";
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function getSetSuggestionRatios(setCount) {
  const preset = {
    1: [1],
    2: [1, 0.975],
    3: [1, 0.975, 0.95],
    4: [1, 1, 0.975, 0.95],
    5: [1, 1, 0.975, 0.95, 0.925],
    6: [1, 1, 0.98, 0.96, 0.94, 0.92]
  };

  if (preset[setCount]) return preset[setCount];

  const ratios = [1];
  for (let i = 1; i < setCount; i++) {
    ratios.push(Math.max(0.82, 1 - i * 0.025));
  }
  return ratios;
}

function buildSetWeightSuggestions(exerciseName, setCount, baselineWeight) {
  const numericBaseline = parseFloat(baselineWeight);
  if (!Number.isFinite(numericBaseline) || numericBaseline <= 0) return [];

  const increment = EXERCISE_RULES[exerciseName] ?? 5;
  if (increment === 0) {
    return Array.from({ length: setCount }, () => formatSuggestedWeight(numericBaseline));
  }

  return getSetSuggestionRatios(setCount).map((ratio, index) => {
    if (index === 0) return formatSuggestedWeight(roundToIncrement(numericBaseline, increment));
    return formatSuggestedWeight(roundToIncrement(numericBaseline * ratio, increment));
  });
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
  // Epley loses accuracy past ~12 reps, so cap the rep term to keep
  // high-rep accessory sets from inflating the estimated max
  return w * (1 + Math.min(r, 12) / 30);
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

function calcWorkoutVolume(workout) {
  let total = 0;
  (workout?.exercises || []).forEach(ex => {
    (ex.sets || []).forEach(set => {
      const w = parseFloat(set.weight);
      const r = parseFloat(set.reps);
      if (!isNaN(w) && !isNaN(r) && w > 0 && r > 0) {
        total += w * r;
      }
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
      const dt = new Date(`${expected}T00:00:00`);
      dt.setDate(dt.getDate() - 1);
      expected = formatDateLocal(dt);
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

function calcWeeklyConsistency(workouts, weeks = 4) {
  if (!Array.isArray(workouts) || !workouts.length) return { average: 0, current: 0, buckets: [] };

  const buckets = [];
  const today = new Date(`${todayString()}T00:00:00`);

  for (let i = 0; i < weeks; i++) {
    const start = new Date(today);
    start.setDate(today.getDate() - (i * 7) - 6);
    const end = new Date(today);
    end.setDate(today.getDate() - (i * 7));

    const count = workouts.filter(workout => {
      if (!workout.date) return false;
      const dt = new Date(`${workout.date}T00:00:00`);
      return dt >= start && dt <= end;
    }).length;

    buckets.unshift({
      label: `${formatDateLocal(start).slice(5)}–${formatDateLocal(end).slice(5)}`,
      count
    });
  }

  const total = buckets.reduce((sum, bucket) => sum + bucket.count, 0);
  return {
    average: buckets.length ? total / buckets.length : 0,
    current: buckets[buckets.length - 1]?.count || 0,
    buckets
  };
}

function getLiftFocus(bestLifts) {
  const entries = Object.entries(bestLifts)
    .filter(([, value]) => value > 0)
    .sort((a, b) => a[1] - b[1]);

  if (!entries.length) return null;
  const [key, value] = entries[0];
  return {
    key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value
  };
}

function buildPowerRecommendations(context) {
  const items = [];

  if (!context.sessionCount) {
    return [
      "Log your first full workout to unlock score deltas, trends, and lift-focused recommendations.",
      "Add manual maxes if you want the rank to reflect current strength before enough sessions are logged.",
      "Fill in body metrics to enable relative-strength and lean-efficiency scoring."
    ];
  }

  if (!context.body.bodyWeight) {
    items.push("Add bodyweight in Body Metrics so relative strength can influence the rank more accurately.");
  }

  if (!context.body.bodyFat) {
    items.push("Add body fat % to turn on lean-mass efficiency and physique-adjusted scoring.");
  }

  const daysGoal = state.settings?.daysPerWeek || SETTINGS_DEFAULT.daysPerWeek;
  if (context.currentWeekSessions < daysGoal) {
    items.push(`You have ${context.currentWeekSessions} session${context.currentWeekSessions === 1 ? "" : "s"} in the current 7-day window against a ${daysGoal}-day goal; closing that gap raises consistency and momentum.`);
  }

  if (context.liftFocus) {
    items.push(`${context.liftFocus.label} is your lowest powered lift group right now, so that is the fastest place to push for rank gains.`);
  }

  if (context.scoreDelta <= 0 && context.sessionCount > 1) {
    items.push("Your score is flat versus the prior logged workout; a PR, stronger consistency, or updated body metrics would move it again.");
  }

  return items.slice(0, 3);
}

function calcPowerHistory(workouts) {
  return workouts
    .slice()
    .reverse()
    .map((workout, idx, ordered) => {
      const subset = ordered.slice(0, idx + 1);
      return {
        name: workout.name,
        date: workout.date || "—",
        score: calcPowerData(subset, { includeHistory: false }).score,
        volume: calcWorkoutVolume(workout)
      };
    });
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

function calcPowerData(workoutsInput = state.workouts || [], options = {}) {
  const workouts = Array.isArray(workoutsInput) ? workoutsInput : [];
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

  const bestLifts = {
    bench: Math.round(bestBench),
    squat: Math.round(bestSquat),
    deadlift: Math.round(bestDeadlift),
    press: Math.round(bestPress),
    pull: Math.round(bestPull)
  };

  const body = calcBodyData();
  const bw = body.bodyWeight || 0;
  const lbm = body.leanMass || 0;
  const weeklyConsistency = calcWeeklyConsistency(workouts);

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
  const breakdown = [
    { key: "strength", label: "Strength", value: absoluteStrengthPoints },
    { key: "relative", label: "Relative", value: physiqueAdjustedRelative },
    { key: "lean", label: "Lean", value: leanAdjusted },
    { key: "volume", label: "Volume", value: volumePoints },
    { key: "sessions", label: "Sessions", value: sessionPoints },
    { key: "streak", label: "Streak", value: streakPoints }
  ];

  if (options.includeHistory === false) {
    return {
      score,
      rank,
      streak,
      sessionCount,
      totalVolume,
      bestBench: bestLifts.bench,
      bestSquat: bestLifts.squat,
      bestDeadlift: bestLifts.deadlift,
      bestPress: bestLifts.press,
      bestPull: bestLifts.pull,
      relativeStrength: Math.round(relativeStrengthRaw),
      leanEfficiency: Math.round(leanMassEfficiencyRaw),
      body,
      bestLifts,
      breakdown,
      weeklyConsistency
    };
  }

  const history = calcPowerHistory(workouts);
  const previousScore = history.length > 1 ? history[history.length - 2].score : 0;
  const scoreDelta = score - previousScore;
  const recentHistory = history.slice(-6);
  const liftFocus = getLiftFocus(bestLifts);
  const recommendations = buildPowerRecommendations({
    body,
    currentWeekSessions: weeklyConsistency.current,
    liftFocus,
    scoreDelta,
    sessionCount
  });

  return {
    score,
    rank,
    streak,
    sessionCount,
    totalVolume,
    bestBench: bestLifts.bench,
    bestSquat: bestLifts.squat,
    bestDeadlift: bestLifts.deadlift,
    bestPress: bestLifts.press,
    bestPull: bestLifts.pull,
    relativeStrength: Math.round(relativeStrengthRaw),
    leanEfficiency: Math.round(leanMassEfficiencyRaw),
    body,
    bestLifts,
    breakdown,
    weeklyConsistency,
    previousScore,
    scoreDelta,
    history: recentHistory,
    lastWorkoutScore: recentHistory.length ? recentHistory[recentHistory.length - 1].score : 0,
    liftFocus,
    recommendations
  };
}

// ==============================
// PANELS
// ==============================

function renderPowerPanel() {
  const panel = document.getElementById("powerPanel");
  if (!panel) return;
  const p = calcPowerData();
  const maxScore = Math.max(...p.history.map(item => item.score), 1);
  const sparkBars = p.history.length
    ? p.history.map(point => {
        const height = Math.max(18, Math.round((point.score / maxScore) * 72));
        return `
          <div class="power-spark-item" title="${escapeHtml(point.name)} · ${point.date} · ${point.score.toLocaleString()}">
            <span class="power-spark-value">${point.score.toLocaleString()}</span>
            <div class="power-spark-bar" style="height:${height}px"></div>
            <span>${point.date.slice(5)}</span>
          </div>
        `;
      }).join("")
    : '<div class="power-empty">Save a workout to unlock score trend tracking.</div>';

  const rankLadder = RANKS.map(r => {
    const stateClass = r.rank === p.rank.current.rank
      ? " active"
      : r.min < p.rank.current.min ? " done" : "";
    return `
      <div class="power-rank-step${stateClass}">
        <strong>${r.rank}</strong>
        <span>${r.min.toLocaleString()}+</span>
      </div>
    `;
  }).join("");

  const breakdownCards = p.breakdown
    .map(item => `
      <div class="power-breakdown-card">
        <span>${item.label}</span>
        <strong>${item.value.toLocaleString()}</strong>
      </div>
    `)
    .join("");

  const liftCards = Object.entries(p.bestLifts)
    .map(([key, value]) => `
      <div class="power-lift-card">
        <span>${key.charAt(0).toUpperCase() + key.slice(1)}</span>
        <strong>${value || "—"}</strong>
      </div>
    `)
    .join("");

  const recommendationList = p.recommendations
    .map(item => `<li>${item}</li>`)
    .join("");

  const deltaClass = p.scoreDelta > 0 ? "positive" : p.scoreDelta < 0 ? "negative" : "neutral";
  const deltaPrefix = p.scoreDelta > 0 ? "+" : "";

  const insights = calcLiftInsights(p);
  const insightSection = insights
    ? `
      <section class="power-card power-card-wide">
        <div class="power-section-title">Lift Intelligence</div>
        <div class="power-insight-grid">
          <div class="power-focus-box">
            <div class="power-focus-label">Strongest Lift</div>
            <strong>${insights.strongest.label}</strong>
            <span>${insights.strongest.value.toLocaleString()} lb est 1RM</span>
          </div>
          <div class="power-focus-box">
            <div class="power-focus-label">Fastest Improving</div>
            <strong>${insights.fastest ? insights.fastest.label : "—"}</strong>
            <span>${insights.fastest ? `+${Math.round(insights.fastest.gain)} lb est over recent sessions` : "No lift is trending up yet."}</span>
          </div>
          <div class="power-focus-box">
            <div class="power-focus-label">Weakest Lift</div>
            <strong>${insights.weakest.label}</strong>
            <span>${insights.weakest.value.toLocaleString()} lb est 1RM</span>
          </div>
          <div class="power-focus-box highlight">
            <div class="power-focus-label">Improve Next</div>
            <strong>${insights.focus.label}</strong>
            <span>≈ +${insights.focus.pointsPer10.toLocaleString()} points per +10 lb on this lift</span>
          </div>
        </div>
      </section>
    `
    : `
      <section class="power-card power-card-wide">
        <div class="power-section-title">Lift Intelligence</div>
        <div class="power-empty">Log workouts or add manual maxes to unlock strongest, weakest, and fastest-improving lift insights.</div>
      </section>
    `;

  panel.innerHTML = `
    <div class="power-shell">
      <section class="power-card power-card-hero">
        <div class="power-headline">
          <div>
            <div class="power-kicker">Power Rank</div>
            <div class="power-rank-row">
              <div class="power-rank">${p.rank.current.rank}</div>
              <div>
                <div class="power-index">Power Index ${p.score.toLocaleString()}</div>
                <div class="power-delta ${deltaClass}">${p.sessionCount > 1 ? `${deltaPrefix}${p.scoreDelta.toLocaleString()} vs previous log` : "Save another workout to track score changes"}</div>
              </div>
            </div>
          </div>
          <div class="power-stat-chip-wrap">
            <div class="power-stat-chip"><span>Sessions</span><strong>${p.sessionCount}</strong></div>
            <div class="power-stat-chip"><span>Streak</span><strong>${p.streak}</strong></div>
            <div class="power-stat-chip"><span>7d Sessions</span><strong>${p.weeklyConsistency.current}</strong></div>
            <div class="power-stat-chip"><span>LBM</span><strong>${p.body.leanMass ? Math.round(p.body.leanMass) : "—"}</strong></div>
          </div>
        </div>

        <div>
          <div class="power-progress-row">
            <span>${p.rank.current.rank} Rank</span>
            <span>${p.rank.next ? `${p.rank.remaining.toLocaleString()} to ${p.rank.next.rank}` : "Max Rank"}</span>
          </div>
          <div class="power-progress-track">
            <div class="power-progress-fill" style="width:${p.rank.progress}%"></div>
          </div>
          <div class="power-rank-ladder">${rankLadder}</div>
        </div>
      </section>

      <section class="power-card">
        <div class="power-section-title">Score Breakdown</div>
        <div class="power-breakdown-grid">${breakdownCards}</div>
      </section>

      <section class="power-card">
        <div class="power-section-title">Lift Focus</div>
        <div class="power-focus-grid">
          <div>
            <div class="power-focus-label">Best Lift Snapshot</div>
            <div class="power-lift-grid">${liftCards}</div>
          </div>
          <div class="power-focus-box">
            <div class="power-focus-label">Fastest Next Gain</div>
            <strong>${p.liftFocus ? `${p.liftFocus.label} group` : "No lift data yet"}</strong>
            <span>${p.liftFocus ? `${p.liftFocus.value} est. best` : "Log sets or add maxes to find your current focus lift."}</span>
          </div>
          <div class="power-focus-box">
            <div class="power-focus-label">Efficiency</div>
            <strong>${p.relativeStrength || "—"}</strong>
            <span>Relative Strength · Lean Efficiency ${p.leanEfficiency || "—"}</span>
          </div>
        </div>
      </section>

      <section class="power-card">
        <div class="power-section-title">Score Trend</div>
        <div class="power-sparkline">${sparkBars}</div>
      </section>

      ${insightSection}

      <section class="power-card power-card-wide">
        <div class="power-section-title">Coach Notes</div>
        <ul class="power-recommendations">${recommendationList}</ul>
      </section>
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
  if (!panel) return;
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
  const panel = document.getElementById("bodyMetricsPanel");
  if (!panel) return;
  panel.style.marginTop = "12px";
  panel.style.padding = "12px";
  panel.style.border = "1px solid var(--border)";
  panel.style.borderRadius = "16px";
  panel.style.background = "rgba(255,255,255,.025)";

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

function persistQlDraft() {
  if (!qlDay) return;
  state.qlDrafts[qlDay] = {
    date: document.getElementById("qlDate")?.value || todayString(),
    bodyWeight: document.getElementById("qlBodyWt")?.value || "",
    notes: document.getElementById("qlNotes")?.value || "",
    entries: deepClone(qlEntries)
  };
  saveState();
}

function clearQlDraft(day) {
  delete state.qlDrafts[day];
  saveState();
}

function getQlDraft(day) {
  const draft = state.qlDrafts?.[day];
  if (!draft || !Array.isArray(draft.entries)) return null;
  return deepClone(draft);
}

function attachDraftAutoSave() {
  const exList = document.getElementById("exList");
  if (!exList) return;
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
      const validSets = ex.sets.filter(set => set.weight && set.reps);
      if (!validSets.length) continue;

      const weight = parseFloat(validSets[0].weight);
      const reps = validSets.map(set => parseFloat(set.reps)).filter(Number.isFinite);
      const avgReps = reps.length ? reps.reduce((sum, rep) => sum + rep, 0) / reps.length : 0;

      return {
        weight: validSets[0].weight,
        reps: validSets[0].reps,
        avgReps,
        setCount: validSets.length,
        sets: validSets,
        numericWeight: Number.isFinite(weight) ? weight : 0
      };
    }
  }
  return null;
}

function suggestWeight(exerciseName, lastPerformance, startWeight = "", targetReps = 8, recovery = null) {
  if (!lastPerformance) {
    return {
      value: String(startWeight || ""),
      reason: startWeight ? "Using your preset until you log this movement." : "Log this movement once to unlock a recommendation."
    };
  }

  const weight = parseFloat(lastPerformance.weight);
  if (!Number.isFinite(weight)) {
    return {
      value: String(startWeight || ""),
      reason: "Invalid prior weight; falling back to your preset."
    };
  }

  const reps = (lastPerformance.sets || [])
    .map(set => parseFloat(set.reps))
    .filter(Number.isFinite);
  const jump = EXERCISE_RULES[exerciseName] ?? 5;

  // Double progression window: work targetReps → targetReps+2, then add weight
  const repLow = Math.max(1, targetReps);
  const repHigh = targetReps + 2;
  const allAtTop = reps.length && reps.every(rep => rep >= repHigh);
  const allInRange = reps.length && reps.every(rep => rep >= repLow);
  const averageReps = reps.length ? reps.reduce((sum, rep) => sum + rep, 0) / reps.length : 0;

  if (jump === 0) {
    return {
      value: String(weight),
      reason: allAtTop
        ? `Every set reached ${repHigh}+ reps — add a rep per set or slow the tempo to keep progressing.`
        : `Bodyweight / band movement: build each set toward ${repHigh} controlled reps before adding load.`
    };
  }

  // 3-session plateau at the same top weight → deload and rebuild
  const stats = calcExerciseStats(exerciseName);
  if (stats && stats.sessions.length >= 3) {
    const [a, b, c] = stats.sessions; // newest first
    if (a.topWeight === b.topWeight && b.topWeight === c.topWeight && a.best1RM <= c.best1RM + 0.1) {
      const deload = roundToIncrement(weight * 0.9, jump);
      if (deload > 0 && deload < weight) {
        return {
          value: String(deload),
          reason: `Stalled at ${formatSuggestedWeight(weight)} lb for 3 sessions — deload ~10% and rebuild with crisp reps to break the plateau.`
        };
      }
    }
  }

  if (allAtTop) {
    let reason = `All sets hit the top of the ${repLow}–${repHigh} rep range, so add ${jump} lb and restart at ${repLow} reps.`;
    if (recovery?.level === "fatigued") reason += " Recovery is low, so leave a rep in the tank.";
    return {
      value: String(weight + jump),
      reason
    };
  }

  if (allInRange) {
    return {
      value: String(weight),
      reason: `You're inside the ${repLow}–${repHigh} range. Keep the load and push each set toward ${repHigh} reps — the weight increase comes next.`
    };
  }

  if (averageReps > 0 && averageReps <= Math.max(1, repLow - 2)) {
    return {
      value: String(weight),
      reason: `Reps fell well short (avg ${averageReps.toFixed(1)}). Repeat the weight and own ${repLow} clean reps per set first.`
    };
  }

  return {
    value: String(weight),
    reason: `Close to the ${repLow}-rep floor — repeat the load and clean up the remaining reps before progressing.`
  };
}

// ==============================
// TRAINING INTELLIGENCE
// ==============================

function validSetsOf(ex) {
  return (ex?.sets || [])
    .map(set => ({ weight: parseFloat(set.weight), reps: parseFloat(set.reps) }))
    .filter(set => Number.isFinite(set.weight) && Number.isFinite(set.reps) && set.weight > 0 && set.reps > 0);
}

function calcRecoveryData(workouts = state.workouts || []) {
  const streak = calcStreakDays(workouts);

  if (!workouts.length) {
    return {
      score: 100, level: "excellent", emoji: "🟢", label: "Excellent", fatigue: "Fresh",
      daysSinceLast: null, lastVolume: 0, streak
    };
  }

  const lastDated = workouts.find(w => w.date);
  const days = lastDated ? daysSince(lastDated.date) : null;
  const lastVolume = calcWorkoutVolume(workouts[0]);

  let score = 100;
  if (days !== null) {
    if (days <= 0) score -= 40;
    else if (days === 1) score -= 18;
    else if (days === 2) score -= 6;
  }
  if (lastVolume >= 14000) score -= 22;
  else if (lastVolume >= 9000) score -= 12;
  else if (lastVolume >= 5000) score -= 5;
  score -= Math.min(streak * 7, 21);
  score = Math.max(0, Math.min(100, score));

  const level = score >= 70 ? "excellent" : score >= 40 ? "moderate" : "fatigued";
  const meta = {
    excellent: { emoji: "🟢", label: "Excellent", fatigue: "Fresh" },
    moderate: { emoji: "🟡", label: "Moderate", fatigue: "Moderate" },
    fatigued: { emoji: "🔴", label: "Fatigued", fatigue: "Fatigued" }
  }[level];

  return { score, level, ...meta, daysSinceLast: days, lastVolume, streak };
}

function countWeeklySets(workouts = state.workouts || []) {
  const today = new Date(`${todayString()}T00:00:00`);
  const start = new Date(today);
  start.setDate(today.getDate() - 6);

  let sets = 0;
  workouts.forEach(workout => {
    if (!workout.date) return;
    const dt = new Date(`${workout.date}T00:00:00`);
    if (isNaN(dt.getTime()) || dt < start || dt > today) return;
    (workout.exercises || []).forEach(ex => {
      sets += validSetsOf(ex).length;
    });
  });
  return sets;
}

function muscleGroupsFor(exerciseName) {
  if (EXERCISE_MUSCLES[exerciseName]) return EXERCISE_MUSCLES[exerciseName];
  const match = Object.keys(EXERCISE_MUSCLES).find(name => namesMatch(name, exerciseName));
  return match ? EXERCISE_MUSCLES[match] : [];
}

function calcWeeklyMuscleSets(workouts = state.workouts || []) {
  const totals = {};
  Object.keys(MUSCLE_TARGETS).forEach(key => { totals[key] = 0; });

  const today = new Date(`${todayString()}T00:00:00`);
  const start = new Date(today);
  start.setDate(today.getDate() - 6);

  workouts.forEach(workout => {
    if (!workout.date) return;
    const dt = new Date(`${workout.date}T00:00:00`);
    if (isNaN(dt.getTime()) || dt < start || dt > today) return;
    (workout.exercises || []).forEach(ex => {
      const setCount = validSetsOf(ex).length;
      if (!setCount) return;
      muscleGroupsFor(ex.name).forEach(muscle => {
        if (totals[muscle] !== undefined) totals[muscle] += setCount;
      });
    });
  });

  return totals;
}

function calcVolumeStatus(sets, target) {
  if (sets >= target.max) return { key: "high", label: "High" };
  if (sets >= target.min) return { key: "ok", label: "On Track" };
  if (sets > 0) return { key: "low", label: "Low" };
  return { key: "none", label: "Untrained" };
}

function activeMuscleTargets(muscleSets) {
  return Object.entries(MUSCLE_TARGETS).filter(([key]) => {
    if (key === "rehab") return state.settings?.split === "rehab" || (muscleSets[key] || 0) > 0;
    if (key === "core") return (muscleSets[key] || 0) > 0;
    return true;
  });
}

function buildCoachTip(weeklySessions, muscleSets) {
  const daysGoal = state.settings?.daysPerWeek || SETTINGS_DEFAULT.daysPerWeek;

  if (!state.workouts.length) {
    return "Pick your days per week, load the next workout, and log set 1. The plan adapts to whatever schedule you can actually keep.";
  }

  if (weeklySessions >= daysGoal) {
    const gaps = activeMuscleTargets(muscleSets)
      .filter(([key, target]) => muscleSets[key] < target.min)
      .sort((a, b) => (muscleSets[a[0]] / a[1].min) - (muscleSets[b[0]] / b[1].min));
    if (gaps.length) {
      const [key, target] = gaps[0];
      return `You've hit your ${daysGoal}-day goal this week. ${target.label} is still under target (${muscleSets[key]}/${target.min}+ sets) — bias it in your next session.`;
    }
    return `You've hit your ${daysGoal}-day goal and every muscle group is at or above its weekly set target. This is exactly how results happen — keep the loads progressing.`;
  }

  const remaining = daysGoal - weeklySessions;
  return `${weeklySessions} of ${daysGoal} sessions done in the last 7 days. ${remaining} more to hit your goal — the rotation picks up wherever you left off, so a missed day never derails the plan.`;
}

function calcExerciseStats(exerciseName, workouts = state.workouts || []) {
  const sessions = [];

  workouts.forEach(workout => {
    (workout.exercises || []).forEach(ex => {
      if (!namesMatch(ex.name, exerciseName)) return;
      const sets = validSetsOf(ex);
      if (!sets.length) return;

      let best = { value: 0, weight: 0, reps: 0 };
      let topWeight = 0;
      let volume = 0;
      let repCount = 0;

      sets.forEach(set => {
        const e = est1RM(set.weight, set.reps);
        if (e > best.value) best = { value: e, weight: set.weight, reps: set.reps };
        topWeight = Math.max(topWeight, set.weight);
        volume += set.weight * set.reps;
        repCount += set.reps;
      });

      sessions.push({
        date: workout.date || "",
        workoutName: workout.name || "",
        volume,
        best1RM: best.value,
        bestSet: best,
        topWeight,
        setCount: sets.length,
        repCount,
        sets
      });
    });
  });

  if (!sessions.length) return null;

  let lifetimeVolume = 0;
  let totalSets = 0;
  let totalReps = 0;
  let best1RM = { value: 0, weight: 0, reps: 0, date: "" };
  let heaviest = { weight: 0, reps: 0, date: "" };
  const repsAtWeight = {};

  sessions.forEach(session => {
    lifetimeVolume += session.volume;
    totalSets += session.setCount;
    totalReps += session.repCount;
    session.sets.forEach(set => {
      const e = est1RM(set.weight, set.reps);
      if (e > best1RM.value) best1RM = { value: e, weight: set.weight, reps: set.reps, date: session.date };
      if (set.weight > heaviest.weight || (set.weight === heaviest.weight && set.reps > heaviest.reps)) {
        heaviest = { weight: set.weight, reps: set.reps, date: session.date };
      }
      const key = String(set.weight);
      if (!repsAtWeight[key] || set.reps > repsAtWeight[key].reps) {
        repsAtWeight[key] = { weight: set.weight, reps: set.reps, date: session.date };
      }
    });
  });

  // sessions arrive newest-first from state.workouts; recent trend reads oldest → newest
  const recent = sessions.slice(0, 5).reverse();

  return {
    name: exerciseName,
    sessionCount: sessions.length,
    lastPerformed: sessions[0].date,
    lifetimeVolume,
    avgReps: totalSets ? totalReps / totalSets : 0,
    best1RM,
    heaviest,
    bestRepSet: repsAtWeight[String(heaviest.weight)] || null,
    recent,
    sessions
  };
}

function detectPRs(workout, priorWorkouts) {
  const prs = [];

  const volume = calcWorkoutVolume(workout);
  if (priorWorkouts.length && volume > 0) {
    let priorMaxVolume = 0;
    priorWorkouts.forEach(w => {
      priorMaxVolume = Math.max(priorMaxVolume, calcWorkoutVolume(w));
    });
    if (volume > priorMaxVolume) {
      prs.push({
        type: "volume",
        label: "Highest Workout Volume",
        detail: `${Math.round(volume).toLocaleString()} lb total (was ${Math.round(priorMaxVolume).toLocaleString()})`
      });
    }
  }

  (workout.exercises || []).forEach(ex => {
    const sets = validSetsOf(ex);
    if (!sets.length) return;

    let prior1RM = 0;
    let priorHeaviest = 0;
    const priorRepsAtWeight = {};

    priorWorkouts.forEach(w => {
      (w.exercises || []).forEach(pe => {
        if (!namesMatch(pe.name, ex.name)) return;
        validSetsOf(pe).forEach(set => {
          prior1RM = Math.max(prior1RM, est1RM(set.weight, set.reps));
          priorHeaviest = Math.max(priorHeaviest, set.weight);
          const key = String(set.weight);
          priorRepsAtWeight[key] = Math.max(priorRepsAtWeight[key] || 0, set.reps);
        });
      });
    });

    if (!prior1RM) return; // first log of a movement sets the baseline, not a PR

    let new1RM = 0;
    let newHeaviest = 0;
    sets.forEach(set => {
      new1RM = Math.max(new1RM, est1RM(set.weight, set.reps));
      newHeaviest = Math.max(newHeaviest, set.weight);
    });

    if (new1RM > prior1RM + 0.1) {
      prs.push({
        type: "1rm",
        label: `${ex.name} · Est 1RM`,
        detail: `${Math.round(new1RM)} lb est (was ${Math.round(prior1RM)})`
      });
    }

    if (newHeaviest > priorHeaviest) {
      prs.push({
        type: "weight",
        label: `${ex.name} · Heaviest Weight`,
        detail: `${newHeaviest} lb (was ${priorHeaviest})`
      });
    }

    let bestRepPR = null;
    sets.forEach(set => {
      const prior = priorRepsAtWeight[String(set.weight)];
      if (prior && set.reps > prior) {
        const gain = set.reps - prior;
        if (!bestRepPR || gain > bestRepPR.gain) {
          bestRepPR = { weight: set.weight, reps: set.reps, prior, gain };
        }
      }
    });
    if (bestRepPR) {
      prs.push({
        type: "reps",
        label: `${ex.name} · Rep Record`,
        detail: `${bestRepPR.reps} reps at ${bestRepPR.weight} lb (was ${bestRepPR.prior})`
      });
    }
  });

  return prs;
}

function generateCoachingInsight(workout, allWorkouts) {
  const group = dayGroup(workout.name);

  // 1) Progression streak: top-set est 1RM up three sessions in a row
  for (const ex of (workout.exercises || [])) {
    if (!validSetsOf(ex).length) continue;
    const stats = calcExerciseStats(ex.name, allWorkouts);
    if (!stats || stats.sessions.length < 3) continue;
    const [a, b, c] = stats.sessions; // newest first
    if (a.best1RM > b.best1RM + 0.1 && b.best1RM > c.best1RM + 0.1) {
      return `Excellent progression. ${ex.name} has improved three sessions in a row.`;
    }
  }

  // 2) Plateau: same top weight with no est 1RM gain across three sessions
  for (const ex of (workout.exercises || [])) {
    if (!validSetsOf(ex).length) continue;
    const stats = calcExerciseStats(ex.name, allWorkouts);
    if (!stats || stats.sessions.length < 3) continue;
    const [a, b, c] = stats.sessions;
    if (a.topWeight === b.topWeight && b.topWeight === c.topWeight && a.best1RM <= c.best1RM + 0.1) {
      return `${ex.name} has plateaued over three sessions. Consider increasing rest next workout.`;
    }
  }

  // 3) Consistency within the muscle group
  const groupCount = allWorkouts.filter(w => dayGroup(w.name) === group).length;
  if (groupCount >= 3) {
    return `Great consistency. ${groupCount} ${group} workouts completed.`;
  }

  // 4) Volume versus the previous session of the same day
  const previousSameDay = allWorkouts.find(w => w !== workout && w.name === workout.name);
  if (previousSameDay) {
    const nowVol = calcWorkoutVolume(workout);
    const prevVol = calcWorkoutVolume(previousSameDay);
    if (prevVol > 0 && nowVol > prevVol) {
      const pct = Math.round(((nowVol - prevVol) / prevVol) * 100);
      if (pct >= 1) return `Total volume was up ${pct}% versus your last ${workout.name} session. Strong work.`;
    }
  }

  const streak = calcStreakDays(allWorkouts);
  if (streak >= 2) {
    return `Great consistency. You're on a ${streak}-day training streak.`;
  }

  return "Solid session logged. Keep stacking consistent workouts to unlock deeper insights.";
}

const POWER_LIFT_LABELS = { bench: "Bench", squat: "Squat", deadlift: "Deadlift", press: "Press", pull: "Pull" };
const POWER_ABS_MULT = { bench: 1.7, squat: 1.9, deadlift: 1.9, press: 1.5, pull: 1.4 };
const POWER_REL_MULT = { bench: 210, squat: 250, deadlift: 250, press: 170, pull: 160 };
const POWER_LEAN_MULT = { bench: 160, squat: 185, deadlift: 185, press: 130, pull: 125 };

function calcLiftInsights(p, workouts = state.workouts || []) {
  const entries = Object.entries(p.bestLifts).filter(([, value]) => value > 0);
  if (!entries.length) return null;

  const strongest = entries.reduce((best, entry) => (entry[1] > best[1] ? entry : best));
  const weakest = entries.reduce((low, entry) => (entry[1] < low[1] ? entry : low));

  // fastest improving: best est 1RM gained across each group's last four logged sessions
  const chronological = workouts.slice().reverse();
  let fastest = null;
  Object.keys(POWER_LIFT_GROUPS).forEach(key => {
    const series = [];
    chronological.forEach(w => {
      const best = bestLiftForNames([w], POWER_LIFT_GROUPS[key]);
      if (best > 0) series.push(best);
    });
    if (series.length < 2) return;
    const window = series.slice(-4);
    const gain = window[window.length - 1] - window[0];
    if (gain > 0.5 && (!fastest || gain > fastest.gain)) {
      fastest = { key, label: POWER_LIFT_LABELS[key], gain };
    }
  });

  const focusKey = weakest[0];
  const body = p.body || {};
  const gain = 10;
  let points = gain * (POWER_ABS_MULT[focusKey] || 1.5);
  if (body.bodyWeight > 0) {
    points += (gain / body.bodyWeight) * (POWER_REL_MULT[focusKey] || 180)
      * (body.heightModifier || 1) * (body.bodyFatModifier || 1) * (body.ageModifier || 1);
  }
  if (body.leanMass > 0) {
    points += (gain / body.leanMass) * (POWER_LEAN_MULT[focusKey] || 150) * (body.bodyFatModifier || 1);
  }

  return {
    strongest: { key: strongest[0], label: POWER_LIFT_LABELS[strongest[0]], value: strongest[1] },
    weakest: { key: weakest[0], label: POWER_LIFT_LABELS[weakest[0]], value: weakest[1] },
    fastest,
    focus: {
      key: focusKey,
      label: POWER_LIFT_LABELS[focusKey],
      pointsPer10: Math.round(points)
    }
  };
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

function rebuildSetRows(body, count, suggested, entryValues = [], exerciseName = "") {
  body.querySelectorAll(".setRow").forEach(row => row.remove());

  for (let i = 0; i < count; i++) {
    const entry = entryValues[i] || {};
    const row = document.createElement("div");
    row.className = "setRow";
    row.dataset.index = String(i);
    row.innerHTML = `
      <div class="set-label">
        <span>Set ${i + 1}</span>
        <small>${i === 0 ? "Baseline" : "Follow-up"}</small>
      </div>
      <input class="weight" placeholder="${escapeHtml(i === 0 ? (suggested || "weight") : "set 1 drives suggestion")}" value="${escapeHtml(entry.weight ?? (i === 0 ? (suggested ?? "") : ""))}">
      <input class="reps" placeholder="reps" value="${escapeHtml(entry.reps ?? "")}">
      <div class="set-suggestion${i === 0 && suggested ? " ready" : ""}"><strong>${i === 0 ? `Open with ${suggested || "your working weight"}` : "Enter set 1 weight"}</strong><span>${i === 0 ? "Use your target working load as the baseline." : "Suggestions for later sets will update automatically."}</span></div>
      <button class="ghost rest-btn" type="button">Rest</button>
    `;
    row.querySelector(".rest-btn").onclick = () => startRestTimer(90);
    body.appendChild(row);
  }

  wireSetSuggestionInputs(body, exerciseName, suggested);
}

function updateSetSuggestionUI(body, exerciseName, fallbackSuggested = "") {
  const rows = [...body.querySelectorAll(".setRow")];
  if (!rows.length) return;

  const baselineInput = rows[0].querySelector(".weight");
  const baselineWeight = baselineInput?.value.trim() || fallbackSuggested || "";
  const suggestions = buildSetWeightSuggestions(exerciseName, rows.length, baselineWeight);

  rows.forEach((row, index) => {
    const input = row.querySelector(".weight");
    const box = row.querySelector(".set-suggestion");
    if (!input || !box) return;

    if (index === 0) {
      const starter = fallbackSuggested || "your working weight";
      box.classList.toggle("ready", Boolean(baselineInput?.value.trim() || fallbackSuggested));
      box.innerHTML = `<strong>${baselineInput?.value.trim() ? `Baseline ${baselineInput.value.trim()}` : `Open with ${starter}`}</strong><span>${baselineInput?.value.trim() ? "Remaining set suggestions are now anchored to set 1." : "Use your target working load as the baseline."}</span>`;
      return;
    }

    const suggestion = suggestions[index] || "";
    if (suggestion && !input.value.trim()) {
      input.placeholder = suggestion;
    }
    box.classList.toggle("ready", Boolean(suggestion));
    box.innerHTML = suggestion
      ? `<strong>${suggestion}</strong><span>Suggested from your set 1 load.</span>`
      : `<strong>Enter set 1 weight</strong><span>Later-set suggestions will appear here.</span>`;
  });
}

function wireSetSuggestionInputs(body, exerciseName, fallbackSuggested = "") {
  const rows = [...body.querySelectorAll(".setRow")];
  if (!rows.length) return;

  const baselineInput = rows[0].querySelector(".weight");
  baselineInput?.addEventListener("input", () => {
    const suggestions = buildSetWeightSuggestions(exerciseName, rows.length, baselineInput.value.trim());
    rows.forEach((row, index) => {
      const input = row.querySelector(".weight");
      if (!input || index === 0) return;
      const nextSuggestion = suggestions[index] || "";
      if (!input.value.trim()) {
        input.value = nextSuggestion;
      }
    });
    updateSetSuggestionUI(body, exerciseName, fallbackSuggested);
    persistDraftForDay();
    renderTrackerProgress();
  });

  rows.forEach(row => {
    row.querySelectorAll("input").forEach(input => {
      input.addEventListener("input", () => {
        updateSetSuggestionUI(body, exerciseName, fallbackSuggested);
        renderTrackerProgress();
      });
    });
  });

  updateSetSuggestionUI(body, exerciseName, fallbackSuggested);
}

function buildWarmupHTML(exerciseName, workingWeight) {
  const w = parseFloat(workingWeight);
  const increment = EXERCISE_RULES[exerciseName] ?? 5;

  if (increment === 0) {
    return `<strong>Warm-up</strong><span>2 easy sets of half your working reps, then go.</span>`;
  }
  if (!Number.isFinite(w) || w <= 0) {
    return `<strong>Warm-up</strong><span>Enter a set 1 weight to get a ramp-up plan.</span>`;
  }
  if (w < 90) {
    return `<strong>Warm-up</strong><span>Light load — one easy set of 12–15 at about half weight (${formatSuggestedWeight(roundToIncrement(w * 0.5, increment) || increment)} lb) is plenty.</span>`;
  }

  const steps = [
    { pct: 0.4, reps: 5 },
    { pct: 0.6, reps: 3 },
    { pct: 0.8, reps: 1 }
  ].map(step => `${formatSuggestedWeight(roundToIncrement(w * step.pct, increment))} × ${step.reps}`);

  return `
    <strong>Warm-up ramp to ${formatSuggestedWeight(w)} lb</strong>
    <span>Start light (empty bar / lightest stack) × 10, then ${steps.join(" → ")}. Rest ~60s between ramp sets, then hit set 1.</span>
  `;
}

function applyPresetToRows(body, value, exerciseName = "") {
  const weights = body.querySelectorAll(".weight");
  weights.forEach((input, index) => {
    input.value = index === 0 ? value : input.value;
  });
  updateSetSuggestionUI(body, exerciseName, value);
  persistDraftForDay();
  renderTrackerProgress();
}

// ==============================
// RENDER
// ==============================

function renderTabs() {
  const tabbar = document.getElementById("tabbar");
  if (!tabbar) return;
  tabbar.innerHTML = "";

  getRoutine().forEach(day => {
    const btn = document.createElement("button");
    btn.className = `tab${day === selectedDay ? " active" : ""}`;
    btn.textContent = day;
    btn.onclick = () => loadTemplate(day);
    tabbar.appendChild(btn);
  });
}

function renderStats() {
  const nextEl = document.getElementById("nextStat");
  const sessionsEl = document.getElementById("sessionsStat");
  const streakEl = document.getElementById("streakStat");
  const lastEl = document.getElementById("lastStat");
  if (!nextEl || !sessionsEl || !streakEl || !lastEl) return;

  nextEl.textContent = state.nextWorkout || "—";
  sessionsEl.textContent = state.workouts.length;
  streakEl.textContent = calcStreakDays(state.workouts);
  lastEl.textContent = state.workouts[0]?.name || "—";
}

function sparklineHTML(points, title, formatter = (v) => String(Math.round(v))) {
  if (!points.length) return "";
  const max = Math.max(...points.map(p => p.value), 1);
  const bars = points.map(p => {
    const height = Math.max(6, Math.round((p.value / max) * 34));
    const dateLabel = p.date ? p.date.slice(5) : "—";
    return `
      <div class="mini-spark-col" title="${escapeHtml(p.date || "")} · ${escapeHtml(formatter(p.value))}">
        <div class="mini-spark-bar" style="height:${height}px"></div>
        <span>${escapeHtml(dateLabel)}</span>
      </div>
    `;
  }).join("");

  const first = points[0].value;
  const lastVal = points[points.length - 1].value;
  const trend = points.length > 1
    ? (lastVal > first ? "▲" : lastVal < first ? "▼" : "▬")
    : "";
  const trendClass = lastVal > first ? "up" : lastVal < first ? "down" : "flat";

  return `
    <div class="mini-spark-wrap">
      <div class="mini-spark-head">
        <span>${escapeHtml(title)}</span>
        <strong class="mini-spark-trend ${trendClass}">${escapeHtml(formatter(lastVal))} ${trend}</strong>
      </div>
      <div class="mini-spark">${bars}</div>
    </div>
  `;
}

function buildReadinessRecommendation(recovery, groupDays) {
  if (recovery.level === "fatigued") {
    return "Recovery is low. Keep loads moderate or take an extra rest day.";
  }
  if (recovery.level === "moderate") {
    return "Recovery is decent. Hit your working sets, but save all-out PRs for a fresher day.";
  }
  if (groupDays === null) return "Fresh slate. Great day to set your baselines.";
  if (groupDays >= 2) return "Great day to push for a PR.";
  return "Recovery is good. Push your working sets with intent.";
}

function applyCoachSettings(daysPerWeek, split) {
  const routineBefore = getRoutine();
  state.settings = {
    daysPerWeek: Math.min(6, Math.max(2, parseInt(daysPerWeek, 10) || SETTINGS_DEFAULT.daysPerWeek)),
    split: SPLITS[split] ? split : splitForDays(daysPerWeek)
  };

  const routine = getRoutine();
  const splitChanged = routine !== routineBefore && !routine.includes(state.nextWorkout);
  if (splitChanged) {
    state.nextWorkout = routine[0];
  }

  saveState();

  if (splitChanged && currentPage === "workout") {
    stopSessionTimer();
    loadTemplate(state.nextWorkout);
    showToast(`Split changed — up next: ${state.nextWorkout}`, "success");
  }
}

let kyleNotesCollapsed = true;

function buildKyleNotesHTML() {
  return `
    <div class="program-notes">
      <div class="program-notes-head">
        <div class="coach-volume-title">Kyle's Program Notes</div>
        <button class="ghost mini" id="kyleNotesToggleBtn" type="button">${kyleNotesCollapsed ? "Show Notes" : "Hide Notes"}</button>
      </div>
      <div class="program-notes-body${kyleNotesCollapsed ? " hidden" : ""}">
        <div class="program-notes-grid">
          <div class="program-note">
            <strong>Notation Key</strong>
            <span>** increase weight · HFP hold until pain resolves · [Wx] extended reps at higher weight · [Rx] extended reps at same weight, 1-month break · + upward weight progression each set · xM months at weight. Follow the 2-month break schedule.</span>
          </div>
          <div class="program-note">
            <strong>Recovery Timeline</strong>
            <span>Injury 2/21/25 · Surgery 3/31/25 · All clear 6/18/25 · Return to form (non-bicep) 11/18/25 · Return to form (all) TBD. Add biceps back after recovered — currently only light forearm work and holds.</span>
          </div>
          <div class="program-note">
            <strong>Current Holds &amp; HFP</strong>
            <span>Shrugs hold at 225 · Pull-ups hold until 200 on Machine Pulldown · HFP: Leg Extension, Machine Pulldown (100), Machine Rows (100), Forearm Extensions (45). Barbell Curls progress upward each set, flip at 105.</span>
          </div>
          <div class="program-note">
            <strong>PR 3-Lift Reps · 1,005 lb total @ 210 BW</strong>
            <span>Bench Press 5×5 @ 285 · SM Back Squat 5×5 @ 375 · Deadlift 5×5 @ 345. Attempt max lifts when reps are high.</span>
          </div>
          <div class="program-note">
            <strong>Abs Routine</strong>
            <span>Planks · Bikes · Crunches · Rotations (logged on Chest and Shoulders days). 26-32-22.</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderCoachPanel() {
  const panel = document.getElementById("coachPanel");
  if (!panel) return;

  const settings = state.settings || { ...SETTINGS_DEFAULT };
  const split = SPLITS[settings.split] || SPLITS.ppl;
  const weeklySessions = calcWeeklyConsistency(state.workouts).current;
  const muscleSets = calcWeeklyMuscleSets();
  const pace = Math.max(0, Math.min(100, Math.round((weeklySessions / settings.daysPerWeek) * 100)));
  const tip = buildCoachTip(weeklySessions, muscleSets);
  const recommendedSplit = splitForDays(settings.daysPerWeek);
  // Rehab and Kyle's program are deliberate choices — never suggest switching away
  const splitMismatch = !["rehab", "kyle"].includes(settings.split) && recommendedSplit !== settings.split;

  const dayOptions = [2, 3, 4, 5, 6]
    .map(n => `<option value="${n}" ${n === settings.daysPerWeek ? "selected" : ""}>${n} days / week</option>`)
    .join("");

  const splitOptions = Object.entries(SPLITS)
    .map(([key, s]) => `<option value="${key}" ${key === settings.split ? "selected" : ""}>${s.label} (${s.frequency})</option>`)
    .join("");

  const volumeBars = activeMuscleTargets(muscleSets).map(([key, target]) => {
    const sets = muscleSets[key] || 0;
    const status = calcVolumeStatus(sets, target);
    const fill = Math.max(0, Math.min(100, Math.round((sets / target.max) * 100)));
    return `
      <div class="volume-row">
        <div class="volume-row-head">
          <span>${target.label}</span>
          <strong class="volume-status ${status.key}">${sets} set${sets === 1 ? "" : "s"} · ${status.label}</strong>
        </div>
        <div class="volume-track">
          <div class="volume-fill ${status.key}" style="width:${fill}%"></div>
          <div class="volume-target-marker" style="left:${Math.round((target.min / target.max) * 100)}%"></div>
        </div>
      </div>
    `;
  }).join("");

  panel.innerHTML = `
    <section class="coach-card">
      <div class="readiness-head">
        <div>
          <div class="readiness-kicker">Coach Plan · ${escapeHtml(split.label)}</div>
          <div class="readiness-title">This week: ${weeklySessions} / ${settings.daysPerWeek} sessions</div>
        </div>
        <div class="readiness-reco">${escapeHtml(tip)}</div>
      </div>

      <div class="progress-track-wrap">
        <div class="progress-track"><div class="progress-fill" style="width:${pace}%"></div></div>
      </div>

      <div class="coach-settings">
        <div>
          <label for="coachDays">Training Days</label>
          <select id="coachDays">${dayOptions}</select>
        </div>
        <div>
          <label for="coachSplit">Split</label>
          <select id="coachSplit">${splitOptions}</select>
        </div>
        <div class="coach-settings-note">
          ${splitMismatch
            ? `For ${settings.daysPerWeek} days/week, ${SPLITS[recommendedSplit].label} usually fits best. <button class="ghost mini" id="coachApplySplitBtn" type="button">Switch</button>`
            : settings.split === "rehab"
              ? "Rehab mode: elbow-friendly pressing, neutral-grip pulling, slow-eccentric curls for the bicep tendon, and chin tucks / thoracic work for head posture in every session. Stop any set that causes sharp pain."
              : settings.split === "kyle"
                ? "Kyle's program: Mon Chest/Abs · Tue Legs · Wed Off/Yoga · Thu Back · Fri Shoulders/Abs · Sat Arms · Sun Off. Program key and recovery notes below."
                : "Split matches your schedule. The rotation continues from wherever you left off — no week is ever wasted."}
        </div>
      </div>

      <div class="coach-volume">
        <div class="coach-volume-title">Weekly Sets Per Muscle · last 7 days</div>
        ${volumeBars}
        <div class="coach-volume-legend">Marker = weekly minimum for growth. Land between the marker and the end of the bar.</div>
      </div>

      ${settings.split === "kyle" ? buildKyleNotesHTML() : ""}
    </section>
  `;

  document.getElementById("coachDays").onchange = (e) => {
    applyCoachSettings(parseInt(e.target.value, 10), state.settings.split);
    renderCoachPanel();
  };
  document.getElementById("coachSplit").onchange = (e) => {
    applyCoachSettings(state.settings.daysPerWeek, e.target.value);
    renderCoachPanel();
  };
  const applyBtn = document.getElementById("coachApplySplitBtn");
  if (applyBtn) {
    applyBtn.onclick = () => {
      applyCoachSettings(state.settings.daysPerWeek, recommendedSplit);
      renderCoachPanel();
    };
  }
  const kyleBtn = document.getElementById("kyleNotesToggleBtn");
  if (kyleBtn) {
    kyleBtn.onclick = () => {
      kyleNotesCollapsed = !kyleNotesCollapsed;
      renderCoachPanel();
    };
  }
}

function renderReadinessCard() {
  const panel = document.getElementById("readinessPanel");
  if (!panel) return;

  const group = dayGroup(selectedDay);
  const recovery = calcRecoveryData();
  const lastGroupWorkout = state.workouts.find(w => w.date && dayGroup(w.name) === group);
  const groupDays = lastGroupWorkout ? daysSince(lastGroupWorkout.date) : null;
  const lastWorkout = state.workouts.find(w => w.date) || state.workouts[0] || null;
  const weeklySets = countWeeklySets();
  const recommendation = buildReadinessRecommendation(recovery, groupDays);

  panel.innerHTML = `
    <section class="readiness-card">
      <div class="readiness-head">
        <div>
          <div class="readiness-kicker">Workout Readiness · ${escapeHtml(selectedDay)}</div>
          <div class="readiness-title">
            <span class="recovery-dot ${recovery.level}"></span>
            ${recovery.emoji} ${recovery.label} · ${escapeHtml(recovery.fatigue)}
          </div>
        </div>
        <div class="readiness-reco">${escapeHtml(recommendation)}</div>
      </div>
      <div class="readiness-grid">
        <div class="readiness-chip">
          <span>${escapeHtml(group)} Last Trained</span>
          <strong>${groupDays === null ? "Never" : groupDays === 0 ? "Today" : `${groupDays} day${groupDays === 1 ? "" : "s"} ago`}</strong>
        </div>
        <div class="readiness-chip">
          <span>Streak</span>
          <strong>${recovery.streak} day${recovery.streak === 1 ? "" : "s"}</strong>
        </div>
        <div class="readiness-chip">
          <span>Estimated Fatigue</span>
          <strong>${escapeHtml(recovery.fatigue)}</strong>
        </div>
        <div class="readiness-chip">
          <span>Last Workout</span>
          <strong>${lastWorkout ? escapeHtml(lastWorkout.date || "—") : "—"}</strong>
        </div>
        <div class="readiness-chip">
          <span>Weekly Sets</span>
          <strong>${weeklySets}</strong>
        </div>
      </div>
    </section>
  `;
}

let celebration = null;

function renderCelebrationPanel() {
  const panel = document.getElementById("celebrationPanel");
  if (!panel) return;

  if (!celebration) {
    panel.innerHTML = "";
    return;
  }

  const prBadges = celebration.prs.length
    ? `<div class="pr-badge-row">${celebration.prs.map(pr => `
        <div class="pr-badge">
          <span class="pr-badge-icon">🏆</span>
          <div>
            <strong>${escapeHtml(pr.label)}</strong>
            <span>${escapeHtml(pr.detail)}</span>
          </div>
        </div>
      `).join("")}</div>`
    : "";

  panel.innerHTML = `
    <section class="celebrate-card${celebration.prs.length ? " has-pr" : ""}">
      <div class="celebrate-head">
        <div>
          <div class="celebrate-kicker">${celebration.prs.length ? "🎉 Personal Records" : "Session Saved"}</div>
          <div class="celebrate-title">${escapeHtml(celebration.name)} · ${escapeHtml(celebration.date)}</div>
        </div>
        <button class="ghost mini" id="celebrateCloseBtn" type="button">Dismiss</button>
      </div>
      ${prBadges}
      <div class="insight-box"><span class="insight-icon">🧠</span>${escapeHtml(celebration.insight)}</div>
    </section>
  `;

  document.getElementById("celebrateCloseBtn").onclick = () => {
    celebration = null;
    renderCelebrationPanel();
  };
}

const analyticsExpanded = new Set();

function buildSuggestionHTML(last, suggested) {
  const lines = [];
  if (last) {
    lines.push(`Last workout: ${last.weight} × ${last.reps} over ${last.setCount} set${last.setCount === 1 ? "" : "s"}`);
    const best = (last.sets || []).reduce((max, set) => Math.max(max, est1RM(set.weight, set.reps)), 0);
    if (best > 0) lines.push(`Est 1RM: ${Math.round(best)} lb`);
  }
  return `
    <strong>Suggested: ${escapeHtml(suggested.value || "—")}</strong>
    ${lines.map(line => `<small class="suggest-line">${escapeHtml(line)}</small>`).join("")}
    <small>${escapeHtml(suggested.reason)}</small>
  `;
}

function buildAnalyticsHTML(stats) {
  const bestSetText = stats.best1RM.weight
    ? `${formatSuggestedWeight(stats.best1RM.weight)} × ${stats.best1RM.reps}`
    : "—";

  const badges = [];
  if (stats.best1RM.value > 0) {
    badges.push({ label: "Best Est 1RM", detail: `${Math.round(stats.best1RM.value)} lb${stats.best1RM.date ? ` · ${stats.best1RM.date}` : ""}` });
  }
  if (stats.heaviest.weight > 0) {
    badges.push({ label: "Heaviest Weight", detail: `${formatSuggestedWeight(stats.heaviest.weight)} lb${stats.heaviest.date ? ` · ${stats.heaviest.date}` : ""}` });
  }
  if (stats.bestRepSet) {
    badges.push({ label: "Most Reps at Top Weight", detail: `${stats.bestRepSet.reps} reps at ${formatSuggestedWeight(stats.bestRepSet.weight)} lb` });
  }

  const badgeRow = badges.length
    ? `<div class="pr-badge-row compact">${badges.map(b => `
        <div class="pr-badge">
          <span class="pr-badge-icon">🏅</span>
          <div>
            <strong>${escapeHtml(b.label)}</strong>
            <span>${escapeHtml(b.detail)}</span>
          </div>
        </div>
      `).join("")}</div>`
    : "";

  const sparks = stats.recent.length > 1
    ? `
      <div class="analytics-sparks">
        ${sparklineHTML(stats.recent.map(s => ({ date: s.date, value: s.topWeight })), "Weight", v => `${formatSuggestedWeight(v)} lb`)}
        ${sparklineHTML(stats.recent.map(s => ({ date: s.date, value: s.volume })), "Volume", v => `${Math.round(v).toLocaleString()} lb`)}
        ${sparklineHTML(stats.recent.map(s => ({ date: s.date, value: s.best1RM })), "Est 1RM", v => `${Math.round(v)} lb`)}
      </div>
    `
    : `<div class="analytics-note">Log another session to unlock trend graphs.</div>`;

  return `
    <div class="analytics-grid">
      <div class="readiness-chip"><span>Est 1RM</span><strong>${stats.best1RM.value ? `${Math.round(stats.best1RM.value)} lb` : "—"}</strong></div>
      <div class="readiness-chip"><span>Best Set</span><strong>${escapeHtml(bestSetText)}</strong></div>
      <div class="readiness-chip"><span>Lifetime Volume</span><strong>${Math.round(stats.lifetimeVolume).toLocaleString()} lb</strong></div>
      <div class="readiness-chip"><span>Sessions</span><strong>${stats.sessionCount}</strong></div>
      <div class="readiness-chip"><span>Last Performed</span><strong>${escapeHtml(stats.lastPerformed || "—")}</strong></div>
      <div class="readiness-chip"><span>Avg Reps</span><strong>${stats.avgReps ? stats.avgReps.toFixed(1) : "—"}</strong></div>
    </div>
    ${badgeRow}
    ${sparks}
  `;
}

function renderTrackerProgress() {
  const panel = document.getElementById("trackerProgress");
  if (!panel) return;

  const rows = [...document.querySelectorAll(".setRow")];
  const totalSets = rows.length || exercises.reduce((sum, ex) => sum + (parseInt(ex.sets, 10) || 0), 0);
  const completedSets = rows.filter(row => row.querySelector(".weight")?.value.trim() && row.querySelector(".reps")?.value.trim()).length;
  const completion = totalSets ? Math.round((completedSets / totalSets) * 100) : 0;
  const remaining = Math.max(totalSets - completedSets, 0);
  const nextPrompt = totalSets
    ? remaining === 0
      ? "All planned sets are logged. Save the workout when you're ready."
      : `${remaining} set${remaining === 1 ? "" : "s"} left to complete this session.`
    : "Load a workout day to start tracking session progress.";

  panel.innerHTML = `
    <section class="progress-card">
      <div class="progress-head">
        <div>
          <div class="progress-kicker">Live Session Progress</div>
          <div class="progress-title">${completedSets}/${totalSets || 0} sets logged</div>
          <div class="progress-copy">A quick completion view keeps the session easier to scan while you train.</div>
        </div>
        <div class="progress-pill-row">
          <div class="progress-pill"><span>Completion</span><strong>${completion}%</strong></div>
          <div class="progress-pill"><span>Planned Sets</span><strong>${totalSets || 0}</strong></div>
          <div class="progress-pill"><span>Remaining</span><strong>${remaining}</strong></div>
        </div>
      </div>
      <div class="progress-track-wrap">
        <div class="progress-track"><div class="progress-fill" style="width:${completion}%"></div></div>
      </div>
      <div class="progress-foot">
        <span>${nextPrompt}</span>
        <span>${selectedDay || state.nextWorkout || ""}</span>
      </div>
    </section>
  `;
}

function renderHistory() {
  const list = document.getElementById("histList");
  if (!list) return;
  list.innerHTML = "";

  if (!state.workouts.length) {
    list.innerHTML = `<div class="empty">No saved workouts yet.</div>`;
    return;
  }

  state.workouts.slice(0, 12).forEach((workout, index) => {
    const item = document.createElement("div");
    item.className = "hist-item";

    const exerciseNames = (workout.exercises || []).map(e => escapeHtml(e.name)).slice(0, 3).join(", ");

    item.innerHTML = `
      <div class="hist-head">
        <div>
          <strong>${escapeHtml(workout.name)}</strong>
          <div class="hist-meta">${escapeHtml(workout.date || "")}${workout.bodyWeight ? ` · BW ${escapeHtml(workout.bodyWeight)}` : ""}</div>
          <div class="history-detail">${exerciseNames}${(workout.exercises || []).length > 3 ? "..." : ""}</div>
          ${workout.focusNotes ? `<div class="history-detail">Focus: ${escapeHtml(workout.focusNotes)}</div>` : ""}
          ${workout.notes ? `<div class="history-detail">Notes: ${escapeHtml(workout.notes)}</div>` : ""}
        </div>
        <button class="ghost mini" type="button" data-del="${index}">Delete</button>
      </div>
    `;

    list.appendChild(item);
  });

  list.querySelectorAll("[data-del]").forEach(btn => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.del);
      const target = state.workouts[idx];
      if (!target) return;
      if (!confirm(`Delete "${target.name}"${target.date ? ` from ${target.date}` : ""}? This can't be undone.`)) return;
      state.workouts.splice(idx, 1);
      saveState();
      showToast("Workout deleted");
    };
  });
}

function renderExerciseToolbar() {
  const toolbar = document.getElementById("exerciseToolbar");
  if (!toolbar) return;
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
  const recovery = calcRecoveryData();

  exercises.forEach((ex, exIndex) => {
    const draftEx = draftExercises[exIndex] || null;
    const options = getDayOptions(selectedDay, ex.name);
    const last = findLastPerformance(ex.name);
    const suggested = suggestWeight(ex.name, last, ex.startWeight || "", ex.reps || 8, recovery);

    const card = document.createElement("div");
    card.className = "exercise-card";

    const head = document.createElement("div");
    head.className = "exercise-head";
    head.innerHTML = `
      <div>
        <h3>${ex.name}</h3>
        <div class="exercise-meta">${last ? `Last: ${last.weight} x ${last.reps} · avg ${last.avgReps.toFixed(1)} over ${last.setCount} set${last.setCount === 1 ? "" : "s"}` : "No previous log"}</div>
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
      <button class="danger" type="button">Delete</button>
    `;

const presetRow = document.createElement("div");
presetRow.className = "preset-row";
presetRow.innerHTML = `
  <div>
    <label>Preset / fallback weight</label>
    <input class="preset-weight" value="${escapeHtml(ex.startWeight || "")}" placeholder="135">
  </div>
  <button class="ghost" type="button">Use Preset</button>
  <div class="exercise-suggest">${buildSuggestionHTML(last, suggested)}</div>
`;

const demoRow = document.createElement("div");
demoRow.style.display = "flex";
demoRow.style.gap = "8px";
demoRow.style.flexWrap = "wrap";
demoRow.style.marginBottom = "10px";
demoRow.innerHTML = `
  <button class="ghost demo-btn" type="button">▶ Demo</button>
  <button class="ghost warmup-btn" type="button">🔥 Warm-up</button>
`;

const warmupBox = document.createElement("div");
warmupBox.className = "warmup-box hidden";

body.appendChild(editGrid);
body.appendChild(presetRow);
body.appendChild(demoRow);
body.appendChild(warmupBox);

    rebuildSetRows(body, ex.sets, suggested.value, draftEx?.entries || [], ex.name);

    const stats = calcExerciseStats(ex.name);
    const analyticsWrap = document.createElement("div");
    analyticsWrap.className = "analytics-wrap";
    const analyticsOpen = analyticsExpanded.has(ex.name);
    analyticsWrap.innerHTML = `
      <button class="ghost mini analytics-toggle" type="button">${analyticsOpen ? "Hide Analytics ▴" : "📊 Exercise Analytics ▾"}</button>
      <div class="analytics-panel${analyticsOpen ? "" : " hidden"}">
        ${stats ? buildAnalyticsHTML(stats) : `<div class="analytics-note">Log this movement once to unlock analytics.</div>`}
      </div>
    `;

    const analyticsBtn = analyticsWrap.querySelector(".analytics-toggle");
    const analyticsPanel = analyticsWrap.querySelector(".analytics-panel");
    analyticsBtn.onclick = () => {
      const nowOpen = analyticsPanel.classList.toggle("hidden") === false;
      if (nowOpen) analyticsExpanded.add(ex.name);
      else analyticsExpanded.delete(ex.name);
      analyticsBtn.textContent = nowOpen ? "Hide Analytics ▴" : "📊 Exercise Analytics ▾";
    };

    body.appendChild(analyticsWrap);

    const selectInput = editGrid.querySelector(".edit-select");
    const setsInput = editGrid.querySelector(".edit-sets");
    const repsInput = editGrid.querySelector(".edit-reps");
    const moveUpBtn = editGrid.querySelectorAll("button")[0];
    const moveDownBtn = editGrid.querySelectorAll("button")[1];
    const removeBtn = editGrid.querySelectorAll("button")[2];
const presetInput = presetRow.querySelector(".preset-weight");
const usePresetBtn = presetRow.querySelector("button");
const suggestText = presetRow.querySelector(".exercise-suggest");
const demoBtn = demoRow.querySelector(".demo-btn");
const warmupBtn = demoRow.querySelector(".warmup-btn");

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
      const livePerf = findLastPerformance(ex.name);
      const liveSuggested = suggestWeight(ex.name, livePerf, exercises[exIndex].startWeight || "", exercises[exIndex].reps || 8, recovery);
      rebuildSetRows(body, exercises[exIndex].sets, liveSuggested.value, [], ex.name);
      suggestText.innerHTML = buildSuggestionHTML(livePerf, liveSuggested);
      renderTrackerProgress();
      persistDraftForDay();
    };

    repsInput.oninput = () => {
      exercises[exIndex].reps = Math.max(1, parseInt(repsInput.value || "1", 10));
      persistCurrentLayout();
      const livePerf = findLastPerformance(ex.name);
      const liveSuggested = suggestWeight(ex.name, livePerf, exercises[exIndex].startWeight || "", exercises[exIndex].reps || 8, recovery);
      rebuildSetRows(body, exercises[exIndex].sets, liveSuggested.value, [], ex.name);
      suggestText.innerHTML = buildSuggestionHTML(livePerf, liveSuggested);
      renderTrackerProgress();
      persistDraftForDay();
    };

    moveUpBtn.onclick = () => moveExercise(exIndex, -1);
    moveDownBtn.onclick = () => moveExercise(exIndex, 1);
    removeBtn.onclick = () => removeExercise(exIndex);

    presetInput.oninput = () => {
      exercises[exIndex].startWeight = presetInput.value.trim();
      const livePerf = findLastPerformance(ex.name);
      const liveSuggested = suggestWeight(ex.name, livePerf, exercises[exIndex].startWeight || "", exercises[exIndex].reps || 8, recovery);
      suggestText.innerHTML = buildSuggestionHTML(livePerf, liveSuggested);
      persistCurrentLayout();
      persistDraftForDay();
    };

    usePresetBtn.onclick = () => {
      applyPresetToRows(body, presetInput.value.trim(), selectInput.value || ex.name);
    };
demoBtn.onclick = () => {
  openExerciseDemo(selectInput.value || ex.name);
};
warmupBtn.onclick = () => {
  const nowHidden = warmupBox.classList.toggle("hidden");
  if (!nowHidden) {
    const baseline = body.querySelector(".setRow .weight")?.value.trim()
      || suggested.value
      || presetInput.value.trim();
    warmupBox.innerHTML = buildWarmupHTML(selectInput.value || ex.name, baseline);
  }
  warmupBtn.textContent = nowHidden ? "🔥 Warm-up" : "Hide Warm-up";
};
    card.appendChild(head);
    card.appendChild(body);
    container.appendChild(card);
  });

  attachDraftAutoSave();
  renderTrackerProgress();
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
  renderReadinessCard();
  startSessionTimer();
}

function saveProgress() {
  persistCurrentLayout();
  persistDraftForDay();
  showToast("Progress saved", "success");
}

function completeWorkout() {
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

  const priorWorkouts = state.workouts.slice();
  const prs = detectPRs(workout, priorWorkouts);

  persistCurrentLayout();
  state.workouts.unshift(workout);
  state.nextWorkout = nextWorkout(selectedDay);
  clearDraftForDay(selectedDay);
  saveState();

  celebration = {
    name: workout.name,
    date: workout.date,
    prs,
    insight: generateCoachingInsight(workout, state.workouts)
  };
  renderCelebrationPanel();

  if (prs.length) {
    showToast(`🎉 ${prs.length} new PR${prs.length === 1 ? "" : "s"}! Next: ${state.nextWorkout}`, "success");
  } else {
    showToast(`Workout complete. Next: ${state.nextWorkout}`, "success");
  }
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
  renderTrackerProgress();
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
    qlDrafts: state.qlDrafts,
    userMaxes: state.userMaxes,
    bodyMetrics: state.bodyMetrics,
    settings: state.settings,
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

function importLog(file) {
  const reader = new FileReader();
  reader.onload = () => {
    let parsed;
    try {
      parsed = JSON.parse(reader.result);
    } catch {
      showToast("Could not read that file", "warn");
      return;
    }

    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.workouts)) {
      showToast("That file doesn't look like an exported log", "warn");
      return;
    }

    const count = parsed.workouts.length;
    if (!confirm(`Import ${count} workout${count === 1 ? "" : "s"}? This replaces the data currently saved on this device.`)) return;

    const importedSettings = normalizeSettings(parsed);
    const importedRoutine = SPLITS[importedSettings.split].routine;
    state = {
      workouts: parsed.workouts,
      nextWorkout: importedRoutine.includes(parsed.nextWorkout) ? parsed.nextWorkout : importedRoutine[0],
      customLayouts: parsed.customLayouts && typeof parsed.customLayouts === "object" ? parsed.customLayouts : {},
      drafts: parsed.drafts && typeof parsed.drafts === "object" ? parsed.drafts : {},
      qlDrafts: parsed.qlDrafts && typeof parsed.qlDrafts === "object" ? parsed.qlDrafts : {},
      userMaxes: parsed.userMaxes && typeof parsed.userMaxes === "object"
        ? { ...USER_MAXES_DEFAULT, ...parsed.userMaxes }
        : { ...USER_MAXES_DEFAULT },
      bodyMetrics: parsed.bodyMetrics && typeof parsed.bodyMetrics === "object"
        ? { ...BODY_METRICS_DEFAULT, ...parsed.bodyMetrics }
        : { ...BODY_METRICS_DEFAULT },
      settings: importedSettings
    };

    saveState();
    if (currentPage === "workout") {
      stopSessionTimer();
      loadTemplate(state.nextWorkout);
    }
    showToast(`Imported ${count} workout${count === 1 ? "" : "s"}`, "success");
  };
  reader.onerror = () => showToast("Could not read that file", "warn");
  reader.readAsText(file);
}

// ==============================
// BUTTONS
// ==============================

function wireButtons() {
  if (currentPage !== "workout") return;

  document.getElementById("saveBtn").onclick = saveProgress;
  document.getElementById("completeBtn").onclick = completeWorkout;
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
  document.getElementById("importBtn").onclick = () => document.getElementById("importFile").click();
  document.getElementById("importFile").onchange = (e) => {
    const file = e.target.files[0];
    if (file) importLog(file);
    e.target.value = "";
  };

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
// QUICK LOG
// ==============================

let qlDay = null;
let qlEntries = [];
let qlSaved = null;

function qlWeightStep(name) {
  const jump = EXERCISE_RULES[name];
  return jump && jump > 0 ? jump : 5;
}

function qlBuildEntry(name, sets, reps, startWeight = "") {
  const last = findLastPerformance(name);
  const suggestion = suggestWeight(name, last, startWeight, reps);
  const suggested = parseFloat(suggestion.value);
  const weight = Number.isFinite(suggested)
    ? suggested
    : (EXERCISE_RULES[name] === 0 ? 0 : "");

  return {
    name,
    weight,
    reps,
    setReps: Array.from({ length: Math.max(1, sets) }, () => reps),
    skipped: false,
    lastLabel: last
      ? `${last.weight} lb × ${last.sets.map(s => s.reps).join(" / ")}`
      : ""
  };
}

function qlLoadDay(day) {
  qlDay = day;
  qlSaved = null;
  const draft = getQlDraft(day);
  qlEntries = draft ? draft.entries : getLayoutForDay(day).map(t => qlBuildEntry(t.name, t.sets, t.reps, t.startWeight));

  const dateEl = document.getElementById("qlDate");
  if (dateEl) dateEl.value = draft?.date || todayString();

  if (draft) {
    const bwEl = document.getElementById("qlBodyWt");
    if (bwEl) bwEl.value = draft.bodyWeight || "";
    const notesEl = document.getElementById("qlNotes");
    if (notesEl) notesEl.value = draft.notes || "";
  }

  renderQuickLog();
}

function renderQuickLog() {
  renderQuickLogChips();
  renderQuickLogList();
  renderQuickLogAdd();
  renderQuickLogDone();
}

function renderQuickLogChips() {
  const wrap = document.getElementById("qlDayChips");
  if (!wrap) return;
  wrap.innerHTML = "";

  getRoutine().forEach(day => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `ql-chip${day === qlDay ? " active" : ""}`;
    btn.innerHTML = escapeHtml(day) + (day === state.nextWorkout ? '<span class="ql-chip-next">next</span>' : "");
    btn.onclick = () => qlLoadDay(day);
    wrap.appendChild(btn);
  });
}

function qlBuildCard(entry, index) {
  const card = document.createElement("div");
  card.className = `ql-card${entry.skipped ? " skipped" : ""}`;

  const chips = entry.setReps.map((reps, setIndex) => `
    <div class="ql-set-chip${reps > 0 ? "" : " off"}">
      <span class="ql-set-label">Set ${setIndex + 1}</span>
      <div class="ql-set-stepper">
        <button class="ql-step mini" data-act="set-rep-down" data-set="${setIndex}" type="button">−</button>
        <strong class="ql-set-value">${reps > 0 ? reps : "✕"}</strong>
        <button class="ql-step mini" data-act="set-rep-up" data-set="${setIndex}" type="button">＋</button>
      </div>
    </div>
  `).join("");

  card.innerHTML = `
    <div class="ql-card-head">
      <div class="ql-card-title">
        <strong>${escapeHtml(entry.name)}</strong>
        <span class="ql-last">${entry.lastLabel ? `Last: ${escapeHtml(entry.lastLabel)}` : "First log — sets your baseline"}</span>
      </div>
      <button class="ql-skip" type="button">${entry.skipped ? "Undo" : "Skip"}</button>
    </div>
    <div class="ql-card-body${entry.skipped ? " hidden" : ""}">
      <div class="ql-stepper-row">
        <div class="ql-stepper">
          <span class="ql-stepper-label">Weight (lb)</span>
          <div class="ql-stepper-controls">
            <button class="ql-step" data-act="wt-down" type="button">−</button>
            <input class="mono ql-value" data-act="wt" inputmode="decimal" value="${entry.weight === "" ? "" : escapeHtml(String(entry.weight))}" placeholder="0" />
            <button class="ql-step" data-act="wt-up" type="button">＋</button>
          </div>
        </div>
        <div class="ql-stepper">
          <span class="ql-stepper-label">Reps per set</span>
          <div class="ql-stepper-controls">
            <button class="ql-step" data-act="rep-down" type="button">−</button>
            <input class="mono ql-value" data-act="rep" inputmode="numeric" value="${entry.reps}" />
            <button class="ql-step" data-act="rep-up" type="button">＋</button>
          </div>
        </div>
      </div>
      <div class="ql-sets-head">
        <span class="ql-stepper-label">Sets</span>
        <div class="ql-sets-count">
          <button class="ql-step mini" data-act="set-down" type="button">−</button>
          <button class="ql-step mini" data-act="set-up" type="button">＋</button>
        </div>
      </div>
      <div class="ql-set-chips">${chips}</div>
    </div>
  `;

  card.querySelector(".ql-skip").onclick = () => {
    entry.skipped = !entry.skipped;
    renderQuickLogList();
  };

  const weightInput = card.querySelector('[data-act="wt"]');
  weightInput.onchange = () => {
    const parsed = parseFloat(weightInput.value);
    entry.weight = Number.isFinite(parsed) ? Math.max(0, parsed) : "";
    renderQuickLogList();
  };

  const repInput = card.querySelector('[data-act="rep"]');
  repInput.onchange = () => {
    const parsed = parseInt(repInput.value, 10);
    if (Number.isFinite(parsed)) {
      entry.reps = Math.min(50, Math.max(1, parsed));
      entry.setReps = entry.setReps.map(() => entry.reps);
    }
    renderQuickLogList();
  };

  const step = qlWeightStep(entry.name);
  const actions = {
    "wt-down": () => { entry.weight = Math.max(0, parseNum(entry.weight) - step); },
    "wt-up": () => { entry.weight = parseNum(entry.weight) + step; },
    "rep-down": () => {
      entry.reps = Math.max(1, entry.reps - 1);
      entry.setReps = entry.setReps.map(() => entry.reps);
    },
    "rep-up": () => {
      entry.reps = Math.min(50, entry.reps + 1);
      entry.setReps = entry.setReps.map(() => entry.reps);
    },
    "set-down": () => { if (entry.setReps.length > 1) entry.setReps.pop(); },
    "set-up": () => { if (entry.setReps.length < 8) entry.setReps.push(entry.reps); },
    "set-rep-down": (i) => { entry.setReps[i] = Math.max(0, entry.setReps[i] - 1); },
    "set-rep-up": (i) => { entry.setReps[i] = Math.min(50, entry.setReps[i] + 1); }
  };

  card.querySelectorAll(".ql-step").forEach(btn => {
    btn.onclick = () => {
      const setIndex = btn.dataset.set !== undefined ? parseInt(btn.dataset.set, 10) : undefined;
      actions[btn.dataset.act]?.(setIndex);
      renderQuickLogList();
    };
  });

  return card;
}

function renderQuickLogList() {
  const list = document.getElementById("qlList");
  if (!list) return;
  list.innerHTML = "";
  qlEntries.forEach((entry, index) => list.appendChild(qlBuildCard(entry, index)));
}

function renderQuickLogAdd() {
  const select = document.getElementById("qlAddSelect");
  if (!select) return;

  const existing = new Set(qlEntries.map(e => e.name));
  const options = getDayOptions(qlDay).filter(name => !existing.has(name));

  select.innerHTML = '<option value="">＋ Pick an exercise…</option>' +
    options.map(name => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("");

  select.onchange = () => {
    if (!select.value) return;
    const d = getDefaultExercise(select.value);
    qlEntries.push(qlBuildEntry(d.name, d.sets, d.reps, d.startWeight));
    renderQuickLogList();
    renderQuickLogAdd();
  };
}

function renderQuickLogDone() {
  const panel = document.getElementById("qlDone");
  const editor = document.getElementById("qlEditor");
  const saveBar = document.getElementById("qlSaveBar");
  if (!panel || !editor || !saveBar) return;

  if (!qlSaved) {
    panel.innerHTML = "";
    editor.classList.remove("hidden");
    saveBar.classList.remove("hidden");
    return;
  }

  editor.classList.add("hidden");
  saveBar.classList.add("hidden");

  const prBadges = qlSaved.prs.map(pr => `
    <div class="pr-badge">
      <div class="pr-badge-icon">🏅</div>
      <div>
        <strong>${escapeHtml(pr.label)}</strong>
        <span>${escapeHtml(pr.detail)}</span>
      </div>
    </div>
  `).join("");

  panel.innerHTML = `
    <div class="celebrate-card${qlSaved.prs.length ? " has-pr" : ""} ql-done-card">
      <div class="celebrate-kicker">Workout Saved</div>
      <div class="celebrate-title">${escapeHtml(qlSaved.name)} · ${escapeHtml(qlSaved.date)}</div>
      <div class="ql-done-sub">${qlSaved.count} exercise${qlSaved.count === 1 ? "" : "s"} logged${qlSaved.prs.length ? ` · ${qlSaved.prs.length} PR${qlSaved.prs.length === 1 ? "" : "s"} 🎉` : ""}</div>
      ${prBadges ? `<div class="pr-badge-row">${prBadges}</div>` : ""}
      ${qlSaved.insight ? `<div class="insight-box"><span class="insight-icon">💡</span><span>${escapeHtml(qlSaved.insight)}</span></div>` : ""}
      <div class="ql-done-actions">
        <button class="primary ql-big-btn" id="qlNextBtn" type="button">Log Next: ${escapeHtml(state.nextWorkout)}</button>
        <button class="ghost ql-big-btn" id="qlAgainBtn" type="button">Log Another Day</button>
      </div>
    </div>
  `;

  document.getElementById("qlNextBtn").onclick = () => qlLoadDay(state.nextWorkout);
  document.getElementById("qlAgainBtn").onclick = () => qlLoadDay(qlDay);
}

function qlSaveProgress() {
  if (!qlDay) return;
  persistQlDraft();
  showToast("Progress saved", "success");
}

function qlCompleteWorkout() {
  if (!qlDay) return;

  const workout = {
    name: qlDay,
    date: document.getElementById("qlDate").value || todayString(),
    bodyWeight: (document.getElementById("qlBodyWt")?.value || "").trim(),
    focusNotes: "",
    notes: (document.getElementById("qlNotes")?.value || "").trim(),
    exercises: []
  };

  qlEntries.forEach(entry => {
    if (entry.skipped || entry.weight === "") return;
    const weight = String(entry.weight);
    const sets = entry.setReps
      .filter(reps => reps > 0)
      .map(reps => ({ weight, reps: String(reps) }));
    if (sets.length) workout.exercises.push({ name: entry.name, sets });
  });

  if (!workout.exercises.length) {
    showToast("Nothing to save — fill in at least one exercise", "warn");
    return;
  }

  const priorWorkouts = state.workouts.slice();
  const prs = detectPRs(workout, priorWorkouts);

  state.workouts.unshift(workout);
  state.nextWorkout = nextWorkout(qlDay);
  clearQlDraft(qlDay);
  saveState();

  qlSaved = {
    name: workout.name,
    date: workout.date,
    count: workout.exercises.length,
    prs,
    insight: generateCoachingInsight(workout, state.workouts)
  };

  const notesEl = document.getElementById("qlNotes");
  if (notesEl) notesEl.value = "";

  window.scrollTo({ top: 0, behavior: "smooth" });
  renderQuickLog();

  if (prs.length) {
    showToast(`🎉 ${prs.length} new PR${prs.length === 1 ? "" : "s"}! Next: ${state.nextWorkout}`, "success");
  } else {
    showToast(`Workout complete. Next: ${state.nextWorkout}`, "success");
  }
}

// ==============================
// INIT
// ==============================

function initQuickLogPage() {
  document.getElementById("qlSaveBtn").onclick = qlSaveProgress;
  document.getElementById("qlCompleteBtn").onclick = qlCompleteWorkout;
  qlLoadDay(state.nextWorkout);
}

function initPowerPage() {
  renderStats();
  renderPowerPanel();
  renderMaxesPanel();
  renderBodyMetricsPanel();
}

function initWorkoutPage() {
  document.getElementById("wkDate").value = todayString();
  renderTabs();
  renderStats();
  renderHistory();
  renderCoachPanel();
  wireButtons();
  updateRestTimerUI();
  loadTemplate(state.nextWorkout);

  window.addEventListener("beforeunload", () => {
    persistDraftForDay();
  });
}

function init() {
  if (currentPage === "power") {
    initPowerPage();
    return;
  }

  if (currentPage === "quicklog") {
    initQuickLogPage();
    return;
  }

  initWorkoutPage();
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
