# Screeps Arena TypeScript Sample Bot

This repository contains a TypeScript starter kit and bot base for Screeps Arena. It provides an extensible framework for developing bots, including core game state management, role-based creep behavior, and prioritized spawning.

## Bot Architecture

### Core Components

1. **Core Class Singleton**

   - The [Core](src/arena_tutorial/Core.ts) class is a singleton that manages game state and logic. It provides access to common game objects and maintains state for each arena. This pattern is ideal for Screeps Arena because it:
     - Centralizes access and manipulation of game objects, reducing redundancy.
     - Supports Arena-Specific game objects by extending the [Common Core](src/common/Core.ts) class.
     - Maintains State Persistence across ticks.

2. **Managers**

   - Managers are modular controllers responsible for specific game logic. They are invoked in the main loop to perform their respective tasks.
   - Example Managers:
     - **Harvest Manager**: Spawns harvester. See [Harvest](src/arena_tutorial/managers/Harvest.ts).
     - **Military Manager**: Spawns attacker. See [Military](src/arena_tutorial/managers/Military.ts).
     - **Spawn Manager**: Manages creep spawning. See [Spawn](src/arena_tutorial/managers/Spawn.ts).

3. **Spawn Order Queue**

   - Manage and prioritize the spawning of creeps. See [OrderQueue](src/common/classes/OrderQueue.ts).

4. **Creep Roles**

   - Creeps are assigned roles, each with specialized behaviors and tasks. Roles define the actions a creep can perform.
   - Example Roles:
     - **Harvester**: Harvests source and transfers energy. See [Harvester](src/arena_tutorial/roles/Harvester.ts).
     - **Attacker**: Attacks enemy creeps and structures. See [Attacker](src/arena_tutorial/roles/Attacker.ts).

### Main Loop

The main loop is the entry point of the bot's execution. It initializes the core, updates the game state, and runs the managers in sequence.

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

1. **Initialize Core**

   - The `getCore` function retrieves the singleton instance of the [Core](src/arena_tutorial/Core.ts) class.
   - The `core.run` method updates the game state for the current tick.

2. **Run Managers**

   - **Run Harvest**: Spawns Harvester creeps.
   - **Run Military**: Spawns Attacker creeps.
   - **Run Spawn**: Handles spawning of creeps.

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
