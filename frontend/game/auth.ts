/* ============================================
   CODE.Q — Auth Service (Frontend)
   Handles: register, login, OTP verify, logout
   ============================================ */

const API_BASE = 'http://localhost:5000';
const TOKEN_KEY = 'codequest_auth_token';
const USER_KEY = 'codequest_auth_user';

export interface AuthUser {
  email: string;
  username: string;
  role?: string;
}

export const AuthService = {

  // ── Save session after OTP verify ──
  saveSession(token: string, user: AuthUser) {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  // ── Get stored token ──
  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  },

  // ── Get stored user ──
  getUser(): AuthUser | null {
    const raw = sessionStorage.getItem(USER_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  },

  // ── Check if logged in ──
  isLoggedIn(): boolean {
    return !!this.getToken();
  },

  // ── Validate token with backend ──
  async validateSession(): Promise<AuthUser | null> {
    const token = this.getToken();
    if (!token) return null;
    if (token === 'admin-local-token') {
      return this.getUser();
    }
    try {
      const res = await fetch(`${API_BASE}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        this.clearSession();
        return null;
      }
      const data = await res.json();
      return data.user;
    } catch {
      return this.getUser(); // Offline fallback: trust local session
    }
  },

  // ── Register new user ──
  async register(email: string, username: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password })
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error || 'Registration failed.' };
      return { success: true };
    } catch {
      return { success: false, error: 'Could not connect to backend. Is the server running?' };
    }
  },

  // ── Admin Credentials Management ──
  getAdminCredentials() {
    try {
      const email = localStorage.getItem('codeq_admin_email') || 'admin@code.q';
      const password = localStorage.getItem('codeq_admin_password') || 'admin123';
      return { email, password };
    } catch {
      return { email: 'admin@code.q', password: 'admin123' };
    }
  },

  setAdminCredentials(email: string, password: string) {
    try {
      localStorage.setItem('codeq_admin_email', email);
      localStorage.setItem('codeq_admin_password', password);
    } catch (e) {
      console.error('Failed to save admin credentials', e);
    }
  },

  getAdminPin() {
    try {
      return localStorage.getItem('codeq_admin_pin') || '9518';
    } catch {
      return '9518';
    }
  },

  setAdminPin(pin: string) {
    try {
      localStorage.setItem('codeq_admin_pin', pin);
    } catch (e) {
      console.error('Failed to save admin pin', e);
    }
  },

  // ── Direct Login (username/email + password) ──
  async login(identifier: string, password: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    const adminCreds = this.getAdminCredentials();
    if (identifier.trim().toLowerCase() === adminCreds.email.toLowerCase() && password === adminCreds.password) {
      const adminUser = { email: adminCreds.email, username: 'Admin', role: 'admin' };
      this.saveSession('admin-local-token', adminUser);
      return { success: true, user: adminUser };
    }

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error || 'Login failed.' };
      
      this.saveSession(data.token, data.user);
      return { success: true, user: data.user };
    } catch {
      return { success: false, error: 'Could not connect to backend. Is the server running?' };
    }
  },

  // ── Check username availability ──
  async checkUsername(username: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/api/auth/check-username/${encodeURIComponent(username)}`);
      const data = await res.json();
      return data.available === true;
    } catch {
      return true; // Assume available if can't check
    }
  },

  // ── Logout ──
  clearSession() {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  },

  async logout() {
    this.clearSession();
    try {
      await fetch(`${API_BASE}/api/auth/logout`, { method: 'POST' });
    } catch {
      // Ignore
    }
  },
  
  // ── Delete Account ──
  async deleteAccount(): Promise<boolean> {
    const user = this.getUser();
    if (!user) return false;
    
    try {
      const res = await fetch(`${API_BASE}/api/auth/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email })
      });
      return res.ok;
    } catch {
      return false;
    }
  }
};
