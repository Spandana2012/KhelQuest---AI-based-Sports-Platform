import React, { useState } from 'react';
import {
    Users,
    MapPin,
    UserCheck,
    Search,
    Filter,
    Calendar,
    Clock,
    MessageCircle,
    Star,
    Map,
    Navigation,
    CheckCircle2,
    Phone,
    GraduationCap,
    Building2,
    Target,
    Award,
    X,
    Send
} from 'lucide-react';

interface FinderProps { }

const Finder: React.FC<FinderProps> = () => {
    const [activeTab, setActiveTab] = useState<'athletes' | 'playgrounds' | 'coaches'>('athletes');
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Filters per tab
    const [pgZoneFilter, setPgZoneFilter] = useState("All Zones");
    const [coachLevelFilter, setCoachLevelFilter] = useState("All Levels");

    // Interaction states
    const [athleteAction, setAthleteAction] = useState<Record<number, string>>({});
    const [bookedPg, setBookedPg] = useState<number | null>(null);
    const [coachRequestStep, setCoachRequestStep] = useState<Record<number, string>>({});

    // Chat States
    const [activeChat, setActiveChat] = useState<number | null>(null);
    const [chats, setChats] = useState<Record<number, { sender: string, text: string }[]>>({});
    const [chatInput, setChatInput] = useState('');

    // Athlete Mock Data
    const athletes = [
        { id: 1, name: "Arjun Mehta", age: 21, gender: "Male", sport: "Sprint", rating: 4.8, active: true },
        { id: 2, name: "Priya Sharma", age: 19, gender: "Female", sport: "Squats", rating: 4.5, active: true },
        { id: 3, name: "Rohan Kumar", age: 24, gender: "Male", sport: "HighJump", rating: 4.9, active: false },
        { id: 4, name: "Simran Kaur", age: 22, gender: "Female", sport: "Sprint", rating: 4.2, active: true },
        { id: 5, name: "Kabir Singh", age: 26, gender: "Male", sport: "PushUps", rating: 4.6, active: true },
        { id: 6, name: "Aisha Patel", age: 20, gender: "Female", sport: "HighJump", rating: 4.7, active: false },
    ];

    // Playground Mock Data
    const playgrounds = [
        { id: 1, name: "Kanteerava Indoor Stadium", location: "Central Zone", distance: "2.4 km", rating: 4.8, crowd: "High", available: true, img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800" },
        { id: 2, name: "SAI Sports Complex", location: "South Zone", distance: "5.1 km", rating: 4.9, crowd: "Low", available: true, img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800" },
        { id: 3, name: "City Municipal Ground", location: "East Zone", distance: "1.2 km", rating: 4.1, crowd: "Medium", available: false, img: "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&q=80&w=800" },
        { id: 4, name: "National Hockey Stadium", location: "North Zone", distance: "6.8 km", rating: 4.6, crowd: "High", available: true, img: "https://images.unsplash.com/photo-1540058525046-249ee5b4b121?auto=format&fit=crop&q=80&w=800" },
        { id: 5, name: "Elite Tennis Academy", location: "West Zone", distance: "3.5 km", rating: 4.7, crowd: "Low", available: true, img: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&q=80&w=800" },
        { id: 6, name: "Sunrise Swimming Arena", location: "East Zone", distance: "4.2 km", rating: 4.5, crowd: "Medium", available: true, img: "https://images.unsplash.com/photo-1576013551627-c0208b53e34b?auto=format&fit=crop&q=80&w=800" },
        { id: 7, name: "Downtown Fitness Hub", location: "Central Zone", distance: "1.8 km", rating: 4.2, crowd: "High", available: true, img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800" },
    ];

    // Coach Mock Data
    const coaches = [
        { id: 1, name: "Rajesh Kumar", experience: "12 Years", rating: 4.9, level: "National Coach", locality: "North District", contact: "+91 9876543210", qualification: "NIS Certified", institute: "National Sports Academy", available: true },
        { id: 2, name: "Anita Desai", experience: "8 Years", rating: 4.7, level: "Local Coach", locality: "Central Zone", contact: "+91 8765432109", qualification: "Sports Biomechanics", institute: "Global Fitness Inst.", available: true },
        { id: 3, name: "Vikram Singh", experience: "15 Years", rating: 4.9, level: "Expert Coach", locality: "South Zone", contact: "+91 7654321098", qualification: "Olympic Level Mentorship", institute: "Elite Athletes Hub", available: false },
        { id: 4, name: "Suresh Menon", experience: "5 Years", rating: 4.4, level: "Local Coach", locality: "East Zone", contact: "+91 6543210987", qualification: "State Champion", institute: "Menon Sports Clinic", available: true },
        { id: 5, name: "Dr. Maya Gupta", experience: "20 Years", rating: 5.0, level: "Expert Coach", locality: "West Zone", contact: "+91 5432109876", qualification: "PhD in Sports Science", institute: "Peak Performance Center", available: true },
    ];

    // Playground Booking State
    const [bookingModal, setBookingModal] = useState<number | null>(null);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [selectedFriends, setSelectedFriends] = useState<number[]>([]);

    const handleAthleteInteraction = (id: number, action: string) => {
        if (action === 'discuss') {
            setActiveChat(id);
            if (!chats[id]) {
                const initialChats = [{ sender: 'System', text: 'Chat securely established.' }];
                setChats(prev => ({ ...prev, [id]: initialChats }));
                setTimeout(() => {
                    setChats(prev => ({
                        ...prev,
                        [id]: [...initialChats, { sender: 'them', text: 'Hi there! I am from the Central Zone. I have been playing for roughly 3 years now. How long have you been playing?' }]
                    }));
                }, 1000);
            }
        } else {
            setAthleteAction(prev => ({ ...prev, [id]: 'sent' }));
        }
    };

    const handleSendMessage = () => {
        if (!chatInput.trim() || activeChat === null) return;
        const userInput = chatInput;
        setChats(prev => ({
            ...prev,
            [activeChat]: [...(prev[activeChat] || []), { sender: 'me', text: userInput }]
        }));
        setChatInput('');
        setTimeout(() => {
            let reply = "That sounds awesome! Let's schedule a practice soon.";
            const lower = userInput.toLowerCase();
            if (lower.includes('how long') || lower.includes('years')) reply = "I've been playing for about 3 years now. Still room to improve! What about you?";
            else if (lower.includes('where') || lower.includes('from') || lower.includes('location')) reply = "I usually train at the Central Zone sports complex. Are you from around here?";
            else if (lower.includes('sport') || lower.includes('play')) reply = "I focus mostly on Sprint and High Jumps. Always trying to beat my personal records! 🏃‍♂️";
            else if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) reply = "Hey there! Great to connect with another athlete on KhelQuest!";
            else if (lower.includes('schedule') || lower.includes('time') || lower.includes('when')) reply = "I usually practice in the early mornings around 6:30 AM before work. Does that work for you?";
            else if (lower.includes('bye') || lower.includes('catch you') || lower.includes('see you')) reply = "Catch you later! Don't forget to book the playground.";

            setChats(prev => ({
                ...prev,
                [activeChat]: [...(prev[activeChat] || []), { sender: 'them', text: reply }]
            }));
        }, 800);
    };

    const handleCoachDetailsSubmit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setCoachRequestStep(prev => ({ ...prev, [id]: 'success' }));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in relative min-h-[80vh]">

            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-white border border-white/10">
                <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden md:block">
                    <Map className="w-48 h-48 animate-spin-slow" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="bg-indigo-500/30 text-indigo-200 text-xs font-bold px-3 py-1.5 rounded-full border border-indigo-400/50 uppercase tracking-widest flex items-center">
                            <Navigation className="w-3 h-3 mr-1.5" /> Discovery Engine Active
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">KhelQuest Finder</h1>
                    <p className="text-indigo-200 text-lg max-w-2xl font-medium">
                        Locate world-class playgrounds, connect with professional coaches, or find your perfect sparring partner near you.
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 bg-white/70 backdrop-blur-xl p-2 rounded-2xl shadow-lg border border-white">
                <button
                    onClick={() => { setActiveTab('athletes'); setShowFilters(false); }}
                    className={`flex-1 flex items-center justify-center py-4 rounded-xl font-bold transition-all text-sm md:text-base ${activeTab === 'athletes' ? 'bg-indigo-600 text-white shadow-md transform scale-[1.02]' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
                >
                    <Users className="w-5 h-5 mr-2" /> Athlete Connect
                </button>
                <button
                    onClick={() => { setActiveTab('playgrounds'); setShowFilters(false); }}
                    className={`flex-1 flex items-center justify-center py-4 rounded-xl font-bold transition-all text-sm md:text-base ${activeTab === 'playgrounds' ? 'bg-indigo-600 text-white shadow-md transform scale-[1.02]' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
                >
                    <MapPin className="w-5 h-5 mr-2" /> Playgrounds
                </button>
                <button
                    onClick={() => { setActiveTab('coaches'); setShowFilters(false); }}
                    className={`flex-1 flex items-center justify-center py-4 rounded-xl font-bold transition-all text-sm md:text-base ${activeTab === 'coaches' ? 'bg-indigo-600 text-white shadow-md transform scale-[1.02]' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
                >
                    <UserCheck className="w-5 h-5 mr-2" /> Coach Finder
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder={`Search ${activeTab}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-md border-2 border-white rounded-2xl shadow-sm focus:ring-0 focus:border-indigo-400 outline-none font-medium transition-colors"
                    />
                </div>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center justify-center px-6 py-4 backdrop-blur-md border-2 rounded-2xl shadow-sm transition-colors font-bold ${showFilters ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'bg-white/80 border-white text-gray-700 hover:border-indigo-300'}`}
                >
                    <Filter className="w-5 h-5 mr-2 text-indigo-500" /> Filters
                </button>
            </div>

            {showFilters && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-fade-in flex gap-4 flex-wrap">
                    {activeTab === 'playgrounds' && (
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Region Zone</label>
                            <select
                                value={pgZoneFilter}
                                onChange={(e) => setPgZoneFilter(e.target.value)}
                                className="px-4 py-2 border-2 border-gray-100 rounded-xl focus:border-indigo-500 outline-none font-medium text-gray-700"
                            >
                                {["All Zones", "North Zone", "South Zone", "East Zone", "West Zone", "Central Zone"].map(z => <option key={z} value={z}>{z}</option>)}
                            </select>
                        </div>
                    )}
                    {activeTab === 'coaches' && (
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Coach Level</label>
                            <select
                                value={coachLevelFilter}
                                onChange={(e) => setCoachLevelFilter(e.target.value)}
                                className="px-4 py-2 border-2 border-gray-100 rounded-xl focus:border-indigo-500 outline-none font-medium text-gray-700"
                            >
                                {["All Levels", "Local Coach", "National Coach", "Expert Coach"].map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>
                    )}
                    {activeTab === 'athletes' && (
                        <div className="flex items-center justify-center p-4 bg-gray-50 rounded-xl w-full border border-gray-100">
                            <p className="text-sm font-medium text-gray-500">More athlete filters (Sport, Age Range) coming soon.</p>
                        </div>
                    )}
                </div>
            )}

            <div className="animate-fade-in">

                {/* ATHLETE CONNECT */}
                {activeTab === 'athletes' && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {athletes.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase())).map(athlete => (
                            <div key={athlete.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -z-10 group-hover:bg-indigo-100 transition-colors"></div>

                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-white">
                                        {athlete.gender === 'Male' ? '👨🏽' : '👩🏽'}
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center ${athlete.active ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                                        {athlete.active ? <><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span> Online</> : 'Offline'}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-1">{athlete.name}</h3>
                                <p className="text-gray-500 text-sm font-medium mb-4">{athlete.age} yrs • {athlete.gender}</p>

                                <div className="flex items-center gap-2 mb-6">
                                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-xs font-bold flex items-center">
                                        <Target className="w-3 h-3 mr-1" /> {athlete.sport}
                                    </span>
                                    <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-lg text-xs font-bold flex items-center">
                                        <Star className="w-3 h-3 mr-1 fill-current" /> {athlete.rating}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => handleAthleteInteraction(athlete.id, 'connect')}
                                        className={`font-bold py-2.5 rounded-xl transition-all text-sm flex items-center justify-center border-2 border-transparent ${athleteAction[athlete.id] === 'sent' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'}`}
                                    >
                                        {athleteAction[athlete.id] === 'sent' ? <><CheckCircle2 className="w-4 h-4 mr-1.5" /> Sent!</> : <><Users className="w-4 h-4 mr-1.5" /> Connect</>}
                                    </button>
                                    <button
                                        onClick={() => handleAthleteInteraction(athlete.id, 'discuss')}
                                        className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2.5 rounded-xl transition-colors text-sm flex items-center justify-center shadow-lg"
                                    >
                                        <MessageCircle className="w-4 h-4 mr-1.5" /> Discuss
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* PLAYGROUNDS */}
                {activeTab === 'playgrounds' && (
                    <div className="space-y-6">
                        {playgrounds.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) && (pgZoneFilter === "All Zones" || p.location === pgZoneFilter)).map(pg => (
                            <div key={pg.id} className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/3 bg-slate-200 h-48 md:h-auto relative overflow-hidden">
                                        <img src={pg.img} alt={pg.name} className="absolute inset-0 w-full h-full object-cover shadow-inner" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none"></div>
                                        <div className="absolute bottom-4 left-4 z-20">
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${pg.crowd === 'Low' ? 'bg-emerald-500' : pg.crowd === 'Medium' ? 'bg-amber-500' : 'bg-rose-500'} text-white shadow-lg`}>
                                                {pg.crowd} Crowd Level
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 md:p-8 md:w-2/3 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-2xl font-bold text-gray-900">{pg.name}</h3>
                                                <span className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-xl text-sm font-bold border border-yellow-200">
                                                    <Star className="w-4 h-4 mr-1 fill-current" /> {pg.rating}
                                                </span>
                                            </div>
                                            <p className="text-gray-500 font-medium flex items-center mb-6">
                                                <MapPin className="w-4 h-4 mr-1 text-indigo-500" /> {pg.location} • {pg.distance} away
                                            </p>

                                            <div className="flex gap-4">
                                                <div className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 flex-1">
                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Status</p>
                                                    <p className={`font-bold flex items-center ${pg.available ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                        {pg.available ? <CheckCircle2 className="w-4 h-4 mr-1" /> : <Clock className="w-4 h-4 mr-1" />}
                                                        {pg.available ? 'Available Now' : 'Currently Booked'}
                                                    </p>
                                                </div>
                                                <div className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 flex-1 hidden sm:block">
                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Facilities</p>
                                                    <p className="font-bold text-gray-700 text-sm">Track, Field, Gym</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            {bookedPg === pg.id ? (
                                                <div className="w-full sm:w-auto px-8 py-3 bg-emerald-50 border border-emerald-200 text-emerald-600 font-bold rounded-xl flex items-center justify-center animate-fade-in">
                                                    <CheckCircle2 className="w-5 h-5 mr-2" /> Booking Confirmed & Invites Sent!
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setBookingModal(bookingModal === pg.id ? null : pg.id)}
                                                    className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg hover:-translate-y-1 hover:shadow-indigo-500/30"
                                                >
                                                    {bookingModal === pg.id ? "Cancel Booking" : "Book Practice Match"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {bookingModal === pg.id && bookedPg !== pg.id && (
                                    <div className="border-t border-gray-100 bg-indigo-50/50 p-6 md:p-8 animate-fade-in relative overflow-hidden">
                                        <div className="absolute right-0 bottom-0 w-64 h-64 bg-indigo-100 rounded-full blur-3xl -z-10"></div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                                            <Calendar className="w-5 h-5 mr-2 text-indigo-500" /> Choose Slot & Invite Friends
                                        </h4>

                                        <div className="grid md:grid-cols-3 gap-6 mb-6">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Select Date</label>
                                                <input type="date" value={bookingDate} onChange={e => setBookingDate(e.target.value)} className="w-full px-4 py-3 border-2 border-white bg-white/80 backdrop-blur-sm rounded-xl focus:border-indigo-500 outline-none transition-colors" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Select Time</label>
                                                <input type="time" value={bookingTime} onChange={e => setBookingTime(e.target.value)} className="w-full px-4 py-3 border-2 border-white bg-white/80 backdrop-blur-sm rounded-xl focus:border-indigo-500 outline-none transition-colors" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Invite Athletes</label>
                                                <select
                                                    onChange={(e) => {
                                                        const val = parseInt(e.target.value);
                                                        if (val && !selectedFriends.includes(val)) setSelectedFriends([...selectedFriends, val]);
                                                    }}
                                                    className="w-full px-4 py-3 border-2 border-white bg-white/80 backdrop-blur-sm rounded-xl focus:border-indigo-500 outline-none transition-colors"
                                                >
                                                    <option value="">Select from Contacts...</option>
                                                    {athletes.map(a => <option key={a.id} value={a.id}>{a.name} ({a.sport})</option>)}
                                                </select>
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {selectedFriends.map(friendId => {
                                                        const friend = athletes.find(a => a.id === friendId);
                                                        return friend ? (
                                                            <span key={friend.id} className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-md flex items-center shadow-sm">
                                                                {friend.name}
                                                                <button onClick={() => setSelectedFriends(selectedFriends.filter(id => id !== friendId))} className="ml-1 text-indigo-200 hover:text-white">x</button>
                                                            </span>
                                                        ) : null;
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end space-x-3 mt-4">
                                            <button onClick={() => setBookingModal(null)} className="px-6 py-2.5 bg-white text-gray-600 border border-gray-200 font-bold rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
                                            <button
                                                onClick={() => { setBookedPg(pg.id); setBookingModal(null); }}
                                                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg transition-colors"
                                                disabled={!bookingDate || !bookingTime}
                                            >
                                                Confirm & Send Invites
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* COACH FINDER */}
                {activeTab === 'coaches' && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {coaches.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) && (coachLevelFilter === "All Levels" || c.level === coachLevelFilter)).map(coach => (
                            <div key={coach.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all group relative overflow-hidden flex flex-col h-full">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -z-10"></div>

                                <div className="flex items-start gap-4 mb-5">
                                    <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-white">
                                        👨‍🏫
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 leading-tight">{coach.name}</h3>
                                        <div className="flex items-center text-sm font-bold text-gray-500 mt-1">
                                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-current mr-1" /> {coach.rating}
                                            <span className="mx-2">•</span>
                                            <span className={coach.available ? 'text-emerald-500' : 'text-gray-400'}>{coach.available ? 'Accepting Students' : 'Fully Booked'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${coach.level === 'Expert Coach' ? 'bg-purple-50 text-purple-700 border-purple-200' : coach.level === 'National Coach' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                                        {coach.level}
                                    </span>
                                </div>

                                <div className="space-y-3 mb-6 flex-grow">
                                    <div className="flex items-center text-gray-600 text-sm font-medium">
                                        <GraduationCap className="w-4 h-4 mr-3 text-indigo-400" /> {coach.qualification}
                                    </div>
                                    <div className="flex items-center text-gray-600 text-sm font-medium">
                                        <Building2 className="w-4 h-4 mr-3 text-indigo-400" /> {coach.institute}
                                    </div>
                                    <div className="flex items-center text-gray-600 text-sm font-medium">
                                        <Award className="w-4 h-4 mr-3 text-indigo-400" /> {coach.experience} Experience
                                    </div>
                                    <div className="flex items-center text-gray-600 text-sm font-medium">
                                        <MapPin className="w-4 h-4 mr-3 text-indigo-400" /> {coach.locality}
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-5 mt-auto">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contact</span>
                                        <span className="text-sm font-bold text-gray-900 flex items-center"><Phone className="w-3 h-3 mr-1" /> {coach.contact}</span>
                                    </div>

                                    {coachRequestStep[coach.id] === 'success' ? (
                                        <div className="w-full bg-emerald-50 border border-emerald-200 text-emerald-600 font-bold py-3 rounded-xl flex items-center justify-center animate-fade-in shadow-sm">
                                            <CheckCircle2 className="w-5 h-5 mr-2" /> Request Sent Successfully!
                                        </div>
                                    ) : coachRequestStep[coach.id] === 'form' ? (
                                        <form onSubmit={(e) => handleCoachDetailsSubmit(e, coach.id)} className="animate-fade-in space-y-3">
                                            <textarea required placeholder="Specify your objective and details..." rows={2} className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-indigo-500 outline-none" />
                                            <div className="flex gap-2">
                                                <button type="button" onClick={() => setCoachRequestStep(prev => ({ ...prev, [coach.id]: '' }))} className="flex-1 bg-gray-100 text-gray-600 font-bold py-2 rounded-xl text-sm transition-colors hover:bg-gray-200">Cancel</button>
                                                <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-xl text-sm shadow-md transition-colors">Submit Details</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <button
                                            onClick={() => setCoachRequestStep(prev => ({ ...prev, [coach.id]: 'form' }))}
                                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-colors shadow-lg flex items-center justify-center"
                                        >
                                            Request Mentorship
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Chat Modal Interface */}
            {activeChat !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col h-[500px] border border-gray-100">
                        <div className="bg-gradient-to-r from-slate-900 to-indigo-900 p-4 flex justify-between items-center text-white shadow-md z-10">
                            <div className="font-bold flex items-center text-lg">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mr-3 animate-pulse shadow-[0_0_10px_#34d399]"></span>
                                {athletes.find(a => a.id === activeChat)?.name}
                            </div>
                            <button onClick={() => setActiveChat(null)} className="text-indigo-200 hover:text-white transition-colors bg-white/10 p-1.5 rounded-full">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 p-5 overflow-y-auto bg-slate-50 space-y-4">
                            {chats[activeChat]?.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                                    <div className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed ${msg.sender === 'System' ? 'bg-indigo-100/50 text-indigo-500 text-xs mx-auto text-center rounded-full px-5 py-1.5 font-bold tracking-wide border border-indigo-200/50' :
                                        msg.sender === 'me' ? 'bg-indigo-600 text-white rounded-tr-sm shadow-md' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>


                        <div className="p-4 bg-white border-t border-gray-100 flex flex-col gap-3 shadow-[0_-10px_30px_rgb(0,0,0,0.02)]">
                            <div className="flex gap-2 w-full">
                                <input
                                    type="text"
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors font-medium text-gray-800"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSendMessage();
                                    }}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!chatInput.trim()}
                                    className="bg-indigo-600 text-white px-4 py-3 rounded-xl hover:bg-indigo-700 disabled:bg-indigo-300 disabled:shadow-none transition-all shadow-md active:scale-95 flex items-center justify-center min-w-[50px]"
                                >
                                    <Send className="w-5 h-5 -ml-1" />
                                </button>
                            </div>
                            <button
                                onClick={() => setActiveChat(null)}
                                className="w-full bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold py-2 rounded-xl text-sm transition-colors border border-rose-100 flex items-center justify-center"
                            >
                                <X className="w-4 h-4 mr-1" /> End Conversation
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Finder;
