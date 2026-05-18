import { calculateAngle } from "../utils/poseUtils";

let count = 0;
let down = false;
let finished = false;

export default function PushupCounter(
  results: any,
  onUpdate: (d: { value: number; finished: boolean }) => void
) {
  if (!results.poseLandmarks || finished) return;

  const s = results.poseLandmarks[11];
  const e = results.poseLandmarks[13];
  const w = results.poseLandmarks[15];

  if (!s || !e || !w) return;

  // VISIBILITY CHECK (PROBLEM D)
  if (s.visibility < 0.2 || e.visibility < 0.2 || w.visibility < 0.2) return;

  const angle = calculateAngle(s, e, w);

  if (angle < 110) down = true;
  if (angle > 150 && down) {
    count++;
    down = false;

    onUpdate({ value: count, finished: count >= 10 });
    if (count >= 10) finished = true;
  }
}

export const resetPushupCounter = () => {
  count = 0;
  down = false;
  finished = false;
};
