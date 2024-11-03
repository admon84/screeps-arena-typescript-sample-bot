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
  if (!OrderQueue.hasOrder()) return;

  OrderQueue.sortByPriority();
  const order = OrderQueue.getFirst()!;
  const { body, level, role } = order;
  const { object: creep } = core.mySpawn.spawnCreep(body);

  if (creep) {
    console.log(`Spawn: ${Role[role]} [${level}]`);
    creep._role = role;
    creep._level = level;
    OrderQueue.remove(order);
  }
}
