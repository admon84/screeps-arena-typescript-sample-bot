import { RoleCTF as Role } from 'common/enums/role';
import { getFighterBody } from 'common/lib/bodyParts';
import { Creep } from 'game/prototypes';
import { Core } from '../Core';
import { run as runSampleRole } from '../roles/Sample';

// Global variables persist between ticks in Screeps Arena.
let sampleCreep: Creep | undefined;

export function runSample(core: Core) {
  // This is sample code, replace with actual code
  core.runCreeps(Role.Sample, runSampleRole);
  spawnCreep(core);
  assignCreepRole(core);
}

function spawnCreep(core: Core) {
  if (!sampleCreep) {
    const body = getFighterBody(1);
    sampleCreep = core.mySpawn.spawnCreep(body).object;
  }
}

function assignCreepRole(core: Core) {
  core.myCreeps.forEach(creep => (creep._role = Role.Sample));
}
