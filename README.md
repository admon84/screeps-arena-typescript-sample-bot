# Screeps Arena TypeScript Sample Bot

This repository contains a TypeScript starter kit and bot base for Screeps Arena. It provides an extensible framework for developing bots, including core game state management, role-based creep behavior, and prioritized spawning.

## Bot Architecture

### Core Components

1. **Core Class Singleton**

   - Manages game state and logic, providing access to common and arena-specific game objects. See [Core](src/arena_tutorial/Core.ts).

2. **Managers**

   - Modular controllers for specific game logic, invoked in the main loop. Examples: [Harvest](src/arena_tutorial/managers/Harvest.ts), [Military](src/arena_tutorial/managers/Military.ts), [Spawn](src/arena_tutorial/managers/Spawn.ts).

3. **Creep Roles**

   - Defines specialized behaviors and tasks for creeps. Examples: [Harvester](src/arena_tutorial/roles/Harvester.ts), [Attacker](src/arena_tutorial/roles/Attacker.ts).

4. **Spawn Order Queue**
   - Manages and prioritizes creep spawning. See [OrderQueue](src/common/classes/OrderQueue.ts).

### Main Loop

The main loop serves as the entry point for the bot's execution. It initializes the core, updates the game state, and invokes the managers to perform their respective tasks.

```typescript
// src/arena_tutorial/main.ts
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

   - Retrieve the singleton instance of the [Core](src/arena_tutorial/Core.ts) class using `getCore`.
   - Update the game state for the current tick with `core.run`.

2. Run Managers

   - Harvest manages harvester creeps. See [Harvest](src/arena_tutorial/managers/Harvest.ts)
   - Military manages attacker creeps. See [Military](src/arena_tutorial/managers/Military.ts)
   - Spawn manages creep spawning. See [Spawn](src/arena_tutorial/managers/Spawn.ts)

   Each manager handles specific tasks, such as spawning creeps and executing their roles:

   - Harvest source and transfers energy. See [Harvester](src/arena_tutorial/roles/Harvester.ts)
   - Attack enemy creeps and structures. See [Attacker](src/arena_tutorial/roles/Attacker.ts)

### Example Implementations

The bot includes implementations for different arenas, each with its own Core class. Examples include:

- [Final Tutorial Arena](src/arena_tutorial/)
- [Capture the Flag Arena](src/arena_capture_the_flag/)
- [Collect and Control Arena](src/arena_collect_and_control/)
- [Spawn and Swamp Arena](src/arena_spawn_and_swamp/)

## Getting Started

To get started with this sample bot, follow these steps:

1. Clone the repository.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:

   ```bash
   npm run build
   ```

4. Change the Screeps Arena client to point to the desired `dist/arena_*` folder.

## Next Steps

Explore the bot's architecture to understand its core components and design patterns. Customize the existing modules to implement strategies to defeat opponents in different arenas. Utilize the managers and role-based creep systems as a foundation for crafting your roles and mechanics. Continue to iterate and refine your bot to improve your rank in Screeps Arena. Happy coding!
