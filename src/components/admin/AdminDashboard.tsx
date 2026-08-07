import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  Calendar,
  DollarSign,
  TrendingUp,
  FileCheck,
  HelpCircle,
  Tag,
  Search,
  CheckCircle2,
  XCircle,
  Sparkles,
  BarChart3,
  Layers,
  Percent,
  Clock,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { adminDashboardData, sampleCoupons } from '../../data/mockData';
import { AdminTab } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [kycQueueState, setKycQueueState] = useState(adminDashboardData.kycQueue);
  const [commissionRate, setCommissionRate] = useState(15); // 15% booking commission

  const handleApproveKYC = (id: string) => {
    setKycQueueState((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full text-white font-sans">
      {/* Admin Top Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#F5C542] text-[#0D182A] text-xs font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
              Admin Web Portal
            </span>
            <span className="text-xs text-slate-400">• Hero Homes HQ Control Room</span>
          </div>
          <h1 className="font-heading font-bold text-2xl text-white mt-1">Platform Operations Control</h1>
        </div>

        {/* Quick Admin Metric Pills */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-right">
            <span className="text-[10px] text-slate-400 block font-bold">MONTHLY REVENUE</span>
            <span className="font-heading font-bold text-sm text-[#F5C542]">
              ₹{(adminDashboardData.stats.totalRevenueINR / 100000).toFixed(2)} Lakhs
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-right">
            <span className="text-[10px] text-slate-400 block font-bold">COMMISSION RATE</span>
            <span className="font-heading font-bold text-sm text-emerald-400">{commissionRate}%</span>
          </div>
        </div>
      </div>

      {/* Admin Web Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto my-4 py-1 border-b border-slate-800">
        {[
          { id: 'dashboard', label: '📊 Executive Dashboard', icon: BarChart3 },
          { id: 'kyc_queue', label: '🛡️ KYC Approvals Queue', badge: kycQueueState.length },
          { id: 'users_heroes', label: '👥 Users & Heroes Directory' },
          { id: 'bookings', label: '📋 Booking Control Room' },
          { id: 'commissions', label: '💰 Commission & Payouts' },
          { id: 'support', label: '💬 Support Queue', badge: adminDashboardData.stats.openSupportTickets },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as AdminTab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === item.id
                ? 'bg-[#F5C542] text-[#0D182A] shadow-lg shadow-amber-500/10'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* SECTION 1: EXECUTIVE DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 font-bold block">Total Platform Revenue</span>
              <div className="font-heading font-extrabold text-xl text-white mt-1">
                ₹{adminDashboardData.stats.totalRevenueINR.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> +{adminDashboardData.stats.monthlyGrowth}% this month
              </span>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 font-bold block">Active Homeowners</span>
              <div className="font-heading font-extrabold text-xl text-white mt-1">
                {adminDashboardData.stats.activeUsers.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Across 8 Indian Tier-1 Cities</span>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 font-bold block">Verified Heroes</span>
              <div className="font-heading font-extrabold text-xl text-white mt-1">
                {adminDashboardData.stats.activeHeroes.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-[#F5C542] font-bold block mt-1">99.8% Background Checked</span>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 font-bold block">Avg Customer Rating</span>
              <div className="font-heading font-extrabold text-xl text-amber-400 mt-1">
                {adminDashboardData.stats.customerSatisfactionScore} ★
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">12,450 Bookings this month</span>
            </div>
          </div>

          {/* Visual Analytics Bar Chart Mockup */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-sm text-white">Monthly Booking Volume & Revenue</h3>
                <p className="text-xs text-slate-400">Comparing Q2 - Q3 2026 performance</p>
              </div>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
                Live Data Stream
              </span>
            </div>

            <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-800">
              {[
                { month: 'Jan', height: '40%', val: '₹14.2L' },
                { month: 'Feb', height: '55%', val: '₹18.5L' },
                { month: 'Mar', height: '65%', val: '₹21.0L' },
                { month: 'Apr', height: '75%', val: '₹24.8L' },
                { month: 'May', height: '85%', val: '₹26.5L' },
                { month: 'Jun', height: '95%', val: '₹28.4L' },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <span className="text-[10px] text-[#F5C542] opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                    {bar.val}
                  </span>
                  <div
                    className="w-full bg-gradient-to-t from-[#0D182A] to-[#F5C542] rounded-t-lg transition-all duration-500"
                    style={{ height: bar.height }}
                  />
                  <span className="text-xs text-slate-400 font-medium">{bar.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Live Bookings Table */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="font-heading font-bold text-sm text-white">Live Booking Activity</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5 rounded-l-xl">Booking ID</th>
                    <th className="p-2.5">Customer</th>
                    <th className="p-2.5">Assigned Hero</th>
                    <th className="p-2.5">Service Name</th>
                    <th className="p-2.5">Amount</th>
                    <th className="p-2.5 rounded-r-xl">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {adminDashboardData.recentBookings.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-2.5 font-mono font-bold text-[#F5C542]">{row.id}</td>
                      <td className="p-2.5 font-medium text-white">{row.customer}</td>
                      <td className="p-2.5">{row.hero}</td>
                      <td className="p-2.5">{row.service}</td>
                      <td className="p-2.5 font-bold text-white">₹{row.amount}</td>
                      <td className="p-2.5">
                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: KYC QUEUE */}
      {activeTab === 'kyc_queue' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-white">
              Hero Provider KYC Approval Queue ({kycQueueState.length})
            </h3>
            <span className="text-xs text-slate-400">Strict 100% Aadhaar & Court background verification</span>
          </div>

          <div className="space-y-3">
            {kycQueueState.length === 0 ? (
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <h4 className="font-heading font-bold text-sm text-white">KYC Queue Cleared</h4>
                <p className="text-xs text-slate-400">All pending provider registrations are verified!</p>
              </div>
            ) : (
              kycQueueState.map((kyc) => (
                <div
                  key={kyc.id}
                  className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-sm text-white">{kyc.name}</span>
                      <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                        {kyc.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-0.5">Phone: {kyc.phone} • Submitted: {kyc.submittedDate}</p>

                    <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-300">
                      <span>Uploaded Docs:</span>
                      {kyc.docs.map((doc, idx) => (
                        <span key={idx} className="bg-slate-800 px-2 py-0.5 rounded font-mono text-[#F5C542]">
                          {doc} ✓
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <button
                      onClick={() => handleApproveKYC(kyc.id)}
                      className="flex-1 md:flex-none bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-emerald-600 transition-colors"
                    >
                      Approve & Verify
                    </button>
                    <button
                      onClick={() => handleApproveKYC(kyc.id)}
                      className="flex-1 md:flex-none bg-slate-800 text-slate-300 px-4 py-2 rounded-xl font-bold text-xs hover:bg-slate-700 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SECTION 3: COMMISSION MANAGEMENT */}
      {activeTab === 'commissions' && (
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4 max-w-xl">
          <h3 className="font-heading font-bold text-base text-white">Platform Commission Settings</h3>
          <p className="text-xs text-slate-400">
            Set the platform commission percentage deducted automatically on every completed booking.
          </p>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2">
              Default Commission Rate: <span className="text-[#F5C542]">{commissionRate}%</span>
            </label>
            <input
              type="range"
              min="5"
              max="30"
              value={commissionRate}
              onChange={(e) => setCommissionRate(Number(e.target.value))}
              className="w-full accent-[#F5C542]"
            />
          </div>

          <button className="bg-[#F5C542] text-[#0D182A] px-4 py-2 rounded-xl font-bold text-xs hover:bg-amber-300 transition-colors">
            Update Commission Model
          </button>
        </div>
      )}
    </div>
  );
};
