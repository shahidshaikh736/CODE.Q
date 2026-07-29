/* ============================================
   CodeQuest — Boss Fight Logic (TypeScript)
   ============================================ */

export interface BossPhase {
  question?: string;
  options?: string[];
  correctIndex?: number;
  starterCode?: string;
  solution?: string;
  validationRules?: any;
  validator?: string;
  instructions: string[];
  patternMatch?: RegExp;
}

export interface BossChallenge {
  id: string;
  realm: string;
  level: number;
  title: string;
  icon: string;
  language: string;
  xpReward: number;
  story: string;
  isBoss: boolean;
  bossName: string;
  bossEmoji: string;
  bossHP: number;
  phases: BossPhase[];
}

export interface ActiveBossPhase extends BossPhase {
  phaseNumber: number;
  totalPhases: number;
  bossHP: number;
  bossMaxHP: number;
  bossName: string;
  bossEmoji: string;
}

export const BossFight = {
  _currentBoss: null as BossChallenge | null,
  _currentPhase: 0,
  _startTime: 0,

  start(challenge: BossChallenge): ActiveBossPhase | null {
    this._currentBoss = challenge;
    this._currentPhase = 0;
    this._startTime = Date.now();
    return this.getCurrentPhase();
  },

  getCurrentPhase(): ActiveBossPhase | null {
    if (!this._currentBoss || !this._currentBoss.phases) return null;
    const phase = this._currentBoss.phases[this._currentPhase];
    return {
      ...phase,
      phaseNumber: this._currentPhase + 1,
      totalPhases: this._currentBoss.phases.length,
      bossHP: this._currentBoss.bossHP - this._currentPhase,
      bossMaxHP: this._currentBoss.bossHP,
      bossName: this._currentBoss.bossName,
      bossEmoji: this._currentBoss.bossEmoji
    };
  },

  advancePhase(): { defeated: boolean; timeTaken?: number; challenge?: BossChallenge; phase?: ActiveBossPhase | null } {
    if (!this._currentBoss) return { defeated: false };
    this._currentPhase++;
    if (this._currentPhase >= this._currentBoss.phases.length) {
      // Boss defeated!
      const timeTaken = Date.now() - this._startTime;
      return {
        defeated: true,
        timeTaken,
        challenge: this._currentBoss
      };
    }
    return {
      defeated: false,
      phase: this.getCurrentPhase()
    };
  },

  isActive(): boolean {
    return this._currentBoss !== null;
  },

  getPhaseIndex(): number {
    return this._currentPhase;
  },

  reset() {
    this._currentBoss = null;
    this._currentPhase = 0;
    this._startTime = 0;
  },

  getBossHealthPercent(): number {
    if (!this._currentBoss) return 0;
    const remaining = this._currentBoss.bossHP - this._currentPhase;
    return Math.max(0, (remaining / this._currentBoss.bossHP) * 100);
  }
};
