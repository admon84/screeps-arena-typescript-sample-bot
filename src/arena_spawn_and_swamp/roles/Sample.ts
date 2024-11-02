import { Creep } from 'game/prototypes';
import { Core } from '../Core';

export function run(creep: Creep, core: Core) {
  // This is sample code, replace with actual code
  creep.moveTo(core.enemySpawn);
  creep.attack(core.enemySpawn);
}
