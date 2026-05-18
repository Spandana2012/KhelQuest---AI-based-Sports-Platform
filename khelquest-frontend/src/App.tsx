import React, { useState, useEffect } from "react";
import { Trophy, Medal, BarChart3, Award, Star, Menu, X, MapPin } from "lucide-react";

import LandingPage from "./components/LandingPage";
import AuthPage from "./components/AuthPage";
import SportSelection from "./components/SportSelection";
import ProfileForm from "./components/ProfileForm";
import Dashboard from "./components/Dashboard";
import UploadAchievements from "./components/UploadAchievements";
import FeedbackSection from "./components/FeedbackSection";
import Rankings from "./components/Rankings";
import SAIIntegration from "./components/SAIIntegration";
import TrainingPlan from "./components/TrainingPlan";
import ExerciseRunner from "./components/ExerciseRunner";
import ExerciseResult from "./components/ExerciseResult";
import Finder from "./components/Finder";

type Page =
  | "landing"
  | "auth"
  | "sport-selection"
  | "profile-form"
  | "dashboard"
  | "train"
  | "uploads"
  | "feedback"
  | "rankings"
  | "sai"
  | "exercise"
  | "exercise-result"
  | "finder";

interface User {
  id: string;
  name: string;
  email: string;
  sport: string;
  age: number;
  gender: string;
  profile?: any;
}

type ExerciseType = "pushup" | "squat" | "highjump";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedExercise, setSelectedExercise] = useState<ExerciseType | null>(
    null
  );
  const [exerciseResult, setExerciseResult] = useState<any>(null);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "train", label: "Train", icon: Trophy },
    { id: "finder", label: "Finder", icon: MapPin },
    { id: "uploads", label: "Achievements", icon: Medal },
    { id: "feedback", label: "Feedback", icon: Star },
    { id: "rankings", label: "Rankings", icon: Trophy },
    { id: "sai", label: "Local Board", icon: Award },
  ];

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage("sport-selection");
  };

  // 🔥 MAIN CHANGE: handle exercises here
  const handleSportSelection = (sport: string) => {
    const exerciseMap: Record<string, ExerciseType> = {
      PushUps: "pushup",
      Squats: "squat",
      HighJump: "highjump",
    };

    // If selected sport is exercise
    if (exerciseMap[sport]) {
      setSelectedExercise(exerciseMap[sport]);
      setExerciseResult(null); // reset old result
      setCurrentPage("exercise");
      return;
    }

    // Otherwise normal sport
    if (user) {
      setUser({ ...user, sport });
      setCurrentPage("profile-form");
    }
  };

  const handleProfileComplete = (profileData: any) => {
    if (user) {
      setUser({ ...user, profile: profileData });
      setCurrentPage("dashboard");
    }
  };

  // Redirect unauthenticated users
  useEffect(() => {
    if (!user && !["landing", "auth"].includes(currentPage)) {
      setCurrentPage("landing");
    }
  }, [user, currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* NAVIGATION BAR */}
      {user &&
        !["sport-selection", "profile-form", "exercise", "exercise-result"].includes(
          currentPage
        ) && (
          <nav className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-8 h-8 text-orange-500" />
                  <span className="text-2xl font-bold text-blue-700">
                    KhelQuest
                  </span>
                </div>

                {/* Desktop */}
                <div className="hidden md:flex items-center space-x-6">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handlePageChange(item.id as Page)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${currentPage === item.id
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:text-blue-600"
                          }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Mobile */}
                <div className="md:hidden">
                  <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )}

      {/* PAGES */}
      {currentPage === "landing" && (
        <LandingPage onGetStarted={() => handlePageChange("auth")} />
      )}

      {currentPage === "auth" && (
        <AuthPage
          onLogin={handleLogin}
          onBack={() => handlePageChange("landing")}
        />
      )}

      {currentPage === "sport-selection" && user && (
        <SportSelection onSelectSport={handleSportSelection} />
      )}

      {currentPage === "profile-form" && user && (
        <ProfileForm user={user} onComplete={handleProfileComplete} />
      )}

      {/* 🔥 EXERCISE EXECUTION */}
      {currentPage === "exercise" && selectedExercise && (
        <ExerciseRunner
          exercise={selectedExercise}
          onFinish={(result) => {
            setExerciseResult(result);
            setCurrentPage("exercise-result");
          }}
          onBackToSports={() => {
            setSelectedExercise(null);
            setExerciseResult(null);
            setCurrentPage("sport-selection");
          }}
        />
      )}

      {/* 🔥 EXERCISE RESULT */}
      {currentPage === "exercise-result" && exerciseResult && (
        <ExerciseResult
          result={exerciseResult}
          onDone={() => handlePageChange("dashboard")}
          onTryAnother={() => {
            setExerciseResult(null);
            setSelectedExercise(null);
            setCurrentPage("sport-selection");
          }}
        />
      )}

      {/* MAIN APP PAGES */}
      {currentPage === "dashboard" && user && <Dashboard user={user} />}
      {currentPage === "train" && user && (
        <TrainingPlan
          user={user}
          onStartSession={() => setCurrentPage("sport-selection")}
        />
      )}
      {currentPage === "uploads" && user && <UploadAchievements user={user} />}
      {currentPage === "feedback" && user && <FeedbackSection user={user} />}
      {currentPage === "rankings" && user && <Rankings user={user} />}
      {currentPage === "sai" && user && <SAIIntegration user={user} />}
      {currentPage === "finder" && user && <Finder />}
    </div>
  );
}

export default App;