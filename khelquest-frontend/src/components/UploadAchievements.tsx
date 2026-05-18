import React, { useState } from "react";
import {
  Upload,
  Camera,
  Medal,
  Award,
  X,
  CheckCircle,
  Clock,
  Image,
  Video,
} from "lucide-react";

interface UploadAchievementsProps {
  user: any;
}

const UploadAchievements: React.FC<UploadAchievementsProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<"medals" | "fitness" | "best">(
    "medals"
  );
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const existingAchievements = [
    {
      id: 1,
      title: "State Championship Gold",
      category: "medals",
      date: "2024-01-15",
      verified: true,
    },
    {
      id: 2,
      title: "National Level Bronze",
      category: "medals",
      date: "2023-11-20",
      verified: true,
    },
    {
      id: 3,
      title: "Best Performance Video - Sprint Technique",
      category: "best",
      date: "2024-01-10",
      verified: false,
    },
    {
      id: 4,
      title: "Fitness Tracker - January",
      category: "fitness",
      date: "2024-01-31",
      verified: true,
    },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    setIsUploading(true);

    setTimeout(() => {
      const newFiles = files.map((file, i) => ({
        id: Date.now() + i,
        name: file.name,
        type: file.type,
        size: file.size,
        category: activeTab,
        uploadDate: new Date().toISOString(),
        verified: false,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      }));

      setUploadedFiles((prev) => [...prev, ...newFiles]);
      setIsUploading(false);
    }, 1200);
  };

  const removeFile = (id: number) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const tabs = [
    {
      id: "medals",
      label: "Medals & Awards",
      icon: Medal,
      description: "Upload medals, certificates and awards",
    },
    {
      id: "fitness",
      label: "Fitness Tracker",
      icon: Clock,
      description: "Upload fitness tracking reports and health metrics",
    },
    {
      id: "best",
      label: "Best Capture",
      icon: Camera,
      description: "Upload your best training/performance video for evaluation",
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "medals":
        return Medal;
      case "fitness":
        return Clock;
      case "best":
        return Video;
      default:
        return Image;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "medals":
        return "from-yellow-500 to-orange-500";
      case "fitness":
        return "from-green-500 to-emerald-500";
      case "best":
        return "from-purple-500 to-indigo-500";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const allAchievements = [...existingAchievements, ...uploadedFiles];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center mb-4">
          <Award className="w-12 h-12 text-yellow-500 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">
            Upload Achievements
          </h1>
        </div>
        <p className="text-lg text-gray-600">
          Upload your medals, fitness data, and best performance videos for
          verification.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8 space-x-4 flex-wrap gap-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col items-center px-5 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? `bg-gradient-to-r ${getCategoryColor(
                      tab.id
                    )} text-white shadow-lg scale-105`
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-sm font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Description */}
      <p className="text-center text-gray-600 mb-8">
        {tabs.find((tab) => tab.id === activeTab)?.description}
      </p>

      {/* Upload Button */}
      <div className="flex justify-center mb-12">
        <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-xl flex items-center space-x-2 hover:opacity-90 transition shadow-lg">
          <Upload className="w-5 h-5" />
          <span className="font-semibold">
            {isUploading ? "Uploading..." : "Upload Files"}
          </span>
          <input
            type="file"
            multiple
            accept={
              activeTab === "best"
                ? "video/*"
                : activeTab === "medals"
                ? "image/*,.pdf"
                : ".pdf,.csv,.xlsx,image/*"
            }
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Achievements List */}
      <div className="space-y-4">
        {allAchievements
          .filter((item) => item.category === activeTab)
          .map((item) => {
            const Icon = getCategoryIcon(item.category);
            return (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r ${getCategoryColor(
                      item.category
                    )} text-white`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {item.title || item.name}
                    </h4>

                    <p className="text-sm text-gray-500">
                      {item.date
                        ? new Date(item.date).toLocaleDateString()
                        : new Date(item.uploadDate).toLocaleDateString()}
                    </p>

                    {item.size && (
                      <p className="text-xs text-gray-400">
                        {formatFileSize(item.size)}
                      </p>
                    )}

                    {item.preview && (
                      <img
                        src={item.preview}
                        alt="preview"
                        className="mt-2 w-40 h-24 object-cover rounded-lg shadow-sm border"
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {item.verified ? (
                    <span className="flex items-center text-green-600 font-semibold">
                      <CheckCircle className="w-5 h-5 mr-1" />
                      Verified
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500">Pending</span>
                  )}

                  <button
                    onClick={() => removeFile(item.id)}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                  >
                    <X className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            );
          })}

        {allAchievements.filter((item) => item.category === activeTab).length ===
          0 && (
          <p className="text-center text-gray-400 py-8">
            No uploads found in this category yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadAchievements;