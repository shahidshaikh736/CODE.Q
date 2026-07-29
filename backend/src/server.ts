/* ============================================
   CodeQuest Fastify Backend (TypeScript)
   ============================================ */

import fastify from 'fastify';
import cors from '@fastify/cors';
import { Pool } from 'pg';
import Redis from 'ioredis';
import * as dotenv from 'dotenv';
import { Resend } from 'resend';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const app = fastify({ logger: true });

const PORT = Number(process.env.PORT) || 5000;
const PG_CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/codequest';
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// ── Auth Config ──
const JWT_SECRET = process.env.JWT_SECRET || 'codequest_jwt_super_secret_key_2024';
const OTP_EXPIRY_MINUTES = Number(process.env.OTP_EXPIRY_MINUTES) || 10;
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';

// ── Resend Email Client ──
let resendClient: Resend | null = null;
if (RESEND_API_KEY && !RESEND_API_KEY.includes('your_resend')) {
  resendClient = new Resend(RESEND_API_KEY);
  setTimeout(() => app.log.info('📧 Resend email client ready.'), 100);
} else {
  setTimeout(() => app.log.warn('⚠️ RESEND_API_KEY not set — OTP will print to console (dev mode). Get free key: resend.com'), 100);
}

// ── Auth Stores & Persistence ──
interface AuthUser {
  email: string;
  username: string;
  passwordHash: string;
  createdAt: number;
}
interface OtpRecord {
  otp: string;
  expiry: number;
  email: string;
}

const authUsers = new Map<string, AuthUser>(); // key: email (lowercase)
const authUsersByUsername = new Map<string, string>(); // username → email
const otpStore = new Map<string, OtpRecord>(); // key: email

const USERS_FILE = path.join(__dirname, '../users_db.json');

function loadUsersFromDisk() {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      const list: AuthUser[] = JSON.parse(data);
      for (const u of list) {
        if (u.email && u.username) {
          authUsers.set(u.email.toLowerCase(), u);
          authUsersByUsername.set(u.username.toLowerCase(), u.email.toLowerCase());
        }
      }
      console.log(`✅ Loaded ${authUsers.size} users from disk persistence.`);
    }
  } catch (err) {
    console.error('Error loading users_db.json:', err);
  }
}

