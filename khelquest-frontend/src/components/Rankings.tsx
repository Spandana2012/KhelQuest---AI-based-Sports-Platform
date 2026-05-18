import React, { useState } from 'react';
import { Trophy, TrendingUp, Globe, MapPin, Medal, Target, Filter, BarChart3, Users } from 'lucide-react';

interface RankingsProps {
  user: any;
}

const Rankings: React.FC<RankingsProps> = ({ user }) => {
  const [selectedCategory, setSelectedCategory] = useState('global');

  // Athlete type for all rankings
  type Athlete = {
    rank: number;
    name: string;
    score: number;
    trend: string;
    change: string;
    isUser?: boolean;
    location?: string;
    age?: number;
  };

  // Mock ranking data
  const globalRankings: Athlete[] = [
    { rank: 1, name: 'Arjun Patel', location: 'Gujarat, India', score: 2847, trend: 'up', change: '+12' },
    { rank: 2, name: 'Priya Singh', location: 'Punjab, India', score: 2834, trend: 'up', change: '+8' },
    { rank: 3, name: 'Kiran Kumar', location: 'Karnataka, India', score: 2821, trend: 'same', change: '0' },
    { rank: 4, name: 'Anita Sharma', location: 'Rajasthan, India', score: 2798, trend: 'down', change: '-3' },
    { rank: 5, name: 'Rohit Mehta', location: 'Maharashtra, India', score: 2785, trend: 'up', change: '+15' },
    { rank: 1247, name: user.name, location: 'Your Location', score: 1856, trend: 'up', change: '+25', isUser: true },
  ];

  const localRankings: Athlete[] = [
    { rank: 1, name: 'Deepak Singh', location: 'Same State', score: 2156, trend: 'up', change: '+8' },
    { rank: 2, name: 'Kavya Reddy', location: 'Same State', score: 2134, trend: 'up', change: '+12' },
    { rank: 3, name: 'Vikram Joshi', location: 'Same State', score: 2098, trend: 'down', change: '-5' },
    { rank: 23, name: user.name, location: 'Your Location', score: 1856, trend: 'up', change: '+25', isUser: true },
  ];

  const ageGroupRankings: Athlete[] = [
    { rank: 1, name: 'Sahil Kumar', age: user.age, score: 1987, trend: 'up', change: '+18' },
    { rank: 2, name: 'Neha Gupta', age: user.age, score: 1965, trend: 'up', change: '+22' },
    { rank: 3, name: 'Amit Verma', age: user.age, score: 1943, trend: 'same', change: '0' },
    { rank: 156, name: user.name, age: user.age, score: 1856, trend: 'up', change: '+25', isUser: true },
  ];

  const performanceMetrics = [
    { metric: 'Speed Index', value: 87, rank: 234, total: 1500, improvement: '+12%' },
    { metric: 'Endurance Score', value: 92, rank: 156, total: 1200, improvement: '+8%' },
    { metric: 'Technique Rating', value: 78, rank: 445, total: 2000, improvement: '+15%' },
    { metric: 'Consistency Factor', value: 85, rank: 298, total: 1800, improvement: '+5%' },
  ];

  const getCurrentRankings = () => {
    switch (selectedCategory) {
      case 'local': return localRankings;
      case 'age': return ageGroupRankings;
      default: return globalRankings;
    }
  };

  const categories = [
    { id: 'global', label: 'Global Rankings', icon: Globe, description: 'Compete with athletes worldwide' },
    { id: 'local', label: 'State Rankings', icon: MapPin, description: 'Compare with local athletes' },
    { id: 'age', label: 'Age Group', icon: Users, description: 'Rankings within your age group' },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return { color: 'from-yellow-400 to-yellow-600', icon: '🥇' };
    if (rank === 2) return { color: 'from-gray-300 to-gray-500', icon: '🥈' };
    if (rank === 3) return { color: 'from-amber-600 to-amber-800', icon: '🥉' };
    return { color: 'from-blue-500 to-purple-600', icon: '#' };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Global Rankings & Benchmarks
        </h1>
        <p className="text-xl text-gray-600">
          See how you stack up against athletes worldwide in {user.sport}
        </p>
      </div>

      {/* Category Selection */}
      <div className="flex flex-col sm:flex-row justify-center mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold">{category.label}</div>
                  <div className="text-xs opacity-80">{category.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rankings List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {getCurrentRankings().map((athlete, index) => {
            const badge = getRankBadge(athlete.rank);
            return (
              <div
                key={index}
                className={`p-4 transition-colors ${
                  athlete.isUser ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${badge.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                      {athlete.rank <= 3 ? badge.icon : athlete.rank}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${athlete.isUser ? 'text-blue-700' : 'text-gray-900'}`}>
                        {athlete.name} {athlete.isUser && <span className="ml-2 text-sm text-blue-600">(You)</span>}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {selectedCategory === 'age' ? `Age ${athlete.age}` : athlete.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{athlete.score}</div>
                      <div className={`text-sm flex items-center space-x-1 ${getTrendColor(athlete.trend)}`}>
                        {getTrendIcon(athlete.trend)}
                        <span>{athlete.change}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Rankings;
