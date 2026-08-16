import React, { useState } from 'react';
import {
  Smartphone,
  Tablet,
  Layout,
  GitMerge,
  ShieldCheck,
  User,
  Wrench,
  ChevronDown,
  Sparkles,
  Wifi,
  Battery,
  Maximize2,
  Minimize2,
  Lock,
} from 'lucide-react';
import { AppRole, DevicePlatform, CustomerAuthState, PartnerAuthState } from '../types';

interface DeviceFrameProps {
  role: AppRole;
  setRole: (r: AppRole) => void;
  platform: DevicePlatform;
  setPlatform: (p: DevicePlatform) => void;
  currentScreenLabel: string;
  onScreenSelect: (screenKey: string) => void;
  onOpenCustomerLogin: () => void;
  onOpenPartnerLogin: () => void;
  customerAuth: CustomerAuthState;
  partnerAuth: PartnerAuthState;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  role,
  setRole,
  platform,
  setPlatform,
  currentScreenLabel,
  onScreenSelect,
  onOpenCustomerLogin,
  onOpenPartnerLogin,
  customerAuth,
  partnerAuth,
  children,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const screenOptions = [
    { section: 'Urban Company Customer App', items: [
      { key: 'cust_home', label: '🏠 Home Dashboard & City Selector' },
      { key: 'cust_bookings', label: '📅 Active Bookings & Live Map' },
      { key: 'cust_live_map', label: '📍 Live Partner Tracking & Start Job OTP' },
      { key: 'cust_service_flow', label: '⚡ Checkout & Time Slot Picker' },
      { key: 'cust_ai_identifier', label: '🤖 AI Issue & Cost Identifier' },
      { key: 'cust_ai_diagnostics', label: '📊 AI Home Diagnostics' },
      { key: 'cust_ai_chat', label: '💬 UC AI Chatbot Assistant' },
      { key: 'cust_rewards', label: '🏆 UC Plus Rewards & Cash' },
      { key: 'cust_profile', label: '👤 Customer Profile & Addresses' },
    ]},
    { section: 'UC Partner / Technician App', items: [
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
      { key: 'admin_users', label: '👥 User Directory' },
    ]},
    { section: 'Architecture', items: [
      { key: 'flow_diagram', label: '🔄 Interactive User Flow Diagram' },
    ]}
  ];

  return (
    <div className="min-h-screen bg-[#090D16] text-white flex flex-col font-sans selection:bg-[#F4C430] selection:text-[#3B1C71]">
      {/* Top Universal Control Header */}
      <header className="bg-[#0F172A] border-b border-slate-800 px-4 py-2.5 sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Brand & Role Selector */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3B1C71] to-[#6E3CBC] border border-purple-400 flex items-center justify-center text-[#F4C430] font-black text-lg shadow-lg">
                HH
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-extrabold text-base text-white tracking-tight">Heros Homes</span>
                  <span className="text-[9px] bg-[#F4C430] text-[#3B1C71] font-black px-1.5 py-0.2 rounded uppercase">
                    Dual App v3.0
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">Customer App & Technician Partner Platform</p>
              </div>
            </div>

            {/* Quick Screen Select Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-2 transition-colors text-purple-200"
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

          {/* App Switchers & Auth Gateways */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-center">
            {/* Customer App Switch */}
            <button
              onClick={() => setRole('customer')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                role === 'customer'
                  ? 'bg-[#3B1C71] text-white border border-purple-400 shadow-lg shadow-purple-900/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#F4C430]" /> Customer App
            </button>

            {/* Technician App Switch */}
            <button
              onClick={() => setRole('hero')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                role === 'hero'
                  ? 'bg-amber-500 text-slate-950 border border-amber-300 font-extrabold shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" /> UC Partner (Technician)
            </button>

            {/* Admin Switch */}
            <button
              onClick={() => setRole('admin')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                role === 'admin'
                  ? 'bg-emerald-600 text-white border border-emerald-400 shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Room
            </button>

            {/* Auth Action Triggers */}
            {role === 'customer' && (
              <button
                onClick={onOpenCustomerLogin}
                className="px-2.5 py-1.5 bg-purple-950/60 border border-purple-500/30 text-purple-200 text-xs font-bold rounded-xl hover:bg-purple-900/50 transition-colors flex items-center gap-1"
              >
                <Lock className="w-3 h-3 text-[#F4C430]" />
                {customerAuth.isLoggedIn ? 'Customer Auth ✓' : 'Login'}
              </button>
            )}

            {role === 'hero' && (
              <button
                onClick={onOpenPartnerLogin}
                className="px-2.5 py-1.5 bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-bold rounded-xl hover:bg-amber-900/50 transition-colors flex items-center gap-1"
              >
                <Lock className="w-3 h-3 text-amber-400" />
                {partnerAuth.isLoggedIn ? 'Partner Auth ✓' : 'Partner Login'}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Canvas View Body */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-4 bg-[#090D16] overflow-auto">
        {role === 'flow' || role === 'admin' || platform === 'web' ? (
          <div className="w-full max-w-6xl h-[85vh] bg-[#0F172A] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
            {children}
          </div>
        ) : (
          /* Mobile Device Frame Simulation */
          <div className="w-[380px] h-[780px] bg-slate-950 rounded-[44px] border-[10px] border-slate-800 shadow-2xl overflow-hidden flex flex-col relative ring-1 ring-slate-700">
            {/* Simulated Phone Notch */}
            <div className="w-32 h-4 bg-slate-800 rounded-b-xl mx-auto z-40 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-700" />
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
              {children}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
