/* ============================================
   CodeQuest — Daily Quests System (TypeScript)
   ============================================ */

import { Player } from './player';

export interface Quest {
  id: string;
  name: string;
  description: string;
  icon: string;
  target: number;
  type: string;
  rewardXP: number;
  realm?: string;
  progress?: number;
  completed?: boolean;
  claimed?: boolean;
}

const QUEST_POOL: Quest[] = [
  {
    id: 'complete_1',
    name: 'Quick Learner',
    description: 'Complete any 1 coding challenge',
    icon: '📝',
    target: 1,
    type: 'complete',
    rewardXP: 25
  },
  {
    id: 'complete_3',
    name: 'Triple Threat',
    description: 'Complete 3 coding challenges',
    icon: '🔥',
    target: 3,
    type: 'complete',
    rewardXP: 75
  },
  {
    id: 'no_hints',
    name: 'Sharp Mind',
    description: 'Complete a challenge without using any hints',
    icon: '🧠',
    target: 1,
    type: 'no_hints',
    rewardXP: 50
  },
  {
    id: 'speed_run',
    name: 'Speed Demon',
    description: 'Complete a challenge in under 60 seconds',
    icon: '⚡',
    target: 60,
    type: 'speed',
    rewardXP: 60
  },
  {
    id: 'forest_quest',
    name: 'Forest Explorer',
    description: 'Complete a Frontend Forest challenge',
    icon: '🌲',
    target: 1,
    type: 'realm',
    realm: 'forest',
    rewardXP: 30
  },
  {
    id: 'dungeon_quest',
    name: 'Dungeon Delver',
    description: 'Complete a Backend Dungeon challenge',
    icon: '🏰',
    target: 1,
    type: 'realm',
    realm: 'dungeon',
    rewardXP: 35
  },
  {
    id: 'vault_quest',
    name: 'Vault Raider',
    description: 'Complete a Database Vault challenge',
    icon: '🏦',
    target: 1,
    type: 'realm',
    realm: 'vault',
    rewardXP: 40
  },
  {
    id: 'boss_slayer',
    name: 'Boss Slayer',
    description: 'Defeat any boss',
    icon: '🐉',
    target: 1,
    type: 'boss',
    rewardXP: 100
  }
];

export const Quests = {
  _dailyCount: 3,

  getDailyQuests(): Quest[] {
    const player = Player.get();
    if (!player) return [];

    const today = new Date().toDateString();

    if (player.quests.lastRefresh !== today) {
      // Generate new daily quests
      const shuffled = [...QUEST_POOL].sort(() => Math.random() - 0.5);
      player.quests.daily = shuffled.slice(0, this._dailyCount).map(q => ({
        ...q,
        progress: 0,
        completed: false,
        claimed: false
      }));
      player.quests.lastRefresh = today;
      Player.save();
    }

    return player.quests.daily;
  },

  updateProgress(type: string, data: any = {}): Quest[] {
    const player = Player.get();
    if (!player) return [];

    const completedQuests: Quest[] = [];

    player.quests.daily.forEach(quest => {
      if (quest.completed) return;

      switch (quest.type) {
        case 'complete':
          if (type === 'challenge_complete') {
            quest.progress = (quest.progress || 0) + 1;
            if (quest.progress >= quest.target) {
              quest.completed = true;
              completedQuests.push(quest);
            }
          }
          break;
        case 'no_hints':
          if (type === 'challenge_complete' && data.hintsUsed === 0) {
            quest.progress = 1;
            quest.completed = true;
            completedQuests.push(quest);
          }
          break;
        case 'speed':
          if (type === 'challenge_complete' && data.timeSeconds < quest.target) {
            quest.progress = 1;
            quest.completed = true;
            completedQuests.push(quest);
          }
          break;
        case 'realm':
          if (type === 'challenge_complete' && data.realm === quest.realm) {
            quest.progress = (quest.progress || 0) + 1;
            if (quest.progress >= quest.target) {
              quest.completed = true;
              completedQuests.push(quest);
            }
          }
          break;
        case 'boss':
          if (type === 'boss_defeated') {
            quest.progress = 1;
            quest.completed = true;
            completedQuests.push(quest);
          }
          break;
      }
    });

    Player.save();
    return completedQuests;
  },

  claimReward(questId: string): number {
    const player = Player.get();
    if (!player) return 0;

    const quest = player.quests.daily.find(q => q.id === questId);
    if (quest && quest.completed && !quest.claimed) {
      quest.claimed = true;
      Player.addXP(quest.rewardXP);
      Player.save();
      return quest.rewardXP;
    }
    return 0;
  }
};
