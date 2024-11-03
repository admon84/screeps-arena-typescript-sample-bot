### Final Tutorial Arena

The main loop serves as the entry point for the bot's execution. It initializes the core, updates the game state, and invokes the managers to perform their respective tasks.

```typescript
// main.ts
import { getCore } from './Core';
import { runHarvest } from './managers/Harvest';
import { runMilitary } from './managers/Military';
import { runSpawn } from './managers/Spawn';

export function loop() {
  const core = getCore();
  core.run();

  runHarvest(core);
  runMilitary(core);
  runSpawn(core);
}
```

### Execution Flow

1. Initialize Core

   - Retrieve the singleton instance of the [Core](./Core.ts) class using `getCore`.
   - Update the game state for the current tick with `core.run`.

2. Run Managers

   - Harvest Manager: Spawns harvester. See [Harvest](./managers/Harvest.ts)
   - Military Manager: Spawns attackers. See [Military](./managers/Military.ts)
   - Spawn Manager: Spawning queue. See [Spawn](./managers/Spawn.ts)

   Each manager handles specific tasks, such as spawning creeps and executing their roles:

   - Harvester: Harvests and hauls energy. See [Harvester](./roles/Harvester.ts)
   - Attacker: Hunts enemy creeps. See [Attacker](./roles/Attacker.ts)
