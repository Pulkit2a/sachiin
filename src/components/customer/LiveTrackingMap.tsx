import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  MessageSquare,
  ShieldCheck,
  Star,
  Clock,
  Navigation,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Booking } from '../../types';

interface LiveTrackingMapProps {
  booking: Booking;
  onClose: () => void;
  onOpenChat: () => void;
}

export const LiveTrackingMap: React.FC<LiveTrackingMapProps> = ({
  booking,
  onClose,
  onOpenChat,
}) => {
  const [eta, setEta] = useState(booking.heroCurrentLocation?.etaMinutes || 8);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setEta((prev) => (prev > 1 ? prev - 1 : 1));
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyOtp = () => {
    navigator.clipboard.writeText(booking.otp || '4892');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex-1 bg-[#F8FAFC] text-[#0F172A] flex flex-col h-full relative overflow-hidden">
      {/* Top Floating Navigation Header */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between">
        <button
          onClick={onClose}
          className="bg-white text-slate-800 p-2.5 rounded-full shadow-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-1.5 text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to App
        </button>

        <span className="bg-[#3B1C71] text-white px-3 py-1.5 rounded-full text-xs font-extrabold shadow-lg border border-purple-400 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#F4C430]" /> Partner Arriving in ~{eta} Mins
        </span>
      </div>

      {/* Interactive Map Visual Simulation */}
      <div className="flex-1 bg-slate-900 relative flex items-center justify-center overflow-hidden">
        {/* Simulated Map Background Grid & Roads */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Simulated Road Lines */}
        <svg className="absolute inset-0 w-full h-full stroke-purple-500/40 stroke-2" fill="none">
          <path d="M 50 100 Q 150 250 300 400 T 500 600" strokeDasharray="6 6" />
        </svg>

        {/* Customer Location Marker */}
        <div className="absolute top-[60%] left-[65%] transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          <div className="bg-[#3B1C71] text-white px-2.5 py-1 rounded-xl shadow-xl text-[10px] font-extrabold flex items-center gap-1 mb-1 border border-purple-300">
            <MapPin className="w-3 h-3 text-[#F4C430]" /> Your Doorstep
          </div>
          <div className="w-8 h-8 rounded-full bg-[#3B1C71] text-white flex items-center justify-center border-2 border-white shadow-2xl animate-pulse">
            🏠
          </div>
        </div>

        {/* Moving Partner Marker */}
        <div className="absolute top-[35%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          <div className="bg-emerald-600 text-white px-2.5 py-1 rounded-xl shadow-xl text-[10px] font-extrabold flex items-center gap-1 mb-1 border border-emerald-400">
            <Navigation className="w-3 h-3 animate-spin" /> {booking.hero.name}
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-500 p-0.5 shadow-2xl border-2 border-white">
            <img
              src={booking.hero.avatar}
              alt={booking.hero.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Bottom Sheet Card */}
      <div className="bg-white rounded-t-3xl p-4 shadow-2xl border-t border-slate-200 z-30 space-y-4">
        {/* Prominent Start Job OTP Card */}
        <div className="bg-gradient-to-r from-[#3B1C71] to-[#5C2B90] text-white p-3.5 rounded-2xl flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F4C430] text-[#3B1C71] flex items-center justify-center font-black">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-purple-200 uppercase font-bold tracking-wider">Start Job OTP</div>
              <div className="text-xl font-heading font-black tracking-widest text-[#F4C430]">
                {booking.otp || '4892'}
              </div>
            </div>
          </div>

          <button
            onClick={handleCopyOtp}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-white transition-all"
          >
            {isCopied ? 'Copied! ✓' : 'Share Code'}
          </button>
        </div>

        {/* Partner Information */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <img
              src={booking.hero.avatar}
              alt={booking.hero.name}
              className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-heading font-bold text-sm text-slate-900">{booking.hero.name}</h4>
                <span className="bg-emerald-50 text-emerald-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                ★ {booking.hero.rating} ({booking.hero.jobsCompleted}+ jobs completed)
              </p>
              <p className="text-[10px] text-purple-700 font-bold mt-0.5">
                {booking.heroCurrentLocation?.address || '1.2 km away on 100ft Road'}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href={`tel:${booking.hero.phone}`}
              className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shadow-sm hover:bg-emerald-100 transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={onOpenChat}
              className="w-9 h-9 rounded-xl bg-purple-50 text-[#3B1C71] border border-purple-200 flex items-center justify-center shadow-sm hover:bg-purple-100 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="flex items-center justify-between text-xs text-slate-600">
          <div>
            <div className="font-bold text-slate-900">{booking.serviceName}</div>
            <div className="text-[11px] text-slate-500">{booking.address.street}</div>
          </div>
          <div className="text-right">
            <div className="font-extrabold text-[#3B1C71] text-sm">₹{booking.amount}</div>
            <div className="text-[10px] text-emerald-600 font-bold">{booking.paymentMethod}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
