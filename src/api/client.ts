const API_BASE = '/api';

// Helper to safely parse JSON response or fall back gracefully
async function safeFetchJson(url: string, options: RequestInit) {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Server error');
      return json;
    }
    throw new Error('API server returned non-JSON response');
  } catch (err: any) {
    throw err;
  }
}

// Local storage database fallback for seamless execution when Vite dev server runs standalone
const LOCAL_USERS_KEY = 'heros_db_users';
const LOCAL_BOOKINGS_KEY = 'heros_db_bookings';

const initialLocalUsers = [
  {
    id: 'usr_cust_1',
    email: 'sacchin@example.com',
    phone: '9988776655',
    name: 'Sacchin Chawla',
    password: 'password123',
    role: 'customer',
    city: 'Bengaluru',
    address: 'Flat 402, Sunshine Residency, Indiranagar, Bengaluru',
  },
  {
    id: 'usr_tech_1',
    email: 'ramesh@heroshomes.com',
    phone: '9876543210',
    name: 'Ramesh Kumar',
    password: 'partner123',
    role: 'technician',
    city: 'Bengaluru',
    category: 'AC & Appliance Repair',
  },
  {
    id: 'usr_admin_1',
    email: 'admin@heroshomes.com',
    phone: '9000000000',
    name: 'Heros Homes Admin',
    password: 'admin123',
    role: 'admin',
    city: 'All Cities',
  },
];

function getLocalUsers() {
  try {
    const data = localStorage.getItem(LOCAL_USERS_KEY);
    return data ? JSON.parse(data) : initialLocalUsers;
  } catch {
    return initialLocalUsers;
  }
}

function saveLocalUsers(users: any[]) {
  try {
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  } catch {}
}

export const apiClient = {
  async register(data: any) {
    try {
      return await safeFetchJson(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch {
      // Local Database Fallback
      const users = getLocalUsers();
      const existing = users.find(
        (u: any) => u.email === data.email || u.phone === data.phone
      );
      if (existing) {
        throw new Error('User with this email or mobile number already exists');
      }

      const newUser = {
        id: `usr_${Date.now()}`,
        name: data.name,
        email: data.email || `${data.phone}@heroshomes.local`,
        phone: data.phone,
        password: data.password,
        role: data.role,
        city: data.city || 'Bengaluru',
        category: data.category,
      };

      users.push(newUser);
      saveLocalUsers(users);
      return { success: true, user: newUser };
    }
  },

  async login(credentials: { identifier: string; password: string; role: string }) {
    try {
      return await safeFetchJson(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
    } catch {
      // Local Database Fallback
      const { identifier, password, role } = credentials;

      // Admin check
      if (
        role === 'admin' &&
        (identifier === 'admin@heroshomes.com' || identifier === 'admin') &&
        password === 'admin123'
      ) {
        return {
          success: true,
          user: {
            id: 'usr_admin_1',
            name: 'Heros Homes Administrator',
            email: 'admin@heroshomes.com',
            role: 'admin',
          },
        };
      }

      const users = getLocalUsers();
      const user = users.find(
        (u: any) =>
          u.email === identifier ||
          u.phone === identifier ||
          `+91 ${u.phone}` === identifier ||
          u.name.toLowerCase() === identifier.toLowerCase()
      );

      if (!user) {
        throw new Error('User credentials not found. Please register first.');
      }

      if (user.password !== password) {
        throw new Error('Incorrect password');
      }

      if (role && user.role !== role) {
        throw new Error(`Account found, but registered as ${user.role}. Please select ${user.role} portal.`);
      }

      return { success: true, user };
    }
  },

  async getBookings() {
    try {
      const res = await fetch(`${API_BASE}/bookings`);
      if (res.ok) {
        const json = await res.json();
        if (json.bookings) return json.bookings;
      }
    } catch {}

    try {
      const saved = localStorage.getItem(LOCAL_BOOKINGS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  async createBooking(booking: any) {
    try {
      const res = await safeFetchJson(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });
      return res;
    } catch {
      try {
        const saved = localStorage.getItem(LOCAL_BOOKINGS_KEY);
        const list = saved ? JSON.parse(saved) : [];
        list.unshift(booking);
        localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(list));
      } catch {}
      return { success: true, booking };
    }
  },

  async updateBookingStep(bookingId: string, partnerStep: string, status?: string) {
    try {
      return await safeFetchJson(`${API_BASE}/bookings/${bookingId}/step`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partnerStep, status }),
      });
    } catch {
      return { success: true };
    }
  },

  async updateTechnicianStatus(userId: string, isOnline: boolean) {
    try {
      return await safeFetchJson(`${API_BASE}/technicians/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, isOnline }),
      });
    } catch {
      return { success: true };
    }
  },
};
