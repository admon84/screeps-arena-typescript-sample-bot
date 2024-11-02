import { Order } from 'common/classes/Order';
import { Priority } from 'common/enums/priority';
import { RoleTUT as Role } from 'common/enums/role';
import { getBlinkyBody, getMaxLevelBlinky } from 'common/lib/bodyParts';
import { Core } from '../Core';
import { getCreepsInQueue, orderCreep } from '../lib/orders';
import { run as runAttacker } from '../roles/Attacker';

const MAX_ATTACKERS = 4;
const MAX_ORDER_ENERGY = 0.6;

export function runMilitary(core: Core): void {
  core.runCreeps(Role.Attacker, runAttacker);

  if (shouldOrderAttackers(core)) {
    orderAttackers(core);
  }
}

function shouldOrderAttackers(core: Core): boolean {
  const active = core.getCreeps(Role.Attacker).length;
  if (active < MAX_ATTACKERS) {
    if (!getCreepsInQueue(Role.Attacker)) {
      return true;
    }
  }
  return false;
}

function orderAttackers(core: Core): void {
  const maxEnergy = core.getSpawnEnergyCapacity() * MAX_ORDER_ENERGY;
  const maxLevel = getMaxLevelBlinky(maxEnergy);

  const order = new Order();
  order.role = Role.Attacker;
  order.level = maxLevel;
  order.body = getBlinkyBody(maxLevel);
  order.priority = Priority.High;

  orderCreep(order, core);
}
