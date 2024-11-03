import { ATTACK, BODYPART_COST, BodyPartConstant, CARRY, HEAL, MOVE, RANGED_ATTACK, WORK } from 'game/constants';

const addToBody = (body: BodyPartConstant[], count: number, parts: BodyPartConstant[]): BodyPartConstant[] => {
  for (let i = 0; i < count; i++) {
    for (const part of parts) {
      body.push(part);
    }
  }
  return body;
};

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

export function getCostForBody(body: BodyPartConstant[]): number {
  let cost = 0;
  for (const part of body) {
    cost += BODYPART_COST[part];
  }
  return cost;
}

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
