### Collect and Control Arena

The main loop serves as the entry point for the bot's execution. It initializes the core, updates the game state, and invokes the managers to perform their respective tasks.

```typescript
// main.ts
import { getCore } from './Core';
import { runSample } from './managers/Sample';

export function loop() {
  const core = getCore();
  core.run();

  runSample(core);
}
```

### Execution Flow

1. Initialize Core

   - Retrieve the singleton instance of the [Core](./Core.ts) class using `getCore`.
   - Update the game state for the current tick with `core.run`.

2. Run Managers

   - Sample Manager: Spawns a hauler. See [Sample](./managers/Sample.ts)

   Each manager handles specific tasks, such as spawning creeps and executing their roles:

   - Sample Role: Hauls score to the score collector. See [Sample](./roles/Sample.ts)
