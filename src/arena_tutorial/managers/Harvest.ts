import { Order } from 'common/classes/Order';
import { Priority } from 'common/enums/priority';
import { RoleTUT as Role } from 'common/enums/role';
import { getMaxLevelWorker, getWorkerBody } from 'common/lib/bodyParts';
import { Core } from '../Core';
import { getCreepsInQueue, orderCreep } from '../lib/orders';
import { run as runHarvester } from '../roles/Harvester';

const MAX_ACTIVE = 1;
const MAX_LEVEL = 2;

let lastRun = 0;

export function runHarvest(core: Core) {
  core.runCreeps(Role.Harvester, runHarvester);

  if (!lastRun || lastRun + 10 <= core.tick) {
    if (shouldOrderHarvester(core)) {
      orderHarvester(core);
    }
    lastRun = core.tick;
  }
}

function shouldOrderHarvester(core: Core) {
  const active = core.getCreeps(Role.Harvester).length;
  const ordered = getCreepsInQueue(Role.Harvester);
  return active < MAX_ACTIVE && !ordered;
}

function orderHarvester(core: Core, priority: Priority = Priority.Normal) {
  const order = new Order();
  order.role = Role.Harvester;
  order.level = MAX_LEVEL;
  order.body = getWorkerBody(order.level);
  order.priority = priority;

  orderCreep(order, core);
}
