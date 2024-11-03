import { Order } from 'common/classes/Order';
import { Priority } from 'common/enums/priority';
import { RoleTUT as Role } from 'common/enums/role';
import { getBlinkyBody, getMaxLevelBlinky } from 'common/lib/bodyParts';
import { Core } from '../Core';
import { getCreepsInQueue, orderCreep } from '../lib/orders';
import { run as runAttacker } from '../roles/Attacker';

const MAX_ACTIVE = 3;
const MAX_LEVEL = 3;

let lastRun = 0;

export function runMilitary(core: Core) {
  core.runCreeps(Role.Attacker, runAttacker);

  if (!lastRun || lastRun + 10 <= core.tick) {
    if (shouldOrderAttacker(core)) {
      orderAttacker(core);
    }
    lastRun = core.tick;
  }
}

function shouldOrderAttacker(core: Core): boolean {
  if (core.getCreeps(Role.Harvester).length === 0) {
    return false;
  }

  const active = core.getCreeps(Role.Attacker).length;
  const ordered = getCreepsInQueue(Role.Attacker);
  return active < MAX_ACTIVE && !ordered;
}

function orderAttacker(core: Core) {
  const order = new Order();
  order.role = Role.Attacker;
  order.level = MAX_LEVEL;
  order.body = getBlinkyBody(order.level);
  order.priority = Priority.High;
  orderCreep(order, core);
}
