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
  Wind,
  Droplets,
  Sparkles as CleaningIcon,
  Hammer,
  Paintbrush,
  Tv,
  ShieldAlert,
  User,
  ArrowRight,
  Gift,
  CheckCircle,
  Clock,
  Plus,
} from 'lucide-react';
import { serviceCategories, sampleServices, mockCities } from '../../data/mockData';
import { ServiceCategory, CustomerAuthState } from '../../types';

interface CustomerHomeProps {
  onSelectCategory: (categoryId: string) => void;
  onNavigateToAI: (screen: string) => void;
  onNavigateToBookings: () => void;
  onNavigateToRewards: () => void;
  onOpenLoginModal: () => void;
  authState: CustomerAuthState;
}

export const CustomerHome: React.FC<CustomerHomeProps> = ({
  onSelectCategory,
  onNavigateToAI,
  onNavigateToBookings,
  onNavigateToRewards,
  onOpenLoginModal,
  authState,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  const banners = [
    {
      title: 'Summer Chill Fest ❄️',
      subtitle: 'Flat 30% OFF on Split & Window AC Deep Servicing',
      code: 'COOLSUMMER',
      bgGradient: 'from-[#3B1C71] via-[#5C2B90] to-[#0D182A]',
      accentColor: '#F4C430',
    },
    {
      title: 'Monsoon Home Care ☔',
      subtitle: 'Free Waterproofing Inspection with Electrical Fixes',
      code: 'MONSOONCARE',
      bgGradient: 'from-sky-900 via-indigo-900 to-[#0D182A]',
      accentColor: '#38BDF8',
    },
  ];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wind': return Wind;
      case 'Sparkles': return CleaningIcon;
      case 'User': return User;
      case 'ShieldAlert': return ShieldAlert;
      case 'Zap': return Zap;
      case 'Droplets': return Droplets;
      case 'Hammer': return Hammer;
      case 'Paintbrush': return Paintbrush;
      default: return Sparkles;
    }
  };

  const filteredCategories = serviceCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-[#F8FAFC] text-[#0F172A] pb-10 font-sans">
      {/* Top Urban Company Header */}
      <div className="bg-[#3B1C71] text-white px-4 pt-4 pb-6 rounded-b-3xl shadow-xl">
        {/* City Selector & User Login Status */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onOpenLoginModal}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-full text-xs font-bold transition-all text-white"
          >
            <MapPin className="w-4 h-4 text-[#F4C430]" />
            <span className="truncate max-w-[140px]">{authState.selectedCity}</span>
            <span className="text-[10px] text-purple-200">v</span>
          </button>

          {authState.isLoggedIn ? (
            <button
              onClick={onOpenLoginModal}
              className="flex items-center gap-1.5 bg-[#F4C430] text-[#3B1C71] px-3 py-1.5 rounded-full text-xs font-extrabold shadow-md hover:bg-amber-300 transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>{authState.name.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              onClick={onOpenLoginModal}
              className="bg-[#F4C430] text-[#3B1C71] px-3 py-1.5 rounded-full text-xs font-extrabold shadow-md hover:bg-amber-300 transition-colors"
            >
              Log In / Register
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 text-purple-300 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 'AC Repair', 'Salon for Women', 'Plumber'..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-2xl text-xs text-white placeholder-purple-200 focus:outline-none focus:bg-white/20 transition-all font-medium"
          />
        </div>

        {/* Hero Banner Carousel */}
        <div className={`p-4 rounded-2xl bg-gradient-to-r ${banners[activeBannerIndex].bgGradient} border border-white/10 shadow-lg relative overflow-hidden`}>
          <div className="relative z-10">
            <div className="inline-block bg-[#F4C430] text-[#3B1C71] text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider mb-1">
              Urban Company Exclusive
            </div>
            <h3 className="font-heading font-extrabold text-base text-white">
              {banners[activeBannerIndex].title}
            </h3>
            <p className="text-xs text-purple-100 mt-0.5">
              {banners[activeBannerIndex].subtitle}
            </p>

            <div className="flex items-center justify-between mt-3">
              <button
                onClick={() => onSelectCategory('ac_appliance')}
                className="bg-[#F4C430] text-[#3B1C71] px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-amber-300 transition-colors shadow-sm"
              >
                Book Now <ArrowRight className="w-3 h-3" />
              </button>

              <div className="flex items-center gap-1">
                {banners.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveBannerIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === activeBannerIndex ? 'bg-[#F4C430] w-4' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="px-4 mt-4 space-y-5">
        {/* Quick AI Diagnostics & emergency shortcuts */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm flex items-center justify-between">
          <button
            onClick={onNavigateToBookings}
            className="flex-1 text-center border-r border-slate-100 pr-2 hover:opacity-80 transition-opacity"
          >
            <div className="text-base font-heading font-bold text-[#3B1C71]">1 Active</div>
            <div className="text-[10px] text-slate-500 font-medium">Live Partner ETA</div>
          </button>

          <button
            onClick={() => onNavigateToAI('identifier')}
            className="flex-1 text-center border-r border-slate-100 px-2 hover:opacity-80 transition-opacity"
          >
            <div className="text-base font-heading font-bold text-emerald-600 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#F4C430]" /> AI Scan
            </div>
            <div className="text-[10px] text-slate-500 font-medium">Issue Identifier</div>
          </button>

          <button
            onClick={onNavigateToRewards}
            className="flex-1 text-center pl-2 hover:opacity-80 transition-opacity"
          >
            <div className="text-base font-heading font-bold text-amber-600 flex items-center justify-center gap-1">
              450 <Gift className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="text-[10px] text-slate-500 font-medium">UC Plus Cash</div>
          </button>
        </div>

        {/* Categories Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-extrabold text-sm text-[#0F172A]">
              Urban Company Services ({filteredCategories.length})
            </h2>
            <span className="text-xs text-purple-700 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Partners
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {filteredCategories.map((cat) => {
              const IconComp = getCategoryIcon(cat.icon);

              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#3B1C71] transition-all flex flex-col items-center text-center group relative overflow-hidden"
                >
                  {cat.badge && (
                    <span className="absolute top-0 right-0 bg-[#F4C430] text-[#3B1C71] text-[8px] font-extrabold px-1.5 py-0.5 rounded-bl-lg">
                      {cat.badge}
                    </span>
                  )}
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 shadow-sm"
                    style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 line-clamp-1">
                    {cat.name}
                  </span>
                  <span className="text-[9px] text-slate-500 mt-0.5 line-clamp-1">
                    {cat.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Most Booked Services */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-extrabold text-sm text-[#0F172A]">
              Most Booked This Week
            </h2>
            <span className="text-xs text-purple-700 font-bold">Top Rated</span>
          </div>

          <div className="space-y-2.5">
            {sampleServices.map((svc) => (
              <div
                key={svc.id}
                onClick={() => onSelectCategory(svc.categoryId)}
                className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm hover:border-[#3B1C71] transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex-1 pr-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                      ★ {svc.rating} ({svc.reviewsCount} reviews)
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">• {svc.duration}</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">{svc.name}</h4>
                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{svc.tagline}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-extrabold text-[#3B1C71]">₹{svc.price}</span>
                    {svc.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">₹{svc.originalPrice}</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCategory(svc.categoryId);
                  }}
                  className="bg-purple-50 text-[#3B1C71] hover:bg-[#3B1C71] hover:text-white px-3 py-2 rounded-xl text-xs font-bold border border-purple-200 transition-all flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
