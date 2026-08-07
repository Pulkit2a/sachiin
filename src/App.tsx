import React, { useState } from 'react';
import { DeviceFrame } from './components/DeviceFrame';
import { CustomerBottomNav } from './components/customer/CustomerBottomNav';
import { CustomerHome } from './components/customer/CustomerHome';
import { CustomerBookings } from './components/customer/CustomerBookings';
import { LiveTrackingMap } from './components/customer/LiveTrackingMap';
import { ServiceBookingFlow } from './components/customer/ServiceBookingFlow';
import { AIFeatures } from './components/customer/AIFeatures';
import { CustomerCommunity } from './components/customer/CustomerCommunity';
import { CustomerRewards } from './components/customer/CustomerRewards';
import { CustomerProfile } from './components/customer/CustomerProfile';
import { HeroApp } from './components/hero/HeroApp';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { UserFlowDiagram } from './components/UserFlowDiagram';
import { sampleBookings } from './data/mockData';
import { AppRole, DevicePlatform, CustomerTab, HeroTab, Booking } from './types';

export default function App() {
  const [role, setRole] = useState<AppRole>('customer');
  const [platform, setPlatform] = useState<DevicePlatform>('ios');

  // Customer Navigation State
  const [customerTab, setCustomerTab] = useState<CustomerTab>('home');
  const [activeSubView, setActiveSubView] = useState<
    'main' | 'live_map' | 'service_flow' | 'ai_identifier' | 'ai_diagnostics' | 'ai_chat' | 'ai_matching'
  >('main');

  const [selectedBookingForMap, setSelectedBookingForMap] = useState<Booking>(sampleBookings[0]);

  // Hero Navigation State
  const [heroTab, setHeroTab] = useState<HeroTab>('jobs');

  // Screen Jumper Handler
  const handleScreenSelect = (screenKey: string) => {
    switch (screenKey) {
      case 'cust_home':
        setRole('customer');
        setCustomerTab('home');
        setActiveSubView('main');
        break;
      case 'cust_bookings':
        setRole('customer');
        setCustomerTab('bookings');
        setActiveSubView('main');
        break;
      case 'cust_live_map':
        setRole('customer');
        setCustomerTab('bookings');
        setActiveSubView('live_map');
        break;
      case 'cust_booking_confirm':
        setRole('customer');
        setCustomerTab('bookings');
        setActiveSubView('main');
        break;
      case 'cust_service_flow':
        setRole('customer');
        setActiveSubView('service_flow');
        break;
      case 'cust_ai_identifier':
        setRole('customer');
        setActiveSubView('ai_identifier');
        break;
      case 'cust_ai_diagnostics':
        setRole('customer');
        setActiveSubView('ai_diagnostics');
        break;
      case 'cust_ai_chat':
        setRole('customer');
        setActiveSubView('ai_chat');
        break;
      case 'cust_ai_matching':
        setRole('customer');
        setActiveSubView('ai_matching');
        break;
      case 'cust_community':
        setRole('customer');
        setCustomerTab('community');
        setActiveSubView('main');
        break;
      case 'cust_rewards':
        setRole('customer');
        setCustomerTab('rewards');
        setActiveSubView('main');
        break;
      case 'cust_profile':
        setRole('customer');
        setCustomerTab('profile');
        setActiveSubView('main');
        break;
      case 'hero_dashboard':
        setRole('hero');
        setHeroTab('jobs');
        break;
      case 'hero_kyc':
        setRole('hero');
        setHeroTab('kyc');
        break;
      case 'hero_job_request':
        setRole('hero');
        setHeroTab('jobs');
        break;
      case 'hero_schedule':
        setRole('hero');
        setHeroTab('schedule');
        break;
      case 'hero_nav':
        setRole('hero');
        setHeroTab('jobs');
        break;
      case 'hero_earnings':
        setRole('hero');
        setHeroTab('earnings');
        break;
      case 'hero_ratings':
        setRole('hero');
        setHeroTab('ratings');
        break;
      case 'admin_dashboard':
      case 'admin_kyc':
      case 'admin_users':
      case 'admin_bookings':
        setRole('admin');
        setPlatform('web');
        break;
      case 'flow_diagram':
        setRole('flow');
        break;
    }
  };

  // Label calculation for header
  const getCurrentScreenLabel = () => {
    if (role === 'admin') return '🛡️ Admin Web Dashboard';
    if (role === 'flow') return '🔄 User Flow Diagram';
    if (role === 'hero') return `⚡ Hero Pro (${heroTab.toUpperCase()})`;

    if (activeSubView === 'live_map') return '📍 Live Hero Tracking Map';
    if (activeSubView === 'service_flow') return '⚡ Booking & Payment Flow';
    if (activeSubView === 'ai_identifier') return '🤖 AI Issue & Cost Identifier';
    if (activeSubView === 'ai_diagnostics') return '📊 AI Home Diagnostics';
    if (activeSubView === 'ai_chat') return '💬 Hero AI Chatbot';
    if (activeSubView === 'ai_matching') return '🎯 Smart AI Hero Matching';

    return `🏠 Customer ${customerTab.charAt(0).toUpperCase() + customerTab.slice(1)}`;
  };

  return (
    <DeviceFrame
      role={role}
      setRole={setRole}
      platform={platform}
      setPlatform={setPlatform}
      currentScreenLabel={getCurrentScreenLabel()}
      onScreenSelect={handleScreenSelect}
    >
      {/* CUSTOMER ROLE CANVAS */}
      {role === 'customer' && (
        <div className="flex-1 flex flex-col h-full bg-[#F6F7F9]">
          {/* Sub Views Overrides */}
          {activeSubView === 'live_map' ? (
            <LiveTrackingMap
              booking={selectedBookingForMap}
              onClose={() => setActiveSubView('main')}
              onOpenChat={() => setActiveSubView('ai_chat')}
            />
          ) : activeSubView === 'service_flow' ? (
            <ServiceBookingFlow
              onBookingComplete={(newBooking) => {
                setSelectedBookingForMap(newBooking);
                setCustomerTab('bookings');
                setActiveSubView('live_map');
              }}
              onCancel={() => setActiveSubView('main')}
            />
          ) : activeSubView.startsWith('ai_') ? (
            <AIFeatures
              initialScreen={activeSubView.replace('ai_', '') as any}
              onBookService={() => setActiveSubView('service_flow')}
              onBack={() => setActiveSubView('main')}
            />
          ) : (
            /* Main 5 Tabs Views */
            <div className="flex-1 flex flex-col overflow-y-auto">
              {customerTab === 'home' && (
                <CustomerHome
                  onSelectCategory={() => setActiveSubView('service_flow')}
                  onNavigateToAI={(screen) => setActiveSubView(`ai_${screen}` as any)}
                  onNavigateToBookings={() => setCustomerTab('bookings')}
                  onNavigateToRewards={() => setCustomerTab('rewards')}
                />
              )}

              {customerTab === 'bookings' && (
                <CustomerBookings
                  onTrackHero={(booking) => {
                    setSelectedBookingForMap(booking);
                    setActiveSubView('live_map');
                  }}
                  onOpenChat={() => setActiveSubView('ai_chat')}
                  onNewBooking={() => setActiveSubView('service_flow')}
                />
              )}

              {customerTab === 'community' && <CustomerCommunity />}

              {customerTab === 'rewards' && <CustomerRewards />}

              {customerTab === 'profile' && <CustomerProfile />}
            </div>
          )}

          {/* Persistent Bottom Nav (When in main tab view) */}
          {activeSubView === 'main' && (
            <CustomerBottomNav
              activeTab={customerTab}
              setActiveTab={(tab) => {
                setCustomerTab(tab);
                setActiveSubView('main');
              }}
            />
          )}
        </div>
      )}

      {/* HERO PROVIDER ROLE CANVAS */}
      {role === 'hero' && <HeroApp initialTab={heroTab} />}

      {/* ADMIN ROLE CANVAS */}
      {role === 'admin' && <AdminDashboard />}

      {/* USER FLOW DIAGRAM CANVAS */}
      {role === 'flow' && <UserFlowDiagram onNavigateToStep={handleScreenSelect} />}
    </DeviceFrame>
  );
}
