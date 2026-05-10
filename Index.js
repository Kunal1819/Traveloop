const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'traveloop_wins_123';

// ==========================================
// MIDDLEWARE: Protects routes with JWT
// ==========================================
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// ==========================================
// 1. AUTHENTICATION
// ==========================================
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword }
    });
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.json({ token, userId: user.id });
  } catch (error) {
    res.status(400).json({ error: 'User already exists or invalid data' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id }, JWT_SECRET);
  res.json({ token, userId: user.id });
});

// ==========================================
// 2. CORE TRIP LOGIC
// ==========================================
app.post('/api/trips', authenticateToken, async (req, res) => {
  const { title } = req.body;
  const trip = await prisma.trip.create({
    data: { title, userId: req.user.id }
  });
  res.json(trip);
});

app.post('/api/trips/:tripId/stops', authenticateToken, async (req, res) => {
  const { name, position } = req.body;
  const stop = await prisma.stop.create({
    data: { name, position, tripId: parseInt(req.params.tripId) }
  });
  res.json(stop);
});

app.post('/api/stops/:stopId/activities', authenticateToken, async (req, res) => {
  const { name, cost, category } = req.body;
  const activity = await prisma.activity.create({
    data: { name, cost: parseFloat(cost), category, stopId: parseInt(req.params.stopId) }
  });
  res.json(activity);
});

// ==========================================
// 3. THE "HACKATHON WINNER" ENDPOINTS
// ==========================================

// Aggregated Budget Chart Data
app.get('/api/trips/:tripId/budget', authenticateToken, async (req, res) => {
  const tripId = parseInt(req.params.tripId);
  const budgetData = await prisma.activity.groupBy({
    by: ['category'],
    where: { stop: { tripId: tripId } },
    _sum: { cost: true }
  });
  res.json(budgetData);
});

// Public Read-Only Share Link (NO AUTH REQUIRED)
app.get('/api/share/:shareToken', async (req, res) => {
  const trip = await prisma.trip.findUnique({
    where: { share_token: req.params.shareToken },
    include: {
      stops: {
        include: { activities: true },
        orderBy: { position: 'asc' }
      }
    }
  });
  if (!trip) return res.status(404).json({ error: 'Trip not found' });
  res.json(trip);
});

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Traveloop API is LIVE 🚀' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});