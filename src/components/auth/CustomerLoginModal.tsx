import React, { useState } from 'react';
import { Smartphone, Check, X, ShieldCheck, MapPin, ArrowRight, User } from 'lucide-react';
import { CustomerAuthState, CityOption } from '../../types';
import { mockCities } from '../../data/mockData';

interface CustomerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  authState: CustomerAuthState;
  setAuthState: React.Dispatch<React.SetStateAction<CustomerAuthState>>;
}

export const CustomerLoginModal: React.FC<CustomerLoginModalProps> = ({
  isOpen,
  onClose,
  authState,
  setAuthState,
}) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'city'>('phone');
  const [phone, setPhone] = useState(authState.phone || '9988776655');
  const [name, setName] = useState(authState.name || 'Sacchin Chawla');
  const [otp, setOtp] = useState(['4', '8', '9', '2']);
  const [selectedCity, setSelectedCity] = useState(authState.selectedCity || 'Bengaluru');

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = () => {
    setStep('city');
  };

  const handleCompleteLogin = (city: string) => {
    setSelectedCity(city);
    setAuthState({
      isLoggedIn: true,
      phone: `+91 ${phone}`,
      name: name || 'Valued Customer',
      selectedCity: city,
      defaultAddress: `Indiranagar, ${city}`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
        {/* Urban Company Header */}
        <div className="bg-gradient-to-r from-[#3B1C71] to-[#6E3CBC] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#F4C430] text-[#3B1C71] font-black text-xs px-2.5 py-0.5 rounded-full tracking-wider uppercase">
              Urban Company
            </span>
            <span className="text-xs text-purple-200">Customer Access</span>
          </div>

          <h3 className="font-heading font-extrabold text-2xl tracking-tight">
            {step === 'phone' && 'Welcome to Urban Company'}
            {step === 'otp' && 'Enter Verification Code'}
            {step === 'city' && 'Select Your City'}
          </h3>
          <p className="text-xs text-purple-100 mt-1">
            {step === 'phone' && 'Log in or sign up to book top-rated home services in 30 minutes'}
            {step === 'otp' && `We sent a 4-digit code to +91 ${phone}`}
            {step === 'city' && 'Choose your city to unlock live partner availability & localized pricing'}
          </p>
        </div>

        {/* Step 1: Phone Input */}
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#6E3CBC] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
              <div className="flex gap-2">
                <div className="px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center">
                  +91 🇮🇳
                </div>
                <div className="relative flex-1">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10-digit mobile number"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 tracking-wider focus:outline-none focus:border-[#6E3CBC] transition-colors"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#3B1C71] text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-900/20 hover:bg-[#2F165A] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              Get Verification Code <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 justify-center text-[10px] text-slate-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Safe & Secure • No Spam Guarantee
            </div>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === 'otp' && (
          <div className="p-6 space-y-5 text-center">
            <div className="flex justify-center gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otp];
                    newOtp[idx] = e.target.value;
                    setOtp(newOtp);
                  }}
                  className="w-12 h-12 bg-slate-50 border-2 border-purple-200 rounded-xl text-center text-xl font-bold text-[#3B1C71] focus:border-[#6E3CBC] focus:outline-none"
                />
              ))}
            </div>

            <p className="text-xs text-slate-500">
              Demo OTP automatically filled (`4892`).
            </p>

            <button
              onClick={handleVerifyOtp}
              className="w-full py-3 bg-[#6E3CBC] text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-600/20 hover:bg-[#5B30A0] transition-all flex items-center justify-center gap-2"
            >
              Verify & Continue <Check className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 3: City Selector */}
        {step === 'city' && (
          <div className="p-6 space-y-4">
            <label className="block text-xs font-bold text-slate-700">Select City</label>
            <div className="grid grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
              {mockCities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleCompleteLogin(city.name)}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    selectedCity === city.name
                      ? 'border-[#3B1C71] bg-purple-50 text-[#3B1C71] font-bold shadow-sm'
                      : 'border-slate-200 hover:border-purple-300 text-slate-700 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    <span className="text-xs">{city.name}</span>
                  </div>
                  {city.popular && (
                    <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.5 rounded">
                      Popular
                    </span>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleCompleteLogin(selectedCity)}
              className="w-full py-3 bg-[#3B1C71] text-white font-bold text-sm rounded-xl hover:bg-[#2F165A] transition-all"
            >
              Confirm City & Start Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
