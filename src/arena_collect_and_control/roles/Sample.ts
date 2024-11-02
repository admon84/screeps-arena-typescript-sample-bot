import { RESOURCE_SCORE } from 'arena';
import { ERR_NOT_IN_RANGE } from 'game/constants';
import { Creep } from 'game/prototypes';
import { Core } from '../Core';

export function run(creep: Creep, core: Core) {
  // This is sample code, replace with actual code
  if (creep.store[RESOURCE_SCORE] > 0) {
    if (creep.transfer(core.scoreCollector, RESOURCE_SCORE) === ERR_NOT_IN_RANGE) {
      creep.moveTo(core.scoreCollector);
    }
  } else {
    if (core.containers.length > 0) {
      const container = creep.findClosestByPath(core.containers);
      if (container && creep.withdraw(container, RESOURCE_SCORE) === ERR_NOT_IN_RANGE) {
        creep.moveTo(container);
      }
    }
  }
}
