import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Navigation,
  Phone,
  MessageSquare,
  ShieldCheck,
  Clock,
  ChevronLeft,
  Key,
  Star,
  X,
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
  const [progress, setProgress] = useState(65); // 0 - 100 on route animation

  // Animate Hero location movement on simulated map
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 95 ? 65 : prev + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 bg-slate-900 text-white flex flex-col relative h-full">
      {/* Top Header Floating Controls */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between">
        <button
          onClick={onClose}
          className="bg-[#0D182A]/90 text-white p-2.5 rounded-full border border-slate-700 shadow-xl hover:bg-slate-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="bg-[#0D182A]/90 text-white px-3.5 py-1.5 rounded-full border border-slate-700 shadow-xl flex items-center gap-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-bold text-emerald-400">Hero Live Tracking</span>
        </div>

        <button
          onClick={onClose}
          className="bg-[#0D182A]/90 text-white p-2.5 rounded-full border border-slate-700 shadow-xl hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Interactive Simulated Google Map Canvas */}
      <div className="flex-1 bg-slate-950 relative overflow-hidden flex items-center justify-center">
        {/* Map Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(#94a3b8 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Map Road Mockup Vectors */}
        <svg className="absolute inset-0 w-full h-full stroke-slate-800 stroke-[12] fill-none">
          <path d="M 40 100 Q 180 250 200 400 T 360 700" />
          <path d="M 300 50 Q 200 300 80 600" />
        </svg>

        <svg className="absolute inset-0 w-full h-full stroke-amber-400/80 stroke-[4] fill-none stroke-dasharray-[8_4] animate-pulse">
          <path d="M 60 120 Q 180 250 200 400 T 280 580" />
        </svg>

        {/* Customer Location Pin (Home) */}
        <div className="absolute top-[68%] left-[68%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          <div className="bg-emerald-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-lg border border-white mb-1 whitespace-nowrap">
            Your Home (HSR Layout)
          </div>
          <div className="w-8 h-8 rounded-full bg-emerald-500/30 flex items-center justify-center animate-ping">
            <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-lg" />
          </div>
        </div>

        {/* Hero Provider Moving Pin */}
        <div
          className="absolute z-20 flex flex-col items-center transition-all duration-1000 ease-linear"
          style={{
            top: `${35 + (progress * 0.3)}%`,
            left: `${25 + (progress * 0.45)}%`,
          }}
        >
          <div className="bg-[#0D182A] text-white text-[10px] font-bold px-2.5 py-1 rounded-xl shadow-xl border border-[#F5C542] flex items-center gap-1.5 mb-1 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-[#F5C542] animate-pulse" />
            <span>{booking.hero.name} ({eta} mins)</span>
          </div>

          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-[#F5C542] shadow-2xl overflow-hidden bg-slate-900">
              <img
                src={booking.hero.avatar}
                alt={booking.hero.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#F5C542] text-[#0D182A] p-1 rounded-full shadow">
              <Navigation className="w-3 h-3 fill-[#0D182A]" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Live Status Sheet */}
      <div className="bg-[#0D182A] text-white rounded-t-3xl border-t border-slate-800 p-4 shadow-2xl z-30">
        <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-3" />

        {/* Status Header */}
        <div className="flex items-center justify-between mb-3 bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-[#F5C542] text-[#F5C542] flex items-center justify-center font-bold text-sm">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-bold text-sm text-white">Hero is En Route</div>
              <p className="text-xs text-slate-300">ETA ~ {eta} mins ({booking.heroCurrentLocation?.address})</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-medium">START OTP</span>
            <span className="font-heading font-extrabold text-base text-[#F5C542] tracking-wider bg-slate-900 px-2.5 py-0.5 rounded-lg border border-amber-500/30">
              {booking.otp}
            </span>
          </div>
        </div>

        {/* Hero Info & Quick Call/Chat */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={booking.hero.avatar}
              alt={booking.hero.name}
              className="w-12 h-12 rounded-2xl object-cover border border-slate-700"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-xs text-white">{booking.hero.name}</span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[9px] px-1.5 py-0.5 rounded-full font-bold flex items-center gap-0.5 border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300 mt-0.5">
                <span className="flex items-center text-amber-400 font-bold gap-0.5">
                  <Star className="w-3 h-3 fill-amber-400" /> {booking.hero.rating}
                </span>
                <span>•</span>
                <span>{booking.hero.category}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${booking.hero.phone}`}
              className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center hover:bg-slate-700 hover:text-white transition-colors"
              title="Call Hero"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
            </a>

            <button
              onClick={onOpenChat}
              className="w-10 h-10 rounded-2xl bg-[#F5C542] text-[#0D182A] flex items-center justify-center font-bold hover:bg-amber-300 transition-colors shadow-md"
              title="Chat with Hero"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
