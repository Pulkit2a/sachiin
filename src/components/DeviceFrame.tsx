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
} from 'lucide-react';
import { AppRole, DevicePlatform } from '../types';

interface DeviceFrameProps {
  role: AppRole;
  setRole: (r: AppRole) => void;
  platform: DevicePlatform;
  setPlatform: (p: DevicePlatform) => void;
  currentScreenLabel: string;
  onScreenSelect: (screenKey: string) => void;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  role,
  setRole,
  platform,
  setPlatform,
  currentScreenLabel,
  onScreenSelect,
  children,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const screenOptions = [
    { section: 'Customer Mobile App', items: [
      { key: 'cust_home', label: '🏠 Home Dashboard' },
      { key: 'cust_bookings', label: '📅 Bookings (Tabs & Cards)' },
      { key: 'cust_live_map', label: '📍 Live Hero Tracking Map' },
      { key: 'cust_booking_confirm', label: '✅ Booking Confirmation Card' },
      { key: 'cust_service_flow', label: '⚡ Service Booking & Payment Flow' },
      { key: 'cust_ai_identifier', label: '🤖 AI Service & Cost Identifier' },
      { key: 'cust_ai_diagnostics', label: '📊 AI Home Diagnostics (94% Wellness)' },
      { key: 'cust_ai_chat', label: '💬 Hero AI Chatbot Assistant' },
      { key: 'cust_ai_matching', label: '🎯 Smart AI Professional Matching' },
      { key: 'cust_community', label: '👥 Community Hub & Articles' },
      { key: 'cust_rewards', label: '🏆 Hero Rewards & Gold Membership' },
      { key: 'cust_profile', label: '👤 Profile & Saved Addresses' },
    ]},
    { section: 'Service Provider ("Hero") App', items: [
      { key: 'hero_dashboard', label: '⚡ Hero Provider Home & Online Switch' },
      { key: 'hero_kyc', label: '📄 Registration & KYC Verification' },
      { key: 'hero_job_request', label: '🚨 Incoming Job Alert (Accept/Reject)' },
      { key: 'hero_schedule', label: '📆 Schedule & Availability Manager' },
      { key: 'hero_nav', label: '🗺️ Customer Turn-by-Turn Navigation' },
      { key: 'hero_earnings', label: '💰 Earnings & Payout Analytics' },
      { key: 'hero_ratings', label: '⭐ Ratings, Reviews & Badges' },
    ]},
    { section: 'Admin Web Dashboard', items: [
      { key: 'admin_dashboard', label: '📈 Platform Overview & Revenue Charts' },
      { key: 'admin_kyc', label: '🛡️ KYC Provider Verification Queue' },
      { key: 'admin_users', label: '👥 Customer & Hero Directory' },
      { key: 'admin_bookings', label: '📋 Live Booking Control Room' },
    ]},
    { section: 'Architecture & Journey', items: [
      { key: 'flow_diagram', label: '🔄 Interactive User Flow Diagram' },
    ]}
  ];

