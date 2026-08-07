import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Navigation,
  ShieldCheck,
  Star,
  CheckCircle2,
  XCircle,
  Phone,
  MessageSquare,
  ChevronRight,
  Sparkles,
  RotateCcw,
  Receipt,
  ArrowLeft,
} from 'lucide-react';
import { sampleBookings } from '../../data/mockData';
import { Booking, BookingStatus } from '../../types';

interface CustomerBookingsProps {
  onTrackHero: (booking: Booking) => void;
  onOpenChat: (booking: Booking) => void;
  onNewBooking: () => void;
}

export const CustomerBookings: React.FC<CustomerBookingsProps> = ({
  onTrackHero,
  onOpenChat,
  onNewBooking,
}) => {
  const [activeTab, setActiveTab] = useState<BookingStatus | 'all'>('all');
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<Booking | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'ongoing', label: 'Ongoing' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  const filteredBookings = sampleBookings.filter((b) => {
    if (activeTab === 'all') return true;
    return b.status === activeTab;
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'ongoing':
        return (
          <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" /> Hero En Route
          </span>
        );
      case 'upcoming':
        return (
          <span className="bg-blue-100 text-blue-900 border border-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3 text-blue-600" /> Scheduled
          </span>
        );
      case 'completed':
        return (
          <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="bg-rose-100 text-rose-900 border border-rose-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <XCircle className="w-3 h-3 text-rose-600" /> Cancelled
          </span>
        );
    }
  };

  return (
    <div className="flex-1 bg-[#F6F7F9] text-[#0D182A] pb-8">
      {/* Header */}
      <div className="bg-[#0D182A] text-white pt-4 pb-5 px-4 rounded-b-3xl shadow-lg">
        <h1 className="font-heading font-bold text-lg text-white">Your Bookings</h1>
        <p className="text-xs text-slate-300">Track active Heroes, review history & invoices</p>

        {/* Filter Tab Bar */}
        <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as BookingStatus | 'all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#F5C542] text-[#0D182A] shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center shadow-sm">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="font-heading font-bold text-sm text-[#0D182A]">No bookings found</h3>
            <p className="text-xs text-slate-500 mt-1">You don't have any bookings in this section.</p>
            <button
              onClick={onNewBooking}
              className="mt-4 bg-[#F5C542] text-[#0D182A] px-4 py-2 rounded-xl text-xs font-bold hover:bg-amber-300 transition-colors shadow-sm"
            >
              Book a Service Now
            </button>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:border-slate-300 transition-all"
            >
              {/* Card Top */}
              <div className="p-3.5 border-b border-slate-100 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      #{booking.id}
                    </span>
                    {getStatusBadge(booking.status)}
                  </div>
                  <h3 className="font-heading font-bold text-sm text-[#0D182A] mt-1">
                    {booking.serviceName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{booking.dateTime}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-heading font-extrabold text-sm text-[#0D182A]">
                    ₹{booking.amount}
                  </span>
                  <span className="text-[10px] text-emerald-600 block font-bold capitalize">
                    {booking.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Professional Profile Snippet */}
              <div className="p-3.5 bg-slate-50/70 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={booking.hero.avatar}
                    alt={booking.hero.name}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-heading font-bold text-xs text-[#0D182A]">
                        {booking.hero.name}
                      </span>
                      {booking.hero.verified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-700">{booking.hero.rating}</span>
                      <span>• {booking.hero.category}</span>
                    </div>
                  </div>
                </div>

                {booking.status === 'ongoing' && (
                  <div className="text-right">
                    <span className="text-[9px] text-slate-400 font-bold block">START OTP</span>
                    <span className="font-mono font-extrabold text-xs text-[#0D182A] bg-[#F5C542]/30 px-2 py-0.5 rounded border border-[#F5C542]">
                      {booking.otp}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-3 bg-white flex items-center justify-between gap-2 border-t border-slate-100">
                <button
                  onClick={() => setSelectedBookingForDetails(booking)}
                  className="text-xs font-bold text-slate-600 hover:text-[#0D182A] flex items-center gap-1 px-2 py-1"
                >
                  <Receipt className="w-3.5 h-3.5" /> Details
                </button>

                <div className="flex items-center gap-2">
                  {booking.status === 'ongoing' && (
                    <>
                      <button
                        onClick={() => onOpenChat(booking)}
                        className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                        title="Chat"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onTrackHero(booking)}
                        className="bg-[#F5C542] text-[#0D182A] px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-amber-300 transition-colors shadow-sm"
                      >
                        <Navigation className="w-3.5 h-3.5 fill-[#0D182A]" />
                        Track Your Hero
                      </button>
                    </>
                  )}

                  {booking.status === 'completed' && (
                    <button
                      onClick={onNewBooking}
                      className="bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-slate-800 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-[#F5C542]" /> Rebook
                    </button>
                  )}

                  {booking.status === 'upcoming' && (
                    <button
                      onClick={() => onTrackHero(booking)}
                      className="bg-[#0D182A] text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-slate-800 transition-colors"
                    >
                      View Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Booking Confirmation Card Slide-over Modal */}
      {selectedBookingForDetails && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <h3 className="font-heading font-bold text-base text-[#0D182A]">
                  Booking Confirmation
                </h3>
              </div>
              <button
                onClick={() => setSelectedBookingForDetails(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            {/* Verified Professional Card */}
            <div className="bg-[#0D182A] text-white p-4 rounded-2xl my-4 border border-slate-800 shadow-md">
              <div className="flex items-center gap-3">
                <img
                  src={selectedBookingForDetails.hero.avatar}
                  alt={selectedBookingForDetails.hero.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#F5C542]"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-bold text-sm text-white">
                      {selectedBookingForDetails.hero.name}
                    </span>
                    <span className="bg-[#F5C542] text-[#0D182A] text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">
                      Verified Professional
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-0.5">
                    {selectedBookingForDetails.hero.category} • {selectedBookingForDetails.hero.experienceYears} Years Exp
                  </p>

                  <div className="flex items-center gap-2 mt-1 text-xs text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{selectedBookingForDetails.hero.rating} Rating ({selectedBookingForDetails.hero.jobsCompleted} Jobs)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary List */}
            <div className="space-y-2.5 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Booking ID:</span>
                <span className="font-mono font-bold text-[#0D182A]">#{selectedBookingForDetails.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-bold text-[#0D182A]">{selectedBookingForDetails.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled Time:</span>
                <span className="font-bold text-[#0D182A]">{selectedBookingForDetails.dateTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service Address:</span>
                <span className="font-medium text-[#0D182A] text-right max-w-[200px] truncate">{selectedBookingForDetails.address.street}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Mode:</span>
                <span className="font-bold text-emerald-600">{selectedBookingForDetails.paymentMethod}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-extrabold text-[#0D182A]">
                <span>Total Paid:</span>
                <span className="text-[#0D182A]">₹{selectedBookingForDetails.amount}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedBookingForDetails(null)}
              className="w-full mt-4 bg-[#F5C542] text-[#0D182A] py-2.5 rounded-xl font-bold text-xs hover:bg-amber-300 transition-colors shadow-md"
            >
              Done & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
