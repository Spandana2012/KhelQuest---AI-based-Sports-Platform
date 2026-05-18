import React, { useState } from "react";
import {
    Bot,
    Dumbbell,
    Calendar,
    Target,
    Activity,
    Clock,
    Flame,
    CheckCircle2,
    ChevronRight,
    Zap,
    Play
} from "lucide-react";

interface TrainingPlanProps {
    user: any;
    onStartSession?: () => void;
}

const TrainingPlan: React.FC<TrainingPlanProps> = ({ user, onStartSession }) => {
    const [coachMode, setCoachMode] = useState<'AI' | 'REAL'>('AI');
    const [expandedWorkout, setExpandedWorkout] = useState<number | null>(null);

    // Use user data if available, fallback to defaults
    const sport = user?.sport || "General Fitness";
    const userAge = user?.age || 25;
    const level = userAge < 20 ? "Amateur" : userAge < 35 ? "Intermediate" : "Pro";

    // Mock AI Data based on user metadata
    const weeklyGoals = [
        { title: "Improve Core Strength", progress: 65, color: "from-blue-500 to-cyan-400" },
        { title: "Increase Speed by 10%", progress: 40, color: "from-purple-500 to-pink-500" },
        { title: "Maintain Flexibility", progress: 85, color: "from-green-400 to-emerald-500" }
    ];

    const todayWorkouts = [
        { name: "Warmup Stretching", duration: "10 min", intensity: "Low", icon: Activity, bg: "bg-blue-50", color: "text-blue-500", completed: true },
        { name: `${sport} Specific Drills`, duration: "45 min", intensity: "High", icon: Zap, bg: "bg-orange-50", color: "text-orange-500", completed: false },
        { name: "Core Conditioning", duration: "20 min", intensity: "Medium", icon: Dumbbell, bg: "bg-purple-50", color: "text-purple-500", completed: false },
        { name: "Cool Down", duration: "10 min", intensity: "Low", icon: Clock, bg: "bg-gray-50", color: "text-gray-500", completed: false },
    ];

    const weeklySchedule = [
        { day: "Mon", focus: "Strength", active: false, done: true },
        { day: "Tue", focus: "Endurance", active: false, done: true },
        { day: "Wed", focus: `${sport} Tech`, active: true, done: false },
        { day: "Thu", focus: "Agility", active: false, done: false },
        { day: "Fri", focus: "Strength", active: false, done: false },
        { day: "Sat", focus: "Match/Sim", active: false, done: false },
        { day: "Sun", focus: "Rest/Yoga", active: false, done: false },
    ];

    // AI Guidance sections
    const aiGuidance = [
        { title: "Training Suggestions", text: `Focus on explosive power building. Incorporate ${sport} jumps.`, icon: Target },
        { title: "Technique Correction", text: "Your stance is slightly wide during squats. Narrow it by 2 inches.", icon: Activity },
        { title: "Daily Guidance", text: "Hydrate well! You have high-intensity drills planned today.", icon: Flame },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in relative">

            {/* Background Orbs */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-40 right-10 w-96 h-96 bg-fuchsia-400/10 rounded-full blur-3xl -z-10"></div>

            {/* HEADER: AI Persona */}
            <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-white border border-white/10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-rose-400"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                                <Bot className="w-10 h-10 text-white" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-2 border-indigo-900 flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="bg-white/20 text-indigo-100 text-xs font-bold px-2 py-1 rounded border border-white/10 uppercase tracking-wide">
                                    {coachMode === 'AI' ? 'AI Coach Active' : 'Personal Trainer Active'}
                                </span>
                                <span className="text-gray-300 text-sm flex items-center">
                                    <Flame className="w-4 h-4 text-orange-400 mr-1" /> Week 4/12
                                </span>
                            </div>
                            <h2 className="text-3xl font-extrabold tracking-tight">Your Personalized Plan</h2>
                            <p className="text-indigo-200 mt-1 font-medium max-w-xl">
                                Optimized for a {userAge}-year-old {level} {sport} athlete. {coachMode === 'AI' ? "Adjusted based on yesterday's recovery metrics." : "Managed by your personal trainer."}
                            </p>
                        </div>
                    </div>

                    <div className="shrink-0 w-full md:w-auto">
                        <button
                            onClick={onStartSession}
                            className="w-full md:w-auto bg-white text-indigo-900 hover:bg-indigo-50 font-bold py-3 px-6 rounded-xl shadow-lg shadow-white/10 transition-all flex items-center justify-center group"
                        >
                            <Play className="w-5 h-5 mr-2 text-indigo-600 group-hover:scale-110 transition-transform" fill="currentColor" />
                            Start Today's Session
                        </button>
                    </div>
                </div>

                {/* Coach Toggle */}
                <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex bg-indigo-950/50 p-1 rounded-xl backdrop-blur-sm shadow-inner">
                        <button
                            onClick={() => setCoachMode('AI')}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${coachMode === 'AI'
                                ? 'bg-indigo-500 text-white shadow-lg'
                                : 'text-indigo-200 hover:text-white'
                                }`}
                        >
                            AI Personal Coach
                        </button>
                        <button
                            onClick={() => setCoachMode('REAL')}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${coachMode === 'REAL'
                                ? 'bg-indigo-500 text-white shadow-lg'
                                : 'text-indigo-200 hover:text-white'
                                }`}
                        >
                            Real Coach
                        </button>
                    </div>

                    {coachMode === 'REAL' && (
                        <div className="text-sm font-medium text-emerald-300 flex items-center bg-emerald-500/10 px-4 py-2 rounded-lg border border-emerald-500/20">
                            <CheckCircle2 className="w-4 h-4 mr-2" /> Coach Sarah has approved this plan.
                        </div>
                    )}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: Goals & Schedule */}
                <div className="lg:col-span-1 space-y-8">

                    {/* Weekly Goals */}
                    <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <Target className="w-6 h-6 mr-2 text-purple-600" />
                            Weekly Objectives
                        </h3>

                        <div className="space-y-6">
                            {weeklyGoals.map((goal, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-gray-700">{goal.title}</span>
                                        <span className="text-sm font-bold text-gray-900">{goal.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-gradient-to-r ${goal.color}`}
                                            style={{ width: `${goal.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Guidance Details (Conditional on AI Mode) */}
                    {coachMode === 'AI' && (
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 border border-indigo-100 relative overflow-hidden group hover:border-indigo-200 transition-colors">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/50 rounded-full blur-3xl -z-10 group-hover:bg-purple-300/50 transition-colors"></div>
                            <Bot className="w-8 h-8 text-indigo-600 mb-4 opacity-50 absolute right-6 top-6" />

                            <h3 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-4">AI Guidance</h3>

                            <div className="space-y-4">
                                {aiGuidance.map((item, idx) => {
                                    const InfoIcon = item.icon;
                                    return (
                                        <div key={idx} className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-indigo-100/50">
                                            <div className="flex items-center gap-2 mb-1">
                                                <InfoIcon className="w-4 h-4 text-indigo-500" />
                                                <span className="font-bold text-indigo-900 text-sm">{item.title}</span>
                                            </div>
                                            <p className="text-gray-700 text-sm pl-6">{item.text}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                </div>

                {/* RIGHT COLUMN: Today & Roadmap */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Today's Workout */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 flex items-center tracking-tight">
                                    <Activity className="w-7 h-7 mr-3 text-rose-500" />
                                    Today's Regimen
                                </h3>
                                <p className="text-gray-500 mt-1 font-medium flex items-center">
                                    <Calendar className="w-4 h-4 mr-1.5" /> Wednesday Focus: {sport} Technique
                                </p>
                            </div>
                            <div className="hidden sm:flex items-center space-x-1">
                                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                                <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                                <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                                <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {todayWorkouts.map((workout, idx) => {
                                const WorkoutIcon = workout.icon;
                                const isExpanded = expandedWorkout === idx;

                                return (
                                    <div
                                        key={idx}
                                        onClick={() => !workout.completed && setExpandedWorkout(isExpanded ? null : idx)}
                                        className={`flex flex-col p-4 rounded-2xl border transition-all ${workout.completed
                                            ? 'bg-gray-50 border-gray-100 opacity-70'
                                            : 'bg-white border-gray-100 hover:border-indigo-200 hover:shadow-md cursor-pointer group'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${workout.bg} ${workout.color}`}>
                                                    {workout.completed ? <CheckCircle2 className="w-6 h-6" /> : <WorkoutIcon className="w-6 h-6" />}
                                                </div>
                                                <div>
                                                    <h4 className={`font-bold ${workout.completed ? 'text-gray-500 line-through' : 'text-gray-900 group-hover:text-indigo-600 transition-colors'}`}>
                                                        {workout.name}
                                                    </h4>
                                                    <div className="flex items-center text-sm font-medium mt-0.5 space-x-3">
                                                        <span className="flex items-center text-gray-500">
                                                            <Clock className="w-3.5 h-3.5 mr-1" /> {workout.duration}
                                                        </span>
                                                        <span className={`px-2 py-0.5 rounded text-xs ${workout.intensity === 'High' ? 'bg-red-50 text-red-600' :
                                                            workout.intensity === 'Medium' ? 'bg-orange-50 text-orange-600' :
                                                                'bg-blue-50 text-blue-600'
                                                            }`}>
                                                            {workout.intensity}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                {!workout.completed && (
                                                    <ChevronRight className={`w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-transform ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                                                )}
                                            </div>
                                        </div>

                                        {/* Expandable Details */}
                                        {isExpanded && !workout.completed && (
                                            <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in pl-16">
                                                <p className="text-sm text-gray-600 mb-4">
                                                    Complete 3 sets of {workout.name} matching the target intensity. Remember to log your results in the achievements tab once completed.
                                                </p>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (onStartSession) onStartSession();
                                                    }}
                                                    className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors flex items-center"
                                                >
                                                    <Play className="w-4 h-4 mr-2" /> Start Drill
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Weekly Roadmap Tracker */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <Calendar className="w-6 h-6 mr-2 text-indigo-500" />
                            Weekly Roadmap
                        </h3>

                        <div className="flex justify-between items-center w-full overflow-x-auto pb-4 hide-scrollbar">
                            {weeklySchedule.map((day, idx) => (
                                <div key={idx} className="flex flex-col items-center min-w-[70px]">
                                    <span className={`text-xs font-bold mb-3 ${day.active ? 'text-indigo-600' : 'text-gray-400'}`}>
                                        {day.day}
                                    </span>

                                    <div className="relative flex items-center justify-center h-10 w-full mb-3">
                                        {/* Connecting Line */}
                                        {idx < weeklySchedule.length - 1 && (
                                            <div className={`absolute right-0 w-1/2 h-0.5 translate-x-full ${day.done ? 'bg-indigo-500' : 'bg-gray-200'
                                                }`}></div>
                                        )}
                                        {idx > 0 && (
                                            <div className={`absolute left-0 w-1/2 h-0.5 -translate-x-full ${weeklySchedule[idx - 1].done ? 'bg-indigo-500' : 'bg-gray-200'
                                                }`}></div>
                                        )}

                                        {/* Node */}
                                        <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${day.done
                                            ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                                            : day.active
                                                ? 'bg-white border-4 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)] scale-110'
                                                : 'bg-white border-2 border-gray-200 text-gray-300'
                                            }`}>
                                            {day.done && <CheckCircle2 className="w-5 h-5" />}
                                            {day.active && <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>}
                                        </div>
                                    </div>

                                    <span className={`text-xs ${day.active ? 'font-bold text-gray-900' : 'font-medium text-gray-500'}`}>
                                        {day.focus}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TrainingPlan;
