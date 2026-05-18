import React, { useRef, useState } from "react";
import { Pose } from "@mediapipe/pose";
import { drawPose } from "./utils/drawPose";

import PushupCounter, { resetPushupCounter } from "./counters/PushupCounter";
import SquatCounter, { resetSquatCounter } from "./counters/SquatCounter";
import HighJumpAnalyzer, { resetHighJumpAnalyzer } from "./counters/HighJumpAnalyzer";

const VideoUpload = ({ exercise, onFinish, onBack }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [value, setValue] = useState(0);
  const latestValueRef = useRef(0);

  const handleVideo = (file: File) => {
    if (!videoRef.current || !canvasRef.current) return;

    if (exercise === "pushup") resetPushupCounter();
    if (exercise === "squat") resetSquatCounter();
    if (exercise === "highjump") resetHighJumpAnalyzer();

    setValue(0);
    latestValueRef.current = 0;

    const video = videoRef.current;
    const ctx = canvasRef.current.getContext("2d")!;

    const pose = new Pose({
      locateFile: (f) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${f}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
    });

    pose.onResults((results) => {
      drawPose(ctx, results);

      const handler = ({ value, finished }: any) => {
        setValue(value);
        latestValueRef.current = value;

        if (finished) finish(value);
      };

      if (exercise === "pushup") PushupCounter(results, handler);
      if (exercise === "squat") SquatCounter(results, handler);
      if (exercise === "highjump") HighJumpAnalyzer(results, handler);
    });

    video.src = URL.createObjectURL(file);
    video.load();
    video.play();

    const loop = async () => {
      if (video.ended) {
        finish(latestValueRef.current);
        return;
      }
      await pose.send({ image: video });
      requestAnimationFrame(loop);
    };

    video.onplay = loop;
  };

  const finish = (finalValue: number) => {
    onFinish({
      exercise,
      value: finalValue,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 w-full max-w-4xl flex flex-col items-center gap-5">

        <div className="flex justify-between w-full">
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            ⬅ Back
          </button>

          <h2 className="text-2xl font-bold">
            Upload {exercise.toUpperCase()} Video
          </h2>

          <div />
        </div>

        <input
          type="file"
          accept="video/*"
          onChange={(e) => e.target.files && handleVideo(e.target.files[0])}
          className="text-sm"
        />

        <div className="relative">
          <video
            ref={videoRef}
            controls
            width={720}
            height={480}
            className="rounded-xl border border-white/20 shadow-lg"
          />

          <canvas
            ref={canvasRef}
            width={720}
            height={480}
            className="absolute top-0 left-0 rounded-xl pointer-events-none"
          />

          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 px-6 py-2 rounded-full text-2xl font-bold text-white shadow-lg">
            {exercise === "highjump" ? "Height (cm)" : "Count"}: {value}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;