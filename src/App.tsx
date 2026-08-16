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
import { CustomerLoginModal } from './components/auth/CustomerLoginModal';
import { PartnerLoginModal } from './components/auth/PartnerLoginModal';
import { sampleBookings } from './data/mockData';
import { AppRole, DevicePlatform, CustomerTab, HeroTab, Booking, CustomerAuthState, PartnerAuthState } from './types';

export default function App() {
  const [role, setRole] = useState<AppRole>('customer');
  const [platform, setPlatform] = useState<DevicePlatform>('ios');

  // Customer Navigation State
  const [customerTab, setCustomerTab] = useState<CustomerTab>('home');
  const [activeSubView, setActiveSubView] = useState<
    'main' | 'live_map' | 'service_flow' | 'ai_identifier' | 'ai_diagnostics' | 'ai_chat' | 'ai_matching'
  >('main');

  // Synchronized Active Booking State
  const [selectedBookingForMap, setSelectedBookingForMap] = useState<Booking>(sampleBookings[0]);

  // Hero / Partner Navigation State
  const [heroTab, setHeroTab] = useState<HeroTab>('jobs');

  // Authentication States
  const [customerAuth, setCustomerAuth] = useState<CustomerAuthState>({
    isLoggedIn: true,
    phone: '+91 99887 76655',
    name: 'Sacchin Chawla',
    selectedCity: 'Bengaluru',
    defaultAddress: 'Indiranagar, Bengaluru',
  });

  const [partnerAuth, setPartnerAuth] = useState<PartnerAuthState>({
    isLoggedIn: true,
    partnerId: 'UC-PARTNER-789',
    name: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    category: 'AC & Appliance Repair',
    rating: 4.94,
    isOnline: true,
    kycStatus: 'verified',
    completedJobsCount: 1480,
  });

  // Login Modal Modals
  const [isCustomerLoginOpen, setIsCustomerLoginOpen] = useState(false);
  const [isPartnerLoginOpen, setIsPartnerLoginOpen] = useState(false);

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

  const getCurrentScreenLabel = () => {
    if (role === 'admin') return '🛡️ UC Admin Control Room';
    if (role === 'flow') return '🔄 User Flow Architecture';
    if (role === 'hero') return `⚡ UC Partner App (${heroTab.toUpperCase()})`;

    if (activeSubView === 'live_map') return '📍 Live Partner Tracking & Start Job OTP';
    if (activeSubView === 'service_flow') return '⚡ Urban Company Service Checkout';
    if (activeSubView === 'ai_identifier') return '🤖 AI Issue Scanner';
    if (activeSubView === 'ai_diagnostics') return '📊 AI Home Wellness Diagnostics';
    if (activeSubView === 'ai_chat') return '💬 UC AI Assistant';

    return `🏠 Urban Company Customer (${customerTab.charAt(0).toUpperCase() + customerTab.slice(1)})`;
  };

  return (
    <>
      <DeviceFrame
        role={role}
        setRole={setRole}
        platform={platform}
        setPlatform={setPlatform}
        currentScreenLabel={getCurrentScreenLabel()}
        onScreenSelect={handleScreenSelect}
        onOpenCustomerLogin={() => setIsCustomerLoginOpen(true)}
        onOpenPartnerLogin={() => setIsPartnerLoginOpen(true)}
        customerAuth={customerAuth}
        partnerAuth={partnerAuth}
      >
        {/* URBAN COMPANY CUSTOMER APP */}
        {role === 'customer' && (
          <div className="flex-1 flex flex-col h-full bg-[#F8FAFC]">
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
              /* Main Customer Views */
              <div className="flex-1 flex flex-col overflow-y-auto">
                {customerTab === 'home' && (
                  <CustomerHome
                    onSelectCategory={() => setActiveSubView('service_flow')}
                    onNavigateToAI={(screen) => setActiveSubView(`ai_${screen}` as any)}
                    onNavigateToBookings={() => setCustomerTab('bookings')}
                    onNavigateToRewards={() => setCustomerTab('rewards')}
                    onOpenLoginModal={() => setIsCustomerLoginOpen(true)}
                    authState={customerAuth}
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

        {/* UC PARTNER / TECHNICIAN APP */}
        {role === 'hero' && (
          <HeroApp
            initialTab={heroTab}
            partnerAuth={partnerAuth}
            setPartnerAuth={setPartnerAuth}
            onOpenPartnerLoginModal={() => setIsPartnerLoginOpen(true)}
            activeBooking={selectedBookingForMap}
            setActiveBooking={setSelectedBookingForMap}
          />
        )}

        {/* ADMIN CONTROL ROOM */}
        {role === 'admin' && <AdminDashboard />}

        {/* USER FLOW DIAGRAM */}
        {role === 'flow' && <UserFlowDiagram onNavigateToStep={handleScreenSelect} />}
      </DeviceFrame>

      {/* Auth Modals */}
      <CustomerLoginModal
        isOpen={isCustomerLoginOpen}
        onClose={() => setIsCustomerLoginOpen(false)}
        authState={customerAuth}
        setAuthState={setCustomerAuth}
      />

      <PartnerLoginModal
        isOpen={isPartnerLoginOpen}
        onClose={() => setIsPartnerLoginOpen(false)}
        partnerAuth={partnerAuth}
        setPartnerAuth={setPartnerAuth}
      />
    </>
  );
}
