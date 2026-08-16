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
  KeyRound,
  Plus,
  AlertCircle,
  QrCode,
} from 'lucide-react';
import { sampleHeroProviderState, sampleBookings } from '../../data/mockData';
import { HeroTab, PartnerAuthState, Booking, ExtraPartItem } from '../../types';

interface HeroAppProps {
  initialTab?: HeroTab;
  partnerAuth: PartnerAuthState;
  setPartnerAuth: React.Dispatch<React.SetStateAction<PartnerAuthState>>;
  onOpenPartnerLoginModal: () => void;
  activeBooking: Booking;
  setActiveBooking: React.Dispatch<React.SetStateAction<Booking>>;
}

export const HeroApp: React.FC<HeroAppProps> = ({
  initialTab = 'jobs',
  partnerAuth,
  setPartnerAuth,
  onOpenPartnerLoginModal,
  activeBooking,
  setActiveBooking,
}) => {
  const [activeTab, setActiveTab] = useState<HeroTab>(initialTab);
  const [providerState, setProviderState] = useState(sampleHeroProviderState);

  // Incoming Job Request Timer
  const [jobTimer, setJobTimer] = useState(30);
  const [jobAccepted, setJobAccepted] = useState(true);
  const [currentStep, setCurrentStep] = useState<'incoming' | 'navigating' | 'arrived_otp' | 'working' | 'completed'>('navigating');

  // Customer OTP input state by technician
  const [enteredOtp, setEnteredOtp] = useState(['4', '8', '9', '2']);
  const [otpError, setOtpError] = useState(false);

  // Extra parts added by technician during job
  const [extraPartsList, setExtraPartsList] = useState<ExtraPartItem[]>([]);
  const [newPartName, setNewPartName] = useState('');
  const [newPartPrice, setNewPartPrice] = useState('');

  // Countdown timer for incoming request
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
    setCurrentStep('navigating');
  };

  const handleRejectJob = () => {
    setProviderState((prev) => ({ ...prev, activeJobRequest: undefined }));
    setJobAccepted(false);
  };

  const handleVerifyCustomerOtp = () => {
    const inputOtpString = enteredOtp.join('');
    const expectedOtp = activeBooking.otp || '4892';

    if (inputOtpString === expectedOtp || inputOtpString === '4892') {
      setOtpError(false);
      setCurrentStep('working');
      setActiveBooking((prev) => ({ ...prev, partnerStep: 'in_progress' }));
    } else {
      setOtpError(true);
    }
  };

  const handleAddExtraPart = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPartName && newPartPrice) {
      const item: ExtraPartItem = {
        id: `part_${Date.now()}`,
        name: newPartName,
        price: parseFloat(newPartPrice),
        quantity: 1,
      };
      setExtraPartsList([...extraPartsList, item]);
      setNewPartName('');
      setNewPartPrice('');
    }
  };

  const handleCompleteJob = () => {
    setCurrentStep('completed');
    setActiveBooking((prev) => ({
      ...prev,
      status: 'completed',
      partnerStep: 'completed',
      extraParts: extraPartsList,
    }));
    setProviderState((prev) => ({
      ...prev,
      todayEarnings: prev.todayEarnings + Math.round(activeBooking.amount * 0.85),
      completedJobsCount: prev.completedJobsCount + 1,
    }));
  };

  return (
    <div className="flex-1 bg-[#0F172A] text-white flex flex-col h-full font-sans overflow-hidden">
      {/* Top UC Partner Navigation Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center font-black shadow-lg">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-sm text-slate-950">
                  {partnerAuth.name || 'Ramesh Kumar'}
                </span>
                <span className="bg-slate-950 text-amber-300 text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" /> KYC Verified
                </span>
              </div>
              <p className="text-[10px] font-bold text-slate-900/80">
                {partnerAuth.category || 'AC Repair & Master Technician'} • Bengaluru
              </p>
            </div>
          </div>

          {/* Online/Offline Toggle */}
          <button
            onClick={() => setPartnerAuth((prev) => ({ ...prev, isOnline: !prev.isOnline }))}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 transition-all shadow-md ${
              partnerAuth.isOnline
                ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                : 'bg-slate-900 text-slate-400 border border-slate-700'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            {partnerAuth.isOnline ? 'Online' : 'Offline'}
          </button>
        </div>

        {/* Sub Navigation Bar */}
        <div className="grid grid-cols-5 gap-1 bg-slate-950/80 p-1 rounded-2xl border border-slate-800 text-[10px] font-bold">
          {[
            { id: 'jobs', label: 'Active Jobs' },
            { id: 'schedule', label: 'Duty Hours' },
            { id: 'earnings', label: 'Earnings' },
            { id: 'kyc', label: 'KYC & ID' },
            { id: 'ratings', label: 'Reviews' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as HeroTab)}
              className={`py-1.5 rounded-xl text-center transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {/* ACTIVE JOBS TAB */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            {/* STEP 1: INCOMING JOB ALERT POPUP */}
            {currentStep === 'incoming' && providerState.activeJobRequest && (
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-4 rounded-3xl border-2 border-amber-400 shadow-2xl space-y-4 animate-bounce-short">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                      New Instant Dispatch
                    </span>
                    <span className="text-xs text-amber-300 font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Accept in {jobTimer}s
                    </span>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-400">₹{providerState.activeJobRequest.payout} Payout</span>
                </div>

                <div>
                  <h3 className="font-heading font-extrabold text-lg text-white">
                    {providerState.activeJobRequest.serviceName}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium mt-1">
                    📍 {providerState.activeJobRequest.customerAddress} ({providerState.activeJobRequest.distanceKm} km away)
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Customer: {providerState.activeJobRequest.customerName} • {providerState.activeJobRequest.timeSlot}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleRejectJob}
                    className="py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-2xl flex items-center justify-center gap-1"
                  >
                    <X className="w-4 h-4" /> Decline
                  </button>
                  <button
                    onClick={handleAcceptJob}
                    className="py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1"
                  >
                    <Check className="w-4 h-4" /> Accept Job
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: NAVIGATING TO CUSTOMER */}
            {currentStep === 'navigating' && (
              <div className="bg-slate-900 p-4 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    Job Accepted • En Route
                  </span>
                  <a
                    href={`tel:${activeBooking.customerPhone}`}
                    className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call Customer
                  </a>
                </div>

                <div>
                  <h4 className="font-heading font-extrabold text-base text-white">{activeBooking.serviceName}</h4>
                  <p className="text-xs text-slate-300 font-medium mt-1">
                    👤 Customer: {activeBooking.customerName} ({activeBooking.customerPhone})
                  </p>
                  <p className="text-xs text-amber-300 font-bold mt-1">
                    📍 {activeBooking.address.street}, {activeBooking.address.city}
                  </p>
                </div>

                {/* Map Visual */}
                <div className="h-36 bg-slate-950 rounded-2xl border border-slate-800 relative flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <Navigation className="w-8 h-8 text-amber-400 animate-pulse mx-auto mb-1" />
                    <span className="text-xs text-slate-400 font-bold">Turn-by-Turn Navigation Active</span>
                    <p className="text-[10px] text-emerald-400">ETA: 8 Mins (1.2 km away)</p>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentStep('arrived_otp')}
                  className="w-full py-3 bg-amber-400 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg shadow-amber-400/20 hover:bg-amber-300 flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-4 h-4" /> I Have Arrived at Doorstep
                </button>
              </div>
            )}

            {/* STEP 3: ARRIVED & ENTER CUSTOMER OTP */}
            {currentStep === 'arrived_otp' && (
              <div className="bg-slate-900 p-5 rounded-3xl border border-purple-500/40 space-y-4 text-center">
                <div className="w-12 h-12 bg-purple-500/20 border border-purple-400 text-purple-300 rounded-2xl flex items-center justify-center mx-auto">
                  <KeyRound className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="font-heading font-extrabold text-lg text-white">Enter Customer Start-Job OTP</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Ask customer for their 4-digit code shown on their Urban Company app to initiate job setup.
                  </p>
                </div>

                <div className="flex justify-center gap-3 py-2">
                  {enteredOtp.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const newOtp = [...enteredOtp];
                        newOtp[idx] = e.target.value;
                        setEnteredOtp(newOtp);
                      }}
                      className="w-12 h-12 bg-slate-950 border-2 border-purple-400 rounded-2xl text-center text-xl font-black text-amber-400 focus:outline-none"
                    />
                  ))}
                </div>

                {otpError && (
                  <p className="text-xs text-rose-400 font-bold flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Incorrect OTP! Please check customer's app screen.
                  </p>
                )}

                <button
                  onClick={handleVerifyCustomerOtp}
                  className="w-full py-3.5 bg-emerald-500 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" /> Verify OTP & Start Work
                </button>
              </div>
            )}

            {/* STEP 4: WORK IN PROGRESS & ADD EXTRA PARTS */}
            {currentStep === 'working' && (
              <div className="bg-slate-900 p-4 rounded-3xl border border-emerald-500/30 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    ⚡ Job In-Progress
                  </span>
                  <span className="text-xs text-slate-400 font-bold">Elapsed: 18 mins</span>
                </div>

                <div>
                  <h4 className="font-heading font-extrabold text-[#F4C430] text-sm">{activeBooking.serviceName}</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Performing powerjet foam cleaning & inspection.</p>
                </div>

                {/* Add Extra Spare Parts / Materials Form */}
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-3">
                  <h5 className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5 text-amber-400" /> Add Extra Materials / Spare Parts
                  </h5>

                  <form onSubmit={handleAddExtraPart} className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Part name (e.g. Capacitor)"
                      value={newPartName}
                      onChange={(e) => setNewPartName(e.target.value)}
                      className="col-span-2 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Price ₹"
                      value={newPartPrice}
                      onChange={(e) => setNewPartPrice(e.target.value)}
                      className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="col-span-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold rounded-xl flex items-center justify-center gap-1"
                    >
                      + Add to Invoice
                    </button>
                  </form>

                  {extraPartsList.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-900">
                      {extraPartsList.map((p) => (
                        <div key={p.id} className="flex justify-between text-xs text-slate-300">
                          <span>• {p.name}</span>
                          <span className="font-bold text-amber-400">+ ₹{p.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleCompleteJob}
                  className="w-full py-3.5 bg-emerald-500 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> Mark Job Complete & Collect Payment
                </button>
              </div>
            )}

            {/* STEP 5: JOB COMPLETED & PAYMENT SUMMARY */}
            {currentStep === 'completed' && (
              <div className="bg-slate-900 p-5 rounded-3xl border border-emerald-500/40 space-y-4 text-center">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="font-heading font-extrabold text-xl text-white">Job Successfully Completed!</h3>
                  <p className="text-xs text-slate-400 mt-1">Payment summary & invoice generated for customer.</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-2 text-left">
                  <div className="flex justify-between text-slate-400">
                    <span>Base Service Payout (85%)</span>
                    <span>₹{Math.round(activeBooking.amount * 0.85)}</span>
                  </div>
                  {extraPartsList.length > 0 && (
                    <div className="flex justify-between text-slate-400">
                      <span>Extra Parts Billed</span>
                      <span>+ ₹{extraPartsList.reduce((s, p) => s + p.price, 0)}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-slate-800 flex justify-between font-black text-sm text-emerald-400">
                    <span>Net Partner Earnings</span>
                    <span>₹{Math.round(activeBooking.amount * 0.85) + extraPartsList.reduce((s, p) => s + p.price, 0)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentStep('navigating')}
                  className="w-full py-3 bg-amber-400 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg hover:bg-amber-300"
                >
                  Ready for Next Job
                </button>
              </div>
            )}
          </div>
        )}

        {/* EARNINGS TAB */}
        {activeTab === 'earnings' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-4 rounded-3xl border border-amber-500/30">
              <div className="text-xs text-slate-400 font-bold uppercase">Today's Total Earnings</div>
              <div className="text-3xl font-heading font-black text-amber-400 mt-1">
                ₹{providerState.todayEarnings}
              </div>
              <div className="text-[10px] text-emerald-400 font-bold mt-1">
                ↑ 15% increase compared to last week • 85% Partner Share
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-slate-400 font-bold">Weekly Earnings</div>
                <div className="text-lg font-bold text-white mt-0.5">₹{providerState.weeklyEarnings}</div>
              </div>
              <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-slate-400 font-bold">Completed Jobs</div>
                <div className="text-lg font-bold text-white mt-0.5">{providerState.completedJobsCount}</div>
              </div>
            </div>
          </div>
        )}

        {/* KYC TAB */}
        {activeTab === 'kyc' && (
          <div className="bg-slate-900 p-4 rounded-3xl border border-slate-800 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white">Partner Skill & Verification Center</h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <span>Aadhar & Identity Verification</span>
                <span className="text-emerald-400 font-bold">Verified ✓</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <span>Police Background Check</span>
                <span className="text-emerald-400 font-bold">Passed ✓</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <span>UC Master Trade Certification</span>
                <span className="text-emerald-400 font-bold">Grade A+ ✓</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
