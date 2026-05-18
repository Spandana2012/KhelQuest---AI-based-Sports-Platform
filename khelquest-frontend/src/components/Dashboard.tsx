import React from "react";
import {
  BarChart3,
  Trophy,
  Users,
  MapPin,
  TrendingUp,
  Target,
  Flame,
  Medal,
  Star,
  CheckCircle2,
  Crown,
  Zap,
  Activity
} from "lucide-react";

interface DashboardProps {
  user: any;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  // Mock data existing
  const ageDistribution = [
    { label: "18-25", value: 40, color: "from-blue-500 to-blue-300" },
    { label: "26-35", value: 30, color: "from-green-500 to-green-300" },
    { label: "36-45", value: 20, color: "from-purple-500 to-purple-300" },
  ];

  const genderDistribution = [
    { label: "Male", value: 50, color: "from-pink-500 to-pink-300" },
    { label: "Female", value: 35, color: "from-yellow-500 to-yellow-300" },
    { label: "Other", value: 15, color: "from-gray-500 to-gray-300" },
  ];

  const performanceMetrics = [
    { metric: "Speed Index", value: 87, rank: 234, total: 1500, improvement: "+12%" },
    { metric: "Endurance Score", value: 92, rank: 156, total: 1200, improvement: "+8%" },
    { metric: "Technique Rating", value: 78, rank: 445, total: 2000, improvement: "+15%" },
    { metric: "Consistency Factor", value: 85, rank: 298, total: 1800, improvement: "+5%" },
  ];

  const nextMilestones = [
    { label: "Top 1000 Global", progress: 80, color: "from-blue-500 to-purple-600", remaining: "247 ranks to go" },
    { label: "Top 20 State", progress: 87, color: "from-green-500 to-emerald-600", remaining: "3 ranks to go" },
    { label: "Top 100 Age Group", progress: 64, color: "from-yellow-500 to-orange-600", remaining: "56 ranks to go" },
  ];

  // --- NEW DATA ADDITIONS ---

  // 1. Daily Targets
  const dailyTargets = [
    { activity: "Pushups", current: 30, target: 50, color: "from-pink-500 to-rose-500", icon: Activity },
    { activity: "Squats", current: 15, target: 40, color: "from-orange-400 to-amber-500", icon: Target },
    { activity: "High Jumps", current: 10, target: 10, color: "from-emerald-400 to-teal-500", icon: CheckCircle2 },
  ];

  // 2. Weekly Progress (Improvement Over Time)
  const weeklyProgress = [
    { day: "Mon", score: 45 },
    { day: "Tue", score: 60 },
    { day: "Wed", score: 55 },
    { day: "Thu", score: 80 },
    { day: "Fri", score: 75 },
    { day: "Sat", score: 95 },
    { day: "Sun", score: 90 },
  ];
  const maxScore = Math.max(...weeklyProgress.map((p) => p.score));

