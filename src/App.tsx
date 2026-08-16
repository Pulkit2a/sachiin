import React, { useState, useEffect } from 'react';
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
import { LoginGateway } from './components/auth/LoginGateway';
import { CustomerLoginModal } from './components/auth/CustomerLoginModal';
import { PartnerLoginModal } from './components/auth/PartnerLoginModal';
import { sampleBookings } from './data/mockData';
import { AppRole, CustomerTab, HeroTab, Booking, CustomerAuthState, PartnerAuthState } from './types';
import { apiClient } from './api/client';

export default function App() {
  // Current Authenticated User & Portal Role
  const [currentUser, setCurrentUser] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('heros_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [role, setRole] = useState<AppRole>(() => {
    try {
      const savedRole = localStorage.getItem('heros_role');
      return (savedRole as AppRole) || 'customer';
    } catch {
      return 'customer';
    }
  });

  // Customer Navigation State
  const [customerTab, setCustomerTab] = useState<CustomerTab>('home');
  const [activeSubView, setActiveSubView] = useState<
    'main' | 'live_map' | 'service_flow' | 'ai_identifier' | 'ai_diagnostics' | 'ai_chat'
  >('main');

  // Synchronized Active Booking State
  const [selectedBookingForMap, setSelectedBookingForMap] = useState<Booking>(sampleBookings[0]);

  // Partner Navigation State
  const [heroTab, setHeroTab] = useState<HeroTab>('jobs');

  // Auth Modals
  const [isCustomerLoginOpen, setIsCustomerLoginOpen] = useState(false);
  const [isPartnerLoginOpen, setIsPartnerLoginOpen] = useState(false);

  // Auth States
  const [customerAuth, setCustomerAuth] = useState<CustomerAuthState>({
    isLoggedIn: true,
    phone: currentUser?.phone || '+91 99887 76655',
    name: currentUser?.name || 'Sacchin Chawla',
    selectedCity: currentUser?.city || 'Bengaluru',
    defaultAddress: currentUser?.address || 'Indiranagar, Bengaluru',
  });

  const [partnerAuth, setPartnerAuth] = useState<PartnerAuthState>({
    isLoggedIn: true,
    partnerId: 'HH-PARTNER-789',
    name: currentUser?.name || 'Ramesh Kumar',
    phone: currentUser?.phone || '+91 98765 43210',
    category: currentUser?.category || 'AC & Appliance Repair',
    rating: 4.94,
    isOnline: true,
    kycStatus: 'verified',
    completedJobsCount: 1480,
  });

  // Load bookings from backend API
  useEffect(() => {
    apiClient.getBookings().then((fetched) => {
      if (fetched && fetched.length > 0) {
        setSelectedBookingForMap(fetched[0]);
      }
    });
  }, []);

  const handleLoginSuccess = (user: any, targetRole: 'customer' | 'hero' | 'admin') => {
    setCurrentUser(user);
    setRole(targetRole);
    localStorage.setItem('heros_user', JSON.stringify(user));
    localStorage.setItem('heros_role', targetRole);

    setCustomerAuth({
      isLoggedIn: true,
      phone: user.phone || '+91 99887 76655',
      name: user.name || 'Sacchin Chawla',
      selectedCity: user.city || 'Bengaluru',
      defaultAddress: user.address || `Indiranagar, ${user.city || 'Bengaluru'}`,
    });

    setPartnerAuth((prev) => ({
      ...prev,
      name: user.name,
      phone: user.phone,
      category: user.category || 'AC & Appliance Repair',
    }));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('heros_user');
    localStorage.removeItem('heros_role');
  };

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
        setRole('admin');
        break;
    }
  };

  const getCurrentScreenLabel = () => {
    if (role === 'admin') return '🛡️ HH Admin Control Room';
    if (role === 'hero') return `⚡ Heros Partner App (${heroTab.toUpperCase()})`;

    if (activeSubView === 'live_map') return '📍 Live Partner Tracking & Start Job OTP';
    if (activeSubView === 'service_flow') return '⚡ Heros Homes Service Checkout';
    if (activeSubView === 'ai_identifier') return '🤖 AI Issue Scanner';

    return `🏠 Heros Homes Customer (${customerTab.charAt(0).toUpperCase() + customerTab.slice(1)})`;
  };

  // 1. Mandatory Initial Authentication Gate
  if (!currentUser) {
    return <LoginGateway onLoginSuccess={handleLoginSuccess} />;
  }

  // 2. Authenticated Application Shell
  return (
    <>
      <DeviceFrame
        role={role}
        setRole={setRole}
        currentUser={currentUser}
        currentScreenLabel={getCurrentScreenLabel()}
        onScreenSelect={handleScreenSelect}
        onLogout={handleLogout}
        customerAuth={customerAuth}
        partnerAuth={partnerAuth}
      >
        {/* HEROS HOMES CUSTOMER APP */}
        {role === 'customer' && (
          <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            {/* Sub Views Overrides */}
            {activeSubView === 'live_map' ? (
              <LiveTrackingMap
                booking={selectedBookingForMap}
                onClose={() => setActiveSubView('main')}
                onOpenChat={() => setActiveSubView('ai_chat')}
              />
            ) : activeSubView === 'service_flow' ? (
              <ServiceBookingFlow
                onBookingComplete={async (newBooking) => {
                  setSelectedBookingForMap(newBooking);
                  setCustomerTab('bookings');
                  setActiveSubView('live_map');
                  await apiClient.createBooking(newBooking);
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

        {/* HEROS HOMES TECHNICIAN PARTNER APP */}
        {role === 'hero' && (
          <div className="flex-1 flex flex-col h-full bg-[#0F172A] rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
            <HeroApp
              initialTab={heroTab}
              partnerAuth={partnerAuth}
              setPartnerAuth={setPartnerAuth}
              onOpenPartnerLoginModal={() => setIsPartnerLoginOpen(true)}
              activeBooking={selectedBookingForMap}
              setActiveBooking={(updated) => {
                const b = typeof updated === 'function' ? updated(selectedBookingForMap) : updated;
                setSelectedBookingForMap(b);
                apiClient.updateBookingStep(b.id, b.partnerStep || 'navigating', b.status);
              }}
            />
          </div>
        )}

        {/* ADMIN CONTROL ROOM */}
        {role === 'admin' && (
          <div className="flex-1 flex flex-col h-full bg-[#0F172A] rounded-3xl overflow-hidden shadow-2xl border border-slate-800 p-4">
            <AdminDashboard />
          </div>
        )}

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
