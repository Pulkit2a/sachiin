import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Star,
  Zap,
  Bot,
  Activity,
  Calendar,
  Wind,
  Droplets,
  Sparkles as CleaningIcon,
  Hammer,
  Paintbrush,
  Tv,
  ShieldAlert,
  Car,
  Utensils,
  Home as MaidIcon,
  Flower2,
  Grid,
  TrendingUp,
  Award,
  ArrowRight,
} from 'lucide-react';
import { serviceCategories, sampleHeroes, sampleUserProfile } from '../../data/mockData';
import { ServiceCategory } from '../../types';

interface CustomerHomeProps {
  onSelectCategory: (categoryId: string) => void;
  onNavigateToAI: (screen: 'identifier' | 'diagnostics' | 'chat') => void;
  onNavigateToBookings: () => void;
  onNavigateToRewards: () => void;
}

export const CustomerHome: React.FC<CustomerHomeProps> = ({
  onSelectCategory,
  onNavigateToAI,
  onNavigateToBookings,
  onNavigateToRewards,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  const banners = [
    {
      title: 'Summer Chill Fest ❄️',
      subtitle: 'Flat 30% OFF on Split & Window AC Deep Servicing',
      code: 'COOLSUMMER',
      bgGradient: 'from-sky-900 via-indigo-900 to-[#0D182A]',
      accentColor: '#38BDF8',
    },
    {
      title: 'Monsoon Home Care ☔',
      subtitle: 'Free Thermal Waterproofing Check with Electrical Fixes',
      code: 'MONSOONCARE',
      bgGradient: 'from-amber-900 via-slate-900 to-[#0D182A]',
      accentColor: '#F5C542',
    },
  ];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wind': return Wind;
      case 'Droplets': return Droplets;
      case 'Zap': return Zap;
      case 'Sparkles': return CleaningIcon;
      case 'Hammer': return Hammer;
      case 'Paintbrush': return Paintbrush;
      case 'Tv': return Tv;
      case 'ShieldAlert': return ShieldAlert;
      case 'Car': return Car;
      case 'Utensils': return Utensils;
      case 'Home': return MaidIcon;
      case 'Flower2': return Flower2;
      default: return Grid;
    }
  };

  const filteredCategories = serviceCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-[#F6F7F9] text-[#0D182A] pb-8">
      {/* Top Header Bar */}
      <div className="bg-[#0D182A] text-white pt-4 pb-6 px-4 rounded-b-3xl shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#F5C542] animate-bounce" />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-xs text-white">HSR Layout, Sector 1</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </div>
              <p className="text-[10px] text-slate-400 truncate max-w-[200px]">
                #402, Sunshine Apartments, Bengaluru
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToRewards}
            className="flex items-center gap-1.5 bg-slate-800/90 border border-[#F5C542]/30 px-2.5 py-1 rounded-full text-xs hover:bg-slate-800 transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-[#F5C542]" />
            <span className="font-bold text-[#F5C542] text-xs">{sampleUserProfile.rewardPoints} pts</span>
          </button>
        </div>

        {/* Greeting & Search Bar */}
        <div className="mb-2">
          <h1 className="font-heading font-semibold text-lg text-white">
            Hello, {sampleUserProfile.name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs text-slate-300">Which service do you need today?</p>
        </div>

        {/* Search Input */}
        <div className="relative mt-3">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search AC Repair, Plumber, Cleaning, Electrician..."
            className="w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#F5C542] transition-all"
          />
          <button
            onClick={() => onNavigateToAI('identifier')}
            className="absolute right-2 top-2 bg-[#F5C542] text-[#0D182A] p-1 rounded-xl text-[10px] font-bold flex items-center gap-1 px-2 shadow-md hover:bg-amber-300 transition-colors"
            title="Scan with AI"
          >
            <Sparkles className="w-3 h-3" />
            AI Scan
          </button>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-5">
        {/* Promotional Campaign Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 shadow-md">
          <div className={`p-4 bg-gradient-to-r ${banners[activeBannerIndex].bgGradient} text-white flex flex-col justify-between min-h-[110px]`}>
            <div className="flex items-start justify-between">
              <span className="text-[10px] uppercase tracking-wider font-extrabold bg-[#F5C542] text-[#0D182A] px-2 py-0.5 rounded-full">
                Featured Campaign
              </span>
              <span className="text-[10px] text-slate-300 bg-white/10 px-2 py-0.5 rounded-lg border border-white/10">
                Code: {banners[activeBannerIndex].code}
              </span>
            </div>

            <div className="mt-2">
              <h3 className="font-heading font-bold text-sm text-white">
                {banners[activeBannerIndex].title}
              </h3>
              <p className="text-xs text-slate-200 mt-0.5">
                {banners[activeBannerIndex].subtitle}
              </p>
            </div>

            <div className="flex items-center justify-between mt-3">
              <button
                onClick={() => onSelectCategory('ac_repair')}
                className="bg-[#F5C542] text-[#0D182A] px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-amber-300 transition-colors shadow-sm"
              >
                Book Now <ArrowRight className="w-3 h-3" />
              </button>

              <div className="flex items-center gap-1">
                {banners.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveBannerIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === activeBannerIndex ? 'bg-[#F5C542] w-4' : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Your Journey Stats Row */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm flex items-center justify-between">
          <button
            onClick={onNavigateToBookings}
            className="flex-1 text-center border-r border-slate-100 pr-2 hover:opacity-80 transition-opacity"
          >
            <div className="text-lg font-heading font-bold text-[#0D182A]">3</div>
            <div className="text-[10px] text-slate-500 font-medium">Active Bookings</div>
          </button>

          <button
            onClick={onNavigateToBookings}
            className="flex-1 text-center border-r border-slate-100 px-2 hover:opacity-80 transition-opacity"
          >
            <div className="text-lg font-heading font-bold text-[#0D182A]">12</div>
            <div className="text-[10px] text-slate-500 font-medium">Services Completed</div>
          </button>

          <button
            onClick={onNavigateToRewards}
            className="flex-1 text-center pl-2 hover:opacity-80 transition-opacity"
          >
            <div className="text-lg font-heading font-bold text-[#F5C542] flex items-center justify-center gap-1">
              1,450 <Award className="w-3.5 h-3.5" />
            </div>
            <div className="text-[10px] text-slate-500 font-medium">Hero Points</div>
          </button>
        </div>

        {/* AI Quick Assistant Tools */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-heading font-bold text-sm text-[#0D182A] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#F5C542]" />
              AI Home Intelligence
            </h2>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Live AI
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onNavigateToAI('identifier')}
              className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm hover:border-[#F5C542] transition-all flex flex-col items-center text-center group"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#0D182A] flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                <Sparkles className="w-4 h-4 text-[#F5C542]" />
              </div>
              <span className="font-bold text-[11px] text-[#0D182A] leading-tight">AI Issue Scanner</span>
              <span className="text-[9px] text-slate-500 mt-0.5">Photo or Text</span>
            </button>

            <button
              onClick={() => onNavigateToAI('diagnostics')}
              className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-400 transition-all flex flex-col items-center text-center group"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                <Activity className="w-4 h-4" />
              </div>
              <span className="font-bold text-[11px] text-[#0D182A] leading-tight">Wellness Score</span>
              <span className="text-[9px] text-emerald-600 font-semibold mt-0.5">94% Healthy</span>
            </button>

            <button
              onClick={() => onNavigateToAI('chat')}
              className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 transition-all flex flex-col items-center text-center group"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                <Bot className="w-4 h-4" />
              </div>
              <span className="font-bold text-[11px] text-[#0D182A] leading-tight">Hero Chatbot</span>
              <span className="text-[9px] text-slate-500 mt-0.5">Instant Advice</span>
            </button>
          </div>
        </div>

        {/* Service Categories Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-bold text-sm text-[#0D182A]">
              Explore Household Services ({filteredCategories.length})
            </h2>
            <span className="text-xs text-slate-500 font-medium">All Verified</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-4 gap-2.5">
            {filteredCategories.map((cat) => {
              const IconComp = getCategoryIcon(cat.icon);

              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#F5C542] transition-all flex flex-col items-center text-center group relative overflow-hidden"
                >
                  {cat.badge && (
                    <span className="absolute top-0 right-0 bg-[#F5C542] text-[#0D182A] text-[8px] font-extrabold px-1.5 py-0.5 rounded-bl-lg">
                      {cat.badge}
                    </span>
                  )}
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 shadow-sm"
                    style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#0D182A] line-clamp-1">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Top Rated Verified Professionals Near You */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-heading font-bold text-sm text-[#0D182A]">
                Top Rated Heroes Nearby
              </h2>
              <p className="text-[11px] text-slate-500">
                AI Smart Matched based on 100% background checks & rating
              </p>
            </div>
            <button
              onClick={() => onNavigateToAI('matching')}
              className="text-xs font-bold text-[#0D182A] hover:underline flex items-center gap-0.5"
            >
              See All <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {sampleHeroes.map((hero) => (
              <div
                key={hero.id}
                className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm flex items-start gap-3 hover:border-slate-300 transition-all"
              >
                <div className="relative">
                  <img
                    src={hero.avatar}
                    alt={hero.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                  />
                  {hero.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-xs text-[#0D182A] truncate">
                      {hero.name}
                    </h3>
                    <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <Sparkles className="w-3 h-3 text-[#F5C542]" />
                      {hero.aiMatchScore}% Match
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500">{hero.category} • {hero.experienceYears} yrs exp</p>

                  <div className="flex items-center gap-3 mt-1.5 text-xs">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{hero.rating}</span>
                      <span className="text-slate-400 font-normal text-[10px]">({hero.jobsCompleted}+ jobs)</span>
                    </div>

                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600 font-medium text-[11px]">{hero.distanceKm} km away</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectCategory('ac_repair')}
                  className="bg-[#F5C542] text-[#0D182A] text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-amber-300 transition-colors shadow-sm self-center"
                >
                  Book
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