  // 3. Achievements Badges
  const achievements = [
    { title: "7-Day Streak", icon: Flame, color: "text-orange-500", bg: "bg-orange-100", locked: false },
    { title: "100 Pushups", icon: Medal, color: "text-blue-500", bg: "bg-blue-100", locked: false },
    { title: "Top 10 State", icon: Crown, color: "text-yellow-600", bg: "bg-yellow-100", locked: false },
    { title: "Speed Demon", icon: Zap, color: "text-purple-500", bg: "bg-purple-100", locked: false },
    { title: "30-Day Streak", icon: Star, color: "text-gray-400", bg: "bg-gray-100", locked: true },
    { title: "Pro Athlete", icon: Trophy, color: "text-gray-400", bg: "bg-gray-100", locked: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">

      {/* HEADER STATS */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        {/* Abstract shapes for stunning UI */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="group hover:scale-105 transition-transform duration-300">
            <Trophy className="w-10 h-10 mx-auto mb-3 text-yellow-300 group-hover:text-yellow-200 drop-shadow-lg" />
            <h3 className="text-3xl font-extrabold tracking-tight">#1,247</h3>
            <p className="text-blue-100 font-medium mt-1">Global Rank</p>
          </div>
          <div className="group hover:scale-105 transition-transform duration-300">
            <MapPin className="w-10 h-10 mx-auto mb-3 text-emerald-300 group-hover:text-emerald-200 drop-shadow-lg" />
            <h3 className="text-3xl font-extrabold tracking-tight">#23</h3>
            <p className="text-blue-100 font-medium mt-1">State Rank</p>
          </div>
          <div className="group hover:scale-105 transition-transform duration-300">
            <Users className="w-10 h-10 mx-auto mb-3 text-purple-300 group-hover:text-purple-200 drop-shadow-lg" />
            <h3 className="text-3xl font-extrabold tracking-tight">#156</h3>
            <p className="text-blue-100 font-medium mt-1">Age Group</p>
          </div>
          <div className="group hover:scale-105 transition-transform duration-300">
            <TrendingUp className="w-10 h-10 mx-auto mb-3 text-orange-300 group-hover:text-orange-200 drop-shadow-lg" />
            <h3 className="text-3xl font-extrabold tracking-tight">+25</h3>
            <p className="text-blue-100 font-medium mt-1">This Month</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-1 space-y-8">

          {/* Daily Targets */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 p-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-2 text-rose-500" />
              Daily Targets
            </h3>

            <div className="space-y-5">
              {dailyTargets.map((target, idx) => {
                const Icon = target.icon;
                const progressPercentage = Math.min(100, Math.round((target.current / target.target) * 100));
                const isCompleted = target.current >= target.target;

                return (
                  <div key={idx} className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700 flex items-center">
                        <Icon className={`w-4 h-4 mr-2 ${isCompleted ? 'text-emerald-500' : 'text-gray-400'}`} />
                        {target.activity}
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {target.current} <span className="text-gray-400 font-medium">/ {target.target}</span>
                      </span>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
                      <div
                        className={`h-full bg-gradient-to-r ${target.color} transition-all duration-1000 ease-out relative`}
                        style={{ width: `${progressPercentage}%` }}
                      >
                        {/* Shimmer effect inside progress bar */}
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/20 -skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
                      </div>
                    </div>
                    {!isCompleted && (
                      <p className="text-xs text-right mt-1.5 text-gray-500 font-medium">
                        {target.target - target.current} more to go
                      </p>
                    )}
                    {isCompleted && (
                      <p className="text-xs text-right mt-1.5 text-emerald-500 font-bold flex items-center justify-end">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Target Reached!
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Age Distribution */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-blue-600" /> Age Distribution
            </h3>
            <div className="flex space-x-3 h-32 items-end">
              {ageDistribution.map((age, index) => (
                <div
                  key={index}
                  className={`flex-1 bg-gradient-to-t ${age.color} rounded-t-xl flex items-end justify-center text-white font-bold transition-all duration-500 hover:opacity-90 shadow-md`}
                  style={{ height: `${age.value}%` }}
                >
                  <span className="pb-2 drop-shadow-md">{age.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gender Distribution */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="w-6 h-6 mr-2 text-orange-500" /> Gender Distribution
            </h3>
            <div className="flex space-x-3 h-32 items-end">
              {genderDistribution.map((gender, index) => (
                <div
                  key={index}
                  className={`flex-1 bg-gradient-to-t ${gender.color} rounded-t-xl flex items-end justify-center text-white font-bold transition-all duration-500 hover:opacity-90 shadow-md`}
                  style={{ height: `${gender.value}%` }}
                >
                  <span className="pb-2 drop-shadow-md">{gender.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-8">

          {/* Improvement Over Time Chart */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center tracking-tight">
                <TrendingUp className="w-7 h-7 mr-3 text-indigo-500" />
                Weekly Improvement
              </h3>
              <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                +14% vs Last Week
              </span>
            </div>

            {/* Custom CSS Bar Chart */}
            <div className="relative h-64 w-full flex items-end justify-between pt-10">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full border-b border-gray-100 flex-1 border-dashed"></div>
                ))}
              </div>

              {/* Bars */}
              {weeklyProgress.map((item, idx) => {
                const heightPercent = (item.score / maxScore) * 100;
                return (
                  <div key={idx} className="relative flex flex-col items-center flex-1 group z-10">
                    {/* Tooltip */}
                    <div className="absolute -top-10 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 shadow-xl">
                      Score: {item.score}
                    </div>

                    {/* Bar */}
                    <div className="w-8 sm:w-12 h-48 flex justify-center items-end">
                      <div
                        className="w-full bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-xl hover:from-indigo-400 hover:to-indigo-300 transition-all duration-300 shadow-md group-hover:shadow-indigo-500/30 group-hover:shadow-lg origin-bottom cursor-pointer"
                        style={{ height: `${heightPercent}%` }}
                      ></div>
                    </div>

                    {/* Label */}
                    <span className="mt-3 text-sm font-medium text-gray-500 group-hover:text-gray-900 transition-colors">
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center tracking-tight">
              <Medal className="w-7 h-7 mr-3 text-yellow-500" />
              Achievement Badges
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
              {achievements.map((badge, idx) => {
                const BadgeIcon = badge.icon;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center group relative ${badge.locked ? 'opacity-50 grayscale' : 'cursor-pointer'}`}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${badge.bg} ${badge.color} ${!badge.locked && 'group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] group-hover:shadow-' + badge.color.split('-')[1] + '-500/40 relative z-10'}`}>
                      <BadgeIcon className="w-8 h-8" />
                      {!badge.locked && (
                        <div className="absolute inset-0 rounded-full border-2 border-white/40"></div>
                      )}
                    </div>
                    <span className={`text-xs font-bold text-center leading-tight ${badge.locked ? 'text-gray-400' : 'text-gray-800'}`}>
                      {badge.title}
                    </span>
                    {/* Glowing effect under icon for unlocked badges */}
                    {!badge.locked && (
                      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+10px)] w-10 h-10 ${badge.bg} rounded-full blur-xl -z-10 group-hover:scale-150 transition-transform duration-500`}></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance Metrics grid (Moved from generic list to a nicer grid) */}
          <div className="grid sm:grid-cols-2 gap-6">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-500" />
                    {metric.metric}
                  </h3>
                  <span className="text-sm bg-green-50 text-green-600 px-2 py-1 rounded-md font-bold">
                    {metric.improvement}
                  </span>
                </div>

                <div className="flex items-end justify-between mb-3">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-extrabold text-gray-900 tracking-tight">{metric.value}</span>
                    <span className="text-lg font-bold text-gray-400 ml-1">/ 100</span>
                  </div>
                  <span className="text-sm font-medium text-gray-400">
                    Rank <span className="text-gray-700 font-bold">#{metric.rank}</span>
                  </span>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full"
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Next Milestones Container */}
          <div className="bg-gray-900 rounded-3xl shadow-xl p-6 sm:p-8 text-white relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

            <h3 className="text-2xl font-bold mb-6 flex items-center relative z-10">
              <Target className="w-6 h-6 mr-3 text-orange-400" />
              Next Milestones
            </h3>

            <div className="space-y-4 relative z-10">
              {nextMilestones.map((milestone, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-colors">
                  <div className="flex items-center justify-between mb-3 text-sm font-medium">
                    <span className="text-gray-200 text-base">{milestone.label}</span>
                    <span className="text-white bg-white/20 px-3 py-1 rounded-full">{milestone.remaining}</span>
                  </div>
                  <div className="w-full bg-black/40 rounded-full h-2 shadow-inner">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${milestone.color} shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                      style={{ width: `${milestone.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
