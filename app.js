// ─── Data ──────────────────────────────────────────────────────────────────

const TARGET_COLORS = {
  "Glutes":                          { color: "#c084fc" },
  "Glutes (isolation)":              { color: "#c084fc" },
  "Glutes (stability + isolation)":  { color: "#c084fc" },
  "Gluteus Medius, Inner Thigh":     { color: "#f9a8d4" },
  "Quads, Glutes":                   { color: "#a78bfa" },
  "Hamstrings, Glutes":              { color: "#a78bfa" },
  "Inner Thighs, Glutes":            { color: "#e879f9" },
  "Mid-Back (posture)":              { color: "#94a3b8" },
  "Biceps":                          { color: "#34d399" },
  "Triceps":                         { color: "#34d399" },
  "Biceps, Forearms":                { color: "#34d399" },
  "Calves":                          { color: "#fb923c" },
  "Core (stability)":                { color: "#60a5fa" },
};

const WORKOUTS = {
  A: {
    label: "Day A",
    theme: "Glutes & Quads",
    exercises: [
      {
        name: "Goblet Squat",
        sets: 3, reps: "12", weight: "10–15 lb (single dumbbell)",
        target: "Quads, Glutes",
        note: "Hold a single dumbbell vertically at your chest with both hands cupping one end. Prioritise depth over weight — aim to get your thighs parallel to the floor or below.",
      },
      {
        name: "Romanian Deadlift",
        sets: 3, reps: "10", weight: "10–15 lb each hand",
        target: "Hamstrings, Glutes",
        note: "Hinge at the hips — not the waist — and push your hips back as the dumbbells slide down the front of your legs. Keep a soft knee bend throughout. You should feel a stretch in the hamstrings.",
      },
      {
        name: "Sumo Squat",
        sets: 3, reps: "12", weight: "15–20 lb (single dumbbell)",
        target: "Inner Thighs, Glutes",
        note: "Stand with feet wider than shoulder-width, toes turned out 45°. Hold one dumbbell between your legs. The wide stance recruits the inner thighs and glutes, adding visual hip width.",
      },
      {
        name: "Glute Bridge",
        sets: 3, reps: "15", weight: "15–25 lb on hips",
        target: "Glutes (isolation)",
        note: "Lie on your back, knees bent, feet flat. Rest a dumbbell on your hip crease. Drive through your heels and squeeze your glutes. Hold at the top for 1–2 seconds. Quadriceps are almost entirely out of the picture here.",
      },
      {
        name: "Narrow-Grip Single Arm Row",
        sets: 2, reps: "10 per side", weight: "8–12 lb",
        target: "Mid-Back (posture)",
        note: "One knee and hand on a bench. Pull the dumbbell toward your hip — not your armpit. This targets mid-back posture muscles without overdeveloping the lats, which would create an unflattering V-taper.",
      },
      {
        name: "Bicep Curl",
        sets: 3, reps: "15–20", weight: "4 lb",
        target: "Biceps",
        arm: true,
        note: "Upper arms pinned to your sides, palms facing forward. Curl up and lower slowly — take about 3 seconds on the way down. The eccentric (lowering) phase is where most of the stimulus happens. Don't let elbows swing forward.",
      },
      {
        name: "Tricep Kickback",
        sets: 3, reps: "15–20 per arm", weight: "4 lb",
        target: "Triceps",
        arm: true,
        note: "Hinge forward 45°, upper arm parallel to the floor. Extend the forearm straight back until the whole arm is level. Squeeze at full extension for a beat. The tricep makes up roughly two-thirds of the upper arm's mass — this is high-value work.",
      },
    ],
  },

  B: {
    label: "Day B",
    theme: "Hamstrings, Outer Glutes & Stability",
    exercises: [
      {
        name: "Reverse Lunge",
        sets: 3, reps: "10 per leg", weight: "8–12 lb each hand",
        target: "Hamstrings, Glutes",
        note: "Step backward rather than forward. The reverse lunge is gentler on the knees and places more emphasis on the glutes and hamstrings. Keep your torso upright throughout.",
      },
      {
        name: "Lateral Lunge",
        sets: 3, reps: "10 per side", weight: "8–12 lb",
        target: "Gluteus Medius, Inner Thigh",
        note: "Step out to the side and sit your hips back into the stepping leg while keeping the other leg straight. Targets the gluteus medius — the outer, upper portion of the glute — which is critical for hip width and a rounded side-profile.",
      },
      {
        name: "Single-Leg Glute Bridge",
        sets: 3, reps: "10–12 per leg", weight: "Bodyweight or light dumbbell",
        target: "Glutes (stability + isolation)",
        note: "Same setup as the glute bridge, but extend one leg out straight. Forces the working glute to stabilise as well as extend. Start with bodyweight; add load only when you can complete all reps with clean form.",
      },
      {
        name: "Calf Raise",
        sets: 3, reps: "20", weight: "10–15 lb each hand",
        target: "Calves",
        note: "Stand on the edge of a step or flat ground. Rise up on your toes slowly, then lower with control. Well-developed calves create a more tapered, feminine leg line — often overlooked but worth the investment.",
      },
      {
        name: "Deadbug",
        sets: 2, reps: "8 per side", weight: "Bodyweight",
        target: "Core (stability)",
        note: "Lie on your back, arms toward the ceiling, knees bent at 90° in the air. Slowly lower the opposite arm and leg toward the floor without letting your lower back arch, then return. Builds a firm midsection without creating a thick waist.",
      },
      {
        name: "Hammer Curl",
        sets: 3, reps: "15", weight: "4 lb",
        target: "Biceps, Forearms",
        arm: true,
        note: "Palms face inward (toward each other) rather than forward. Targets the brachialis and develops the forearms too — contributing to a slender-but-defined arm appearance. Many people find this more comfortable at the wrist.",
      },
      {
        name: "Overhead Tricep Extension",
        sets: 3, reps: "12–15", weight: "4 lb (both hands on one dumbbell)",
        target: "Triceps",
        arm: true,
        note: "Hold one dumbbell overhead with both hands in a diamond grip. Lower it behind your head by bending the elbows, keeping upper arms close to your ears, then press back up. This stretches the tricep under load for full muscle development.",
      },
    ],
  },
};

