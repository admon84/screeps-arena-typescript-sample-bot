import { OrderQueue } from 'common/classes/OrderQueue';
import { RoleTUT as Role } from 'common/enums/role';
import { BODYPART_COST, MOVE } from 'game/constants';
import { Core } from '../Core';

export function runSpawn(core: Core): void {
  if (spawnShouldRun(core)) {
    processQueue(core);
  }
}

function spawnShouldRun(core: Core): boolean {
  if (core.mySpawn && core.mySpawn.exists) {
    const spawnEnergy = core.mySpawn.store.energy;
    if (spawnEnergy && spawnEnergy >= BODYPART_COST[MOVE]) {
      return true;
    }
  }
  return false;
}

function processQueue(core: Core): void {
  const orders = OrderQueue.get();

  const size = orders.length;
  if (size === 0) {
    return;
  }

  if (size > 1) {
    OrderQueue.sortByPriority();
  }

  const first = 0;
  const order = orders[first];
  const { object: creep } = core.mySpawn.spawnCreep(order.body);

  if (creep) {
    console.log(`Spawn: ${Role[order.role]} (level ${order.level})`);
    creep._role = order.role;
    creep._level = order.level;
    OrderQueue.remove(first);
  }
}
