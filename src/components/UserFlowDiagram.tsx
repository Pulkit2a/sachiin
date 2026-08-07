import React from 'react';
import {
  UserCheck,
  Search,
  CalendarCheck,
  Navigation,
  CheckCircle2,
  Award,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface UserFlowDiagramProps {
  onNavigateToStep: (stepKey: string) => void;
}

export const UserFlowDiagram: React.FC<UserFlowDiagramProps> = ({ onNavigateToStep }) => {
  const steps = [
    {
      id: 'step_1',
      key: 'cust_profile',
      number: '01',
      title: 'Onboarding & KYC',
      subtitle: 'Sign up/Login & Set Saved Addresses',
      icon: UserCheck,
      color: '#3B82F6',
    },
    {
      id: 'step_2',
      key: 'cust_home',
      number: '02',
      title: 'Discover Services',
      subtitle: 'Search categories or use AI Issue Scanner',
      icon: Search,
      color: '#F5C542',
    },
    {
      id: 'step_3',
      key: 'cust_service_flow',
      number: '03',
      title: 'Book Service & Slot',
      subtitle: 'Select Date/Time, Add-ons & UPI/Card Payment',
      icon: CalendarCheck,
      color: '#10B981',
    },
    {
      id: 'step_4',
      key: 'cust_live_map',
      number: '04',
      title: 'Track Hero Real-Time',
      subtitle: 'Live GPS Map, Call/Chat & Start OTP',
      icon: Navigation,
      color: '#EC4899',
    },
    {
      id: 'step_5',
      key: 'cust_bookings',
      number: '05',
      title: 'Service Complete',
      subtitle: 'Job verified & receipt generated',
      icon: CheckCircle2,
      color: '#8B5CF6',
    },
    {
      id: 'step_6',
      key: 'cust_rewards',
      number: '06',
      title: 'Review & Rewards',
      subtitle: 'Rate Hero & Earn Hero Points for Tier Perks',
      icon: Award,
      color: '#F5C542',
    },
  ];

  return (
    <div className="p-4 sm:p-6 text-white space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="bg-[#F5C542] text-[#0D182A] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          Architecture & Journey Map
        </span>
        <h2 className="font-heading font-extrabold text-2xl text-white">
          Hero Homes End-to-End User Flow
        </h2>
        <p className="text-xs text-slate-300">
          Click any step node below to launch and test that screen immediately in the mobile preview frame!
        </p>
      </div>

      {/* Interactive Flow Nodes Chain */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative flex flex-col items-center">
              <button
                onClick={() => onNavigateToStep(step.key)}
                className="w-full bg-slate-900 p-4 rounded-2xl border border-slate-800 hover:border-[#F5C542] transition-all text-center group shadow-xl hover:scale-105 flex flex-col items-center justify-between min-h-[180px]"
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="font-mono text-xs font-bold text-[#F5C542] bg-slate-800 px-2 py-0.5 rounded">
                    {step.number}
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#F5C542] transition-colors" />
                </div>

                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2 transition-transform group-hover:rotate-6"
                  style={{ backgroundColor: `${step.color}20`, color: step.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xs text-white group-hover:text-[#F5C542] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                    {step.subtitle}
                  </p>
                </div>
              </button>

              {/* Connecting Arrow for Desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
