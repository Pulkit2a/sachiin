import React, { useState } from 'react';
import {
  User,
  MapPin,
  CreditCard,
  Settings,
  HelpCircle,
  Shield,
  Bell,
  LogOut,
  ChevronRight,
  Edit2,
  Check,
  Plus,
} from 'lucide-react';
import { sampleUserProfile } from '../../data/mockData';

export const CustomerProfile: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'profile' | 'addresses' | 'payments' | 'settings' | 'help'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(sampleUserProfile.name);
  const [userPhone, setUserPhone] = useState(sampleUserProfile.phone);

  return (
    <div className="flex-1 bg-[#F6F7F9] text-[#0D182A] pb-8">
      {/* Top Profile Header */}
      <div className="bg-[#0D182A] text-white pt-4 pb-6 px-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3">
          <img
            src={sampleUserProfile.avatar}
            alt={sampleUserProfile.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#F5C542] shadow-md"
          />

          <div className="flex-1 min-w-0">
            <h1 className="font-heading font-bold text-base text-white truncate">
              {userName}
            </h1>
            <p className="text-xs text-slate-300">{sampleUserProfile.email}</p>
            <p className="text-xs text-slate-400 mt-0.5">{userPhone}</p>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-slate-800 text-[#F5C542] p-2 rounded-xl hover:bg-slate-700 transition-colors"
            title="Edit Profile"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Menu Tabs */}
        <div className="flex items-center gap-1 mt-4 bg-slate-900 p-1 rounded-2xl border border-slate-800 text-[10px] overflow-x-auto scrollbar-none">
          {[
            { id: 'profile', label: 'My Info' },
            { id: 'addresses', label: 'Addresses' },
            { id: 'payments', label: 'Payments' },
            { id: 'settings', label: 'Settings' },
            { id: 'help', label: 'Help' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as any)}
              className={`flex-1 py-1.5 px-2 rounded-xl font-bold whitespace-nowrap transition-all text-center ${
                activeSection === item.id ? 'bg-[#F5C542] text-[#0D182A]' : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* EDIT PROFILE MODAL / SECTION */}
        {isEditing && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-heading font-bold text-xs text-[#0D182A]">Edit Details</h3>
            <div>
              <label className="text-[10px] text-slate-500 font-bold block mb-1">Full Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-2 text-xs font-bold text-[#0D182A]"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 font-bold block mb-1">Mobile Number</label>
              <input
                type="text"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-2 text-xs font-bold text-[#0D182A]"
              />
            </div>
            <button
              onClick={() => setIsEditing(false)}
              className="w-full bg-[#0D182A] text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1"
            >
              <Check className="w-3.5 h-3.5 text-emerald-400" /> Save Profile
            </button>
          </div>
        )}

        {/* SECTION 1: MY INFO */}
        {activeSection === 'profile' && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Lifetime Savings</span>
                <span className="font-extrabold text-emerald-600">₹{sampleUserProfile.totalSavings}</span>
              </div>
              <div className="flex justify-between items-center text-xs border-t border-slate-100 pt-2">
                <span className="text-slate-500 font-medium">Hero Gold Membership</span>
                <span className="font-bold text-[#0D182A]">Active</span>
              </div>
              <div className="flex justify-between items-center text-xs border-t border-slate-100 pt-2">
                <span className="text-slate-500 font-medium">GDPR & Data Privacy</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Encrypted
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: SAVED ADDRESSES */}
        {activeSection === 'addresses' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-xs text-[#0D182A]">Your Saved Addresses</h3>
              <button className="text-xs text-[#0D182A] font-bold flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add New
              </button>
            </div>

            {sampleUserProfile.savedAddresses.map((addr) => (
              <div
                key={addr.id}
                className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3"
              >
                <MapPin className="w-5 h-5 text-[#F5C542] mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#0D182A]">{addr.type}</span>
                    {addr.isDefault && (
                      <span className="bg-emerald-100 text-emerald-900 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{addr.address}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SECTION 3: PAYMENT METHODS */}
        {activeSection === 'payments' && (
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-xs text-[#0D182A]">Linked Payment Methods</h3>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  <div>
                    <span className="font-bold text-xs text-[#0D182A]">PhonePe & Google Pay UPI</span>
                    <span className="text-[10px] text-slate-400 block">Autopay Enabled for Hero Services</span>
                  </div>
                </div>
                <span className="text-emerald-600 font-bold text-xs">Linked</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <div>
                    <span className="font-bold text-xs text-[#0D182A]">HDFC Credit Card (•••• 8912)</span>
                    <span className="text-[10px] text-slate-400 block">Saved in Razorpay Vault</span>
                  </div>
                </div>
                <span className="text-slate-400 text-xs font-bold">Manage</span>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: SETTINGS */}
        {activeSection === 'settings' && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-heading font-bold text-xs text-[#0D182A]">App Settings</h3>

            <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs">
              <span className="font-medium text-slate-700">Push Notifications & SMS Alerts</span>
              <input type="checkbox" defaultChecked className="accent-[#0D182A]" />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs">
              <span className="font-medium text-slate-700">GDPR & Marketing Consent</span>
              <input type="checkbox" defaultChecked className="accent-[#0D182A]" />
            </div>

            <button className="w-full text-left py-2 text-rose-600 font-bold text-xs flex items-center justify-between">
              <span className="flex items-center gap-1.5"><LogOut className="w-4 h-4" /> Log Out</span>
            </button>
          </div>
        )}

        {/* SECTION 5: HELP & SUPPORT */}
        {activeSection === 'help' && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-heading font-bold text-xs text-[#0D182A]">Help & Support 24/7</h3>
            <p className="text-xs text-slate-500">Need help with a recent service or invoice?</p>

            <button className="w-full bg-[#0D182A] text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#F5C542]" /> Raise Support Ticket
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
