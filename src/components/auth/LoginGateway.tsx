import React, { useState } from 'react';
import { User, Wrench, ShieldCheck, Lock, Smartphone, Mail, KeyRound, MapPin, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { apiClient } from '../../api/client';
import { mockCities } from '../../data/mockData';

interface LoginGatewayProps {
  onLoginSuccess: (user: any, role: 'customer' | 'hero' | 'admin') => void;
}

export const LoginGateway: React.FC<LoginGatewayProps> = ({ onLoginSuccess }) => {
  const [activePortal, setActivePortal] = useState<'customer' | 'technician' | 'admin'>('customer');
  const [isRegistering, setIsRegistering] = useState(false);

  // Form Fields
  const [identifier, setIdentifier] = useState('sacchin@example.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [category, setCategory] = useState('AC & Appliance Repair');

  // Status & Errors
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePortalSwitch = (portal: 'customer' | 'technician' | 'admin') => {
    setActivePortal(portal);
    setErrorMsg('');
    setIsRegistering(false);
    if (portal === 'customer') {
      setIdentifier('sacchin@example.com');
      setPassword('password123');
    } else if (portal === 'technician') {
      setIdentifier('9876543210');
      setPassword('partner123');
    } else {
      setIdentifier('admin@heroshomes.com');
      setPassword('admin123');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isRegistering) {
        // Registration Flow
        const regRes = await apiClient.register({
          name,
          phone,
          email,
          password,
          city,
          category: activePortal === 'technician' ? category : undefined,
          role: activePortal === 'technician' ? 'technician' : 'customer',
        });

        if (regRes.success) {
          onLoginSuccess(
            regRes.user,
            activePortal === 'technician' ? 'hero' : 'customer'
          );
        }
      } else {
        // Login Flow
        const loginRes = await apiClient.login({
          identifier,
          password,
          role: activePortal === 'technician' ? 'technician' : activePortal === 'admin' ? 'admin' : 'customer',
        });

        if (loginRes.success) {
          onLoginSuccess(
            loginRes.user,
            activePortal === 'technician' ? 'hero' : activePortal === 'admin' ? 'admin' : 'customer'
          );
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090D16] via-[#0F172A] to-[#1E1B4B] text-white flex flex-col items-center justify-center p-4 font-sans selection:bg-[#F4C430] selection:text-[#3B1C71]">
      {/* Brand Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#3B1C71] to-[#6E3CBC] border-2 border-purple-400 flex items-center justify-center text-[#F4C430] font-black text-2xl shadow-2xl mx-auto mb-3">
          HH
        </div>
        <h1 className="font-heading font-black text-3xl tracking-tight text-white">Heros Homes</h1>
        <p className="text-sm text-purple-200 mt-1 font-medium">Home Services & Partner Platform</p>
      </div>

      {/* Main Authentication Card */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl">
        {/* Portal Switcher Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-slate-900/90 p-1.5 border-b border-slate-800 text-xs font-bold">
          <button
            onClick={() => handlePortalSwitch('customer')}
            className={`py-3 rounded-2xl flex items-center justify-center gap-1.5 transition-all ${
              activePortal === 'customer'
                ? 'bg-[#3B1C71] text-white font-extrabold shadow-lg shadow-purple-950/50 border border-purple-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4 text-[#F4C430]" /> Customer
          </button>

          <button
            onClick={() => handlePortalSwitch('technician')}
            className={`py-3 rounded-2xl flex items-center justify-center gap-1.5 transition-all ${
              activePortal === 'technician'
                ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wrench className="w-4 h-4" /> Partner
          </button>

          <button
            onClick={() => handlePortalSwitch('admin')}
            className={`py-3 rounded-2xl flex items-center justify-center gap-1.5 transition-all ${
              activePortal === 'admin'
                ? 'bg-emerald-600 text-white font-black shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Admin
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="font-heading font-extrabold text-xl text-white">
              {activePortal === 'customer' && (isRegistering ? 'Create Customer Account' : 'Customer Sign In')}
              {activePortal === 'technician' && (isRegistering ? 'Register as Heros Partner' : 'Technician Sign In')}
              {activePortal === 'admin' && 'Admin Control Room Sign In'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {activePortal === 'customer' && 'Book verified home services, salon & repairs'}
              {activePortal === 'technician' && 'Access daily job dispatches, 85% payouts & duty hours'}
              {activePortal === 'admin' && 'System overview, partner KYC approvals & platform settings'}
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-950/60 border border-rose-500/40 rounded-2xl text-xs text-rose-300 font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Registration Extra Fields */}
          {isRegistering && activePortal !== 'admin' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Mobile Number</label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="10-digit mobile number"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Select City</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-amber-400"
                  >
                    {mockCities.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {activePortal === 'technician' && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Primary Trade Specialization</label>
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
              )}
            </>
          )}

          {/* Standard Login Fields */}
          {!isRegistering && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {activePortal === 'admin' ? 'Admin Username or Email' : 'Email Address or Mobile Number'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={activePortal === 'admin' ? 'admin@heroshomes.com' : 'sacchin@example.com or 9988776655'}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 font-extrabold text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 ${
              activePortal === 'technician'
                ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                : activePortal === 'admin'
                ? 'bg-emerald-500 text-white hover:bg-emerald-400'
                : 'bg-[#3B1C71] text-white hover:bg-[#2F165A] border border-purple-400'
            }`}
          >
            {loading ? 'Authenticating...' : isRegistering ? 'Complete Registration' : 'Log In & Enter Portal'}
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Toggle Register vs Login */}
          {activePortal !== 'admin' && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setErrorMsg('');
                }}
                className="text-xs text-purple-300 hover:text-white font-bold underline transition-colors"
              >
                {isRegistering ? 'Already have an account? Log In' : "Don't have an account? Register Now"}
              </button>
            </div>
          )}

          {/* Seed Credential Hints */}
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="font-bold text-amber-400">Demo Login Credentials:</div>
            <div>• **Customer**: `sacchin@example.com` / `password123`</div>
            <div>• **Technician**: `9876543210` / `partner123`</div>
            <div>• **Admin**: `admin@heroshomes.com` / `admin123`</div>
          </div>
        </form>
      </div>
    </div>
  );
};
