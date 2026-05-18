import React from "react";

interface ExerciseResultProps {
  result: {
    exercise: string;
    value: number;
    timestamp: string;
  };
  onDone: () => void;
  onTryAnother: () => void; // ✅ added
}

const ExerciseResult: React.FC<ExerciseResultProps> = ({
  result,
  onDone,
  onTryAnother,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-10 w-full max-w-xl text-center flex flex-col gap-6">

        <h1 className="text-5xl font-extrabold text-white tracking-wide">
          Performance Result
        </h1>

        <div className="bg-white/20 border border-white/20 rounded-2xl shadow-xl p-8 flex flex-col gap-3">
          <p className="text-2xl font-bold text-gray-200">
            Exercise:{" "}
            <span className="text-green-300">
              {result.exercise.toUpperCase()}
            </span>
          </p>

          <p className="text-6xl font-extrabold text-blue-400 drop-shadow-lg">
            {result.value}
          </p>

          <p className="text-sm text-gray-300">
            {new Date(result.timestamp).toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={onTryAnother}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg transition"
          >
            ⬅ Try Another Exercise
          </button>

          <button
            onClick={onDone}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseResult;