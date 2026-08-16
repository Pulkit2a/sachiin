import React, { useState } from 'react';
import {
  ShieldCheck,
  User,
  Wrench,
  ChevronDown,
  LogOut,
} from 'lucide-react';
import { AppRole, CustomerAuthState, PartnerAuthState } from '../types';

interface DeviceFrameProps {
  role: AppRole;
  setRole: (r: AppRole) => void;
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
  currentScreenLabel,
  onScreenSelect,
  onLogout,
  customerAuth,
  partnerAuth,
  children,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const screenOptions = [
    { section: 'Heros Homes Customer App', items: [
      { key: 'cust_home', label: '🏠 Home Dashboard & City Selector' },
      { key: 'cust_bookings', label: '📅 Active Bookings & Live Map' },
      { key: 'cust_live_map', label: '📍 Live Partner Tracking & Start Job OTP' },
      { key: 'cust_service_flow', label: '⚡ Checkout & Time Slot Picker' },
      { key: 'cust_ai_identifier', label: '🤖 AI Issue & Cost Identifier' },
      { key: 'cust_rewards', label: '🏆 Heros Cash Rewards' },
      { key: 'cust_profile', label: '👤 Customer Profile & Addresses' },
    ]},
    { section: 'Technician Partner App', items: [
      { key: 'hero_dashboard', label: '⚡ Active Jobs & Duty Switch' },
      { key: 'hero_job_request', label: '🚨 Real-time Incoming Job Alert' },
      { key: 'hero_schedule', label: '📆 Duty Schedule' },
      { key: 'hero_earnings', label: '💰 Earnings & 85/15 Payout' },
      { key: 'hero_kyc', label: '📄 Trade Certification & KYC ID' },
      { key: 'hero_ratings', label: '⭐ Customer Reviews & Badges' },
    ]},
    { section: 'Admin Control Room', items: [
      { key: 'admin_dashboard', label: '📈 Platform Overview & Control' },
      { key: 'admin_kyc', label: '🛡️ Partner Verification Queue' },
    ]},
  ];

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
                    Full App
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">Home Services & Partner Platform</p>
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
                  {screenOptions.map((opt, i) => (
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

          {/* Role Switcher & User Profile */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-center">
            {/* Customer Switch */}
            <button
              onClick={() => setRole('customer')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                role === 'customer'
                  ? 'bg-[#3B1C71] text-white border border-purple-400 shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#F4C430]" /> Customer App
            </button>

            {/* Technician Switch */}
            <button
              onClick={() => setRole('hero')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                role === 'hero'
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" /> Heros Partner
            </button>

            {/* Admin Switch */}
            <button
              onClick={() => setRole('admin')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                role === 'admin'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Room
            </button>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="px-3 py-2 bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs font-bold rounded-xl transition-all flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" /> Exit Portal
            </button>
          </div>
        </div>
      </header>

      {/* Main Full-Screen Body Container */}
      <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto p-3 md:p-6 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};
