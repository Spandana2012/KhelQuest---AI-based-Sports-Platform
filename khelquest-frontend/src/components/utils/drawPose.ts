import type { PoseResults } from "./mediaPipe";

export const drawPose = (ctx: CanvasRenderingContext2D, results: PoseResults) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  if (!results.poseLandmarks) return;

  window.drawConnectors?.(ctx, results.poseLandmarks, window.POSE_CONNECTIONS, {
    color: "#00FFCC",
    lineWidth: 4,
  });

  window.drawLandmarks?.(ctx, results.poseLandmarks, {
    color: "#FF0066",
    radius: 5,
  });
};
