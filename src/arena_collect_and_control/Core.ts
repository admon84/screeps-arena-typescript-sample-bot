import { AreaEffect, ScoreCollector } from 'arena';
import { Core as CommonCore } from 'common/Core';
import { RESOURCE_ENERGY } from 'game/constants';
import {
  Resource,
  Source,
  Structure,
  StructureContainer,
  StructureRampart,
  StructureSpawn,
  StructureTower,
} from 'game/prototypes';
import { getObjectsByPrototype } from 'game/utils';

export class Core extends CommonCore {
  private static instance: Core;
  public mySpawn!: StructureSpawn;
  public myTowers: StructureTower[] = [];
  public myRamparts: StructureRampart[] = [];
  public enemySpawn!: StructureSpawn;
  public enemyTowers: StructureTower[] = [];
  public enemyRamparts: StructureRampart[] = [];
  public enemyStructures: Structure[] = [];
  public sources: Source[] = [];
  public containers: StructureContainer[] = [];
  public scoreCollector!: ScoreCollector;
  public droppedResource: Resource[] = [];
  public avoidAreas: AreaEffect[] = [];

  public run() {
    super.run();

    const spawns = getObjectsByPrototype(StructureSpawn);
    this.mySpawn = spawns.filter((i: StructureSpawn) => !!i.my)[0];
    this.enemySpawn = spawns.filter((i: StructureSpawn) => i.my === false)[0];

    const towers = getObjectsByPrototype(StructureTower);
    this.myTowers = towers.filter(s => s.my);
    this.enemyTowers = towers.filter(s => !s.my);

    const ramparts = getObjectsByPrototype(StructureRampart);
    this.myRamparts = ramparts.filter(s => s.my);
    this.enemyRamparts = ramparts.filter(s => !s.my);

    this.enemyStructures = [this.enemySpawn, ...this.enemyTowers, ...this.enemyRamparts];

    this.sources = getObjectsByPrototype(Source);

    this.containers = getObjectsByPrototype(StructureContainer);

    this.scoreCollector = getObjectsByPrototype(ScoreCollector)[0];

    this.droppedResource = getObjectsByPrototype(Resource);

    this.avoidAreas = this.scoreCollector.exists && !this.scoreCollector.my ? getObjectsByPrototype(AreaEffect) : [];
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
