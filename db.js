import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'database.sqlite.json');

// Initial seed data
const initialData = {
  users: [
    {
      id: 'usr_cust_1',
      email: 'sacchin@example.com',
      phone: '9988776655',
      name: 'Sacchin Chawla',
      password: 'password123',
      role: 'customer',
      city: 'Bengaluru',
      address: 'Flat 402, Sunshine Residency, Indiranagar, Bengaluru',
      createdAt: new Date().toISOString(),
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
      createdAt: new Date().toISOString(),
    },
    {
      id: 'usr_admin_1',
      email: 'admin@heroshomes.com',
      phone: '9000000000',
      name: 'Heros Homes Admin',
      password: 'admin123',
      role: 'admin',
      city: 'All Cities',
      createdAt: new Date().toISOString(),
    },
  ],
  technicians: [
    {
      id: 'tech_1',
      userId: 'usr_tech_1',
      name: 'Ramesh Kumar',
      phone: '+91 98765 43210',
      category: 'AC & Appliance Repair',
      rating: 4.94,
      kycStatus: 'verified',
      isOnline: true,
      todayEarnings: 1520,
      weeklyEarnings: 9850,
      completedJobsCount: 1480,
    },
  ],
  bookings: [
    {
      id: 'HH-98214',
      serviceId: 'ac_foam_service',
      serviceName: 'Powerjet AC Servicing (Split/Window)',
      categoryName: 'AC & Appliance Repair',
      customerName: 'Sacchin Chawla',
      customerPhone: '+91 99887 76655',
      heroName: 'Ramesh Kumar',
      address: 'Flat 402, Sunshine Residency, 12th Main Road, Indiranagar, Bengaluru',
      dateTime: 'Today, 4:30 PM',
      status: 'ongoing',
      partnerStep: 'navigating',
      amount: 599,
      paymentMethod: 'Pay via Cash / UPI after service',
      paymentStatus: 'pending',
      otp: '4892',
      heroCurrentLocation: {
        lat: 12.9725,
        lng: 77.5955,
        address: 'En route via 100ft Road (1.2 km away)',
        etaMinutes: 8,
      },
      createdAt: new Date().toISOString(),
    },
  ],
};

class Database {
  constructor() {
    this.init();
  }

  init() {
    if (!fs.existsSync(DB_FILE)) {
      this.save(initialData);
    }
  }

  read() {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(data);
    } catch (e) {
      return initialData;
    }
  }

  save(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  }

  // User Auth
  findUserByEmailOrPhone(identifier) {
    const db = this.read();
    return db.users.find(
      (u) => u.email === identifier || u.phone === identifier || `+91 ${u.phone}` === identifier
    );
  }

  createUser(user) {
    const db = this.read();
    const newUser = {
      id: `usr_${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...user,
    };
    db.users.push(newUser);

    if (newUser.role === 'technician') {
      db.technicians.push({
        id: `tech_${Date.now()}`,
        userId: newUser.id,
        name: newUser.name,
        phone: newUser.phone,
        category: newUser.category || 'AC & Appliance Repair',
        rating: 5.0,
        kycStatus: 'verified',
        isOnline: true,
        todayEarnings: 0,
        weeklyEarnings: 0,
        completedJobsCount: 0,
      });
    }

    this.save(db);
    return newUser;
  }

  // Bookings
  getBookings() {
    return this.read().bookings;
  }

  createBooking(booking) {
    const db = this.read();
    const newBooking = {
      id: `HH-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      status: 'ongoing',
      partnerStep: 'navigating',
      otp: Math.floor(1000 + Math.random() * 9000).toString(),
      ...booking,
    };
    db.bookings.unshift(newBooking);
    this.save(db);
    return newBooking;
  }

  updateBookingStep(bookingId, partnerStep, status) {
    const db = this.read();
    const index = db.bookings.findIndex((b) => b.id === bookingId);
    if (index !== -1) {
      if (partnerStep) db.bookings[index].partnerStep = partnerStep;
      if (status) db.bookings[index].status = status;
      this.save(db);
      return db.bookings[index];
    }
    return null;
  }

  // Technicians
  getTechnicians() {
    return this.read().technicians;
  }

  updateTechnicianStatus(userId, isOnline) {
    const db = this.read();
    const tech = db.technicians.find((t) => t.userId === userId || t.name === userId);
    if (tech) {
      tech.isOnline = isOnline;
      this.save(db);
      return tech;
    }
    return null;
  }
}

export const db = new Database();
