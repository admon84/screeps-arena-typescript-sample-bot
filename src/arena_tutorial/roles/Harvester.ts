import { creepHadState, setCreepStateAndRun } from 'common/lib/creep';
import { ERR_NOT_IN_RANGE, RESOURCE_ENERGY } from 'game/constants';
import { Creep } from 'game/prototypes';
import { Core } from '../Core';

enum State {
  HarvestEnergy = 1,
  TransferEnergy = 2,
}

export function run(creep: Creep, core: Core) {
  switch (creep._state) {
    case State.HarvestEnergy: {
      runHarvestEnergy(creep, core);
      break;
    }
    case State.TransferEnergy: {
      runTransferEnergy(creep, core);
      break;
    }
    default: {
      setCreepStateAndRun(core, creep, State.HarvestEnergy, runHarvestEnergy);
      break;
    }
  }
}

export function runHarvestEnergy(creep: Creep, core: Core): void {
  if (!creepHadState(creep, State.TransferEnergy) && creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
    setCreepStateAndRun(core, creep, State.TransferEnergy, runTransferEnergy);
    return;
  }

  const source = creep.findClosestByRange(core.sources);
  if (source) {
    const result = creep.harvest(source);
    if (result === ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
  }
}

export function runTransferEnergy(creep: Creep, core: Core): void {
  if (!creepHadState(creep, State.HarvestEnergy) && !creep.store.energy) {
    setCreepStateAndRun(core, creep, State.HarvestEnergy, runHarvestEnergy);
    return;
  }

  if (core.mySpawn && core.mySpawn.exists) {
    const spawnFreeCapacity = core.mySpawn.store.getFreeCapacity(RESOURCE_ENERGY);
    if (spawnFreeCapacity !== null && spawnFreeCapacity > 0) {
      if (creep.getRangeTo(core.mySpawn) > 1) {
        creep.moveTo(core.mySpawn);
      } else {
        creep.transfer(core.mySpawn, RESOURCE_ENERGY);
        setCreepStateAndRun(core, creep, State.HarvestEnergy, runHarvestEnergy);
      }
      return;
    }
  }
}
