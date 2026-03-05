import { useState } from "react";

const workoutDays = [
  {
    id: "A",
    label: "Day A",
    theme: "Glutes & Quads",
    color: "#c084fc",
    exercises: [
      {
        name: "Goblet Squat",
        sets: 3,
        reps: "12",
        weight: "10–15 lb (single dumbbell)",
        target: "Quads, Glutes",
        note: "Hold dumbbell vertically at chest. Prioritise depth over weight.",
      },
      {
        name: "Romanian Deadlift",
        sets: 3,
        reps: "10",
        weight: "10–15 lb each hand",
        target: "Hamstrings, Glutes",
        note: "Hinge at hips, push hips back. Keep a soft knee bend throughout.",
      },
      {
        name: "Sumo Squat",
        sets: 3,
        reps: "12",
        weight: "15–20 lb (single dumbbell)",
        target: "Inner Thighs, Glutes",
        note: "Wide stance, toes out 45°. Adds visual hip width.",
      },
      {
        name: "Glute Bridge",
        sets: 3,
        reps: "15",
        weight: "15–25 lb on hips",
        target: "Glutes (isolation)",
        note: "Hold at top for 1–2 seconds. Drive through heels.",
      },
      {
        name: "Narrow-Grip Single Arm Row",
        sets: 2,
        reps: "10 per side",
        weight: "8–12 lb",
        target: "Mid-Back (posture)",
        note: "Pull toward hip, not armpit. Avoids lat overdevelopment.",
      },
      {
        name: "Bicep Curl",
        sets: 3,
        reps: "15–20",
        weight: "4 lb",
        target: "Biceps",
        note: "Upper arms pinned to sides. 3-second lowering phase.",
      },
      {
        name: "Tricep Kickback",
        sets: 3,
        reps: "15–20 per arm",
        weight: "4 lb",
        target: "Triceps",
        note: "Hinge forward 45°. Squeeze at full extension for a beat.",
      },
    ],
  },
  {
    id: "B",
    label: "Day B",
    theme: "Hamstrings, Outer Glutes & Stability",
    color: "#f472b6",
    exercises: [
      {
        name: "Reverse Lunge",
        sets: 3,
        reps: "10 per leg",
        weight: "8–12 lb each hand",
        target: "Glutes, Hamstrings",
        note: "Step backward, not forward. Gentler on knees.",
      },
      {
        name: "Lateral Lunge",
        sets: 3,
        reps: "10 per side",
        weight: "8–12 lb",
        target: "Gluteus Medius, Inner Thigh",
        note: "Sit hips back into the stepping leg. Key for outer hip width.",
      },
      {
        name: "Single-Leg Glute Bridge",
        sets: 3,
        reps: "10–12 per leg",
        weight: "Bodyweight or light dumbbell",
        target: "Glutes (stability + isolation)",
        note: "Extend one leg out. Start bodyweight, add load when ready.",
      },
      {
        name: "Calf Raise",
        sets: 3,
        reps: "20",
        weight: "10–15 lb each hand",
        target: "Calves",
        note: "Slow and controlled. Adds to a tapered, feminine leg line.",
      },
      {
        name: "Deadbug",
        sets: 2,
        reps: "8 per side",
        weight: "Bodyweight",
        target: "Core (stability)",
        note: "Do not let lower back arch. Builds a firm waist without width.",
      },
      {
        name: "Hammer Curl",
        sets: 3,
        reps: "15",
        weight: "4 lb",
        target: "Biceps, Forearms",
        note: "Palms face inward. More natural on the wrist.",
      },
      {
        name: "Overhead Tricep Extension",
        sets: 3,
        reps: "12–15",
        weight: "4 lb (both hands on one dumbbell)",
        target: "Triceps",
        note: "Keep upper arms close to ears. Stretches tricep under load.",
      },
    ],
  },
];

const schedule = [
  { week: 1, days: ["A", "B", "A"] },
  { week: 2, days: ["B", "A", "B"] },
];

const tagColors = {
  Glutes: "#c084fc",
  "Glutes (isolation)": "#c084fc",
  "Glutes (stability + isolation)": "#c084fc",
  "Gluteus Medius, Inner Thigh": "#f9a8d4",
  "Quads, Glutes": "#a78bfa",
  "Hamstrings, Glutes": "#a78bfa",
  "Inner Thighs, Glutes": "#e879f9",
  "Mid-Back (posture)": "#94a3b8",
  Biceps: "#34d399",
  Triceps: "#34d399",
  "Biceps, Forearms": "#34d399",
  Calves: "#fb923c",
  "Core (stability)": "#60a5fa",
};

