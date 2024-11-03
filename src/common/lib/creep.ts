import { BodyPartConstant, ERR_NOT_IN_RANGE, OK } from 'game/constants';
import { Creep } from 'game/prototypes';
import { Core } from '../Core';

export function setCreepState(creep: Creep, state: number) {
  if (!creep._states) {
    creep._states = [];
  }
  creep._states.push(state);
  creep._state = state;
}

export function creepHadState(creep: Creep, state: number) {
  if (!creep._states) {
    creep._states = [];
  }
  return creep._states.includes(state);
}

export function setCreepStateAndRun<T extends Core>(
  core: T,
  creep: Creep,
  state: number,
  runFunction: (creep: Creep, core: T, ...args: any[]) => void,
  ...args: any[]
) {
  const canRunFunction = !creepHadState(creep, state);
  setCreepState(creep, state);
  if (canRunFunction) {
    runFunction(creep, core, args);
  }
}

export function creepHasPart(creep: Creep, part: BodyPartConstant): boolean {
  return creep.body.some(p => p.type === part);
}
