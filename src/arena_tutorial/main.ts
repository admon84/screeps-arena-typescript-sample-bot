import { getCore } from './Core';
import { runHarvest } from './managers/Harvest';
import { runMilitary } from './managers/Military';
import { runSpawn } from './managers/Spawn';

export function loop(): void {
  const core = getCore();
  core.run();

  runHarvest(core);
  runMilitary(core);
  runSpawn(core);
}
