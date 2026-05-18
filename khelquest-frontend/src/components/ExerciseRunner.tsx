import React, { useState } from "react";
import LiveCamera from "./LiveCamera";
import VideoUpload from "./VideoUpload";

interface Props {
  exercise: "pushup" | "squat" | "highjump";
  onFinish: (result: any) => void;
  onBackToSports: () => void; // ✅ NEW PROP
}

const ExerciseRunner: React.FC<Props> = ({ exercise, onFinish, onBackToSports }) => {
  const [mode, setMode] = useState<"live" | "upload" | null>(null);

  // ✅ Mode selection UI
  if (!mode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-10 w-full max-w-xl text-center flex flex-col gap-6">

          <h1 className="text-4xl font-bold text-white">
            {exercise.toUpperCase()}
          </h1>

          <p className="text-gray-300 text-lg">
            Choose how you want to perform the test.
          </p>

          <button
            onClick={() => setMode("live")}
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-bold shadow-lg transition"
          >
            🎥 Live Recording
          </button>

          <button
            onClick={() => setMode("upload")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-bold shadow-lg transition"
          >
            📤 Upload Video
          </button>

          <button
            onClick={onBackToSports}
            className="bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-xl text-lg font-bold shadow-lg transition"
          >
            ⬅ Back to Sports Selection
          </button>
        </div>
      </div>
    );
  }

  // ✅ Back from live/upload goes to mode selection
  const handleBack = () => {
    setMode(null);
  };

  // ✅ Show correct mode component
  return mode === "live" ? (
    <LiveCamera
      exercise={exercise}
      onFinish={onFinish}
      onBack={handleBack}
    />
  ) : (
    <VideoUpload
      exercise={exercise}
      onFinish={onFinish}
      onBack={handleBack}
    />
  );
};

export default ExerciseRunner;