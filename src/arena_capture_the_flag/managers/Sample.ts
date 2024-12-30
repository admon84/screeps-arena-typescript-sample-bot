import { RoleCTF as Role } from 'common/enums/role';
import { Core } from '../Core';
import { run as runSampleRole } from '../roles/Sample';

// Global variables persist between ticks in Screeps Arena.
let assignedRoles = false;

export function runSample(core: Core) {
  // This is sample code, replace with actual code
  assignCreepRole(core);
  core.runCreeps(Role.Sample, runSampleRole);
}

function assignCreepRole(core: Core) {
  if (!assignedRoles) {
    core.myCreeps.forEach(creep => (creep._role = Role.Sample));
    assignedRoles = true;
  }
}
