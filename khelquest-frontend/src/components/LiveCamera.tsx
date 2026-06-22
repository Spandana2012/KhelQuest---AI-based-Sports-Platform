import React, { useCallback, useEffect, useRef, useState } from "react";
import { drawPose } from "./utils/drawPose";
import {
  createCamera,
  createPose,
  type MediaPipeCamera,
  type MediaPipePose,
} from "./utils/mediaPipe";

import PushupCounter, { resetPushupCounter } from "./counters/PushupCounter";
import SquatCounter, { resetSquatCounter } from "./counters/SquatCounter";
import HighJumpAnalyzer, { resetHighJumpAnalyzer } from "./counters/HighJumpAnalyzer";

interface LiveCameraProps {
  exercise: "pushup" | "squat" | "highjump";
  onFinish: (result: {
    exercise: string;
    value: number;
    timestamp: string;
  }) => void;
  onBack: () => void;
}

const LiveCamera = ({ exercise, onFinish, onBack }: LiveCameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cameraRef = useRef<MediaPipeCamera | null>(null);
  const poseRef = useRef<MediaPipePose | null>(null);

  const [value, setValue] = useState(0);
  const [status, setStatus] = useState("Loading pose detector…");
  const [error, setError] = useState("");
  const latestValueRef = useRef(0);

  const finish = useCallback((finalValue: number) => {
    cameraRef.current?.stop();
    onFinish({
      exercise,
      value: finalValue,
      timestamp: new Date().toISOString(),
    });
  }, [exercise, onFinish]);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    let cancelled = false;

    if (exercise === "pushup") resetPushupCounter();
    if (exercise === "squat") resetSquatCounter();
    if (exercise === "highjump") resetHighJumpAnalyzer();

    setValue(0);
    setError("");
    setStatus("Loading pose detector…");
    latestValueRef.current = 0;

    const ctx = canvasRef.current.getContext("2d")!;

    const initialize = async () => {
      try {
        const pose = await createPose(2);
        if (cancelled) {
          await pose.close();
          return;
        }

        poseRef.current = pose;
        pose.onResults((results) => {
          if (cancelled) return;
          drawPose(ctx, results);

          const handler = ({ value, finished }: { value: number; finished: boolean }) => {
            setValue(value);
            latestValueRef.current = value;
            if (finished) finish(value);
          };

          if (exercise === "pushup") PushupCounter(results, handler);
          if (exercise === "squat") SquatCounter(results, handler);
          if (exercise === "highjump") HighJumpAnalyzer(results, handler);
        });

        const camera = createCamera(videoRef.current!, async () => {
          await pose.send({ image: videoRef.current! });
        });
        cameraRef.current = camera;
        await camera.start();

        if (!cancelled) setStatus("Camera active — keep your full body visible");
      } catch (caught) {
        if (cancelled) return;
        const message = caught instanceof Error ? caught.message : "Unknown camera error";
        setError(
          message.includes("Permission") || message.includes("NotAllowed")
            ? "Camera permission was denied. Allow camera access and try again."
            : `Could not start pose detection: ${message}`,
        );
        setStatus("");
      }
    };

    void initialize();

    return () => {
      cancelled = true;
      cameraRef.current?.stop();
      cameraRef.current = null;
      void poseRef.current?.close();
      poseRef.current = null;
    };
  }, [exercise, finish]);

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

        {status && <p className="text-sm text-blue-200">{status}</p>}
        {error && (
          <div className="w-full rounded-lg bg-red-500/20 px-4 py-3 text-center text-red-100">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveCamera;
