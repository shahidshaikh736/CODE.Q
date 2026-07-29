/* ============================================
   CodeQuest — Game Engine (State Machine) (TypeScript)
   ============================================ */

import { Player } from './player';
import { BossFight } from './boss-fights';
import { XPSystem } from './xp-system';
import { Quests } from './quests';

export const GameState = {
  LANDING: 'landing',
  CHARACTER: 'character',
  MAP: 'map',
  LEVELS: 'levels',
  CHALLENGE: 'challenge',
  BOSS: 'boss',
  VICTORY: 'victory',
  LEADERBOARD: 'leaderboard'
};

export const GameEngine = {
  _state: GameState.LANDING as string,
  _currentRealm: null as string | null,
  _currentChallenge: null as any | null,
  _challengeStartTime: 0,
  _listeners: [] as ((state: string, data: { realm: string | null; challenge: any }) => void)[],
  _victoryResults: null as any | null,
  _disabledLanguages: [] as string[],

  getDisabledLanguages(): string[] { return this._disabledLanguages; },
  setDisabledLanguages(langs: string[]) { this._disabledLanguages = langs; },

  init() {
    Player.load();
    if (Player.exists()) {
      this._state = GameState.MAP;
    } else {
      this._state = GameState.LANDING;
    }
    this._notifyListeners();
  },

  getState(): string          { return this._state; },
  getCurrentRealm(): string | null   { return this._currentRealm; },
  getCurrentChallenge(): any | null{ return this._currentChallenge; },

  onChange(callback: (state: string, data: { realm: string | null; challenge: any }) => void) {
    this._listeners.push(callback);
  },

  _notifyListeners() {
    this._listeners.forEach(cb => cb(this._state, {
      realm: this._currentRealm,
      challenge: this._currentChallenge
    }));
  },

  // ── Navigation ──
  goToLanding() {
    this._state = GameState.LANDING;
    this._notifyListeners();
  },

  goToCharacter() {
    this._state = GameState.CHARACTER;
    this._notifyListeners();
  },

  goToMap() {
    this._state = GameState.MAP;
    this._currentRealm = null;
    this._currentChallenge = null;
    this._notifyListeners();
  },

  goToLevels(realmId: string) {
    this._currentRealm = realmId;
    this._state = GameState.LEVELS;
    this._notifyListeners();
  },

  goToChallenge(challenge: any) {
    this._currentChallenge = challenge;
    this._challengeStartTime = Date.now();

    if (challenge.isBoss) {
      BossFight.start(challenge);
      this._state = GameState.BOSS;
    } else {
      this._state = GameState.CHALLENGE;
    }
    this._notifyListeners();
  },

  goToVictory(results: any) {
    this._victoryResults = results;
    this._state = GameState.VICTORY;
    this._notifyListeners();
  },

  getVictoryResults(): any {
    return this._victoryResults;
  },

  goToLeaderboard() {
    this._state = GameState.LEADERBOARD;
    this._notifyListeners();
  },

  getChallengeTime(): number {
    return Date.now() - this._challengeStartTime;
  },

  // ── Actions ──
  createCharacter(name: string, avatar: string, deviceType?: 'android' | 'windows') {
    Player.create(name, avatar, deviceType);
    this.goToMap();
  },

  completeChallenge(challenge: any, { hintsUsed = 0 } = {}) {
    const timeMs = this.getChallengeTime();
    const timeSeconds = timeMs / 1000;
    const isPerfect = hintsUsed === 0 && timeMs < 120000;

    const xpResult = XPSystem.calculateReward(challenge.xpReward, {
      timeMs,
      hintsUsed,
      perfect: isPerfect
    });

    Player.completeChallenge(challenge.id, timeMs);
    const rankResult = Player.addXP(xpResult.totalXP);

    // Update quests
    const completedQuests = Quests.updateProgress('challenge_complete', {
      hintsUsed,
      timeSeconds,
      realm: challenge.realm
    });

    const playerObj = Player.get();
    if (playerObj && isPerfect) {
      playerObj.stats.perfectSolves++;
      Player.save();
    }

    this.goToVictory({
      challenge,
      xpResult,
      rankResult,
      timeMs,
      completedQuests,
      isPerfect
    });
  },

  completeBossPhase() {
    const result = BossFight.advancePhase();
    if (result.defeated) {
      const challenge = result.challenge;
      if (!challenge) return;
      const hintsUsed = Player.getHintsUsed(challenge.id);
      const timeMs = result.timeTaken || 0;
      const isPerfect = hintsUsed === 0 && timeMs < 300000;

      const xpResult = XPSystem.calculateReward(challenge.xpReward, {
        timeMs,
        hintsUsed,
        perfect: isPerfect
      });

      Player.defeatBoss(challenge.id);
      const rankResult = Player.addXP(xpResult.totalXP);

      const completedQuests = Quests.updateProgress('boss_defeated', {});
      Quests.updateProgress('challenge_complete', {
        hintsUsed,
        timeSeconds: timeMs / 1000,
        realm: challenge.realm
      });

      BossFight.reset();

      this.goToVictory({
        challenge,
        xpResult,
        rankResult,
        timeMs,
        completedQuests,
        isPerfect,
        isBoss: true
      });
    } else {
      // Next phase - re-render boss screen
      this._notifyListeners();
    }
  }
};
