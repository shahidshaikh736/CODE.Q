/* ============================================
   CodeQuest — Player State Management (TypeScript)
   ============================================ */

import { ChallengesData } from './challenges';
import { Sounds } from './sounds';

const STORAGE_KEY = 'codequest_player';
const BACKEND_URL = 'http://localhost:5000';

export interface PlayerStats {
  challengesCompleted: number;
  bossesDefeated: number;
  totalTimeSpent: number;
  hintsTotal: number;
  perfectSolves: number;
}

export interface PlayerQuests {
  daily: any[];
  lastRefresh: string | null;
}

export interface PlayerData {
  name: string;
  avatar: string;
  xp: number;
  level: number;
  isPremium: boolean;
  createdAt: number;
  completedChallenges: string[];
  hintsUsed: Record<string, number>;
  bestTimes: Record<string, number>;
  achievements: string[];
  currentRealm: string | null;
  stats: PlayerStats;
  quests: PlayerQuests;
  deviceType: 'android' | 'windows';
}

const RANK_THRESHOLDS = [
  { minXP: 0,    title: 'Novice Coder',       icon: '🌱' },
  { minXP: 100,  title: 'Code Apprentice',    icon: '📘' },
  { minXP: 300,  title: 'Script Warrior',     icon: '⚔️' },
  { minXP: 600,  title: 'Debug Knight',       icon: '🛡️' },
  { minXP: 1000, title: 'Algorithm Mage',     icon: '🔮' },
  { minXP: 1500, title: 'Full-Stack Knight',  icon: '👑' },
  { minXP: 2200, title: 'Code Overlord',      icon: '🏆' },
  { minXP: 3000, title: 'Stack Overlord',     icon: '⭐' },
];

function createDefaultPlayer(): PlayerData {
  return {
    name: '',
    avatar: '⚔️',
    xp: 0,
    level: 1,
    isPremium: false,
    createdAt: Date.now(),
    completedChallenges: [],
    hintsUsed: {},
    bestTimes: {},
    achievements: [],
    currentRealm: null,
    stats: {
      challengesCompleted: 0,
      bossesDefeated: 0,
      totalTimeSpent: 0,
      hintsTotal: 0,
      perfectSolves: 0
    },
    quests: {
      daily: [],
      lastRefresh: null
    },
    deviceType: 'windows'
  };
}

