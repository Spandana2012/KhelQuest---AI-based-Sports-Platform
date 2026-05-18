import { calculateAngle } from "../utils/poseUtils";

let count = 0;
let down = false;
let finished = false;

let currentLeg: "left" | "right" | null = null;

export default function SquatCounter(
  results: any,
  onUpdate: (d: { value: number; finished: boolean }) => void
) {
  if (!results.poseLandmarks || finished) return;

  // LEFT LEG
  const lh = results.poseLandmarks[23];
  const lk = results.poseLandmarks[25];
  const la = results.poseLandmarks[27];

  // RIGHT LEG
  const rh = results.poseLandmarks[24];
  const rk = results.poseLandmarks[26];
  const ra = results.poseLandmarks[28];

  if (!lh || !lk || !la || !rh || !rk || !ra) return;

  // choose best leg based on visibility
  const leftScore = lh.visibility + lk.visibility + la.visibility;
  const rightScore = rh.visibility + rk.visibility + ra.visibility;

  if (!currentLeg) {
    currentLeg = leftScore > rightScore ? "left" : "right";
  } else if (currentLeg === "left" && rightScore > leftScore + 0.3) {
    currentLeg = "right";
  } else if (currentLeg === "right" && leftScore > rightScore + 0.3) {
    currentLeg = "left";
  }

  const hip = currentLeg === "left" ? lh : rh;
  const knee = currentLeg === "left" ? lk : rk;
  const ankle = currentLeg === "left" ? la : ra;

  // Allow MediaPipe to use inferred locations if visibility is low instead of stopping completely
  // We remove the return statement for low visibility.

  const kneeAngle = calculateAngle(hip, knee, ankle);

  // Extremely relaxed downward threshold
  if (kneeAngle < 150) down = true;

  // Very generous upward threshold
  if (kneeAngle > 155 && down) {
    count++;
    down = false;

    onUpdate({ value: count, finished: count >= 10 });

    if (count >= 10) finished = true;
  }
}

export const resetSquatCounter = () => {
  count = 0;
  down = false;
  finished = false;
  currentLeg = null;
};