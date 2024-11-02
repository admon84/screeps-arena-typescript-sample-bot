import { creepHasPart } from 'common/lib/creep';
import { ATTACK, RANGED_ATTACK } from 'game/constants';
import { Creep, StructureSpawn, StructureWall } from 'game/prototypes';
import { Core } from '../Core';

export function run(creep: Creep, core: Core) {
  const cornerWall = core.walls.find(({ x, y }) => x === y);
  if (cornerWall) {
    creep.moveTo(cornerWall);
    attack(creep, cornerWall);
    return;
  }

  const target = creep.findClosestByRange(core.enemyCreeps);
  if (target) {
    creep.moveTo(target);
    attack(creep, target);
    return;
  }

  creep.moveTo(core.enemySpawn);
  attack(creep, core.enemySpawn);
}

function attack(creep: Creep, target: Creep | StructureWall | StructureSpawn): void {
  if (creepHasPart(creep, RANGED_ATTACK)) {
    if (creep.getRangeTo(target) <= 3) {
      creep.rangedAttack(target);
    }
  }
  if (creepHasPart(creep, ATTACK)) {
    if (creep.getRangeTo(target) <= 1) {
      creep.attack(target);
    }
  }
}
