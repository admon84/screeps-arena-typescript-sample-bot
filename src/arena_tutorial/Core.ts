import { Core as CommonCore } from 'common/Core';
import { RESOURCE_ENERGY } from 'game/constants';
import { Source, StructureSpawn, StructureWall } from 'game/prototypes';
import { getObjectsByPrototype } from 'game/utils';

export class Core extends CommonCore {
  private static instance: Core;
  public mySpawn!: StructureSpawn;
  public enemySpawn!: StructureSpawn;
  public sources: Source[] = [];
  public walls: StructureWall[] = [];

  public constructor() {
    super();
  }

  public run() {
    super.run();

    const spawns = getObjectsByPrototype(StructureSpawn);
    this.mySpawn = spawns.filter((i: StructureSpawn) => !!i.my)[0];
    this.enemySpawn = spawns.filter((i: StructureSpawn) => i.my === false)[0];
    this.sources = getObjectsByPrototype(Source);
    this.walls = getObjectsByPrototype(StructureWall);
  }

  public static getInstance() {
    if (!Core.instance) {
      Core.instance = new Core();
    }
    return Core.instance;
  }

  public getSpawnEnergyAvailable(): number {
    return this.mySpawn?.store.energy || 0;
  }

  public getSpawnEnergyCapacity(): number {
    return this.mySpawn?.store.getCapacity(RESOURCE_ENERGY) || 0;
  }
}

export function getCore(): Core {
  return Core.getInstance();
}
