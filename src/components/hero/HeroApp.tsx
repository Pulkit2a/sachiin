import React, { useState, useEffect } from 'react';
import {
  Wrench,
  Calendar,
  DollarSign,
  Star,
  FileCheck,
  Navigation,
  Phone,
  MessageSquare,
  Check,
  X,
  Clock,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Award,
  Upload,
  User,
  Power,
  Play,
  CheckCircle2,
} from 'lucide-react';
import { sampleHeroProviderState, sampleHeroes } from '../../data/mockData';
import { HeroTab } from '../../types';

interface HeroAppProps {
  initialTab?: HeroTab;
}

export const HeroApp: React.FC<HeroAppProps> = ({ initialTab = 'jobs' }) => {
  const [activeTab, setActiveTab] = useState<HeroTab>(initialTab);

  const [providerState, setProviderState] = useState(sampleHeroProviderState);
  const [jobTimer, setJobTimer] = useState(28);
  const [jobAccepted, setJobAccepted] = useState(false);
  const [jobStep, setJobStep] = useState<'incoming' | 'navigating' | 'working' | 'completed'>('incoming');

  // Timer countdown for incoming job request
  useEffect(() => {
    let interval: any;
    if (providerState.activeJobRequest && jobTimer > 0 && !jobAccepted) {
      interval = setInterval(() => {
        setJobTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [jobTimer, jobAccepted, providerState.activeJobRequest]);

  const handleAcceptJob = () => {
    setJobAccepted(true);
    setJobStep('navigating');
  };

  const handleRejectJob = () => {
    setProviderState((prev) => ({ ...prev, activeJobRequest: undefined }));
  };

  return (
    <div className="flex-1 bg-[#F6F7F9] text-[#0D182A] flex flex-col h-full pb-6">
      {/* Hero Provider Header Bar */}
      <div className="bg-[#0D182A] text-white pt-4 pb-4 px-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#F5C542] text-[#0D182A] flex items-center justify-center font-extrabold text-sm">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-sm text-white">Ramesh Kumar</span>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" /> KYC Verified
                </span>
              </div>
              <p className="text-[10px] text-slate-300">AC Repair & Master Technician • Bengaluru</p>
            </div>
          </div>

          {/* Online/Offline Toggle */}
          <button
            onClick={() => setProviderState((prev) => ({ ...prev, isOnline: !prev.isOnline }))}
            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border transition-all ${
              providerState.isOnline
                ? 'bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            {providerState.isOnline ? 'Online' : 'Offline'}
          </button>
        </div>

        {/* Hero Bottom Navigation Bar */}
        <div className="grid grid-cols-5 gap-1 bg-slate-900 p-1 rounded-2xl border border-slate-800 text-[10px]">
          {[
            { id: 'jobs', label: 'Requests' },
            { id: 'schedule', label: 'Schedule' },
            { id: 'earnings', label: 'Earnings' },
            { id: 'kyc', label: 'KYC & Skills' },
            { id: 'ratings', label: 'Reviews' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as HeroTab)}
              className={`py-1.5 rounded-xl font-bold transition-all text-center ${
                activeTab === tab.id ? 'bg-[#F5C542] text-[#0D182A]' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {/* TAB 1: INCOMING JOBS & NAVIGATION */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            {/* Online Status Banner */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#0D182A]">Dispatch Duty Status</span>
                <span className="text-[10px] text-slate-500 block">Acceptance Rate: 98.4%</span>
              </div>
              <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl">
                Ready for Job Alerts
              </span>
            </div>

            {/* INCOMING JOB ALERT POPUP */}
            {providerState.activeJobRequest && !jobAccepted && (
              <div className="bg-[#0D182A] text-white p-4 rounded-3xl border-2 border-[#F5C542] shadow-2xl animate-pulse-ring space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-[#F5C542] text-[#0D182A] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Urgent Job Request
                  </span>

                  <span className="font-mono font-extrabold text-sm text-[#F5C542]">
                    00:{jobTimer < 10 ? `0${jobTimer}` : jobTimer}s
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-base text-white">
                    {providerState.activeJobRequest.serviceName}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Customer: {providerState.activeJobRequest.customerName}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {providerState.activeJobRequest.customerAddress} ({providerState.activeJobRequest.distanceKm} km away)
                  </p>
                </div>

                <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-2xl border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">YOUR PAYOUT</span>
                    <span className="font-heading font-extrabold text-base text-emerald-400">
                      ₹{providerState.activeJobRequest.payout}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-bold">SLOT</span>
                    <span className="text-xs text-white font-bold">{providerState.activeJobRequest.timeSlot}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={handleRejectJob}
                    className="bg-slate-800 text-slate-300 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-700 transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={handleAcceptJob}
                    className="bg-[#F5C542] text-[#0D182A] py-2.5 rounded-xl font-extrabold text-xs hover:bg-amber-300 transition-colors shadow-lg"
                  >
                    Accept Job ✓
                  </button>
                </div>
              </div>
            )}

            {/* NAVIGATING TO CUSTOMER VIEW */}
            {jobAccepted && (
              <div className="bg-slate-900 text-white rounded-3xl p-4 border border-slate-800 shadow-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <Navigation className="w-4 h-4 fill-emerald-400" /> Navigation in Progress
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                    2.3 km (6 mins)
                  </span>
                </div>

                {/* Simulated Map directions */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 relative h-36 flex flex-col justify-between overflow-hidden">
                  <div className="text-xs font-bold text-amber-300 flex items-center gap-1">
                    <Navigation className="w-4 h-4" /> Head South on 10th Main Rd toward HSR Sector 1
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Destination: Flat 102, Laurel Heights, Green Glen Layout, Bellandur
                  </div>
                </div>

                {/* Customer Contact */}
                <div className="flex items-center justify-between bg-slate-800/90 p-3 rounded-2xl">
                  <div>
                    <span className="font-bold text-xs text-white">Priya Sharma</span>
                    <span className="text-[10px] text-slate-400 block">Customer • +91 98123 45678</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a href="tel:+919812345678" className="p-2 rounded-xl bg-emerald-600 text-white">
                      <Phone className="w-4 h-4" />
                    </a>
                    <button className="p-2 rounded-xl bg-[#F5C542] text-[#0D182A]">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {jobStep === 'navigating' ? (
                  <button
                    onClick={() => setJobStep('working')}
                    className="w-full bg-[#F5C542] text-[#0D182A] py-3 rounded-2xl font-extrabold text-xs"
                  >
                    Arrived at Customer Home →
                  </button>
                ) : (
                  <button
                    onClick={() => setJobStep('completed')}
                    className="w-full bg-emerald-500 text-white py-3 rounded-2xl font-extrabold text-xs"
                  >
                    Mark Job Completed ✓
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SCHEDULE MANAGER */}
        {activeTab === 'schedule' && (
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-sm text-[#0D182A]">Schedule & Availability</h3>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-[#0D182A]">
                <span>Today (07 Aug 2026)</span>
                <span className="text-emerald-600">3 Slots Booked</span>
              </div>

              {/* Slot Cards */}
              <div className="space-y-2 text-xs">
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-[#0D182A]">10:00 AM - 11:30 AM</span>
                    <span className="text-[10px] text-amber-900 block">Split AC Deep Cleaning • HSR Layout</span>
                  </div>
                  <span className="text-[10px] font-extrabold bg-[#F5C542] text-[#0D182A] px-2 py-0.5 rounded">
                    Completed
                  </span>
                </div>

                <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-[#0D182A]">02:30 PM - 04:00 PM</span>
                    <span className="text-[10px] text-blue-900 block">AC Foam Clean • Koramangala</span>
                  </div>
                  <span className="text-[10px] font-extrabold bg-blue-600 text-white px-2 py-0.5 rounded">
                    Assigned
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EARNINGS DASHBOARD */}
        {activeTab === 'earnings' && (
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-sm text-[#0D182A]">Hero Earnings Dashboard</h3>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[10px] text-slate-400 font-bold block">TODAY EARNINGS</span>
                <span className="font-heading font-extrabold text-lg text-emerald-600">
                  ₹{providerState.todayEarnings}
                </span>
                <span className="text-[9px] text-slate-500 block mt-0.5">3 Jobs Completed</span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[10px] text-slate-400 font-bold block">THIS WEEK</span>
                <span className="font-heading font-extrabold text-lg text-[#0D182A]">
                  ₹{providerState.weeklyEarnings}
                </span>
                <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">+14% vs last week</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className="font-bold text-xs text-[#0D182A] block">Recent Payout History</span>
              <div className="flex justify-between text-xs py-1 border-b border-slate-100">
                <span className="text-slate-600">06 Aug Payout to HDFC Bank</span>
                <span className="font-bold text-[#0D182A]">₹2,450</span>
              </div>
              <div className="flex justify-between text-xs py-1">
                <span className="text-slate-600">05 Aug Payout to HDFC Bank</span>
                <span className="font-bold text-[#0D182A]">₹1,890</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: KYC & SKILLS */}
        {activeTab === 'kyc' && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-[#0D182A]">Hero KYC & Credentials</h3>
              <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                100% Verified
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-[#0D182A]">Aadhaar Card Verification</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-[#0D182A]">Court & Police Background Check</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-[#0D182A]">HVAC Skill Test Certificate</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: RATINGS & REVIEWS */}
        {activeTab === 'ratings' && (
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="font-heading font-extrabold text-2xl text-[#0D182A]">4.94 ★</span>
                <span className="text-xs text-slate-500 block">Based on 582 reviews</span>
              </div>

              <div className="text-right">
                <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-full">
                  Master Technician
                </span>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#0D182A]">Pulkit Madaan</span>
                <span className="text-amber-500 text-xs font-bold">5.0 ★</span>
              </div>
              <p className="text-xs text-slate-600">
                Ramesh arrived right on time and fixed our AC cooling in 30 mins! Cleaned up all dust afterwards.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
