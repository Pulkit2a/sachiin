import React from 'react';
import { Home, Calendar, Users, Award, User } from 'lucide-react';
import { CustomerTab } from '../../types';

interface CustomerBottomNavProps {
  activeTab: CustomerTab;
  setActiveTab: (tab: CustomerTab) => void;
  ongoingCount?: number;
}

export const CustomerBottomNav: React.FC<CustomerBottomNavProps> = ({
  activeTab,
  setActiveTab,
  ongoingCount = 1,
}) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'bookings', label: 'Bookings', icon: Calendar, badge: ongoingCount },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'rewards', label: 'Rewards', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-[#0D182A] text-white border-t border-slate-800 px-2 py-2 flex items-center justify-around sticky bottom-0 z-40 shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as CustomerTab)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
              isActive
                ? 'text-[#F5C542] bg-slate-800/80 font-semibold scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              {tab.badge && tab.badge > 0 ? (
                <span className="absolute -top-1.5 -right-2 bg-[#F5C542] text-[#0D182A] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {tab.badge}
                </span>
              ) : null}
            </div>
            <span className="text-[10px] mt-1 tracking-tight font-medium">
              {tab.label}
            </span>
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-[#F5C542] mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
