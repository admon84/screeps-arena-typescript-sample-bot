import { Role } from 'common/enums/role';
import { arenaInfo } from 'game';
import { Creep } from 'game/prototypes';
import { getObjectsByPrototype, getTicks } from 'game/utils';
import { setCreepState } from './lib/creep';

export class Core {
  public tick: number = 0;
  public myCreeps: Creep[] = [];
  public myCreepsByRole: Partial<Record<Role, Creep[]>> = {};
  public enemyCreeps: Creep[] = [];

  public run() {
    this.tick = getTicks();

    if (this.tick === 1) {
      const { name, level } = arenaInfo;
      console.log(`✨Arena: ${name} [${level}]`);
    }

    this.myCreeps = [];
    this.enemyCreeps = [];
    this.myCreepsByRole = {};

    const creeps = getObjectsByPrototype(Creep).filter(c => c.hits);

    for (const c of creeps) {
      if (c.my) {
        this.myCreeps.push(c);
        if (c._role) {
          this.myCreepsByRole[c._role] = this.getAllOfRole(c._role);
          this.myCreepsByRole[c._role]!.push(c);
        }
      } else {
        this.enemyCreeps.push(c);
      }
    }
  }

  public getAllOfRole(role: Role): Creep[] {
    return this.myCreepsByRole[role] ?? [];
  }

  public getCreeps(role?: Role): Creep[] {
    return role !== undefined ? this.getAllOfRole(role) : this.myCreeps;
  }

  public runCreeps<T extends Core>(role: number, func: (creep: Creep, core: T) => void) {
    for (const creep of this.getAllOfRole(role)) {
      if (this.creepShouldRun(creep)) {
        func(creep, this as unknown as T);
      }
    }
  }

  public creepShouldRun(creep: Creep) {
    if (!creep.exists) {
      return false;
    }

    // Reset creep states before running creep role logic
    if (creep._state) {
      creep._states = [];
      setCreepState(creep, creep._state);
    }

    return true;
  }
}
