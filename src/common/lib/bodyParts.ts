import { ATTACK, BodyPartConstant, CARRY, HEAL, MOVE, RANGED_ATTACK, TOUGH, WORK } from 'game/constants';

/**
 * Returns the spawn cost for a bodypart
 */
const getCostForBodypart = (part: BodyPartConstant): number => {
  switch (part) {
    case TOUGH:
      return 10;
    case MOVE:
      return 50;
    case CARRY:
      return 50;
    case ATTACK:
      return 80;
    case WORK:
      return 100;
    case RANGED_ATTACK:
      return 150;
    case HEAL:
      return 250;
    default:
      return 0;
  }
};

/**
 * Adds parts to a body
 */
const addToBody = (body: BodyPartConstant[], count: number, parts: BodyPartConstant[]): BodyPartConstant[] => {
  for (let i = 0; i < count; i++) {
    for (const part of parts) {
      body.push(part);
    }
  }
  return body;
};

/**
 * Finds the max level possible to make based on energy and function
 */
const getMaxLevel = (energy: number, bodyFunction: (i: number) => BodyPartConstant[], maxLevel: number): number => {
  let level = 0;
  let maxReached = false;
  for (let i = 1; !maxReached; i++) {
    const cost = getCostForBody(bodyFunction(i));
    if (cost > energy || i > maxLevel) {
      maxReached = true;
    } else {
      level = i;
    }
  }
  return level;
};

/**
 * Calculates the total cost for a body
 */
export function getCostForBody(body: BodyPartConstant[]): number {
  let cost = 0;
  for (const part of body) {
    cost += getCostForBodypart(part);
  }
  return cost;
}

/**
 * Healers are able to move each tick without roads, can only heal
 * [HEAL, MOVE] * Level
 */
export function getHealerBody(level: number): BodyPartConstant[] {
  if (level > 25) {
    level = 25;
  }
  let body: BodyPartConstant[] = [];
  body = addToBody(body, level, [HEAL, MOVE]);
  return body;
}
export function getMaxLevelHealer(energy: number, maxLevel = 25): number {
  return getMaxLevel(energy, getHealerBody, maxLevel);
}

/**
 * Blinkys can attack using ranged attack.
 * [RANGED_ATTACK, MOVE] * Level
 */
export function getBlinkyBody(level: number): BodyPartConstant[] {
  if (level > 25) {
    level = 25;
  }
  let body: BodyPartConstant[] = [];
  body = addToBody(body, level, [RANGED_ATTACK, MOVE]);
  return body;
}
export function getMaxLevelBlinky(energy: number, maxLevel = 25): number {
  return getMaxLevel(energy, getBlinkyBody, maxLevel);
}

/**
 * Fighters can attack using attack.
 * [ATTACK, MOVE] * Level
 */
export function getFighterBody(level: number): BodyPartConstant[] {
  if (level > 25) {
    level = 25;
  }
  let body: BodyPartConstant[] = [];
  body = addToBody(body, level, [ATTACK, MOVE]);
  return body;
}
export function getMaxLevelFighter(energy: number, maxLevel = 25): number {
  return getMaxLevel(energy, getFighterBody, maxLevel);
}

/**
 * Haulers are able to move each tick off roads except on swamp when full.
 * [CARRY, MOVE] * Level
 */
export function getHaulerBody(level: number): BodyPartConstant[] {
  if (level > 25) {
    level = 25;
  }
  let body: BodyPartConstant[] = [];
  body = addToBody(body, level, [CARRY, MOVE]);
  return body;
}
export function getMaxLevelHauler(energy: number, maxLevel = 25): number {
  return getMaxLevel(energy, getHaulerBody, maxLevel);
}

/**
 * Workers are able to move each tick without roads, not on swamp. Balanced
 * [WORK, CARRY, 2x MOVE] * Level
 */
export function getWorkerBody(level: number): BodyPartConstant[] {
  if (level > 12) {
    level = 12;
  }
  let body: BodyPartConstant[] = [];
  body = addToBody(body, level, [CARRY, MOVE, WORK, MOVE]);
  return body;
}
export function getMaxLevelWorker(energy: number, maxLevel = 12): number {
  return getMaxLevel(energy, getWorkerBody, maxLevel);
}