  return (
    <div className="min-h-screen bg-[#080E18] text-white flex flex-col font-sans selection:bg-[#F5C542] selection:text-[#0D182A]">
      {/* Top Universal Control Header */}
      <header className="bg-[#0D182A] border-b border-slate-800 px-4 py-3 sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Brand & Role Switcher */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F5C542] to-amber-300 flex items-center justify-center text-[#0D182A] font-extrabold text-xl shadow-lg shadow-amber-500/20">
                H
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-bold text-lg text-white tracking-tight">Hero Homes</span>
                  <span className="text-[10px] bg-[#F5C542]/20 text-[#F5C542] border border-[#F5C542]/30 px-2 py-0.5 rounded-full font-semibold">
                    PRO UI v2.5
                  </span>
                </div>
                <p className="text-xs text-slate-400">AI-Powered Home Services Platform</p>
              </div>
            </div>

            {/* Quick Screen Select Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F5C542]" />
                <span className="max-w-[140px] sm:max-w-[180px] truncate">{currentScreenLabel}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 md:left-0 top-full mt-2 w-72 sm:w-80 bg-[#0D182A] border border-slate-700 rounded-xl shadow-2xl z-50 max-h-[75vh] overflow-y-auto p-2">
                  {screenOptions.map((group, idx) => (
                    <div key={idx} className="mb-3 last:mb-0">
                      <div className="text-[10px] uppercase font-bold text-[#F5C542] px-2 py-1 tracking-wider border-b border-slate-800 mb-1">
                        {group.section}
                      </div>
                      {group.items.map((item) => (
                        <button
                          key={item.key}
                          onClick={() => {
                            onScreenSelect(item.key);
                            setIsMenuOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-2 rounded-lg text-xs text-slate-200 hover:bg-slate-800 hover:text-[#F5C542] transition-colors flex items-center gap-2"
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

          {/* Center Mode Tabs */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => { setRole('customer'); if (platform === 'web') setPlatform('ios'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                role === 'customer'
                  ? 'bg-[#F5C542] text-[#0D182A] font-semibold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Customer App
            </button>

            <button
              onClick={() => { setRole('hero'); if (platform === 'web') setPlatform('ios'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                role === 'hero'
                  ? 'bg-[#F5C542] text-[#0D182A] font-semibold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              Hero Pro
            </button>

            <button
              onClick={() => { setRole('admin'); setPlatform('web'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                role === 'admin'
                  ? 'bg-[#F5C542] text-[#0D182A] font-semibold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Web
            </button>

            <button
              onClick={() => { setRole('flow'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                role === 'flow'
                  ? 'bg-[#F5C542] text-[#0D182A] font-semibold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GitMerge className="w-3.5 h-3.5" />
              User Flow
            </button>
          </div>

          {/* Device Shell Switcher */}
          {role !== 'admin' && role !== 'flow' && (
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setPlatform('ios')}
                className={`p-1.5 rounded-lg transition-all ${
                  platform === 'ios' ? 'bg-slate-800 text-[#F5C542]' : 'text-slate-400 hover:text-white'
                }`}
                title="iOS Shell (iPhone 16 Pro)"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPlatform('android')}
                className={`p-1.5 rounded-lg transition-all ${
                  platform === 'android' ? 'bg-slate-800 text-[#F5C542]' : 'text-slate-400 hover:text-white'
                }`}
                title="Android Shell (Pixel 9)"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPlatform('web')}
                className={`p-1.5 rounded-lg transition-all ${
                  platform === 'web' ? 'bg-slate-800 text-[#F5C542]' : 'text-slate-400 hover:text-white'
                }`}
                title="Full Responsive Canvas"
              >
                <Layout className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-all ml-1"
                title="Toggle View Mode"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Canvas Area */}
      <main className="flex-1 py-4 sm:py-8 px-2 sm:px-4 flex items-center justify-center overflow-x-hidden">
        {role === 'admin' || role === 'flow' || platform === 'web' ? (
          <div className="w-full max-w-7xl bg-[#0D182A] rounded-2xl border border-slate-800 shadow-2xl p-4 sm:p-6 min-h-[820px]">
            {children}
          </div>
        ) : (
          /* Mobile Device Frame Mockup */
          <div className="relative group transition-all duration-300">
            {/* Outer Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#F5C542]/20 via-blue-500/10 to-amber-500/20 rounded-[48px] blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />

            <div
              className={`relative bg-[#0D182A] rounded-[44px] p-3 border-[6px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden transition-all ${
                platform === 'ios' ? 'w-[390px] sm:w-[410px]' : 'w-[390px] sm:w-[410px]'
              } h-[840px] flex flex-col`}
            >
              {/* Phone Hardware Notch / Dynamic Island */}
              <div className="relative z-40 bg-[#0D182A] pt-1 pb-1 px-5 flex items-center justify-between text-xs text-white">
                <span className="font-semibold text-xs tracking-tight">09:41</span>
                
                {platform === 'ios' ? (
                  <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end px-2 border border-slate-800 shadow-inner">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-900/60 border border-blue-400/40 animate-pulse" />
                  </div>
                ) : (
                  <div className="w-3.5 h-3.5 bg-black rounded-full border border-slate-700" />
                )}

                <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                  <span className="font-bold text-[9px] bg-slate-800 px-1 rounded">5G</span>
                  <Wifi className="w-3.5 h-3.5" />
                  <Battery className="w-4 h-4 fill-white text-white" />
                </div>
              </div>

              {/* Screen Body */}
              <div className="flex-1 bg-[#F6F7F9] text-[#0D182A] rounded-[32px] overflow-y-auto overflow-x-hidden relative flex flex-col">
                {children}
              </div>

              {/* Phone Gesture Bottom Bar */}
              <div className="bg-[#0D182A] pt-2 pb-1 flex justify-center">
                <div className="w-32 h-1 bg-slate-600 rounded-full" />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
