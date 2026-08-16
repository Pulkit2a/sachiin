const API_BASE = 'http://localhost:3000/api';

export const apiClient = {
  async register(data: any) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Registration failed');
    return json;
  },

  async login(credentials: { identifier: string; password: string; role: string }) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Authentication failed');
    return json;
  },

  async getBookings() {
    try {
      const res = await fetch(`${API_BASE}/bookings`);
      const json = await res.json();
      return json.bookings || [];
    } catch {
      return [];
    }
  },

  async createBooking(booking: any) {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    });
    return await res.json();
  },

  async updateBookingStep(bookingId: string, partnerStep: string, status?: string) {
    const res = await fetch(`${API_BASE}/bookings/${bookingId}/step`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ partnerStep, status }),
    });
    return await res.json();
  },

  async updateTechnicianStatus(userId: string, isOnline: boolean) {
    const res = await fetch(`${API_BASE}/technicians/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, isOnline }),
    });
    return await res.json();
  },
};
