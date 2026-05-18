import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';

interface SportSelectionProps {
  onSelectSport: (sport: string) => void;
}

const SportSelection: React.FC<SportSelectionProps> = ({ onSelectSport }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const sportsCategories = [
    {
      category: 'Team Sports',
      sports: [
        { name: 'Cricket', icon: '🏏', popular: true },
        { name: 'Football', icon: '⚽', popular: true },
        { name: 'Basketball', icon: '🏀', popular: true },
        { name: 'Hockey', icon: '🏑', popular: false },
        { name: 'Volleyball', icon: '🏐', popular: false },
        { name: 'Kabaddi', icon: '🤼', popular: true },
      ]
    },
    {
      category: 'Individual Sports',
      sports: [
        { name: 'Athletics', icon: '🏃', popular: true },
        { name: 'Swimming', icon: '🏊', popular: true },
        { name: 'Badminton', icon: '🏸', popular: true },
        { name: 'Tennis', icon: '🎾', popular: false },
        { name: 'Boxing', icon: '🥊', popular: true },
        { name: 'Wrestling', icon: '🤼', popular: true },
      ]
    },
    {
      category: 'Strength & Power',
      sports: [
        { name: 'Weightlifting', icon: '🏋', popular: true },
        { name: 'PushUps', icon: '💪', popular: false },
        { name: 'Squats', icon: '🤸', popular: true },
        { name: 'HighJump', icon: '🏃‍♂️', popular: true },
      ]
    }
  ];

  const allSports = sportsCategories.flatMap(cat =>
    cat.sports.map(s => ({ ...s, category: cat.category }))
  );

  const filteredSports = allSports.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularSports = allSports.filter(s => s.popular);

  // ✅ SIMPLE AND CORRECT
  const handleSelect = (sport: string) => {
    onSelectSport(sport);
  };

  return (
    <div
      className="min-h-screen py-12 bg-cover bg-center"
      style={{
        backgroundImage:
          `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)),
           url('https://images.pexels.com/photos/1263348/pexels-photo-1263348.jpeg')`
      }}
    >
      <div className="max-w-6xl mx-auto px-4">

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Choose Your Sport
          </h1>
          <p className="text-xl text-gray-200">
            Select where you want to showcase your talent
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for your sport..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white"
            />
          </div>
        </div>

        {/* Popular */}
        {!searchTerm && (
          <>
            <h2 className="text-2xl font-bold text-white mb-6">
              🔥 Popular Sports
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {popularSports.map((sport, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(sport.name)}
                  className="bg-white rounded-xl p-6 hover:scale-105 transition"
                >
                  <div className="text-4xl">{sport.icon}</div>
                  <h3 className="font-bold mt-2">{sport.name}</h3>
                </button>
              ))}
            </div>
          </>
        )}

        {/* All */}
        {sportsCategories.map((cat, idx) => (
          <div key={idx} className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">
              {cat.category}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cat.sports.map((sport, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(sport.name)}
                  className="bg-white/90 rounded-xl p-6 hover:scale-105 transition"
                >
                  <div className="text-4xl">{sport.icon}</div>
                  <h3 className="font-bold mt-2">{sport.name}</h3>
                  <ChevronRight className="mx-auto mt-2 text-blue-500" />
                </button>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default SportSelection;