export const Player = {
  _data: null as PlayerData | null,

  load(): PlayerData | null {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          this._data = JSON.parse(saved);
          const defaults = createDefaultPlayer();
          this._data = { 
            ...defaults, 
            ...this._data, 
            stats: { ...defaults.stats, ...this._data?.stats },
            quests: { ...defaults.quests, ...this._data?.quests }
          };
          
          // Asynchronously attempt to sync from cloud if online
          this._syncFromCloud();
        } else {
          this._data = null;
        }
      }
    } catch (e) {
      console.error('Failed to load player data:', e);
      this._data = null;
    }
    return this._data;
  },

  async _syncFromCloud() {
    if (!this._data || !this._data.name) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/player/load/${encodeURIComponent(this._data.name)}`);
      if (res.ok) {
        const cloudData = await res.json();
        if (cloudData) {
          let shouldSave = false;
          if (cloudData.alerts && cloudData.alerts.length > 0) {
            cloudData.alerts.forEach((alert: any) => {
              if (typeof window !== 'undefined' && (window as any).addNotification) {
                (window as any).addNotification(`📢 Admin Notice: ${alert.message}`, '📩', alert.timestamp ? `alert-${alert.timestamp}` : undefined);
              } else {
                alert(`📢 Admin Notice: ${alert.message}`);
              }
            });
            cloudData.alerts = [];
            shouldSave = true;
          }
          
          if (cloudData.xp > (this._data?.xp || 0)) {
            // Cloud has higher progress, sync to local
            this._data = { ...this._data, ...cloudData };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this._data));
            window.dispatchEvent(new CustomEvent('player-synced'));
          } else if (shouldSave) {
            this._data = { ...this._data, ...cloudData };
            this.save(); // clear alerts on backend
          }
        }
      } else if (res.status === 410) {
        // Player profile was deleted by admin
        this.reset();
        window.location.reload();
      } else if (res.status === 403) {
        // Player profile was banned
        alert("Your account has been suspended by an administrator.");
        this.reset();
        window.location.reload();
      } else if (res.status === 404) {
        // Profile does not exist on backend database (e.g. backend restarted), upload local profile
        this.save();
      }
    } catch (e) {
      console.warn('Backend sync failed, using local storage.');
    }
  },

  save() {
    if (!this._data) return;
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this._data));
        
        // Asynchronously sync to backend
        fetch(`${BACKEND_URL}/api/player/save`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this._data)
        }).catch(err => console.warn('Could not sync player data to cloud:', err));
      }
    } catch (e) {
      console.error('Failed to save player data:', e);
    }
  },

  exists(): boolean {
    return this._data !== null && this._data.name !== '';
  },

  create(name: string, avatar: string, deviceType: 'android' | 'windows' = 'windows'): PlayerData {
    this._data = createDefaultPlayer();
    this._data.name = name;
    this._data.avatar = avatar;
    this._data.deviceType = deviceType;
    this._data.createdAt = Date.now();
    this.save();
    return this._data;
  },

  get(): PlayerData | null {
    return this._data;
  },

  getName(): string { return this._data?.name || 'Hero'; },
  setName(name: string) {
    if (!this._data) return;
    this._data.name = name;
    this.save();
  },
  getAvatar(): string { return this._data?.avatar || '⚔️'; },
  setAvatar(avatar: string) {
    if (!this._data) return;
    this._data.avatar = avatar;
    this.save();
  },
  getXP(): number { return this._data?.xp || 0; },
  getLevel(): number { return this._data?.level || 1; },
  isPremium(): boolean { return true; },

  upgradeToPremium() {
    if (!this._data) return;
    this._data.isPremium = true;
    this.save();
    Sounds.playRealmUnlock();
  },

  getRank() {
    const xp = this.getXP();
    let rank = RANK_THRESHOLDS[0];
    for (const r of RANK_THRESHOLDS) {
      if (xp >= r.minXP) rank = r;
    }
    return rank;
  },

  getNextRank() {
    const xp = this.getXP();
    for (const r of RANK_THRESHOLDS) {
      if (xp < r.minXP) return r;
    }
    return null;
  },

  getXPProgress(): number {
    const xp = this.getXP();
    const currentRank = this.getRank();
    const nextRank = this.getNextRank();
    if (!nextRank) return 100;
    const rangeTotal = nextRank.minXP - currentRank.minXP;
    const rangeCurrent = xp - currentRank.minXP;
    return Math.min(100, Math.round((rangeCurrent / rangeTotal) * 100));
  },

  addXP(amount: number) {
    if (!this._data) return { oldRank: '', newRank: '', ranked: false, totalXP: 0, finalAmount: 0 };
    const oldRank = this.getRank().title;
    const oldLevel = this._data.level;
    
    // 1.5x XP multiplier for premium players
    const finalAmount = this.isPremium() ? Math.round(amount * 1.5) : amount;
    this._data.xp += finalAmount;
    this._data.level = this._calculateLevel();
    
    const newRank = this.getRank().title;
    this.save();

    // Trigger sounds programmatically based on XP / Level progression
    if (this._data.level > oldLevel) {
      Sounds.playLevelUp();
    } else {
      Sounds.playXPGain();
    }

    return { oldRank, newRank, ranked: oldRank !== newRank, totalXP: this._data.xp, finalAmount };
  },

  _calculateLevel(): number {
    if (!this._data) return 1;
    const xp = this._data.xp;
    if (xp < 100) return 1;
    if (xp < 300) return 2;
    if (xp < 600) return 3;
    if (xp < 1000) return 4;
    if (xp < 1500) return 5;
    if (xp < 2200) return 6;
    if (xp < 3000) return 7;
    return 8 + Math.floor((xp - 3000) / 1000);
  },

  hasCompletedChallenge(challengeId: string): boolean {
    return this._data?.completedChallenges?.includes(challengeId) || false;
  },

  completeChallenge(challengeId: string, timeMs: number) {
    if (!this._data) return;
    if (!this._data.completedChallenges.includes(challengeId)) {
      this._data.completedChallenges.push(challengeId);
      this._data.stats.challengesCompleted++;
    }
    // Track best time
    if (!this._data.bestTimes[challengeId] || timeMs < this._data.bestTimes[challengeId]) {
      this._data.bestTimes[challengeId] = timeMs;
    }
    this.save();
  },

  defeatBoss(bossId: string) {
    if (!this._data) return;
    if (!this._data.completedChallenges.includes(bossId)) {
      this._data.completedChallenges.push(bossId);
      this._data.stats.bossesDefeated++;
    }
    this.save();
  },

  useHint(challengeId: string) {
    if (!this._data) return;
    this._data.hintsUsed[challengeId] = (this._data.hintsUsed[challengeId] || 0) + 1;
    this._data.stats.hintsTotal++;
    this.save();
  },

  getHintsUsed(challengeId: string): number {
    return this._data?.hintsUsed?.[challengeId] || 0;
  },

  getRealmProgress(realmId: string) {
    if (!this._data) return { completed: 0, total: 0, percent: 0 };
    const allChallenges = (ChallengesData as any)?.[realmId] || [];
    const total = allChallenges.length;
    const completed = allChallenges.filter((c: any) => this.hasCompletedChallenge(c.id)).length;
    return { completed, total, percent: total > 0 ? Math.round((completed / total) * 100) : 0 };
  },

  isRealmUnlocked(realmId: string): boolean {
    return true;
  },

  isLevelUnlocked(realmId: string, levelIndex: number): boolean {
    if (levelIndex === 0) return true;
    const challenges = (ChallengesData as any)?.[realmId] || [];
    if (levelIndex > 0 && levelIndex < challenges.length) {
      const prevChallenge = challenges[levelIndex - 1];
      return this.hasCompletedChallenge(prevChallenge.id);
    }
    return false;
  },

  addAchievement(achievementId: string) {
    if (!this._data) return;
    if (!this._data.achievements.includes(achievementId)) {
      this._data.achievements.push(achievementId);
      this.save();
    }
  },

  getStreak(): number {
    return 0;
  },

  getDeviceType(): 'android' | 'windows' {
    return this._data?.deviceType || 'windows';
  },

  reset() {
    this._data = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem('codequest_auth_token');
      sessionStorage.removeItem('codequest_auth_user');
    }
  }
};
