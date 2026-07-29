/* ============================================
   CodeQuest — XP System & Leveling (TypeScript)
   ============================================ */

export interface Bonus {
  label: string;
  amount: number;
  icon: string;
}

export interface RewardResult {
  totalXP: number;
  baseXP: number;
  bonuses: Bonus[];
}

export const XPSystem = {
  /* Calculate XP reward with bonuses */
  calculateReward(
    baseXP: number,
    { timeMs = 0, hintsUsed = 0, perfect = false }: { timeMs?: number; hintsUsed?: number; perfect?: boolean } = {}
  ): RewardResult {
    let xp = baseXP;
    const bonuses: Bonus[] = [];

    // Speed bonus: under 60s = +30%, under 120s = +15%
    if (timeMs > 0 && timeMs < 60000) {
      const amount = Math.round(baseXP * 0.3);
      xp += amount;
      bonuses.push({ label: 'Speed Bonus', amount, icon: '⚡' });
    } else if (timeMs > 0 && timeMs < 120000) {
      const amount = Math.round(baseXP * 0.15);
      xp += amount;
      bonuses.push({ label: 'Quick Solve', amount, icon: '🏃' });
    }

    // No hints bonus: +25%
    if (hintsUsed === 0) {
      const amount = Math.round(baseXP * 0.25);
      xp += amount;
      bonuses.push({ label: 'No Hints', amount, icon: '🧠' });
    }

    // Hint penalty: -10% per hint
    if (hintsUsed > 0) {
      const penalty = Math.min(Math.round(baseXP * 0.1 * hintsUsed), Math.round(baseXP * 0.5));
      xp -= penalty;
      bonuses.push({ label: 'Hint Penalty', amount: -penalty, icon: '💡' });
    }

    // Perfect solve (first try, no hints, under 2 min)
    if (perfect) {
      const amount = Math.round(baseXP * 0.5);
      xp += amount;
      bonuses.push({ label: 'Perfect Solve!', amount, icon: '⭐' });
    }

    // Minimum XP is 10
    xp = Math.max(10, xp);

    return { totalXP: xp, baseXP, bonuses };
  },

  /* Get level from XP */
  getLevel(xp: number): number {
    if (xp < 100) return 1;
    if (xp < 300) return 2;
    if (xp < 600) return 3;
    if (xp < 1000) return 4;
    if (xp < 1500) return 5;
    if (xp < 2200) return 6;
    if (xp < 3000) return 7;
    return 8 + Math.floor((xp - 3000) / 1000);
  },

  /* Get XP required for next level */
  getXPForNextLevel(currentXP: number): number {
    const thresholds = [100, 300, 600, 1000, 1500, 2200, 3000];
    for (const t of thresholds) {
      if (currentXP < t) return t;
    }
    const levelsAbove7 = Math.floor((currentXP - 3000) / 1000);
    return 3000 + (levelsAbove7 + 1) * 1000;
  },

  /* Format XP display */
  formatXP(xp: number): string {
    if (xp >= 1000) {
      return (xp / 1000).toFixed(1) + 'K';
    }
    return xp.toString();
  }
};
