import { RoleCTF as Role } from 'common/enums/role';
import { CARRY, MOVE } from 'game/constants';
import { Creep } from 'game/prototypes';
import { Core } from '../Core';
import { run as runSampleRole } from '../roles/Sample';

let sampleCreep: Creep | undefined;

export function runSample(core: Core) {
  // This is sample code, replace with actual code
  core.runCreeps(Role.Sample, runSampleRole);
  spawnCreep(core);
  assignCreepRole(core);
}

function spawnCreep(core: Core) {
  if (!sampleCreep) {
    const creepBody = [MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY];
    sampleCreep = core.mySpawn.spawnCreep(creepBody).object;
  }
}

function assignCreepRole(core: Core) {
  core.myCreeps.forEach(creep => (creep._role = Role.Sample));
}
