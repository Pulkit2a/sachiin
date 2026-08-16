import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  MessageSquare,
  ShieldCheck,
  Star,
  Clock,
  Navigation,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  LocateFixed,
} from 'lucide-react';
import { Booking } from '../../types';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet marker icons in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icons
const customerIcon = new L.DivIcon({
  html: `<div style="background-color: #3B1C71; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 2px solid white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">🏠</div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const heroIcon = (avatarUrl: string) => new L.DivIcon({
  html: `<div style="background-color: #10B981; padding: 2px; width: 40px; height: 40px; border-radius: 50%; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); border: 2px solid white;"><img src="${avatarUrl}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" /></div>`,
  className: '',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// Component to dynamically update map center
const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 14, { duration: 1.5 });
  }, [center, map]);
  return null;
};

interface LiveTrackingMapProps {
  booking: Booking;
  onClose: () => void;
  onOpenChat: () => void;
}

export const LiveTrackingMap: React.FC<LiveTrackingMapProps> = ({
  booking,
  onClose,
  onOpenChat,
}) => {
  const [eta, setEta] = useState(booking.heroCurrentLocation?.etaMinutes || 8);
  const [isCopied, setIsCopied] = useState(false);

  // Default to Chandigarh
  const [currentLocation, setCurrentLocation] = useState<[number, number]>([30.7333, 76.7794]);
  const [partnerLocation, setPartnerLocation] = useState<[number, number]>([30.7333 + 0.01, 76.7794 + 0.01]); // Slightly offset for demonstration
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    // Get actual user location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCurrentLocation([lat, lng]);
          
          // Simulate partner location nearby (offset by ~1km)
          setPartnerLocation([lat + 0.008, lng + 0.008]);
          setLocationLoaded(true);
        },
        (error) => {
          console.warn('Geolocation error:', error);
          setLocationError('Using default location (Chandigarh). Please enable location services.');
          setLocationLoaded(true);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLocationError('Geolocation not supported by this browser. Using default location.');
      setLocationLoaded(true);
    }

    const timer = setInterval(() => {
      setEta((prev) => (prev > 1 ? prev - 1 : 1));
      
      // Simulate partner moving closer to customer
      setPartnerLocation(prev => {
        const latDiff = currentLocation[0] - prev[0];
        const lngDiff = currentLocation[1] - prev[1];
        // Move 10% closer each tick if distance is somewhat significant
        if (Math.abs(latDiff) > 0.0001 || Math.abs(lngDiff) > 0.0001) {
             return [prev[0] + latDiff * 0.1, prev[1] + lngDiff * 0.1];
        }
        return prev;
      });
    }, 5000); // update every 5s for smoother demo
    
    return () => clearInterval(timer);
  }, [currentLocation]);

  const handleCopyOtp = () => {
    navigator.clipboard.writeText(booking.otp || '4892');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCenterMap = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation([position.coords.latitude, position.coords.longitude]);
        }
      );
    }
  };

  return (
    <div className="flex-1 bg-[#F8FAFC] text-[#0F172A] flex flex-col h-full relative overflow-hidden rounded-xl">
      {/* Top Floating Navigation Header */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex items-center justify-between">
        <button
          onClick={onClose}
          className="bg-white text-slate-800 p-2.5 rounded-full shadow-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-1.5 text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to App
        </button>

        <span className="bg-[#3B1C71] text-white px-3 py-1.5 rounded-full text-xs font-extrabold shadow-lg border border-purple-400 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#F4C430]" /> Partner Arriving in ~{eta} Mins
        </span>
      </div>

      {locationError && (
        <div className="absolute top-16 left-3 right-3 z-[1000] bg-rose-100 border border-rose-300 text-rose-800 text-xs px-3 py-2 rounded-xl flex items-center gap-2 shadow-md">
           <AlertCircle className="w-4 h-4 shrink-0" />
           {locationError}
        </div>
      )}
      
      {/* Floating Center Button */}
       <button
          onClick={handleCenterMap}
          className="absolute bottom-60 right-3 z-[1000] bg-white text-slate-800 p-3 rounded-full shadow-lg border border-slate-200 hover:bg-slate-50 transition-all"
          title="Center on my location"
        >
          <LocateFixed className="w-5 h-5 text-blue-600" />
      </button>

      {/* Real Interactive Map using react-leaflet */}
      <div className="flex-1 relative z-0">
         {locationLoaded && (
            <MapContainer 
              center={currentLocation} 
              zoom={14} 
              style={{ width: '100%', height: '100%' }}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" // Nice clean basemap
              />
              <MapUpdater center={currentLocation} />
              
              <Marker position={currentLocation} icon={customerIcon}>
                <Popup>
                   <div className="font-bold text-sm">Your Location</div>
                   <div className="text-xs text-gray-500">Partner is headed here.</div>
                </Popup>
              </Marker>

              <Marker position={partnerLocation} icon={heroIcon(booking.hero.avatar)}>
                <Popup>
                   <div className="font-bold text-sm">{booking.hero.name}</div>
                   <div className="text-xs text-gray-500">Currently {eta} mins away</div>
                </Popup>
              </Marker>
            </MapContainer>
         )}
      </div>

      {/* Bottom Sheet Card */}
      <div className="bg-white rounded-t-3xl p-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] border-t border-slate-200 z-[1000] space-y-4">
        {/* Prominent Start Job OTP Card */}
        <div className="bg-gradient-to-r from-[#3B1C71] to-[#5C2B90] text-white p-3.5 rounded-2xl flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F4C430] text-[#3B1C71] flex items-center justify-center font-black">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-purple-200 uppercase font-bold tracking-wider">Start Job OTP</div>
              <div className="text-xl font-heading font-black tracking-widest text-[#F4C430]">
                {booking.otp || '4892'}
              </div>
            </div>
          </div>

          <button
            onClick={handleCopyOtp}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-white transition-all"
          >
            {isCopied ? 'Copied! ✓' : 'Share Code'}
          </button>
        </div>

        {/* Partner Information */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <img
              src={booking.hero.avatar}
              alt={booking.hero.name}
              className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-heading font-bold text-sm text-slate-900">{booking.hero.name}</h4>
                <span className="bg-emerald-50 text-emerald-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                ★ {booking.hero.rating} ({booking.hero.jobsCompleted}+ jobs completed)
              </p>
              <p className="text-[10px] text-purple-700 font-bold mt-0.5">
                Partner is on the way to your location
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href={`tel:${booking.hero.phone}`}
              className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shadow-sm hover:bg-emerald-100 transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={onOpenChat}
              className="w-9 h-9 rounded-xl bg-purple-50 text-[#3B1C71] border border-purple-200 flex items-center justify-center shadow-sm hover:bg-purple-100 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="flex items-center justify-between text-xs text-slate-600">
          <div>
            <div className="font-bold text-slate-900">{booking.serviceName}</div>
            <div className="text-[11px] text-slate-500">{booking.address.street || 'Current Location'}</div>
          </div>
          <div className="text-right">
            <div className="font-extrabold text-[#3B1C71] text-sm">₹{booking.amount}</div>
            <div className="text-[10px] text-emerald-600 font-bold">{booking.paymentMethod}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
