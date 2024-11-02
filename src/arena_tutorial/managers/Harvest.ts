import { Order } from 'common/classes/Order';
import { Priority } from 'common/enums/priority';
import { RoleTUT as Role } from 'common/enums/role';
import { getMaxLevelWorker, getWorkerBody } from 'common/lib/bodyParts';
import { Core } from '../Core';
import { getCreepsInQueue, orderCreep } from '../repository/Orders';
import { run as runHarvester } from '../roles/Harvester';

const MAX_HARVESTERS = 2;
const MAX_ORDER_ENERGY = 0.4;

let lastRun = 0;

export function runHarvest(core: Core) {
  core.runCreeps(Role.Harvester, runHarvester);

  organizeFirstHarvester(core);

  if (!lastRun || lastRun + 10 <= core.time) {
    organizeHarvesting(core);
    lastRun = core.time;
  }
}

function organizeFirstHarvester(core: Core) {
  const activeHarvesters = core.getCreeps(Role.Harvester).length;
  if (activeHarvesters === 0) {
    const orderedHarvesters = getCreepsInQueue(Role.Harvester);
    if (orderedHarvesters === 0) {
      orderHarvester(core, Priority.Critical);
    }
  }
}

function organizeHarvesting(core: Core) {
  const activeHarvesters = core.getCreeps(Role.Harvester).length;
  const activeAttackers = core.getCreeps(Role.Attacker).length;

  if (activeHarvesters <= activeAttackers && activeHarvesters < MAX_HARVESTERS) {
    const orderedHarvesters = getCreepsInQueue(Role.Harvester);
    if (orderedHarvesters < MAX_HARVESTERS) {
      let priority = Priority.Normal;
      if (activeHarvesters + orderedHarvesters === 0) {
        priority = Priority.Critical;
      }
      orderHarvester(core, priority);
    }
  }
}

function orderHarvester(core: Core, priority: Priority = Priority.Normal) {
  let maxEnergy = core.getSpawnEnergyCapacity() * MAX_ORDER_ENERGY;
  if (priority === Priority.Critical) {
    maxEnergy = core.getSpawnEnergyAvailable();
  }

  let level = getMaxLevelWorker(maxEnergy);
  if (maxEnergy < 500) {
    level = Math.max(1, Math.ceil(maxEnergy * 0.01));
  }

  const order = new Order();
  order.role = Role.Harvester;
  order.level = level;
  order.body = getWorkerBody(level);
  order.priority = priority;

  orderCreep(order);
}
