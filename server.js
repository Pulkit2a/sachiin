import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// REST API Endpoints for Authentication & Data Persistence

// 1. Auth Register
app.post('/api/auth/register', (req, res) => {
  try {
    const { email, phone, name, password, role, city, category } = req.body;
    
    if (!name || (!email && !phone) || !password || !role) {
      return res.status(400).json({ error: 'Missing required registration fields' });
    }

    const existing = db.findUserByEmailOrPhone(email || phone);
    if (existing) {
      return res.status(400).json({ error: 'User with this email/phone already exists' });
    }

    const user = db.createUser({ email, phone, name, password, role, city: city || 'Bengaluru', category });
    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Auth Login (Customer, Technician, Admin)
app.post('/api/auth/login', (req, res) => {
  try {
    const { identifier, password, role } = req.body;
    
    // Check Admin hardcoded or DB fallback
    if (role === 'admin' && (identifier === 'admin@heroshomes.com' || identifier === 'admin') && password === 'admin123') {
      return res.json({
        success: true,
        user: {
          id: 'usr_admin_1',
          name: 'Heros Homes Administrator',
          email: 'admin@heroshomes.com',
          role: 'admin',
        },
      });
    }

    const user = db.findUserByEmailOrPhone(identifier);
    if (!user) {
      return res.status(401).json({ error: 'Invalid user credentials. Please register first.' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    if (role && user.role !== role) {
      return res.status(403).json({ error: `Account found, but it is registered as ${user.role}. Please use the ${user.role} portal.` });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Bookings API
app.get('/api/bookings', (req, res) => {
  res.json({ bookings: db.getBookings() });
});

app.post('/api/bookings', (req, res) => {
  try {
    const booking = db.createBooking(req.body);
    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/bookings/:id/step', (req, res) => {
  try {
    const { partnerStep, status } = req.body;
    const updated = db.updateBookingStep(req.params.id, partnerStep, status);
    if (!updated) return res.status(404).json({ error: 'Booking not found' });
    res.json({ success: true, booking: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Technician Duty API
app.get('/api/technicians', (req, res) => {
  res.json({ technicians: db.getTechnicians() });
});

app.put('/api/technicians/status', (req, res) => {
  try {
    const { userId, isOnline } = req.body;
    const tech = db.updateTechnicianStatus(userId, isOnline);
    res.json({ success: true, technician: tech });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Full Database Tables API (For Admin / Developer Inspection)
app.get('/api/db', (req, res) => {
  res.json(db.read());
});

// Fallback to React App
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`  Heros Homes REST API & DB running at: http://localhost:${PORT}`);
  console.log(`==================================================\n`);
});
