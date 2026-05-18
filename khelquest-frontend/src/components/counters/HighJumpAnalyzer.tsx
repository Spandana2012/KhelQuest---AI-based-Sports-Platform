let baselineY: number | null = null;
let minY = Infinity;
let frames = 0;
let finished = false;

export default function HighJumpAnalyzer(
  results: any,
  onUpdate: (d: { value: number; finished: boolean }) => void
) {
  if (!results.poseLandmarks || finished) return;

  const hip = results.poseLandmarks[23];
  if (!hip || hip.visibility < 0.6) return;

  // CALIBRATION FRAMES
  if (frames < 30) {
    baselineY =
      baselineY === null ? hip.y : (baselineY * frames + hip.y) / (frames + 1);
    frames++;
    return;
  }

  minY = Math.min(minY, hip.y);
  const height = Math.max(0, (baselineY! - minY) * 100);

  onUpdate({ value: Math.round(height), finished: height > 15 });
  if (height > 15) finished = true;
}

export const resetHighJumpAnalyzer = () => {
  baselineY = null;
  minY = Infinity;
  frames = 0;
  finished = false;
};