function saveUsersToDisk() {
  try {
    const list = Array.from(authUsers.values());
    fs.writeFileSync(USERS_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving users_db.json:', err);
  }
}

async function saveUser(user: AuthUser) {
  authUsers.set(user.email.toLowerCase(), user);
  authUsersByUsername.set(user.username.toLowerCase(), user.email.toLowerCase());
  saveUsersToDisk();

  if (pgPool) {
    try {
      await pgPool.query(
        `INSERT INTO users (email, username, password_hash, created_at)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (email) DO UPDATE SET password_hash = $3;`,
        [user.email.toLowerCase(), user.username, user.passwordHash, user.createdAt]
      );
    } catch (err) {
      app.log.error(err, 'PostgreSQL user save error');
    }
  }
}

// ── Helper: Generate 6-digit OTP ──
function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ── Helper: Send OTP Email via Resend ──
async function sendOtpEmail(toEmail: string, otp: string, username: string): Promise<boolean> {
  if (!resendClient) {
    // Dev fallback — print OTP to console
    console.log(`\n🔐 [DEV MODE — Set RESEND_API_KEY in .env to send real emails]`);
    console.log(`   OTP for ${toEmail}: ${otp}\n`);
    return true;
  }

  try {
    const { error } = await resendClient.emails.send({
      from: 'CODE.Q Platform <onboarding@resend.dev>',
      to: [toEmail],
      subject: 'Your CODE.Q Login OTP',
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#080c14;font-family:'Courier New',monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="480" cellpadding="0" cellspacing="0" style="background:#0f1525;border:1px solid #1e2d45;border-radius:16px;overflow:hidden;">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#06b6d4,#6366f1);padding:28px 36px;">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right:14px;">
                  <div style="width:42px;height:42px;background:rgba(255,255,255,0.15);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:bold;color:white;text-align:center;line-height:42px;">&lt;/&gt;</div>
                </td>
                <td>
                  <div style="font-size:20px;font-weight:800;color:white;letter-spacing:3px;">CODE.Q</div>
                  <div style="font-size:10px;color:rgba(255,255,255,0.7);letter-spacing:2px;text-transform:uppercase;margin-top:2px;">Developer Assessment Workspace</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 36px 20px;">
            <p style="margin:0 0 6px;font-size:15px;color:#94a3b8;">Hi <strong style="color:#06b6d4;">${username}</strong>,</p>
            <p style="margin:0 0 28px;font-size:14px;color:#64748b;line-height:1.7;">Aapne CODE.Q platform par login request diya hai. Neeche diya gaya <strong style="color:#e2e8f0;">One-Time Password</strong> use karein:</p>
            <!-- OTP Box -->
            <div style="background:#0a0e1a;border:2px solid #06b6d4;border-radius:12px;padding:28px;text-align:center;margin:0 0 28px;box-shadow:0 0 30px rgba(6,182,212,0.15);">
              <div style="font-size:10px;letter-spacing:3px;color:#64748b;text-transform:uppercase;margin-bottom:10px;">Your OTP Code</div>
              <div style="font-size:42px;font-weight:900;letter-spacing:12px;color:#06b6d4;font-family:'Courier New',monospace;">${otp}</div>
            </div>
            <!-- Info -->
            <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:20px;">
              <tr>
                <td style="background:#1a2035;border-radius:8px;padding:14px 16px;">
                  <p style="margin:0;font-size:12px;color:#64748b;">⏱ <strong style="color:#94a3b8;">Valid for:</strong> ${OTP_EXPIRY_MINUTES} minutes</p>
                  <p style="margin:6px 0 0;font-size:12px;color:#64748b;">🔒 <strong style="color:#94a3b8;">Security:</strong> Do not share this OTP with anyone.</p>
                  <p style="margin:6px 0 0;font-size:12px;color:#64748b;">⚠️ Agar aapne login nahi kiya, is email ko ignore karein.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:16px 36px 28px;border-top:1px solid #1e2d45;">
            <p style="margin:0;font-size:11px;color:#334155;text-align:center;">CODE.Q &copy; 2024 — Interactive Developer Assessment Platform</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
      `
    });

    if (error) {
      app.log.error(error, 'Resend email error');
      console.log(`\n🔐 [FALLBACK] OTP for ${toEmail}: ${otp}\n`);
    } else {
      app.log.info(`📧 OTP email sent to ${toEmail} via Resend`);
    }
    return true;
  } catch (err) {
    app.log.error(err, 'Resend send failed');
    console.log(`\n🔐 [FALLBACK] OTP for ${toEmail}: ${otp}\n`);
    return true;
  }
}

// Admin secret token — stored server-side only, never sent to frontend
const ADMIN_SECRET_TOKEN = process.env.ADMIN_SECRET_TOKEN || 'codequest_admin_secret_2024';

// Admin token middleware helper
function validateAdminToken(request: any, reply: any): boolean {
  const token = request.headers['x-admin-token'];
  if (!token || token !== ADMIN_SECRET_TOKEN) {
    reply.status(403).send({ error: 'Forbidden: Invalid or missing admin token.' });
    return false;
  }
  return true;
}

// Database & Cache status flags
let pgPool: Pool | null = null;
let redisClient: Redis | null = null;

// In-Memory fallback database for players
const memoryDb = new Map<string, any>();

// ── Global Config State ──
let disabledLanguages: string[] = [];
const SETTINGS_FILE = path.join(__dirname, '../settings_db.json');

function loadSettingsFromDisk() {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, 'utf-8');
      disabledLanguages = JSON.parse(data).disabledLanguages || [];
      console.log(`✅ Loaded ${disabledLanguages.length} disabled languages from disk.`);
    }
  } catch (err) {
    console.error('Error loading settings_db.json:', err);
  }
}

function saveSettingsToDisk() {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify({ disabledLanguages }, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving settings_db.json:', err);
  }
}

const PLAYERS_FILE = path.join(__dirname, '../players_db.json');

function loadPlayersFromDisk() {
  try {
    if (fs.existsSync(PLAYERS_FILE)) {
      const data = fs.readFileSync(PLAYERS_FILE, 'utf-8');
      const list = JSON.parse(data);
      for (const p of list) {
        if (p.name) memoryDb.set(p.name, p.data);
      }
      console.log(`✅ Loaded ${memoryDb.size} players from disk persistence.`);
    }
  } catch (err) {
    console.error('Error loading players_db.json:', err);
  }
}

function savePlayersToDisk() {
  try {
    const list = Array.from(memoryDb.entries()).map(([name, data]) => ({ name, data }));
    fs.writeFileSync(PLAYERS_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving players_db.json:', err);
  }
}

// Heuristic fallback for AI queries (matching original frontend copilot behavior)
function generateLocalAiReply(query: string): string {
  const q = query.toLowerCase();
  
  if (q.includes('grid')) {
    return `### CSS Grid Layout Boilerplate:
\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.grid-item-wide {
  grid-column: span 2;
}
\`\`\`
**Explanation:** \`grid-template-columns: repeat(3, 1fr);\` creates a 3-column responsive layout where columns take equal fractional spaces.`;
  }
  
  if (q.includes('express') || q.includes('router') || q.includes('backend')) {
    return `### Express Router Boilerplate:
\`\`\`javascript
const express = require('express');
const router = express.Router();

// GET all active logs
router.get('/deployments', (req, res) => {
  res.status(200).json({ success: true, count: 2 });
});

module.exports = router;
\`\`\`
**Explanation:** Express Routers isolate path handlers, exporting middlewares that attach cleanly to root application ports.`;
  }

  if (q.includes('join') || q.includes('sql') || q.includes('database')) {
    return `### SQL Relational JOIN Query:
\`\`\`sql
SELECT u.id, u.username, p.title
FROM users u
INNER JOIN profiles p ON u.id = p.user_id
WHERE p.is_premium = 1;
\`\`\`
**Explanation:** \`INNER JOIN\` queries select records with matching values in both tables, using aliases (\`u\` and \`p\`) to write clean filters.`;
  }

  if (q.includes('promise') || q.includes('async') || q.includes('es6')) {
    return `### Async/Await ES6 Pattern:
\`\`\`javascript
async function fetchSystemMetrics(endpoint) {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.metrics;
  } catch (error) {
    console.error("Pipeline failure:", error);
  }
}
\`\`\`
**Explanation:** \`async/await\` simplifies promise resolution, keeping sequential syntax clean and wrapping checks inside structured \`try/catch\` blocks.`;
  }

  return `I can help you build templates for that! Here is a boilerplate coding checklist:
1. Initialize structure & variables.
2. Setup modular interfaces & error handling.
3. Validate return criteria.
Try asking specifically about **CSS Grid**, **Express Router**, **SQL JOIN**, or **ES6 Promises**!`;
}

// Bootstrap connections
async function initConnections() {
  // We no longer load from local disk json, PostgreSQL is the source of truth!

  // 1. Initialize PostgreSQL
  try {
    pgPool = new Pool({ connectionString: PG_CONNECTION_STRING, connectionTimeoutMillis: 3000 });
    await pgPool.query('SELECT NOW()');
    app.log.info('🚀 PostgreSQL connected successfully.');
    
    // Auto-bootstrap schemas
    await pgPool.query(`
      CREATE TABLE IF NOT EXISTS players (
        name VARCHAR(100) PRIMARY KEY,
        data JSONB NOT NULL,
        xp INTEGER NOT NULL DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS users (
        email VARCHAR(255) PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at BIGINT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS settings (
        id VARCHAR(50) PRIMARY KEY,
        data JSONB NOT NULL
      );
    `);

    // Load users from DB
    const res = await pgPool.query('SELECT * FROM users');
    for (const row of res.rows) {
      const u: AuthUser = {
        email: row.email,
        username: row.username,
        passwordHash: row.password_hash,
        createdAt: Number(row.created_at) || Date.now()
      };
      authUsers.set(u.email.toLowerCase(), u);
      authUsersByUsername.set(u.username.toLowerCase(), u.email.toLowerCase());
    }
    // Load config from DB
    const settingsRes = await pgPool.query("SELECT data FROM settings WHERE id = 'global_config'");
    if (settingsRes.rows.length > 0) {
      disabledLanguages = settingsRes.rows[0].data.disabledLanguages || [];
    } else {
      await pgPool.query("INSERT INTO settings (id, data) VALUES ('global_config', $1)", [JSON.stringify({ disabledLanguages })]);
    }

    app.log.info('📋 Database tables bootstrapped successfully.');
  } catch (err) {
    app.log.warn('⚠️ PostgreSQL connection failed. Running with in-memory & disk database fallback.');
    pgPool = null;
    loadSettingsFromDisk();
  }

  // 2. Initialize Redis
  try {
    redisClient = new Redis(REDIS_URL, { maxRetriesPerRequest: 1, connectTimeout: 3000 });
    redisClient.on('error', () => {
      // Suppress logs to avoid pollution
    });
    await redisClient.ping();
    app.log.info('🚀 Redis connected successfully.');
  } catch (err) {
    app.log.warn('⚠️ Redis connection failed. Running without Redis cache.');
    redisClient = null;
  }
}

// Register CORS
app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

// ── Health Endpoint ──
app.get('/health', async () => {
  return {
    status: 'ok',
    services: {
      postgres: pgPool !== null ? 'connected' : 'fallback_memory_mode',
      redis: redisClient !== null ? 'connected' : 'disabled'
    }
  };
});

// ── Config Endpoints ──
app.get('/api/config/languages', async () => {
  return { success: true, disabledLanguages };
});

app.post('/api/admin/config/languages', async (request: any, reply) => {
  if (!validateAdminToken(request, reply)) return;
  const { disabledLanguages: newLangs } = request.body || {};
  if (Array.isArray(newLangs)) {
    disabledLanguages = newLangs;
    saveSettingsToDisk();
    if (pgPool) {
      try {
        await pgPool.query("UPDATE settings SET data = $1 WHERE id = 'global_config'", [JSON.stringify({ disabledLanguages })]);
      } catch (err) {
        app.log.error(err, 'PostgreSQL settings save error');
      }
    }
    return { success: true, message: 'Languages config updated.' };
  }
  return reply.status(400).send({ error: 'Invalid data' });
});

// ════════════════════════════════════════
//  AUTH ENDPOINTS
// ════════════════════════════════════════

// ── Register ──
app.post('/api/auth/register', async (request: any, reply) => {
  const { email, username, password } = request.body || {};

  if (!email || !username || !password) {
    return reply.status(400).send({ error: 'Email, username and password are required.' });
  }

  const emailLC = email.trim().toLowerCase();
  const usernameLC = username.trim().toLowerCase();

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLC)) {
    return reply.status(400).send({ error: 'A valid email address is required.' });
  }

  // Validate username (3-20 chars, alphanumeric, underscore, spaces)
  if (!/^[a-z0-9_ ]{3,20}$/.test(usernameLC)) {
    return reply.status(400).send({ error: 'Username must be 3-20 characters (letters, numbers, underscore, space).' });
  }

  // Validate password strength
  if (password.length < 6) {
    return reply.status(400).send({ error: 'Password must be at least 6 characters.' });
  }

  // Check if email already exists
  if (authUsers.has(emailLC)) {
    return reply.status(409).send({ error: 'An account with this email already exists. Please log in.' });
  }

  // Check if username already taken
  if (authUsersByUsername.has(usernameLC)) {
    return reply.status(409).send({ error: 'This username is already taken. Please try another one.' });
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  const newUser: AuthUser = {
    email: emailLC,
    username: username.trim(),
    passwordHash,
    createdAt: Date.now()
  };

  await saveUser(newUser);

  app.log.info(`✅ New user registered: ${username} (${emailLC})`);
  return { success: true, message: 'Account created successfully! Please log in.' };
});

// ── Login (Direct Sign-In with password check) ──
app.post('/api/auth/login', async (request: any, reply) => {
  const { identifier, password } = request.body || {};

  if (!identifier || !password) {
    return reply.status(400).send({ error: 'Email/Username and password are required.' });
  }

  const id = identifier.trim().toLowerCase();

  // Resolve email from identifier (email or username)
  let email = id;
  if (!id.includes('@')) {
    const resolvedEmail = authUsersByUsername.get(id);
    if (resolvedEmail) {
      email = resolvedEmail;
    }
  }

  let user = authUsers.get(email);

  if (!user) {
    return reply.status(401).send({ error: 'Account not found. Please create a new account (Register) first.' });
  }

  // Verify password
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return reply.status(401).send({ error: 'Incorrect password. Please try again.' });
  }

  // Issue JWT token (valid 7 days)
  const token = jwt.sign(
    { email: user.email, username: user.username },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  app.log.info(`🔑 User logged in successfully: ${user.username}`);
  return {
    success: true,
    token,
    user: { email: user.email, username: user.username }
  };
});

// ── Delete Account ──
app.post('/api/auth/delete', async (request: any, reply) => {
  const { email } = request.body || {};
  if (!email) {
    return reply.status(400).send({ error: 'Email is required.' });
  }

  const emailLC = email.trim().toLowerCase();
  const user = authUsers.get(emailLC);
  
  if (!user) {
    return reply.status(404).send({ error: 'Account not found.' });
  }

  // Remove from memory
  authUsers.delete(emailLC);
  authUsersByUsername.delete(user.username.toLowerCase());
  
  // Remove player from memory
  memoryDb.delete(user.username);
  
  // Delete from PostgreSQL
  if (pgPool) {
    try {
      await pgPool.query('DELETE FROM players WHERE name = $1', [user.username]);
      await pgPool.query('DELETE FROM users WHERE email = $1', [emailLC]);
      app.log.info(`🗑️ User deleted from database: ${user.username} (${emailLC})`);
    } catch (err) {
      app.log.error(err, 'PostgreSQL user delete error');
    }
  }

  return { success: true, message: 'Account deleted successfully.' };
});

// ── Login (Step 2: Verify OTP → issue JWT) ──
app.post('/api/auth/verify-otp', async (request: any, reply) => {
  const { email, otp } = request.body || {};

  if (!email || !otp) {
    return reply.status(400).send({ error: 'Email and OTP are required.' });
  }

  const emailLC = email.trim().toLowerCase();
  const record = otpStore.get(emailLC);

  if (!record) {
    return reply.status(400).send({ error: 'OTP not found. Please log in first.' });
  }

  if (Date.now() > record.expiry) {
    otpStore.delete(emailLC);
    return reply.status(400).send({ error: `OTP has expired (${OTP_EXPIRY_MINUTES} min limit). Please log in again.` });
  }

  if (record.otp !== otp.toString().trim()) {
    return reply.status(400).send({ error: 'Incorrect OTP. Please check again.' });
  }

  // OTP verified — clear it
  otpStore.delete(emailLC);

  const user = authUsers.get(emailLC);
  if (!user) {
    return reply.status(404).send({ error: 'User not found.' });
  }

  // Issue JWT token (valid 7 days)
  const token = jwt.sign(
    { email: user.email, username: user.username },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  app.log.info(`🔑 User logged in successfully: ${user.username}`);
  return {
    success: true,
    token,
    user: { email: user.email, username: user.username }
  };
});

// ── Verify Token (check if session is valid) ──
app.get('/api/auth/me', async (request: any, reply) => {
  const authHeader = request.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.status(401).send({ error: 'Token not found.' });
  }

  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return { success: true, user: { email: decoded.email, username: decoded.username } };
  } catch {
    return reply.status(401).send({ error: 'Token is invalid or has expired.' });
  }
});

// ── Logout (client-side token clear, server just acknowledges) ──
app.post('/api/auth/logout', async () => {
  return { success: true, message: 'Logout successful.' };
});

// ── Check username availability ──
app.get('/api/auth/check-username/:username', async (request: any, reply) => {
  const { username } = request.params;
  const usernameLC = (username || '').toLowerCase().trim();
  if (!/^[a-z0-9_ ]{3,20}$/.test(usernameLC)) {
    return { available: false, reason: 'Invalid format' };
  }
  const taken = authUsersByUsername.has(usernameLC);
  return { available: !taken };
});

// ── Player Save Endpoint ──
app.post('/api/player/save', async (request, reply) => {
  const playerData: any = request.body;
  if (!playerData || !playerData.name) {
    return reply.status(400).send({ error: 'Invalid player data' });
  }

  const name = playerData.name;
  const xp = playerData.xp || 0;

  if (pgPool) {
    try {
      await pgPool.query(
        `INSERT INTO players (name, data, xp, updated_at) 
         VALUES ($1, $2, $3, NOW()) 
         ON CONFLICT (name) DO UPDATE 
         SET data = $2, xp = $3, updated_at = NOW();`,
        [name, playerData, xp]
      );
    } catch (err) {
      app.log.error(err, 'Database write error, writing to memory fallback');
      memoryDb.set(name, playerData);
    }
  } else {
    memoryDb.set(name, playerData);
  }

  // Always save to disk fallback so player data isn't lost
  savePlayersToDisk();

  // Update Redis Leaderboard cache (using sorted set) if online
  if (redisClient) {
    try {
      await redisClient.zadd('leaderboard', xp, name);
    } catch (err) {
      app.log.error(err, 'Redis leaderboard cache update error');
    }
  }

  return { success: true, message: 'Player state saved successfully' };
});

// ── Player Load Endpoint ──
app.get('/api/player/load/:name', async (request: any, reply) => {
  const { name } = request.params;
  if (!name) {
    return reply.status(400).send({ error: 'Player name required' });
  }

  let pData: any = null;
  if (pgPool) {
    try {
      const result = await pgPool.query('SELECT data FROM players WHERE name = $1', [name]);
      if (result.rows.length > 0) {
        pData = result.rows[0].data;
      }
    } catch (err) {
      app.log.error(err, 'Database load error, loading from memory fallback');
    }
  }

  if (!pData && memoryDb.has(name)) {
    pData = memoryDb.get(name);
  }

  if (pData) {
    if (pData.isDeleted) {
      return reply.status(410).send({ error: 'Player profile has been deleted', isDeleted: true });
    }
    if (pData.isBanned) {
      return reply.status(403).send({ error: 'Player profile has been suspended', isBanned: true });
    }
    return pData;
  }

  return reply.status(404).send({ error: 'Player profile not found' });
});

// ── Leaderboard Query Endpoint ──
app.get('/api/leaderboard', async (request, reply) => {
  // 1. Try to read from Redis
  if (redisClient) {
    try {
      const membersWithScores = await redisClient.zrevrange('leaderboard', 0, 9, 'WITHSCORES');
      const leaderboardList: any[] = [];
      for (let i = 0; i < membersWithScores.length; i += 2) {
        leaderboardList.push({
          name: membersWithScores[i],
          xp: Number(membersWithScores[i + 1])
        });
      }
      if (leaderboardList.length > 0) {
        return { source: 'redis', leaderboard: leaderboardList };
      }
    } catch (err) {
      app.log.error(err, 'Redis leaderboard read error, querying PG');
    }
  }

  // 2. Query Postgres
  if (pgPool) {
    try {
      const result = await pgPool.query('SELECT name, xp, data FROM players ORDER BY xp DESC;');
      const activeRows = result.rows
        .filter(r => !r.data.isDeleted)
        .slice(0, 10)
        .map(r => ({ name: r.name, xp: r.xp }));
      return { source: 'postgres', leaderboard: activeRows };
    } catch (err) {
      app.log.error(err, 'Postgres leaderboard query error');
    }
  }

  // 3. Fallback to Memory database mapping
  const sortedMemory = Array.from(memoryDb.values())
    .filter(p => !p.isDeleted)
    .map(p => ({ name: p.name, xp: p.xp }))
    .sort((a, b) => b.xp - a.xp)
    .slice(0, 10);


  return { source: 'memory', leaderboard: sortedMemory };
});

// ── AI Copilot Chat Endpoint ──
app.post('/api/ai/chat', async (request: any, reply) => {
  const { message } = request.body;
  if (!message) {
    return reply.status(400).send({ error: 'Message query required' });
  }

  try {
    // Attempt request to Python AI Microservice
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000); // 2 second timeout

    const aiRes = await fetch(`${AI_SERVICE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: message }),
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (aiRes.ok) {
      const aiData = await aiRes.json() as any;
      return { response: aiData.reply, source: 'python-service' };
    }
  } catch (err) {
    app.log.warn('⚠️ AI Service is offline. Using local heuristics engine.');
  }

  // Fallback to local response
  const localReply = generateLocalAiReply(message);
  return { response: localReply, source: 'local-heuristics' };
});

// ── Admin: List All Registered Players ──
app.get('/api/admin/players', async (request: any, reply) => {
  if (!validateAdminToken(request, reply)) return;
  if (pgPool) {
    try {
      const result = await pgPool.query('SELECT name, xp, data, updated_at FROM players ORDER BY xp DESC;');
      const list = result.rows.map(r => ({
        name: r.name,
        xp: r.xp,
        level: r.data.level || 1,
        deviceType: r.data.deviceType || 'windows',
        avatar: r.data.avatar || '⚡',
        updatedAt: r.updated_at,
        isDeleted: r.data.isDeleted || false,
        isBanned: r.data.isBanned || false,
        challengesCompleted: r.data.completedChallenges ? r.data.completedChallenges.length : 0,
        achievements: r.data.achievements || [],
        currentRealm: r.data.currentRealm || null
      }));
      return { source: 'postgres', players: list };
    } catch (err) {
      app.log.error(err, 'Postgres admin loading error');
    }
  }

  // Fallback memory list
  const list = Array.from(memoryDb.values()).map(p => ({
    name: p.name,
    xp: p.xp,
    level: p.level || 1,
    deviceType: p.deviceType || 'windows',
    avatar: p.avatar || '⚡',
    updatedAt: new Date().toISOString(),
    isDeleted: p.isDeleted || false,
    isBanned: p.isBanned || false,
    challengesCompleted: p.completedChallenges ? p.completedChallenges.length : 0,
    achievements: p.achievements || [],
    currentRealm: p.currentRealm || null
  }));
  return { source: 'memory', players: list };
});

// ── Admin: Update Player Statistics ──
app.post('/api/admin/player/update', async (request: any, reply) => {
  if (!validateAdminToken(request, reply)) return;
  const { name, xp, level } = request.body;
  if (!name) {
    return reply.status(400).send({ error: 'Player name required' });
  }

  let pData: any = null;
  if (pgPool) {
    try {
      const res = await pgPool.query('SELECT data FROM players WHERE name = $1', [name]);
      if (res.rows.length > 0) {
        pData = res.rows[0].data;
      }
    } catch (err) {
      app.log.error(err);
    }
  }
  if (!pData && memoryDb.has(name)) {
    pData = memoryDb.get(name);
  }

  if (!pData) {
    return reply.status(404).send({ error: 'Player profile not found' });
  }

  // Update properties
  pData.xp = Number(xp);
  pData.level = Number(level);

  if (pgPool) {
    try {
      await pgPool.query(
        'UPDATE players SET data = $1, xp = $2, updated_at = NOW() WHERE name = $3',
        [pData, Number(xp), name]
      );
    } catch (err) {
      app.log.error(err);
      memoryDb.set(name, pData);
    }
  } else {
    memoryDb.set(name, pData);
  }

  if (redisClient) {
    try {
      await redisClient.zadd('leaderboard', Number(xp), name);
    } catch (err) {
      app.log.error(err);
    }
  }

  return { success: true, message: 'Player profile updated successfully' };
});

// ── Admin: Delete Player Account ──
app.delete('/api/admin/player/delete/:name', async (request: any, reply) => {
  if (!validateAdminToken(request, reply)) return;
  const { name } = request.params;
  if (!name) {
    return reply.status(400).send({ error: 'Player name required' });
  }

  let pData: any = null;
  if (pgPool) {
    try {
      const res = await pgPool.query('SELECT data FROM players WHERE name = $1', [name]);
      if (res.rows.length > 0) {
        pData = res.rows[0].data;
      }
    } catch (err) {
      app.log.error(err);
    }
  }
  if (!pData && memoryDb.has(name)) {
    pData = memoryDb.get(name);
  }

  if (pData) {
    pData.isDeleted = true;
    if (pgPool) {
      try {
        await pgPool.query(
          'UPDATE players SET data = $1, updated_at = NOW() WHERE name = $2',
          [pData, name]
        );
      } catch (err) {
        app.log.error(err);
      }
    } else {
      memoryDb.set(name, pData);
    }
  }

  if (redisClient) {
    try {
      await redisClient.zrem('leaderboard', name);
    } catch (err) {
      app.log.error(err);
    }
  }

  return { success: true, message: 'Player profile marked as deleted successfully' };
});

// ── Admin: Restore Player Account ──
app.post('/api/admin/player/restore/:name', async (request: any, reply) => {
  if (!validateAdminToken(request, reply)) return;
  const { name } = request.params;
  if (!name) {
    return reply.status(400).send({ error: 'Player name required' });
  }

  let pData: any = null;
  if (pgPool) {
    try {
      const res = await pgPool.query('SELECT data FROM players WHERE name = $1', [name]);
      if (res.rows.length > 0) {
        pData = res.rows[0].data;
      }
    } catch (err) {
      app.log.error(err);
    }
  }
  if (!pData && memoryDb.has(name)) {
    pData = memoryDb.get(name);
  }

  if (pData) {
    pData.isDeleted = false;
    if (pgPool) {
      try {
        await pgPool.query(
          'UPDATE players SET data = $1, xp = $2, updated_at = NOW() WHERE name = $3',
          [pData, pData.xp || 0, name]
        );
      } catch (err) {
        app.log.error(err);
      }
    } else {
      memoryDb.set(name, pData);
    }

    if (redisClient) {
      try {
        await redisClient.zadd('leaderboard', pData.xp || 0, name);
      } catch (err) {
        app.log.error(err);
      }
    }

    return { success: true, message: 'Player profile restored successfully' };
  }

  return reply.status(404).send({ error: 'Player profile not found' });
});

// ── Admin: Ban / Suspend Account ──
app.post('/api/admin/player/ban/:name', async (request: any, reply) => {
  if (!validateAdminToken(request, reply)) return;
  const { name } = request.params;
  const { banned } = request.body || { banned: true };
  if (!name) return reply.status(400).send({ error: 'Player name required' });

  let pData: any = null;
  if (pgPool) {
    try {
      const res = await pgPool.query('SELECT data FROM players WHERE name = $1', [name]);
      if (res.rows.length > 0) pData = res.rows[0].data;
    } catch (err) { app.log.error(err); }
  }
  if (!pData && memoryDb.has(name)) pData = memoryDb.get(name);

  if (pData) {
    pData.isBanned = banned;
    if (pgPool) {
      try {
        await pgPool.query('UPDATE players SET data = $1, updated_at = NOW() WHERE name = $2', [pData, name]);
      } catch (err) { app.log.error(err); }
    } else {
      memoryDb.set(name, pData);
    }
    return { success: true, message: `Player profile ${banned ? 'banned' : 'unbanned'} successfully` };
  }
  return reply.status(404).send({ error: 'Player profile not found' });
});

// ── Admin: Direct Alert ──
app.post('/api/admin/player/alert/:name', async (request: any, reply) => {
  if (!validateAdminToken(request, reply)) return;
  const { name } = request.params;
  const { message } = request.body;
  if (!name || !message) return reply.status(400).send({ error: 'Player name and message required' });

  let pData: any = null;
  if (pgPool) {
    try {
      const res = await pgPool.query('SELECT data FROM players WHERE name = $1', [name]);
      if (res.rows.length > 0) pData = res.rows[0].data;
    } catch (err) { app.log.error(err); }
  }
  if (!pData && memoryDb.has(name)) pData = memoryDb.get(name);

  if (pData) {
    if (!pData.alerts) pData.alerts = [];
    pData.alerts.push({ message, timestamp: Date.now() });
    
    if (pgPool) {
      try {
        await pgPool.query('UPDATE players SET data = $1, updated_at = NOW() WHERE name = $2', [pData, name]);
      } catch (err) { app.log.error(err); }
    } else {
      memoryDb.set(name, pData);
    }
    return { success: true, message: 'Alert sent successfully' };
  }
  return reply.status(404).send({ error: 'Player profile not found' });
});

// ── Admin: Broadcast System Alert ──
const globalBroadcasts: any[] = [];

app.post('/api/admin/broadcast', async (request: any, reply) => {
  if (!validateAdminToken(request, reply)) return;
  const { message, priority, audience } = request.body;
  if (!message) {
    return reply.status(400).send({ error: 'Broadcast message query required' });
  }
  
  const broadcast = {
    id: Date.now().toString(),
    message,
    priority: priority || 'info',
    audience: audience || 'all',
    timestamp: Date.now()
  };
  globalBroadcasts.push(broadcast);
  if (globalBroadcasts.length > 50) globalBroadcasts.shift();
  
  app.log.info(`📢 ADMINISTRATIVE BROADCAST SYSTEM ALERT: [${broadcast.priority}] ${message}`);
  return { success: true, message: 'Broadcast notification logged successfully', broadcast };
});

app.get('/api/broadcasts', async (request: any, reply) => {
  const since = parseInt(request.query.since || '0', 10);
  const newBroadcasts = globalBroadcasts.filter(b => b.timestamp > since);
  return { success: true, broadcasts: newBroadcasts, serverTime: Date.now() };
});

// ── Server Metrics Tracking (Admin Panel) ──
const apiThroughputHistory: number[] = Array(12).fill(0);
const memUsageHistory: number[] = Array(12).fill(0);
let currentSecondRequests = 0;

setInterval(() => {
  apiThroughputHistory.shift();
  apiThroughputHistory.push(currentSecondRequests);
  currentSecondRequests = 0;

  memUsageHistory.shift();
  const memMB = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
  memUsageHistory.push(memMB);
}, 2000);

app.addHook('onRequest', (request, reply, done) => {
  currentSecondRequests++;
  done();
});

app.get('/api/admin/metrics', async (request: any, reply) => {
  if (!validateAdminToken(request, reply)) return;
  return {
    apiThroughput: apiThroughputHistory,
    memUsage: memUsageHistory
  };
});

// ── Browser Database View Endpoint ──
app.get('/api/db/all', async (request, reply) => {
  const usersList = Array.from(authUsers.values());
  const playersList = Array.from(memoryDb.entries()).map(([name, data]) => ({ name, data }));
  
  // Format as readable JSON for the browser
  return reply
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      total_users: usersList.length,
      total_players_progress: playersList.length,
      users: usersList,
      players: playersList
    });
});

// Start server
const start = async () => {
  await initConnections();
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' });
    app.log.info(`🚀 Fastify backend listening on http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
