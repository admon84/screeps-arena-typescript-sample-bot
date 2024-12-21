import { BodyPart, Flag } from 'arena/season_beta/capture_the_flag/basic/prototypes';
import { Core as CommonCore } from 'common/Core';
import { StructureTower } from 'game/prototypes';
import { getObjectsByPrototype } from 'game/utils';

/**
 * Capture the Flag Core class.
 *
 * Provides access to the Capture the Flag game objects and game state.
 *
 * @extends CommonCore
 */
export class Core extends CommonCore {
  private static instance: Core;
  public myFlag!: Flag;
  public myTowers: StructureTower[] = [];
  public enemyFlag!: Flag;
  public enemyTowers: StructureTower[] = [];
  public bodyParts: BodyPart[] = [];

  public run() {
    super.run();

    const flags = getObjectsByPrototype(Flag);
    this.myFlag = flags.filter(s => s.my)[0];
    this.enemyFlag = flags.filter(s => !s.my)[0];

    const towers = getObjectsByPrototype(StructureTower);
    this.myTowers = towers.filter(s => s.my);
    this.enemyTowers = towers.filter(s => !s.my);

    this.bodyParts = getObjectsByPrototype(BodyPart);
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
