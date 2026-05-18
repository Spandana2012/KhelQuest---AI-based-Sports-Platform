import React, { useEffect, useRef, useState } from "react";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { drawPose } from "./utils/drawPose";

import PushupCounter, { resetPushupCounter } from "./counters/PushupCounter";
import SquatCounter, { resetSquatCounter } from "./counters/SquatCounter";
import HighJumpAnalyzer, { resetHighJumpAnalyzer } from "./counters/HighJumpAnalyzer";

const LiveCamera = ({ exercise, onFinish, onBack }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cameraRef = useRef<Camera | null>(null);

  const [value, setValue] = useState(0);
  const latestValueRef = useRef(0);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    if (exercise === "pushup") resetPushupCounter();
    if (exercise === "squat") resetSquatCounter();
    if (exercise === "highjump") resetHighJumpAnalyzer();

    setValue(0);
    latestValueRef.current = 0;

    const ctx = canvasRef.current.getContext("2d")!;

    const pose = new Pose({
      locateFile: (f) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${f}`,
    });

    pose.setOptions({
      modelComplexity: 2,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
      selfieMode: false,
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

    cameraRef.current = new Camera(videoRef.current, {
      onFrame: async () => {
        await pose.send({ image: videoRef.current! });
      },
      width: 720,
      height: 480,
    });

    cameraRef.current.start();

    return () => cameraRef.current?.stop();
  }, [exercise]);

  const finish = (finalValue: number) => {
    cameraRef.current?.stop();
    onFinish({
      exercise,
      value: finalValue,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 flex flex-col items-center gap-4 w-full max-w-4xl">

        <div className="flex justify-between w-full">
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            ⬅ Back
          </button>

          <h2 className="text-white text-2xl font-bold">
            Live {exercise.toUpperCase()}
          </h2>

          <div />
        </div>

        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
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

          <button
            onClick={() => finish(latestValueRef.current)}
            className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-bold shadow-lg transition"
          >
            STOP
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveCamera;