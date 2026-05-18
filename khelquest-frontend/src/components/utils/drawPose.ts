import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { POSE_CONNECTIONS } from "@mediapipe/pose";

export const drawPose = (ctx: CanvasRenderingContext2D, results: any) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  if (!results.poseLandmarks) return;

  drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, {
    color: "#00FFCC",
    lineWidth: 4,
  });

  drawLandmarks(ctx, results.poseLandmarks, {
    color: "#FF0066",
    radius: 5,
  });
};