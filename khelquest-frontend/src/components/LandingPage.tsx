import React from 'react';
import { Trophy, Target, Users, Award, ArrowRight, Star, Medal, Globe } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Trophy,
      title: "Showcase Talent",
      description: "Upload achievements, medals, and performance metrics to build your athletic profile"
    },
    {
      icon: Target,
      title: "Track Progress",
      description: "Monitor your fitness journey with real-time tracking and performance analytics"
    },
    {
      icon: Users,
      title: "Global Rankings",
      description: "Compare your performance with athletes worldwide and climb the leaderboards"
    },
    {
      icon: Award,
      title: "SAI Recognition",
      description: "Get noticed by Sports Authority of India for potential selections and opportunities"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Athletes" },
    { number: "50+", label: "Sports Categories" },
    { number: "25", label: "Countries" },
    { number: "500+", label: "SAI Selections" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-orange-900/20"></div>
        
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <Trophy className="w-16 h-16 text-orange-400 mr-4" />
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-orange-200 to-yellow-200 bg-clip-text text-transparent">
              KhelQuest
            </h1>
          </div>
          
          <p className="text-2xl md:text-3xl font-light mb-8 text-orange-100">
            Discover the Champs of Tomorrow
          </p>
          
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-gray-200 leading-relaxed">
            Join India's premier sports talent platform where athletes showcase their skills, 
            track performance, and get recognized by national sports authorities.
          </p>
          
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <Medal className="w-12 h-12 text-yellow-400 opacity-70" />
        </div>
        <div className="absolute top-40 right-20 animate-pulse">
          <Star className="w-10 h-10 text-orange-400 opacity-60" />
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce delay-300">
          <Target className="w-14 h-14 text-blue-400 opacity-50" />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Elevate Your Athletic Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From local tournaments to national recognition, KhelQuest provides everything you need to showcase your talent
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="group p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div 
        className="py-20 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('https://images.pexels.com/photos/209969/pexels-photo-209969.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by Champions
            </h2>
            <p className="text-xl text-gray-300">
              Join thousands of athletes already making their mark
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-orange-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Globe className="w-20 h-20 text-white/80 mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Go Global?
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Your talent deserves recognition. Start building your athletic profile today and 
            connect with opportunities that can change your sporting career forever.
          </p>
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center space-x-3 bg-white text-blue-600 font-bold py-4 px-10 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/20"
          >
            <span>Join KhelQuest</span>
            <Trophy className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
