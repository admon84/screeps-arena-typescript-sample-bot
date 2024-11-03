import { Core as CommonCore } from 'common/Core';
import {
  ConstructionSite,
  StructureContainer,
  StructureExtension,
  StructureRampart,
  StructureSpawn,
  StructureTower,
} from 'game/prototypes';
import { getObjectsByPrototype } from 'game/utils';

/**
 * Spawn and Swamp Core class.
 *
 * Provides access to the Spawn and Swamp game objects and game state.
 *
 * @extends CommonCore
 */
export class Core extends CommonCore {
  private static instance: Core;
  public mySpawn!: StructureSpawn;
  public myTowers: StructureTower[] = [];
  public myExts: StructureExtension[] = [];
  public myRamparts: StructureRampart[] = [];
  public myConstrSites: ConstructionSite[] = [];
  public enemySpawn!: StructureSpawn;
  public enemyTowers: StructureTower[] = [];
  public enemyExts: StructureExtension[] = [];
  public enemyRamparts: StructureRampart[] = [];
  public enemyConstrSites: ConstructionSite[] = [];
  public containers: StructureContainer[] = [];

  public run() {
    super.run();

    const spawns = getObjectsByPrototype(StructureSpawn);
    this.mySpawn = spawns.filter(s => s.my)[0];
    this.enemySpawn = spawns.filter(s => !s.my)[0];

    const towers = getObjectsByPrototype(StructureTower);
    this.myTowers = towers.filter(s => s.my);
    this.enemyTowers = towers.filter(s => !s.my);

    const exts = getObjectsByPrototype(StructureExtension);
    this.myExts = exts.filter(s => s.my);
    this.enemyExts = exts.filter(s => !s.my);

    const ramps = getObjectsByPrototype(StructureRampart);
    this.myRamparts = ramps.filter(s => s.my);
    this.enemyRamparts = ramps.filter(s => !s.my);

    const constrSites = getObjectsByPrototype(ConstructionSite);
    this.myConstrSites = constrSites.filter(s => s.my);
    this.enemyConstrSites = constrSites.filter(s => !s.my);

    this.containers = getObjectsByPrototype(StructureContainer);
  }

  public static getInstance() {
    if (!Core.instance) {
      Core.instance = new Core();
    }
    return Core.instance;
  }
}

/**
 * @returns The Core instance.
 */
export function getCore(): Core {
  return Core.getInstance();
}
