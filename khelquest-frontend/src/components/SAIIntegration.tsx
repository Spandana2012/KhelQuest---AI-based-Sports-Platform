import React, { useState } from "react";
import {
  Award,
  Bell,
  CheckCircle,
  Clock,
  Star,
  Trophy,
  Users,
  Target,
  Send,
  MessageSquare,
  PhoneCall
} from "lucide-react";

interface SAIIntegrationProps {
  user: any;
}

const SAIIntegration: React.FC<SAIIntegrationProps> = ({ user }) => {
  const [applicationStatus, setApplicationStatus] = useState("pending");
  const [applyingTo, setApplyingTo] = useState<string | null>(null);
  const [appliedPrograms, setAppliedPrograms] = useState<string[]>([]);

  // 0 = Button, 1 = Form, 2 = Success
  const [contactStep, setContactStep] = useState(0);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "selection",
      title: "District Sports Trials - Shortlisted",
      message:
        "Congratulations! You have been shortlisted for district-level trials. Please attend screening at your local sports ground.",
      date: "2024-01-15",
      read: false,
      priority: "high",
    },
    {
      id: 2,
      type: "requirement",
      title: "Documents Required",
      message:
        "Upload your school/college bonafide certificate and medical fitness report for verification.",
      date: "2024-01-12",
      read: false,
      priority: "medium",
    },
    {
      id: 3,
      type: "update",
      title: "Local Board Profile Verified",
      message:
        "Your athlete profile has been reviewed and approved by the local sports board officials.",
      date: "2024-01-10",
      read: true,
      priority: "low",
    },
  ]);

  const localPrograms = [
    {
      id: "district_trials",
      name: "District Sports Trials Program",
      description:
        "Official district-level trials to identify athletes for state-level competitions.",
      eligibility: "Age 14-23, School/College participation, fitness test record",
      benefits: [
        "District Selection Certificate",
        "Sports Scholarship Eligibility",
        "Coaching Camp Access",
        "State-Level Trial Entry",
      ],
      deadline: "2024-03-10",
      status: "open",
    },
    {
      id: "college_team",
      name: "College Team Selection Program",
      description:
        "Selection process for representing your college in university tournaments.",
      eligibility: "Registered student, inter-college participation",
      benefits: [
        "College Sports Kit",
        "Coach Training Sessions",
        "Tournament Participation",
        "Extra Attendance Support",
      ],
      deadline: "2024-02-25",
      status: "open",
    },
    {
      id: "state_camp",
      name: "State Training Camp Recommendation",
      description:
        "Top performers are recommended to state-level sports camps for advanced training.",
      eligibility: "District winner / Top ranking performance",
      benefits: [
        "State Camp Recommendation Letter",
        "Advanced Coaching",
        "Diet & Nutrition Guidance",
        "Performance Monitoring",
      ],
      deadline: "2024-04-15",
      status: "invitation_only",
    },
  ];

  const selectionCriteria = [
    { criterion: "Fitness Test Performance", score: 84, maxScore: 100, status: "good" },
    { criterion: "School/College Sports Record", score: 91, maxScore: 100, status: "excellent" },
    { criterion: "Physical Fitness & Endurance", score: 76, maxScore: 100, status: "good" },
    { criterion: "Discipline & Attendance", score: 82, maxScore: 100, status: "good" },
    { criterion: "Consistency in Practice", score: 70, maxScore: 100, status: "average" },
    { criterion: "Competition Performance", score: 79, maxScore: 100, status: "good" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-emerald-700 bg-emerald-100 border-emerald-200";
      case "good":
        return "text-blue-700 bg-blue-100 border-blue-200";
      case "average":
        return "text-amber-700 bg-amber-100 border-amber-200";
      default:
        return "text-gray-700 bg-gray-100 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-rose-500 bg-rose-50/80";
      case "medium":
        return "border-l-amber-500 bg-amber-50/80";
      case "low":
        return "border-l-blue-500 bg-blue-50/80";
      default:
        return "border-l-gray-500 bg-gray-50/80";
    }
  };

  const overallScore =
    selectionCriteria.reduce((sum, criterion) => sum + criterion.score, 0) /
    selectionCriteria.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative min-h-[80vh] overflow-hidden">

      {/* Background Orbs for Stunning UI */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-400/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      {/* Header */}
      <div className="text-center mb-10 animate-fade-in relative z-10">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-br from-orange-400 to-red-600 p-4 rounded-3xl shadow-lg mr-4 transform rotate-3">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Local Sports Board
          </h1>
        </div>
        <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
          Connect with your District or College Sports Board for real verifiable opportunities.
        </p>
      </div>

      {/* Current Status Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10 animate-fade-in relative z-10">
        <div className="bg-white/80 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900">{overallScore.toFixed(1)}</h3>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-wider mt-1">Selection Score</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
            <Star className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900">{overallScore >= 75 ? "Eligible" : "Improve"}</h3>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-wider mt-1">District Trials</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">{applicationStatus === "pending" ? "Under Review" : "Approved"}</h3>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-wider mt-1">App Status</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <Bell className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900">{notifications.filter((n) => !n.read).length}</h3>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-wider mt-1">New Alerts</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 relative z-10">

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8 animate-fade-in">

          {/* Programs */}
          <div className="bg-white/90 backdrop-blur-xl border border-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center">
              Available Programs <span className="text-sm font-bold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg ml-3">Local & College</span>
            </h2>

            <div className="space-y-6">
              {localPrograms.map((program) => (
                <div
                  key={program.id}
                  className="bg-white border-2 border-slate-100 rounded-2xl p-6 hover:border-indigo-100 hover:shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-5 gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 leading-tight">
                        {program.name}
                      </h3>
                      <p className="text-slate-500 font-medium mt-1 text-sm md:text-base">
                        {program.description}
                      </p>
                    </div>

                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border ${program.status === "open"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : program.status === "invitation_only"
                            ? "bg-purple-50 text-purple-700 border-purple-200"
                            : "bg-slate-50 text-slate-700 border-slate-200"
                        }`}
                    >
                      • {program.status === "open"
                        ? "Open for Applications"
                        : program.status === "invitation_only"
                          ? "Invitation Only"
                          : "Closed"}
                    </span>
                  </div>

                  <div className="flex gap-4 mb-5">
                    <div className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Eligibility</h4>
                      <p className="text-sm text-slate-800 font-medium">{program.eligibility}</p>
                    </div>
                    <div className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-100 hidden sm:block">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Deadline</h4>
                      <p className="text-sm text-slate-800 font-medium">{program.deadline}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Benefits</h4>
                    <div className="flex flex-wrap gap-2">
                      {program.benefits.map((benefit, index) => (
                        <span key={index} className="px-3 py-1 bg-indigo-50 border border-indigo-100/50 text-indigo-700 text-xs font-bold rounded-lg shadow-sm">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {appliedPrograms.includes(program.id) ? (
                    <div className="flex items-center space-x-2 px-5 py-3.5 bg-emerald-50 text-emerald-700 font-bold rounded-xl border border-emerald-200 w-full sm:w-auto inline-flex shadow-sm animate-fade-in">
                      <CheckCircle className="w-5 h-5" />
                      <span>Successfully Applied!</span>
                    </div>
                  ) : applyingTo === program.id ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setAppliedPrograms([...appliedPrograms, program.id]);
                        setApplyingTo(null);
                      }}
                      className="bg-slate-50 p-6 rounded-2xl border border-slate-200 animate-fade-in space-y-4 shadow-inner mt-4"
                    >
                      <h5 className="font-bold text-slate-900 mb-3 flex items-center text-lg"><Target className="w-5 h-5 mr-2 text-indigo-500" /> Application Form</h5>
                      <input required type="text" placeholder="Full Name" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 text-sm font-medium bg-white transition-all shadow-sm" />
                      <input required type="tel" placeholder="Contact Number" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 text-sm font-medium bg-white transition-all shadow-sm" />
                      <textarea required placeholder="Why should you be selected? Briefly describe your achievements." rows={3} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 text-sm font-medium bg-white transition-all shadow-sm"></textarea>
                      <div className="flex space-x-3 pt-2">
                        <button type="button" onClick={() => setApplyingTo(null)} className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-50 text-sm transition-colors shadow-sm">Cancel</button>
                        <button type="submit" className="flex-1 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-[0_4px_15px_rgb(0,0,0,0.2)] transition-all">Submit Application</button>
                      </div>
                    </form>
                  ) : (
                    <button
                      onClick={() => setApplyingTo(program.id)}
                      disabled={program.status !== "open"}
                      className={`flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl font-extrabold transition-all w-full sm:w-auto shadow-sm ${program.status === "open"
                          ? "bg-slate-900 hover:bg-slate-800 text-white hover:shadow-[0_4px_15px_rgb(0,0,0,0.15)] hover:-translate-y-0.5"
                          : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                        }`}
                    >
                      <Send className="w-4 h-4" />
                      <span>{program.status === "open" ? "Apply Now" : "Currently Unavailable"}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Selection Criteria - STUNNING UI */}
          <div className="bg-white/90 backdrop-blur-xl border border-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-8">
              Local Board Selection Criteria Assessment
            </h2>

            <div className="space-y-6">
              {selectionCriteria.map((criterion, index) => (
                <div key={index} className="group cursor-default">
                  <div className="flex items-center justify-between mb-3 border-b-2 border-transparent group-hover:border-slate-100 pb-1 transition-all">
                    <span className="font-bold text-slate-700 md:text-lg">
                      {criterion.criterion}
                    </span>

                    <div className="flex items-center space-x-3">
                      <span className="text-xl font-extrabold text-slate-900">
                        {criterion.score} <span className="text-sm text-slate-400 font-bold">/ {criterion.maxScore}</span>
                      </span>
                      <span className={`px-3 py-1 text-xs font-bold rounded-lg border shadow-sm ${getStatusColor(criterion.status)}`}>
                        {criterion.status}
                      </span>
                    </div>
                  </div>

                  {/* Stunning Progress Bar */}
                  <div className="w-full bg-slate-100 rounded-full h-3 border border-slate-200/50 overflow-hidden shadow-inner">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-in-out relative flex items-center justify-end pr-2 ${criterion.status === "excellent"
                          ? "bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-[0_0_12px_#34d399]"
                          : criterion.status === "good"
                            ? "bg-gradient-to-r from-blue-400 to-blue-500 shadow-[0_0_12px_#60a5fa]"
                            : criterion.status === "average"
                              ? "bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_12px_#fbbf24]"
                              : "bg-gradient-to-r from-slate-400 to-slate-500"
                        }`}
                      style={{ width: `${Math.max(criterion.score, 5)}%` }} // Ensure minimum width for visibility
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-slate-900 text-white rounded-2xl relative overflow-hidden shadow-[0_10px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_10px_40px_rgb(0,0,0,0.15)] transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between z-10 relative">
                <div>
                  <span className="text-sm font-bold text-indigo-300 uppercase tracking-widest block mb-1">
                    Overall Candidate Score
                  </span>
                  <p className="text-slate-300 font-medium">
                    {overallScore >= 85
                      ? "Excellent - Strong candidate for district selection"
                      : overallScore >= 75
                        ? "Good - Eligible for district programs"
                        : "Average - Focus on improvement areas"}
                  </p>
                </div>
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 to-white mt-4 sm:mt-0">
                  {overallScore.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 animate-fade-in">

          {/* Notifications */}
          <div className="bg-white/90 backdrop-blur-xl border border-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6">
            <h3 className="text-xl font-extrabold text-slate-900 mb-5 flex items-center">
              <span className="bg-orange-100 text-orange-600 p-2 rounded-xl mr-3 shadow-sm border border-orange-200">
                <Bell className="w-5 h-5" />
              </span>
              Board Alerts
            </h3>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className={`p-4 border-l-4 rounded-xl border border-slate-100 ${getPriorityColor(notification.priority)} shadow-sm hover:shadow-md transition-shadow`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 mb-1 leading-tight">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed mb-3">
                        {notification.message}
                      </p>

                      <div className="flex items-center space-x-2 text-xs font-bold text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{new Date(notification.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {!notification.read && <div className="w-2.5 h-2.5 bg-rose-500 rounded-full flex-shrink-0 mt-1 shadow-[0_0_8px_#f43f5e]"></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/90 backdrop-blur-xl border border-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6">
            <h3 className="text-xl font-extrabold text-slate-900 mb-5">
              Quick Actions
            </h3>

            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 hover:border-slate-200 transition-all text-left font-bold text-slate-700 shadow-sm hover:shadow-md group">
                <span className="bg-white p-2 text-emerald-600 rounded-lg shadow-sm border border-slate-100 group-hover:scale-110 transition-transform"><CheckCircle className="w-4 h-4" /></span>
                <span>Complete Verification</span>
              </button>

              <button className="w-full flex items-center space-x-3 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 hover:border-slate-200 transition-all text-left font-bold text-slate-700 shadow-sm hover:shadow-md group">
                <span className="bg-white p-2 text-blue-600 rounded-lg shadow-sm border border-slate-100 group-hover:scale-110 transition-transform"><Target className="w-4 h-4" /></span>
                <span>Update Fitness Test</span>
              </button>

              <button className="w-full flex items-center space-x-3 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 hover:border-slate-200 transition-all text-left font-bold text-slate-700 shadow-sm hover:shadow-md group">
                <span className="bg-white p-2 text-purple-600 rounded-lg shadow-sm border border-slate-100 group-hover:scale-110 transition-transform"><Trophy className="w-4 h-4" /></span>
                <span>Request Trial Schedule</span>
              </button>
            </div>
          </div>

          {/* Interactive Contact Board */}
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl z-0 pointer-events-none"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-extrabold mb-2 flex items-center">
                Need Help?
              </h3>

              {contactStep === 0 && (
                <>
                  <p className="text-orange-100 mb-6 font-medium leading-relaxed">
                    Contact your local sports board or college sports department directly for official guidance and support.
                  </p>
                  <button
                    onClick={() => setContactStep(1)}
                    className="w-full bg-white text-orange-600 font-extrabold py-3.5 px-4 rounded-xl shadow-lg hover:bg-orange-50 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" /> Contact Local Sports Office
                  </button>
                </>
              )}

              {contactStep === 1 && (
                <form
                  onSubmit={(e) => { e.preventDefault(); setContactStep(2); }}
                  className="bg-white/10 p-4 rounded-2xl border border-white/20 animate-fade-in space-y-3 backdrop-blur-sm"
                >
                  <input required placeholder="Subject / Query Topic" className="w-full px-4 py-2.5 bg-white/90 text-slate-900 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-white border-0 text-sm font-bold shadow-inner" />
                  <textarea required placeholder="Write your message..." rows={3} className="w-full px-4 py-2.5 bg-white/90 text-slate-900 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-white border-0 text-sm font-medium shadow-inner"></textarea>
                  <div className="flex gap-2 pt-1">
                    <button type="button" onClick={() => setContactStep(0)} className="w-1/3 py-2 bg-black/20 text-white font-bold rounded-xl hover:bg-black/30 text-sm transition-colors">Cancel</button>
                    <button type="submit" className="w-2/3 py-2 bg-white text-rose-600 font-extrabold rounded-xl hover:bg-rose-50 shadow-md transition-all text-sm flex items-center justify-center">
                      <Send className="w-4 h-4 mr-1.5" /> Send
                    </button>
                  </div>
                </form>
              )}

              {contactStep === 2 && (
                <div className="bg-white p-5 rounded-2xl animate-fade-in text-center shadow-lg border-2 border-emerald-400">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-slate-900 font-extrabold text-lg mb-1">Message Sent!</h4>
                  <p className="text-slate-500 text-sm font-medium mb-4">The local sports office will respond to your registered email.</p>
                  <button
                    onClick={() => setContactStep(0)}
                    className="w-full py-2.5 bg-emerald-50 text-emerald-700 font-bold rounded-xl hover:bg-emerald-100 transition-colors text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SAIIntegration;