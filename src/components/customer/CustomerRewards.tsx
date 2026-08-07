import React, { useState } from 'react';
import {
  Award,
  Gift,
  Share2,
  Copy,
  Check,
  Percent,
  Sparkles,
  ChevronRight,
  Zap,
  Crown,
  Tag,
} from 'lucide-react';
import { sampleUserProfile, sampleCoupons } from '../../data/mockData';

export const CustomerRewards: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="flex-1 bg-[#F6F7F9] text-[#0D182A] pb-8">
      {/* Top Header */}
      <div className="bg-[#0D182A] text-white pt-4 pb-6 px-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-heading font-bold text-lg text-white">Hero Rewards</h1>
          <span className="text-xs bg-[#F5C542] text-[#0D182A] font-extrabold px-2.5 py-0.5 rounded-full">
            Tier Benefits
          </span>
        </div>
        <p className="text-xs text-slate-300">Earn 1 Hero Point for every ₹10 spent on bookings</p>
      </div>

      <div className="px-4 -mt-4 space-y-4">
        {/* Membership Tier Card */}
        <div className="bg-gradient-to-tr from-[#0D182A] via-slate-900 to-amber-950 text-white p-4 rounded-2xl border border-amber-500/40 shadow-xl relative overflow-hidden">
          <Crown className="w-20 h-20 text-[#F5C542]/10 absolute -right-2 -bottom-2 pointer-events-none" />

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#F5C542] text-[#0D182A] flex items-center justify-center font-black">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-sm text-[#F5C542]">
                  {sampleUserProfile.membershipTier} Member
                </span>
                <span className="text-[10px] text-slate-300 block">VIP Priority Dispatch Active</span>
              </div>
            </div>

            <div className="text-right">
              <span className="font-heading font-extrabold text-lg text-[#F5C542]">
                {sampleUserProfile.rewardPoints}
              </span>
              <span className="text-[9px] text-slate-400 block font-bold uppercase">Points Balance</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="flex justify-between text-[10px] text-slate-300 mb-1">
              <span>Gold Tier</span>
              <span>550 pts to Platinum Tier</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-[#F5C542] to-amber-300 h-full rounded-full transition-all duration-500"
                style={{ width: `${sampleUserProfile.membershipTierProgress}%` }}
              />
            </div>
          </div>

          {/* Perks Row */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-300 text-center">
            <div>
              <span className="font-bold text-white block">FREE Cancellation</span>
              <span className="text-slate-400">Up to 2 hrs before</span>
            </div>
            <div className="border-x border-slate-800">
              <span className="font-bold text-[#F5C542] block">10% Extra Cashback</span>
              <span className="text-slate-400">On all AC services</span>
            </div>
            <div>
              <span className="font-bold text-white block">Dedicated Support</span>
              <span className="text-slate-400">Direct VIP Hotline</span>
            </div>
          </div>
        </div>

        {/* Referral Program Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-[#F5C542]" />
            <div>
              <h3 className="font-heading font-bold text-sm text-[#0D182A]">
                Invite Friends & Earn ₹500
              </h3>
              <p className="text-xs text-slate-500">Give ₹200 to friends, earn ₹500 on their 1st booking</p>
            </div>
          </div>

          {/* Code Box */}
          <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-dashed border-slate-300">
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">YOUR REFERRAL CODE</span>
              <span className="font-mono font-extrabold text-sm text-[#0D182A]">
                {sampleUserProfile.referralCode}
              </span>
            </div>

            <button
              onClick={() => handleCopyCode(sampleUserProfile.referralCode)}
              className="bg-[#0D182A] text-[#F5C542] px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-slate-800 transition-colors shadow-sm"
            >
              {copiedCode === sampleUserProfile.referralCode ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Code
                </>
              )}
            </button>
          </div>
        </div>

        {/* Available Coupons */}
        <div>
          <h3 className="font-heading font-bold text-sm text-[#0D182A] mb-3 flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-[#F5C542]" />
            Exclusive Coupons & Vouchers
          </h3>

          <div className="space-y-3">
            {sampleCoupons.map((coupon, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm flex items-center justify-between hover:border-[#F5C542] transition-all"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-extrabold text-[#0D182A] bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                      {coupon.code}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Valid till {coupon.validTill}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-xs text-[#0D182A] mt-1">{coupon.title}</h4>
                  <p className="text-[11px] text-emerald-600 font-semibold">{coupon.discountText}</p>
                </div>

                <button
                  onClick={() => handleCopyCode(coupon.code)}
                  className="bg-[#0D182A] text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  {copiedCode === coupon.code ? 'Applied ✓' : 'Apply'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
