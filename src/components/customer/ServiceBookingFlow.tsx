import React, { useState } from 'react';
import {
  X,
  Check,
  Clock,
  ShieldCheck,
  Star,
  Plus,
  Minus,
  MapPin,
  Calendar,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Smartphone,
} from 'lucide-react';
import { sampleServices, sampleHeroes } from '../../data/mockData';
import { Booking, HomeService } from '../../types';

interface ServiceBookingFlowProps {
  onBookingComplete: (newBooking: Booking) => void;
  onCancel: () => void;
}

export const ServiceBookingFlow: React.FC<ServiceBookingFlowProps> = ({
  onBookingComplete,
  onCancel,
}) => {
  const [selectedService, setSelectedService] = useState<HomeService>(sampleServices[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [step, setStep] = useState<'customize' | 'slot' | 'payment'>('customize');

  // Slot Selection
  const [selectedDay, setSelectedDay] = useState<'Today' | 'Tomorrow' | 'Day After'>('Today');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('4:30 PM');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cash'>('upi');

  // Address
  const [streetAddress, setStreetAddress] = useState('Flat 402, Sunshine Residency, 12th Main Road, Indiranagar');

  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  // Pricing calculation
  const addonsCost = selectedService.aiAddons
    .filter((a) => selectedAddons.includes(a.id))
    .reduce((sum, item) => sum + item.price, 0);

  const subtotal = selectedService.price + addonsCost;
  const taxes = Math.round(subtotal * 0.18);
  const totalAmount = subtotal + taxes;

  const handleConfirmBooking = () => {
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const newBooking: Booking = {
      id: `UC-${Math.floor(10000 + Math.random() * 90000)}`,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      categoryName: selectedService.categoryId,
      hero: sampleHeroes[0],
      customerName: 'Sacchin Chawla',
      customerPhone: '+91 99887 76655',
      address: {
        label: 'Home',
        street: streetAddress,
        city: 'Bengaluru',
        pincode: '560038',
      },
      dateTime: `${selectedDay}, ${selectedTimeSlot}`,
      status: 'ongoing',
      partnerStep: 'navigating',
      amount: totalAmount,
      paymentMethod: paymentMethod === 'upi' ? 'Paid via UPI' : 'Pay via Cash / UPI after service',
      paymentStatus: paymentMethod === 'upi' ? 'paid' : 'pending',
      otp: generatedOtp,
      heroCurrentLocation: {
        lat: 12.9725,
        lng: 77.5955,
        address: 'En route via 100ft Road (1.5 km away)',
        etaMinutes: 10,
      },
      notes: 'Urban Company verified partner dispatched.',
      createdAt: 'Just now',
    };

    onBookingComplete(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Urban Company Header */}
        <div className="bg-[#3B1C71] text-white p-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="bg-[#F4C430] text-[#3B1C71] font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase">
                Urban Company Checkout
              </span>
              <span className="text-xs text-purple-200">Step {step === 'customize' ? '1/3' : step === 'slot' ? '2/3' : '3/3'}</span>
            </div>
            <h3 className="font-heading font-extrabold text-base text-white mt-0.5">
              {selectedService.name}
            </h3>
          </div>
          <button
            onClick={onCancel}
            className="p-1 text-white/80 hover:text-white rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {/* STEP 1: CUSTOMIZE PACKAGE & ADD-ONS */}
          {step === 'customize' && (
            <div className="space-y-4">
              <div className="bg-purple-50 p-3 rounded-2xl border border-purple-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#3B1C71] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold text-[#3B1C71]">30-Day Urban Company Warranty</h4>
                  <p className="text-[11px] text-purple-900/80 mt-0.5">
                    Background-verified partners, anti-bacterial foam treatment & free revisit protection.
                  </p>
                </div>
              </div>

              {/* Service Included Items */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">What is included in this service:</h4>
                <div className="space-y-1.5">
                  {selectedService.includes.map((inc, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Add-ons */}
              <div>
                <h4 className="text-xs font-extrabold text-slate-800 mb-2 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#F4C430]" /> Recommended Service Add-ons
                </h4>

                <div className="space-y-2">
                  {selectedService.aiAddons.map((addon) => {
                    const isAdded = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                          isAdded
                            ? 'border-[#3B1C71] bg-purple-50/70 shadow-sm'
                            : 'border-slate-200 hover:border-purple-200 bg-slate-50/50'
                        }`}
                      >
                        <div className="pr-2">
                          <div className="font-bold text-xs text-slate-900">{addon.title}</div>
                          <div className="text-[10px] text-purple-700 font-medium mt-0.5">
                            💡 {addon.recommendedReason}
                          </div>
                          <div className="text-xs font-extrabold text-[#3B1C71] mt-1">+ ₹{addon.price}</div>
                        </div>

                        <button
                          type="button"
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs transition-colors ${
                            isAdded ? 'bg-[#3B1C71] text-white' : 'bg-white border border-slate-300 text-slate-700'
                          }`}
                        >
                          {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: TIME SLOT & ADDRESS */}
          {step === 'slot' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-purple-700" /> Select Date
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Today', 'Tomorrow', 'Day After'] as const).map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                        selectedDay === day
                          ? 'border-[#3B1C71] bg-[#3B1C71] text-white shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-purple-200'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-purple-700" /> Select Time Slot
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['10:00 AM', '1:30 PM', '4:30 PM', '6:00 PM', '7:30 PM'].map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                        selectedTimeSlot === slot
                          ? 'border-[#3B1C71] bg-purple-50 text-[#3B1C71] shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-purple-200'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-purple-700" /> Doorstep Delivery Address
                </label>
                <input
                  type="text"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#3B1C71]"
                />
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT & CONFIRMATION */}
          {step === 'payment' && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Base Service Fee</span>
                  <span>₹{selectedService.price}</span>
                </div>
                {addonsCost > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Add-ons ({selectedAddons.length})</span>
                    <span>+ ₹{addonsCost}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Taxes & Hygiene Kit</span>
                  <span>₹{taxes}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-[#3B1C71]">
                  <span>Total Payable</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">Select Payment Method</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#3B1C71] bg-purple-50 text-[#3B1C71] font-bold'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-purple-700" />
                      <span className="text-xs">Instant Pay via UPI (GPay / PhonePe)</span>
                    </div>
                    {paymentMethod === 'upi' && <Check className="w-4 h-4 text-[#3B1C71]" />}
                  </button>

                  <button
                    onClick={() => setPaymentMethod('cash')}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === 'cash'
                        ? 'border-[#3B1C71] bg-purple-50 text-[#3B1C71] font-bold'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-purple-700" />
                      <span className="text-xs">Pay via Cash / QR after service completion</span>
                    </div>
                    {paymentMethod === 'cash' && <Check className="w-4 h-4 text-[#3B1C71]" />}
                  </button>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-[11px] text-amber-900 font-medium">
                🔒 You will receive a 4-digit **Start Job OTP** upon booking confirmation. Provide this code to the technician on arrival.
              </div>
            </div>
          )}
        </div>

        {/* Bottom Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-500 font-bold uppercase">Total Amount</div>
            <div className="text-base font-extrabold text-[#3B1C71]">₹{totalAmount}</div>
          </div>

          <div className="flex gap-2">
            {step !== 'customize' && (
              <button
                onClick={() => setStep(step === 'payment' ? 'slot' : 'customize')}
                className="px-4 py-2.5 bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Back
              </button>
            )}

            {step === 'customize' && (
              <button
                onClick={() => setStep('slot')}
                className="px-5 py-2.5 bg-[#3B1C71] text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-900/20 hover:bg-[#2F165A] flex items-center gap-1.5"
              >
                Select Slot <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {step === 'slot' && (
              <button
                onClick={() => setStep('payment')}
                className="px-5 py-2.5 bg-[#3B1C71] text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-900/20 hover:bg-[#2F165A] flex items-center gap-1.5"
              >
                Proceed to Payment <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {step === 'payment' && (
              <button
                onClick={handleConfirmBooking}
                className="px-5 py-2.5 bg-[#F4C430] text-[#3B1C71] text-xs font-extrabold rounded-xl shadow-lg shadow-amber-400/20 hover:bg-amber-300 flex items-center gap-1.5"
              >
                Confirm & Dispatch Partner <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