// ─── State ─────────────────────────────────────────────────────────────────

let activeDay = "A";
let openCard  = null;   // index of currently-expanded card, or null

// ─── Render ────────────────────────────────────────────────────────────────

function getTagStyle(target) {
  const entry = TARGET_COLORS[target];
  const color = entry ? entry.color : "#94a3b8";
  return `background:${color}1a; color:${color}; border:1px solid ${color}44;`;
}

function renderExercises() {
  const panel   = document.getElementById("exercises-panel");
  const workout = WORKOUTS[activeDay];

  panel.innerHTML = workout.exercises
    .map((ex, i) => {
      const isOpen  = openCard === i;
      const delay   = (i * 0.05).toFixed(2);

      return `
        <div
          class="exercise-card${isOpen ? " open" : ""}"
          data-index="${i}"
          style="animation-delay:${delay}s"
          role="button"
          tabindex="0"
          aria-expanded="${isOpen}"
          aria-label="${ex.name}"
        >
          <div class="card-row">
            <span class="card-index">${String(i + 1).padStart(2, "0")}</span>
            <div class="card-body">
              <div class="card-name-row">
                <span class="card-name">${ex.name}</span>
                ${ex.arm ? `<span class="badge badge-arm">Arm</span>` : ""}
              </div>
              <div class="card-meta">${ex.sets} sets &middot; ${ex.reps} reps &middot; ${ex.weight}</div>
            </div>
            <span class="card-chevron" aria-hidden="true">&#9660;</span>
          </div>

          <div class="card-detail">
            <span class="target-tag" style="${getTagStyle(ex.target)}">${ex.target}</span>
            <p class="card-note">${ex.note}</p>
          </div>
        </div>
      `;
    })
    .join("");

  // Attach click + keyboard listeners to each card
  panel.querySelectorAll(".exercise-card").forEach((card) => {
    card.addEventListener("click", () => toggleCard(+card.dataset.index));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleCard(+card.dataset.index);
      }
    });
  });
}

function toggleCard(index) {
  openCard = openCard === index ? null : index;
  renderExercises();
}

function setActiveDay(day) {
  activeDay = day;
  openCard  = null;

  document.querySelectorAll(".day-btn").forEach((btn) => {
    const isActive = btn.dataset.day === day;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", isActive);
  });

  renderExercises();
}

// ─── Init ───────────────────────────────────────────────────────────────────

document.querySelectorAll(".day-btn").forEach((btn) => {
  btn.addEventListener("click", () => setActiveDay(btn.dataset.day));
});

renderExercises();
