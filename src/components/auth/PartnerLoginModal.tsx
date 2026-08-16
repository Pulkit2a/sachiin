import React, { useState } from 'react';
import { Wrench, ShieldCheck, Check, X, Award, FileText, ArrowRight, User } from 'lucide-react';
import { PartnerAuthState } from '../../types';

interface PartnerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  partnerAuth: PartnerAuthState;
  setPartnerAuth: React.Dispatch<React.SetStateAction<PartnerAuthState>>;
}

export const PartnerLoginModal: React.FC<PartnerLoginModalProps> = ({
  isOpen,
  onClose,
  partnerAuth,
  setPartnerAuth,
}) => {
  const [partnerId, setPartnerId] = useState(partnerAuth.partnerId || 'UC-PARTNER-789');
  const [name, setName] = useState(partnerAuth.name || 'Ramesh Kumar');
  const [phone, setPhone] = useState(partnerAuth.phone || '9876543210');
  const [category, setCategory] = useState(partnerAuth.category || 'AC & Appliance Repair');

  if (!isOpen) return null;

  const handlePartnerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerAuth({
      isLoggedIn: true,
      partnerId: partnerId || `UC-P-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      phone: `+91 ${phone}`,
      category,
      rating: 4.94,
      isOnline: true,
      kycStatus: 'verified',
      completedJobsCount: 1480,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0F172A] text-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-800 flex flex-col">
        {/* UC Partner Header */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-6 text-slate-950 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-950/80 hover:text-slate-950 p-1 rounded-full hover:bg-black/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="bg-slate-950 text-amber-400 font-extrabold text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wider">
              UC Partner App
            </span>
            <span className="text-xs font-bold text-slate-900">Service Provider Portal</span>
          </div>

          <h3 className="font-heading font-extrabold text-2xl tracking-tight text-slate-950">
            Technician & Partner Login
          </h3>
          <p className="text-xs font-medium text-slate-900/80 mt-1">
            Access daily job requests, instant payouts, turn-by-turn navigation & verified customer OTPs
          </p>
        </div>

        {/* Partner Form */}
        <form onSubmit={handlePartnerLogin} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Partner Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name as per Aadhar / ID"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Registered Partner Mobile Number</label>
            <div className="flex gap-2">
              <div className="px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-slate-400 flex items-center">
                +91 🇮🇳
              </div>
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="10-digit registered number"
                required
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Primary Skill Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-amber-400"
            >
              <option value="AC & Appliance Repair">AC & Appliance Repair</option>
              <option value="Salon & Spa for Women">Salon & Spa for Women</option>
              <option value="Men's Salon & Grooming">Men's Salon & Grooming</option>
              <option value="Cleaning & Pest Control">Cleaning & Pest Control</option>
              <option value="Electrician Services">Electrician Services</option>
              <option value="Plumber Services">Plumber Services</option>
              <option value="Carpenter Services">Carpenter Services</option>
              <option value="Home Painting & Waterproofing">Home Painting & Waterproofing</option>
            </select>
          </div>

          <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="font-bold text-emerald-300">KYC Status: Verified</div>
                <div className="text-[10px] text-emerald-400/80">Background checked & skill certified</div>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">
              Active Partner
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-amber-400/10 hover:bg-amber-300 transition-all flex items-center justify-center gap-2"
          >
            Launch Partner Dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
