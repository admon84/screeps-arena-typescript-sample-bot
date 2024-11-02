import { OrderQueue } from 'common/classes/OrderQueue';
import { RoleTUT as Role } from 'common/enums/role';
import { Core } from '../Core';

export function runSpawn(core: Core): void {
  if (spawnShouldRun(core)) {
    processQueue(core);
  }
}

function spawnShouldRun(core: Core): boolean {
  if (core.mySpawn && core.mySpawn.exists) {
    const spawnEnergy = core.mySpawn.store.energy;
    if (spawnEnergy && spawnEnergy >= 100) {
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
    const sortedOrders = orders.sort(({ priority: a }, { priority: b }) => (a > b ? 1 : b > a ? -1 : 0));
    OrderQueue.set(sortedOrders);
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
