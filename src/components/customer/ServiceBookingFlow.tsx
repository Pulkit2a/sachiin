import React, { useState } from 'react';
import {
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Star,
  Plus,
  Check,
  ArrowRight,
  PlusCircle,
  QrCode,
  Lock,
} from 'lucide-react';
import { homeServices, sampleHeroes, sampleUserProfile } from '../../data/mockData';
import { HomeService, Booking } from '../../types';

interface ServiceBookingFlowProps {
  initialCategoryId?: string;
  onBookingComplete: (booking: Booking) => void;
  onCancel: () => void;
}

export const ServiceBookingFlow: React.FC<ServiceBookingFlowProps> = ({
  initialCategoryId = 'ac_repair',
  onBookingComplete,
  onCancel,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Selected Service
  const [selectedService, setSelectedService] = useState<HomeService>(homeServices[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['gas_topup']);

  // Date & Time
  const [selectedDate, setSelectedDate] = useState('Today, 02:30 PM');
  const [timeSlot, setTimeSlot] = useState('02:30 PM');

  // Address
  const [selectedAddressId, setSelectedAddressId] = useState('addr_1');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'phonepe' | 'gpay' | 'card' | 'wallet'>('phonepe');

  // Hero Matching
  const hero = sampleHeroes[0];

  const handleToggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const calculateTotal = () => {
    let total = selectedService.price;
    selectedService.aiAddons.forEach((addon) => {
      if (selectedAddons.includes(addon.id)) {
        total += addon.price;
      }
    });
    return total;
  };

  const handleConfirmAndPay = () => {
    const newBooking: Booking = {
      id: `HH-${Math.floor(8000 + Math.random() * 1000)}`,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      categoryName: selectedService.categoryId === 'ac_repair' ? 'AC Repair' : 'Home Service',
      hero: hero,
      customerName: sampleUserProfile.name,
      customerPhone: sampleUserProfile.phone,
      address: {
        label: 'Home',
        street: '#402, Sunshine Apartments, HSR Layout, Sector 1',
        city: 'Bengaluru',
        pincode: '560102',
      },
      dateTime: selectedDate,
      status: 'ongoing',
      amount: calculateTotal(),
      paymentMethod: paymentMethod === 'phonepe' ? 'PhonePe UPI' : paymentMethod === 'gpay' ? 'Google Pay' : 'Credit Card',
      paymentStatus: 'paid',
      otp: `${Math.floor(1000 + Math.random() * 9000)}`,
      heroCurrentLocation: {
        lat: 12.915,
        lng: 77.64,
        address: 'HSR 2nd Sector Flyover (1.2 km away)',
        etaMinutes: 8,
      },
      createdAt: new Date().toISOString(),
    };

    setStep(5);
    setTimeout(() => {
      onBookingComplete(newBooking);
    }, 1500);
  };

  return (
    <div className="flex-1 bg-[#F6F7F9] text-[#0D182A] flex flex-col h-full">
      {/* Top Header */}
      <div className="bg-[#0D182A] text-white p-4 flex items-center justify-between border-b border-slate-800">
        <button
          onClick={() => (step > 1 ? setStep((prev) => (prev - 1) as any) : onCancel())}
          className="p-1.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h2 className="font-heading font-bold text-sm text-white">Book Home Service</h2>
          <span className="text-[10px] text-[#F5C542] font-semibold">Step {step} of 4</span>
        </div>

        <button onClick={onCancel} className="text-xs text-slate-400 font-bold hover:text-white">
          Cancel
        </button>
      </div>

      {/* Progress Steps Indicator */}
      <div className="bg-slate-900 px-4 py-2 flex items-center justify-between text-[10px] border-b border-slate-800 text-slate-400">
        <span className={step >= 1 ? 'text-[#F5C542] font-bold' : ''}>1. Service</span>
        <span>→</span>
        <span className={step >= 2 ? 'text-[#F5C542] font-bold' : ''}>2. Slot</span>
        <span>→</span>
        <span className={step >= 3 ? 'text-[#F5C542] font-bold' : ''}>3. Address</span>
        <span>→</span>
        <span className={step >= 4 ? 'text-[#F5C542] font-bold' : ''}>4. Payment</span>
      </div>

      {/* Step Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {step === 1 && (
          <div className="space-y-4">
            {/* Service Selection */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-[10px] uppercase font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                Most Popular
              </span>
              <h3 className="font-heading font-bold text-base text-[#0D182A] mt-2">
                {selectedService.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{selectedService.description}</p>

              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                <span className="font-heading font-extrabold text-lg text-[#0D182A]">
                  ₹{selectedService.price}
                </span>
                {selectedService.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    ₹{selectedService.originalPrice}
                  </span>
                )}
                <span className="text-xs text-emerald-600 font-bold ml-auto bg-emerald-50 px-2 py-0.5 rounded">
                  30% OFF
                </span>
              </div>
            </div>

            {/* AI Suggested Add-ons */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4 text-[#F5C542]" />
                <h4 className="font-heading font-bold text-xs text-[#0D182A]">
                  AI Suggested Maintenance Add-ons
                </h4>
              </div>

              <div className="space-y-2">
                {selectedService.aiAddons.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);

                  return (
                    <div
                      key={addon.id}
                      onClick={() => handleToggleAddon(addon.id)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'bg-amber-50/80 border-[#F5C542] shadow-sm'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-lg mt-0.5 flex items-center justify-center border transition-colors ${
                          isSelected
                            ? 'bg-[#F5C542] border-[#F5C542] text-[#0D182A]'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#0D182A]">{addon.title}</span>
                          <span className="font-extrabold text-xs text-[#0D182A]">+₹{addon.price}</span>
                        </div>
                        <p className="text-[10px] text-amber-800 mt-0.5 font-medium">
                          💡 {addon.recommendedReason}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-[#F5C542] text-[#0D182A] py-3 rounded-2xl font-bold text-xs hover:bg-amber-300 transition-colors shadow-md flex items-center justify-center gap-1.5 mt-4"
            >
              Continue to Date & Slot <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-sm text-[#0D182A]">
              Select Service Date & Time
            </h3>

            {/* Date Selector */}
            <div className="grid grid-cols-3 gap-2">
              {['Today, 07 Aug', 'Tomorrow, 08 Aug', 'Saturday, 09 Aug'].map((d, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDate(d)}
                  className={`p-3 rounded-2xl border text-center text-xs font-bold transition-all ${
                    selectedDate.includes(d.split(',')[0])
                      ? 'bg-[#0D182A] text-white border-[#0D182A] shadow-md'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Calendar className="w-4 h-4 mx-auto mb-1 text-[#F5C542]" />
                  {d}
                </button>
              ))}
            </div>

            {/* Time Slots */}
            <div>
              <h4 className="font-heading font-bold text-xs text-slate-600 mb-2">Available Slots</h4>
              <div className="grid grid-cols-3 gap-2">
                {['10:00 AM', '02:30 PM', '05:00 PM', '07:30 PM'].map((slot, i) => (
                  <button
                    key={i}
                    onClick={() => setTimeSlot(slot)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                      timeSlot === slot
                        ? 'bg-[#F5C542] text-[#0D182A] border-[#F5C542] font-bold shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full bg-[#F5C542] text-[#0D182A] py-3 rounded-2xl font-bold text-xs hover:bg-amber-300 transition-colors shadow-md flex items-center justify-center gap-1.5 mt-6"
            >
              Select Address <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-sm text-[#0D182A]">Select Service Address</h3>

            <div className="space-y-2">
              {sampleUserProfile.savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => setSelectedAddressId(addr.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    selectedAddressId === addr.id
                      ? 'bg-amber-50 border-[#F5C542] shadow-sm'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <MapPin className="w-5 h-5 text-[#F5C542] mt-0.5" />
                  <div className="flex-1">
                    <span className="font-bold text-xs text-[#0D182A]">{addr.type}</span>
                    <p className="text-xs text-slate-600 mt-0.5">{addr.address}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Map Location Pin Preview */}
            <div className="bg-slate-900 rounded-2xl p-3 border border-slate-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-medium">Map pin verified (HSR Sector 1)</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Exact Location GPS
              </span>
            </div>

            <button
              onClick={() => setStep(4)}
              className="w-full bg-[#F5C542] text-[#0D182A] py-3 rounded-2xl font-bold text-xs hover:bg-amber-300 transition-colors shadow-md flex items-center justify-center gap-1.5 mt-6"
            >
              Proceed to Payment <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-sm text-[#0D182A]">Choose Payment Method</h3>

            <div className="space-y-2">
              {[
                { id: 'phonepe', name: 'PhonePe UPI', badge: 'Instant 5% Cashback' },
                { id: 'gpay', name: 'Google Pay UPI', badge: 'Fastest' },
                { id: 'card', name: 'Credit / Debit Card (Razorpay)', badge: 'Visa/Master' },
                { id: 'wallet', name: 'Hero Wallet Balance (₹1,240)', badge: 'Instant Auto-Pay' },
              ].map((pm) => (
                <div
                  key={pm.id}
                  onClick={() => setPaymentMethod(pm.id as any)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === pm.id
                      ? 'bg-[#0D182A] text-white border-[#0D182A] shadow-md'
                      : 'bg-white text-slate-800 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <QrCode className="w-5 h-5 text-[#F5C542]" />
                    <div>
                      <span className="font-bold text-xs">{pm.name}</span>
                      <span className="text-[10px] text-slate-400 block">{pm.badge}</span>
                    </div>
                  </div>

                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === pm.id ? 'border-[#F5C542] bg-[#F5C542]' : 'border-slate-300'
                    }`}
                  >
                    {paymentMethod === pm.id && <div className="w-1.5 h-1.5 rounded-full bg-[#0D182A]" />}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Calculation */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Base Service Fee:</span>
                <span>₹{selectedService.price}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>AI Add-ons:</span>
                <span>₹{calculateTotal() - selectedService.price}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Safety & Insurance Fee:</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-extrabold text-sm text-[#0D182A]">
                <span>Total Amount:</span>
                <span>₹{calculateTotal()}</span>
              </div>
            </div>

            <button
              onClick={handleConfirmAndPay}
              className="w-full bg-[#F5C542] text-[#0D182A] py-3.5 rounded-2xl font-extrabold text-xs hover:bg-amber-300 transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Pay ₹{calculateTotal()} & Book Instantly
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="text-center py-12 space-y-3">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#0D182A]">Booking Confirmed!</h3>
            <p className="text-xs text-slate-500">Matching nearby verified Hero professional...</p>
          </div>
        )}
      </div>
    </div>
  );
};
