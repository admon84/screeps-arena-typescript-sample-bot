import { Order } from 'common/classes/Order';
import { OrderQueue } from 'common/classes/OrderQueue';
import { Priority } from 'common/enums/priority';
import { RoleTUT as Role } from 'common/enums/role';
import { getCostForBody } from 'common/lib/bodyParts';
import { MAX_CREEP_SIZE } from 'game/constants';
import { Core } from '../Core';

export function orderCreep(order: Order, core: Core): boolean {
  if (order.body.length === 0) {
    console.log(`Creep ordered with empty body (${Role[order.role]} T${order.level})`);
    return false;
  }

  if (order.body.length > MAX_CREEP_SIZE) {
    console.log(`Creep ordered with body larger than 50 (${Role[order.role]} T${order.level})`);
    return false;
  }

  const costOfCreep = getCostForBody(order.body);
  if (costOfCreep > core.getSpawnEnergyCapacity()) {
    console.log(`Creep ordered costing ${costOfCreep} is too expensive (${Role[order.role]} T${order.level})`);
    return false;
  }

  OrderQueue.add(order);
  console.log(
    `Order: ${Role[order.role]} (level ${order.level}) - Priority: ${
      Priority[order.priority]
    } - Cost: ${costOfCreep} - Queue: ${OrderQueue.get().length}`
  );

  return true;
}

export function getCreepsInQueue(role?: Role): number {
  let count = 0;
  for (const order of OrderQueue.get()) {
    if (!role || order.role === role) {
      count++;
    }
  }
  return count;
}
