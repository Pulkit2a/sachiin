import React, { useState } from 'react';
import {
  ShieldCheck,
  User,
  Wrench,
  ChevronDown,
  LogOut,
  Lock,
  AlertTriangle,
} from 'lucide-react';
import { AppRole, CustomerAuthState, PartnerAuthState } from '../types';

interface DeviceFrameProps {
  role: AppRole;
  setRole: (r: AppRole) => void;
  currentUser: any;
  currentScreenLabel: string;
  onScreenSelect: (screenKey: string) => void;
  onLogout: () => void;
  customerAuth: CustomerAuthState;
  partnerAuth: PartnerAuthState;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  role,
  setRole,
  currentUser,
  currentScreenLabel,
  onScreenSelect,
  onLogout,
  customerAuth,
  partnerAuth,
  children,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authLockModal, setAuthLockModal] = useState<{ isOpen: boolean; targetRole: AppRole | null }>({
    isOpen: false,
    targetRole: null,
  });

  const userRole = currentUser?.role || 'customer';

  // Filter dropdown screens based on user's authorized role
  const availableSections = () => {
    if (userRole === 'customer') {
      return [
        { section: 'Heros Homes Customer App', items: [
          { key: 'cust_home', label: '🏠 Home Dashboard & City Selector' },
          { key: 'cust_bookings', label: '📅 Active Bookings & Live Map' },
          { key: 'cust_live_map', label: '📍 Live Partner Tracking & Start Job OTP' },
          { key: 'cust_service_flow', label: '⚡ Checkout & Time Slot Picker' },
          { key: 'cust_ai_identifier', label: '🤖 AI Issue Scanner' },
          { key: 'cust_rewards', label: '🏆 Heros Cash Rewards' },
          { key: 'cust_profile', label: '👤 Customer Profile & Addresses' },
        ]}
      ];
    } else if (userRole === 'technician') {
      return [
        { section: 'Technician Partner App', items: [
          { key: 'hero_dashboard', label: '⚡ Active Jobs & Duty Switch' },
          { key: 'hero_job_request', label: '🚨 Real-time Incoming Job Alert' },
          { key: 'hero_schedule', label: '📆 Duty Schedule' },
          { key: 'hero_earnings', label: '💰 Earnings & 85/15 Payout' },
          { key: 'hero_kyc', label: '📄 Trade Certification & KYC ID' },
          { key: 'hero_ratings', label: '⭐ Customer Reviews & Badges' },
        ]}
      ];
    } else {
      return [
        { section: 'Admin Control Room', items: [
          { key: 'admin_dashboard', label: '📈 Executive Dashboard' },
          { key: 'admin_kyc', label: '🛡️ Partner Verification Queue' },
        ]}
      ];
    }
  };

  const handleRoleSwitchAttempt = (targetRole: AppRole) => {
    const activeUserRole = currentUser?.role === 'technician' ? 'hero' : currentUser?.role || 'customer';
    
    // Allow if already authorized for this role
    if (activeUserRole === targetRole || currentUser?.role === 'admin') {
      setRole(targetRole);
    } else {
      // Intercept with Auth Lock Modal
      setAuthLockModal({ isOpen: true, targetRole });
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-white flex flex-col font-sans selection:bg-[#F4C430] selection:text-[#3B1C71]">
      {/* Top Universal Header */}
      <header className="bg-[#0F172A] border-b border-slate-800 px-4 py-3 sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Logo & Dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#3B1C71] to-[#6E3CBC] border border-purple-400 flex items-center justify-center text-[#F4C430] font-black text-xl shadow-lg">
                HH
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-extrabold text-base text-white tracking-tight">Heros Homes</span>
                  <span className="text-[9px] bg-[#F4C430] text-[#3B1C71] font-black px-2 py-0.5 rounded-full uppercase">
                    {userRole === 'technician' ? 'Partner' : userRole === 'admin' ? 'Admin' : 'Customer'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">Authenticated Portal Access</p>
              </div>
            </div>

            {/* Quick Screen Select Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-2 transition-colors text-purple-200"
              >
                <span className="truncate max-w-[140px] md:max-w-[200px]">{currentScreenLabel}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isMenuOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-[#0F172A] border border-slate-800 rounded-2xl shadow-2xl z-50 py-2 text-xs max-h-96 overflow-y-auto">
                  {availableSections().map((opt, i) => (
                    <div key={i} className="mb-2">
                      <div className="px-3 py-1 text-[10px] font-extrabold text-[#F4C430] uppercase tracking-wider bg-slate-900/80">
                        {opt.section}
                      </div>
                      {opt.items.map((item) => (
                        <button
                          key={item.key}
                          onClick={() => {
                            onScreenSelect(item.key);
                            setIsMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-slate-300 hover:text-white hover:bg-purple-900/30 font-semibold transition-colors flex items-center justify-between"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Authenticated User Badge & Role Controls */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-center">
            {/* Authenticated Account Info Badge */}
            <div className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div className="text-left">
                <div className="font-bold text-white leading-none">{currentUser?.name || 'User'}</div>
                <div className="text-[9px] text-slate-400 capitalize mt-0.5">Role: {userRole}</div>
              </div>
            </div>

            {/* Customer Switch Button */}
            <button
              onClick={() => handleRoleSwitchAttempt('customer')}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                role === 'customer'
                  ? 'bg-[#3B1C71] text-white border border-purple-400 shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#F4C430]" /> Customer App
            </button>

            {/* Technician Switch Button */}
            <button
              onClick={() => handleRoleSwitchAttempt('hero')}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                role === 'hero'
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" /> Heros Partner
            </button>

            {/* Admin Switch Button */}
            <button
              onClick={() => handleRoleSwitchAttempt('admin')}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                role === 'admin'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Room
            </button>

            {/* Logout / Switch Account */}
            <button
              onClick={onLogout}
              className="px-3 py-2 bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs font-bold rounded-xl transition-all flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Full-Screen Body Container */}
      <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto p-3 md:p-6 overflow-x-hidden">
        {children}
      </main>

      {/* Authorization Lock Modal */}
      {authLockModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0F172A] text-white rounded-3xl max-w-md w-full p-6 border border-slate-800 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto border border-amber-400">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-heading font-extrabold text-lg text-white">Role Authentication Required</h3>
              <p className="text-xs text-slate-300 mt-1">
                You are currently logged in as a <span className="font-bold text-amber-400 capitalize">{userRole}</span> (`{currentUser?.name}`).
              </p>
              <p className="text-xs text-slate-400 mt-2">
                To access the <span className="font-bold text-white capitalize">{authLockModal.targetRole === 'hero' ? 'Partner / Technician' : authLockModal.targetRole}</span> portal, please sign out and log in with a valid {authLockModal.targetRole === 'hero' ? 'Partner' : authLockModal.targetRole} account.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setAuthLockModal({ isOpen: false, targetRole: null })}
                className="py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-700"
              >
                Stay in {userRole}
              </button>
              <button
                onClick={() => {
                  setAuthLockModal({ isOpen: false, targetRole: null });
                  onLogout();
                }}
                className="py-2.5 bg-amber-400 text-slate-950 text-xs font-extrabold rounded-xl hover:bg-amber-300 shadow-lg"
              >
                Sign Out & Switch Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
