import React, { useState } from 'react';
import {
  Star,
  MessageCircle,
  ThumbsUp,
  Award,
  Send,
  Search,
  Bot,
  Activity,
  Zap,
  ShieldAlert,
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface FeedbackSectionProps {
  user: any;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = () => {
  const [newFeedback, setNewFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'ai' | 'community'>('ai');
  const [communityTab, setCommunityTab] = useState<'received' | 'give'>('received');

  // Interaction States
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [giveRatings, setGiveRatings] = useState<Record<number, number>>({});
  const [giveTexts, setGiveTexts] = useState<Record<number, string>>({});
  const [giveSuccessMsg, setGiveSuccessMsg] = useState<Record<number, boolean>>({});

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !newFeedback) return;
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setNewFeedback('');
      setRating(0);
    }, 2000);
  };

  const handleGiveSubmit = (id: number) => {
    if (!giveRatings[id] || !giveTexts[id]) return;
    setGiveSuccessMsg(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setGiveSuccessMsg(prev => ({ ...prev, [id]: false }));
      setGiveRatings(prev => ({ ...prev, [id]: 0 }));
      setGiveTexts(prev => ({ ...prev, [id]: '' }));
    }, 2000);
  };

  // AI Performance Insights mock data
  const aiInsights = [
    { type: 'correction', title: 'Movement Correction', detail: 'Left knee extension during squat is 15° restricted. Shift weight slightly back to heels to correct imbalance.', icon: ShieldAlert, color: 'text-rose-500', bg: 'bg-rose-50' },
    { type: 'performance', title: 'Performance Insight', detail: `Explosive power up 12% in the last 7 days! Your sprint starts are significantly faster.`, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
    { type: 'form', title: 'Form Perfected', detail: 'Your upper body posture during endurance runs has stabilized perfectly over 5km distances.', icon: Sparkles, color: 'text-emerald-500', bg: 'bg-emerald-50' }
  ];

  // Mock feedback data
  const feedbackData = [
    {
      id: 0,
      type: 'ai',
      from: 'AI Performance Engine',
      rating: 5,
      comment: 'Excellent bio-mechanic fluidness detected! However, wrist rotation needs +5 degrees adjustment on the follow-through.',
      date: '2024-01-16',
      category: 'Correction',
      avatar: <Bot className="w-5 h-5 text-white" />
    },
    {
      id: 1,
      type: 'coach',
      from: 'Coach Rajesh Kumar',
      rating: 5,
      comment: 'Excellent performance in the sprint technique. Keep focusing on your start position.',
      date: '2024-01-15',
      category: 'Technique',
      avatar: <span className="text-xl">👨‍🏫</span>
    },
    {
      id: 2,
      type: 'peer',
      from: 'Priya Sharma',
      rating: 4,
      comment: 'Great improvement in your endurance! Your consistency is inspiring.',
      date: '2024-01-14',
      category: 'Performance',
      avatar: <span className="text-xl">👩‍🎯</span>
    },
    {
      id: 3,
      type: 'expert',
      from: 'Dr. Amit Verma',
      rating: 5,
      comment: 'Your biomechanical analysis shows significant improvement. Continue the current training regimen.',
      date: '2024-01-12',
      category: 'Analysis',
      avatar: <span className="text-xl">👨‍⚕</span>
    }
  ];

  // Mock pending requests from other users
  const pendingRequests = [
    { id: 101, name: "Rahul Verma", sport: "Sprint", request: "Can someone check my starting block posture? I feel slow off the line.", urgency: "High" },
    { id: 102, name: "Neha Singh", sport: "Squats", request: "Are my knees caving in on the ascent? 80kg PR attempt.", urgency: "Medium" },
  ];

  // Only show human feedback in the Community tab
  const humanFeedback = feedbackData.filter(f => f.type !== 'ai');

  const filteredFeedback = humanFeedback.filter(feedback => {
    const matchesFilter = filterType === 'all' || feedback.type === filterType;
    const matchesSearch = feedback.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.from.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const feedbackCategories = [
    { value: 'all', label: 'All Feedback' },
    { value: 'ai', label: 'AI Coach' },
    { value: 'coach', label: 'Human Coaches' },
    { value: 'peer', label: 'Peers' },
    { value: 'expert', label: 'Experts' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in relative">

      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-white border border-white/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-500/20 text-blue-200 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30 uppercase tracking-widest flex items-center">
                <Activity className="w-3 h-3 mr-1.5" /> Live Telemetry
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Feedback & Analysis</h1>
            <p className="text-indigo-200 text-lg max-w-2xl">
              Precision feedback powered by KhelQuest AI and your community. Review movement corrections and performance analytics.
            </p>
          </div>

          <div className="flex gap-2 bg-indigo-950/50 p-1.5 rounded-2xl backdrop-blur-md border border-white/5">
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center ${activeTab === 'ai' ? 'bg-indigo-500 text-white shadow-lg' : 'text-indigo-300 hover:text-white'}`}
            >
              <Bot className="w-5 h-5 mr-2" /> AI Analysis
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center ${activeTab === 'community' ? 'bg-purple-500 text-white shadow-lg' : 'text-indigo-300 hover:text-white'}`}
            >
              <UsersIcon className="w-5 h-5 mr-2" /> Community
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'ai' && (
        <div className="space-y-8 animate-fade-in">
          {/* Movement Correction & Insights Module */}
          <div className="grid md:grid-cols-3 gap-6">
            {aiInsights.map((insight, idx) => {
              const InsightIcon = insight.icon;
              return (
                <div key={idx} className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${insight.bg} ${insight.color} group-hover:scale-110 transition-transform`}>
                    <InsightIcon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{insight.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-medium">
                    {insight.detail}
                  </p>
                  <button className={`mt-5 flex items-center text-sm font-bold ${insight.color} opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0`}>
                    View Detailed Render <ChevronDown className="w-4 h-4 ml-1 -rotate-90" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Flexible Output: Real-time Form Video Mockup */}
          <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800 relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
            <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
              <span className="flex items-center px-3 py-1 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse mr-2"></div> AI Vision Recording
              </span>
              <span className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-xs font-bold backdrop-blur-md flex items-center">
                <Sparkles className="w-3 h-3 mr-1 text-yellow-300" /> Form Mapping Active
              </span>
            </div>

            <div className="h-[400px] w-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #4f46e5 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

              <div className="flex w-full h-full">
                {/* Left Side: Mock Video Frame */}
                <div className="w-full md:w-1/2 h-full flex items-center justify-center relative border-r border-gray-800">
                  <div className="w-48 h-64 border-2 border-indigo-500/30 rounded-lg relative flex flex-col items-center justify-end pb-8">
                    {/* Mock Stick Figure Node Analysis */}
                    <div className="w-12 h-12 border-2 border-indigo-400 rounded-full mb-2 bg-indigo-500/20 relative">
                      {/* Face nodes */}
                      <div className="absolute w-1 h-1 bg-cyan-300 rounded-full top-3 left-3"></div>
                      <div className="absolute w-1 h-1 bg-cyan-300 rounded-full top-3 right-3"></div>
                    </div>
                    <div className="w-2 h-20 bg-indigo-500/50 relative">
                      {/* Arm node lines */}
                      <div className="absolute top-2 -left-6 w-16 h-1 bg-indigo-400/80 rotate-45 transform origin-left">
                        <div className="absolute -right-2 -top-1.5 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
                      </div>
                      <div className="absolute top-2 -right-6 w-16 h-1 bg-indigo-400/80 -rotate-45 transform origin-right">
                        <div className="absolute -left-2 -top-1.5 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
                      </div>
                    </div>
                    <div className="flex w-full justify-center gap-12 mt-1 relative">
                      {/* Leg node lines */}
                      <div className="w-2 h-16 bg-indigo-500/50 -rotate-12 transform origin-top relative">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_15px_#34d399] border-2 border-white animate-pulse"></div>
                        <div className="absolute -left-12 bottom-0 bg-gray-900 border border-emerald-900/50 text-emerald-400 text-[10px] font-mono px-2 py-1 rounded">84° Optimal</div>
                      </div>
                      <div className="w-2 h-16 bg-rose-500/50 rotate-12 transform origin-top relative">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-rose-400 rounded-full shadow-[0_0_15px_#fb7185] border-2 border-white animate-pulse"></div>
                        <div className="absolute -right-16 bottom-0 bg-gray-900 border border-rose-900/50 text-rose-400 text-[10px] font-mono px-2 py-1 rounded">102° Shallow</div>
                      </div>
                    </div>
                    <div className="absolute top-2 left-2 text-[10px] text-indigo-300 font-mono bg-indigo-900/50 px-2 rounded">TRACKING: 98%</div>
                  </div>
                </div>

                {/* Right Side: Auto-Extracted Insights */}
                <div className="hidden md:flex w-1/2 h-full p-8 flex-col justify-center bg-gray-900/50 z-10">
                  <h4 className="text-white font-bold mb-4 flex items-center"><Activity className="w-4 h-4 mr-2 text-cyan-400" /> Extracted Telemetry</h4>
                  <div className="space-y-4">
                    <div className="bg-gray-800/80 p-3 rounded-lg border border-gray-700">
                      <div className="flex justify-between text-xs mb-1"><span className="text-gray-400">Descent Velocity</span><span className="text-white font-mono">0.8 m/s</span></div>
                      <div className="w-full bg-gray-700 h-1 rounded-full"><div className="bg-emerald-400 h-1 rounded-full" style={{ width: '60%' }}></div></div>
                    </div>
                    <div className="bg-rose-900/20 p-3 rounded-lg border border-rose-500/20">
                      <div className="flex items-start">
                        <ShieldAlert className="w-4 h-4 text-rose-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-rose-200 text-sm font-bold">Right Knee Asymmetry</p>
                          <p className="text-rose-400/80 text-xs mt-1">Right knee tracking shows 18° deviation outward during concentric phase.</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-indigo-900/20 p-3 rounded-lg border border-indigo-500/20">
                      <div className="flex items-start">
                        <Sparkles className="w-4 h-4 text-indigo-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-indigo-200 text-sm font-bold">Spinal Alignment</p>
                          <p className="text-indigo-400/80 text-xs mt-1">Core stability perfectly engaged through the entire rep.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
              <div>
                <h3 className="text-white text-2xl font-bold mb-1">Squat Form Analysis</h3>
                <p className="text-gray-400 text-sm font-medium">Auto-captures depth, spine alignment, and knee stability.</p>
              </div>
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-indigo-500/30">
                Calibrate Camera
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'community' && (
        <div className="space-y-8 animate-fade-in">

          {/* Community Sub-Tabs */}
          <div className="flex justify-center mb-6">
            <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex space-x-1">
              <button
                onClick={() => setCommunityTab('received')}
                className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${communityTab === 'received' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Track My Feedback
              </button>
              <button
                onClick={() => setCommunityTab('give')}
                className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${communityTab === 'give' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Help Others (Give Feedback)
              </button>
            </div>
          </div>

          {communityTab === 'received' && (
            <>
              {/* Request Feedback Input */}
              <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <MessageCircle className="w-6 h-6 mr-3 text-blue-500" />
                  Request Community Feedback
                </h2>
                <form onSubmit={handleSubmitFeedback} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Self-Assessment Rating</label>
                      <div className="flex space-x-2 bg-gray-50 p-3 rounded-xl w-fit border border-gray-100">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setRating(s)}
                            className={`${s <= rating ? 'text-yellow-400 scale-110 drop-shadow-md' : 'text-gray-300'} hover:text-yellow-400 hover:scale-110 transition-all`}
                          >
                            <Star className="w-8 h-8 fill-current" />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Category</label>
                      <select className="w-full px-4 py-3.5 border-2 border-gray-100 rounded-xl focus:ring-0 focus:border-indigo-500 transition-colors font-medium text-gray-700 outline-none hover:border-gray-200">
                        <option>Technique Review</option>
                        <option>Endurance Setup</option>
                        <option>Diet & Recovery</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Attach Video / Notes</label>
                    <div className="relative">
                      <textarea
                        value={newFeedback}
                        onChange={(e) => setNewFeedback(e.target.value)}
                        rows={4}
                        className="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:ring-0 focus:border-indigo-500 transition-colors font-medium text-gray-700 outline-none hover:border-gray-200 resize-none"
                        placeholder="E.g., Can someone review my starting block posture? I feel my hips are too high..."
                      />
                      {submitSuccess ? (
                        <div className="absolute bottom-4 right-4 bg-emerald-500 text-white py-2.5 px-4 rounded-xl shadow-lg flex items-center font-bold animate-fade-in text-sm">
                          <Award className="w-4 h-4 mr-2" /> Feedback Submitted!
                        </div>
                      ) : (
                        <button
                          type="submit"
                          className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl transition-all shadow-lg hover:-translate-y-1 hover:shadow-indigo-500/30 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                          disabled={rating === 0 || !newFeedback}
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>

              {/* Feedback Feed */}
              <div>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search reviews, coaches..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-white bg-white/50 backdrop-blur-md rounded-xl focus:ring-0 shadow-sm focus:border-indigo-300 transition-colors font-medium outline-none"
                    />
                  </div>
                  <div className="w-full sm:w-48">
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-white bg-white/50 backdrop-blur-md rounded-xl focus:ring-0 shadow-sm focus:border-indigo-300 transition-colors font-bold text-gray-700 outline-none"
                    >
                      {feedbackCategories.map(c => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {filteredFeedback.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner
                            ${feedback.type === 'ai' ? 'bg-indigo-600' :
                              feedback.type === 'coach' ? 'bg-blue-100' :
                                feedback.type === 'peer' ? 'bg-green-100' :
                                  'bg-purple-100'}
                          `}>
                            {feedback.avatar}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg tracking-tight">{feedback.from}</h3>
                            <div className="flex items-center text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">
                              <span className={`${feedback.type === 'ai' ? 'text-indigo-600' :
                                feedback.type === 'coach' ? 'text-blue-600' :
                                  feedback.type === 'peer' ? 'text-green-600' :
                                    'text-purple-600'
                                }`}>{feedback.type}</span>
                              <span className="mx-2">•</span>
                              {new Date(feedback.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className={`w-4 h-4 ${star <= feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />
                          ))}
                        </div>
                      </div>

                      <p className="text-gray-700 font-medium leading-relaxed mb-6 flex-grow">
                        "{feedback.comment}"
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-bold tracking-wide uppercase">
                          {feedback.category}
                        </span>
                        <button className="flex items-center gap-1.5 text-gray-400 hover:text-indigo-600 transition-colors font-bold text-sm">
                          <ThumbsUp className="w-4 h-4" /> Helpful
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredFeedback.length === 0 && (
                  <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-200">
                    <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-bold">No feedback matches your criteria.</p>
                  </div>
                )}
              </div>
            </>
          )}

          {communityTab === 'give' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-6 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-2 flex items-center">
                  <Award className="w-6 h-6 mr-2 text-yellow-300" /> Share Your Expertise
                </h3>
                <p className="text-emerald-50 font-medium">Review pending requests from your peers. Giving quality feedback earns you Community Points!</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {pendingRequests.map(req => (
                  <div key={req.id} className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">👤</div>
                        <div>
                          <h4 className="font-bold text-gray-900">{req.name}</h4>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{req.sport}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${req.urgency === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                        {req.urgency} Priority
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                      <p className="text-gray-700 italic text-sm">"{req.request}"</p>
                      <div className="mt-4 w-full h-32 bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer border-2 border-transparent hover:border-indigo-500 transition-colors">
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white z-10">
                          ▶
                        </div>
                        <span className="absolute bottom-2 right-2 text-xs text-white/70 font-mono bg-black/50 px-2 rounded">00:15</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-5 space-y-4">
                      {giveSuccessMsg[req.id] ? (
                        <div className="bg-emerald-50 text-emerald-600 font-bold p-4 rounded-xl flex items-center justify-center animate-fade-in border border-emerald-200">
                          <Award className="w-5 h-5 mr-2" /> Review Submitted Successfully!
                        </div>
                      ) : (
                        <>
                          <div>
                            <label className="text-sm font-bold text-gray-700 block mb-2">Your Rating</label>
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  onClick={() => setGiveRatings(prev => ({ ...prev, [req.id]: s }))}
                                  className={`w-6 h-6 cursor-pointer transition-colors ${giveRatings[req.id] >= s ? 'text-yellow-400 fill-current scale-110 drop-shadow-md' : 'text-gray-300 hover:text-yellow-400'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <textarea
                            rows={2}
                            value={giveTexts[req.id] || ''}
                            onChange={(e) => setGiveTexts(prev => ({ ...prev, [req.id]: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-0 focus:border-indigo-500 outline-none text-sm transition-colors"
                            placeholder="Write your constructive feedback here..."
                          />
                          <button
                            onClick={() => handleGiveSubmit(req.id)}
                            disabled={!giveRatings[req.id] || !giveTexts[req.id]}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-md"
                          >
                            Submit Review
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Extracted simple icon for Users since it's not imported at top
function UsersIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default FeedbackSection;
