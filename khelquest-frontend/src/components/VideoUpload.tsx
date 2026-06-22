import React, { useEffect, useRef, useState } from "react";
import { drawPose } from "./utils/drawPose";
import { createPose, type MediaPipePose } from "./utils/mediaPipe";

import PushupCounter, { resetPushupCounter } from "./counters/PushupCounter";
import SquatCounter, { resetSquatCounter } from "./counters/SquatCounter";
import HighJumpAnalyzer, { resetHighJumpAnalyzer } from "./counters/HighJumpAnalyzer";

interface VideoUploadProps {
  exercise: "pushup" | "squat" | "highjump";
  onFinish: (result: {
    exercise: string;
    value: number;
    timestamp: string;
  }) => void;
  onBack: () => void;
}

const VideoUpload = ({ exercise, onFinish, onBack }: VideoUploadProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const poseRef = useRef<MediaPipePose | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const runIdRef = useRef(0);
  const processingRef = useRef(false);
  const finishedRef = useRef(false);
  const latestValueRef = useRef(0);

  const [value, setValue] = useState(0);
  const [status, setStatus] = useState("Select a video to begin");
  const [error, setError] = useState("");

  useEffect(() => () => {
    runIdRef.current += 1;
    void poseRef.current?.close();
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
  }, []);

  const finish = (finalValue: number) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    processingRef.current = false;
    onFinish({
      exercise,
      value: finalValue,
      timestamp: new Date().toISOString(),
    });
  };

  const handleVideo = async (file: File) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    processingRef.current = false;
    finishedRef.current = false;
    setError("");
    setStatus("Loading video and pose detector…");

    if (exercise === "pushup") resetPushupCounter();
    if (exercise === "squat") resetSquatCounter();
    if (exercise === "highjump") resetHighJumpAnalyzer();

    setValue(0);
    latestValueRef.current = 0;

    void poseRef.current?.close();
    poseRef.current = null;
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);

    // Set the source first so the selected video is visible even while the AI loads.
    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    video.src = objectUrl;
    video.load();

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setError("Your browser could not create the video drawing canvas.");
      return;
    }

    try {
      const pose = await createPose(1);
      if (runIdRef.current !== runId) {
        await pose.close();
        return;
      }

      poseRef.current = pose;
      pose.onResults((results) => {
        if (runIdRef.current !== runId) return;
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

      const processFrames = async () => {
        if (
          processingRef.current ||
          finishedRef.current ||
          runIdRef.current !== runId
        ) return;

        processingRef.current = true;
        setStatus("Processing video…");

        const processNextFrame = async () => {
          if (
            finishedRef.current ||
            runIdRef.current !== runId ||
            video.paused
          ) {
            processingRef.current = false;
            return;
          }

          if (video.ended) {
            finish(latestValueRef.current);
            return;
          }

          try {
            await pose.send({ image: video });
            requestAnimationFrame(() => void processNextFrame());
          } catch (caught) {
            processingRef.current = false;
            const message = caught instanceof Error ? caught.message : "Unknown processing error";
            setError(`Video processing stopped: ${message}`);
            setStatus("");
          }
        };

        await processNextFrame();
      };

      video.onplay = () => void processFrames();
      video.onended = () => finish(latestValueRef.current);
      video.onerror = () => {
        setError("This video format could not be played by your browser. Try MP4 (H.264). ");
        setStatus("");
      };

      setStatus("Pose detector ready — starting video…");
      try {
        await video.play();
      } catch {
        setStatus("Ready — press Play to start processing");
      }
    } catch (caught) {
      if (runIdRef.current !== runId) return;
      const message = caught instanceof Error ? caught.message : "Unknown loading error";
      setError(`Could not load pose detection: ${message}`);
      setStatus("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 w-full max-w-4xl flex flex-col items-center gap-5">
        <div className="flex justify-between w-full">
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            ← Back
          </button>

          <h2 className="text-2xl font-bold">
            Upload {exercise.toUpperCase()} Video
          </h2>

          <div />
        </div>

        <input
          type="file"
          accept="video/*"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void handleVideo(file);
          }}
          className="text-sm"
        />

        <div className="relative w-full max-w-[720px] overflow-hidden rounded-xl bg-black/40 aspect-[3/2]">
          <video
            ref={videoRef}
            controls
            muted
            playsInline
            className="h-full w-full object-contain"
          />

          <canvas
            ref={canvasRef}
            width={720}
            height={480}
            className="absolute inset-0 h-full w-full pointer-events-none"
          />

          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 px-6 py-2 rounded-full text-2xl font-bold text-white shadow-lg">
            {exercise === "highjump" ? "Height (cm)" : "Count"}: {value}
          </div>
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

export default VideoUpload;