export default function WorkoutPlan() {
  const [activeDay, setActiveDay] = useState("A");
  const [expanded, setExpanded] = useState(null);

  const day = workoutDays.find((d) => d.id === activeDay);

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#0d0d12", minHeight: "100vh", padding: "2rem 1rem", color: "#f1f0ee" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        .plan-title { font-family: 'Playfair Display', serif; }
        .body-font { font-family: 'DM Sans', sans-serif; }
        .day-btn { transition: all 0.25s ease; cursor: pointer; border: none; }
        .day-btn:hover { transform: translateY(-2px); }
        .exercise-card { transition: all 0.2s ease; cursor: pointer; border: 1px solid rgba(255,255,255,0.07); }
        .exercise-card:hover { border-color: rgba(255,255,255,0.18); background: rgba(255,255,255,0.06) !important; }
        .week-dot { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; font-size: 0.7rem; font-weight: 600; }
        .tag { display: inline-block; padding: 2px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 500; }
        .note-text { font-style: italic; font-size: 0.78rem; color: #94a3b8; line-height: 1.5; }
        .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); margin: 1.5rem 0; }
      `}</style>

      <div style={{ maxWidth: 680, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p className="body-font" style={{ color: "#c084fc", letterSpacing: "0.2em", fontSize: "0.7rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            Beginner Free Weight Program
          </p>
          <h1 className="plan-title" style={{ fontSize: "clamp(1.8rem, 5vw, 2.6rem)", fontWeight: 700, margin: 0, lineHeight: 1.15 }}>
            Feminine Silhouette<br /><em style={{ color: "#f472b6" }}>Workout Plan</em>
          </h1>
          <p className="body-font" style={{ color: "#64748b", marginTop: "0.75rem", fontSize: "0.85rem" }}>
            3 days per week · Lower body focus · Selective hypertrophy
          </p>
        </div>

        {/* Weekly Schedule */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.25rem 1.5rem", marginBottom: "1.75rem" }}>
          <p className="body-font" style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#64748b", marginBottom: "1rem" }}>
            Alternating Weekly Schedule
          </p>
          {schedule.map((week) => (
            <div key={week.week} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: week.week === 1 ? "0.75rem" : 0 }}>
              <span className="body-font" style={{ fontSize: "0.75rem", color: "#64748b", width: 48, flexShrink: 0 }}>Week {week.week}</span>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {["Mon", "Wed", "Fri"].map((dayName, i) => {
                  const d = week.days[i];
                  const col = d === "A" ? "#c084fc" : "#f472b6";
                  return (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <span className="body-font" style={{ fontSize: "0.65rem", color: "#475569" }}>{dayName}</span>
                      <span className="week-dot body-font" style={{ background: `${col}22`, color: col, border: `1px solid ${col}55` }}>
                        {d}
                      </span>
                    </div>
                  );
                })}
              </div>
              <span className="body-font" style={{ fontSize: "0.72rem", color: "#475569", marginLeft: "0.25rem" }}>
                {week.week === 1 ? "Day A · Day B · Day A" : "Day B · Day A · Day B"}
              </span>
            </div>
          ))}
        </div>

        {/* Day Selector */}
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {workoutDays.map((d) => (
            <button
              key={d.id}
              className="day-btn body-font"
              onClick={() => { setActiveDay(d.id); setExpanded(null); }}
              style={{
                flex: 1,
                padding: "0.9rem 1rem",
                borderRadius: 12,
                background: activeDay === d.id ? `${d.color}22` : "rgba(255,255,255,0.03)",
                border: activeDay === d.id ? `1px solid ${d.color}88` : "1px solid rgba(255,255,255,0.07)",
                color: activeDay === d.id ? d.color : "#64748b",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: "1rem" }}>{d.label}</div>
              <div style={{ fontSize: "0.72rem", marginTop: 2, opacity: 0.8 }}>{d.theme}</div>
            </button>
          ))}
        </div>

        {/* Exercise List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {day.exercises.map((ex, i) => {
            const isOpen = expanded === i;
            const tagColor = tagColors[ex.target] || "#94a3b8";
            const isArm = ex.target.includes("Bicep") || ex.target.includes("Tricep") || ex.target.includes("Forearm");
            return (
              <div
                key={i}
                className="exercise-card"
                onClick={() => setExpanded(isOpen ? null : i)}
                style={{
                  background: isOpen ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
                  borderRadius: 12,
                  padding: "1rem 1.25rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span className="body-font" style={{ fontSize: "0.75rem", color: "#334155", fontWeight: 600, width: 20, flexShrink: 0 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                      <span className="plan-title" style={{ fontSize: "1rem", fontWeight: 700 }}>{ex.name}</span>
                      {isArm && (
                        <span className="tag body-font" style={{ background: "#34d39922", color: "#34d399", border: "1px solid #34d39944", fontSize: "0.62rem" }}>
                          ARM
                        </span>
                      )}
                    </div>
                    <div className="body-font" style={{ fontSize: "0.75rem", color: "#475569", marginTop: 2 }}>
                      {ex.sets} sets · {ex.reps} reps · {ex.weight}
                    </div>
                  </div>
                  <span className="tag body-font" style={{ background: `${tagColor}18`, color: tagColor, border: `1px solid ${tagColor}40`, flexShrink: 0, display: "none" }}>
                    {ex.target}
                  </span>
                  <span style={{ color: "#334155", fontSize: "0.8rem", flexShrink: 0, marginLeft: "0.25rem" }}>
                    {isOpen ? "▲" : "▼"}
                  </span>
                </div>

                {isOpen && (
                  <div style={{ marginTop: "0.9rem", paddingTop: "0.9rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.6rem", flexWrap: "wrap" }}>
                      <span className="tag body-font" style={{ background: `${tagColor}18`, color: tagColor, border: `1px solid ${tagColor}40` }}>
                        {ex.target}
                      </span>
                    </div>
                    <p className="note-text">{ex.note}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer tip */}
        <div className="divider" />
        <p className="body-font" style={{ textAlign: "center", color: "#334155", fontSize: "0.78rem", lineHeight: 1.7 }}>
          When all sets feel easy across two consecutive sessions, increase weight by 2–5 lbs.<br />
          Tap any exercise to see form notes.
        </p>
      </div>
    </div>
  );
}
