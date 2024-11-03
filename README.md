# Screeps Arena TypeScript Sample Bot

This repository contains a TypeScript bot base for Screeps Arena. It's a starter kit designed to help you quickly jump into the action and build advanced bots.

This bot can beat the final stage of the Tutorial Arena and idle players in each basic arena, providing a solid foundation for your own bot development.

## Bot Architecture

### Core Components

1. **Core Class Singleton**

   - The [Core](src/arena_tutorial/Core.ts) class is a singleton that manages game state and logic. It provides access to common game objects and maintains state for each arena. This pattern is ideal for Screeps Arena because:
     - **Centralized Management**: Ensures consistent management of game objects and state across arenas.
     - **Shared Resources**: Allows access and manipulation of common game objects, reducing redundancy.
     - **Arena-Specific Logic**: Supports each arena's unique game objects by extending the [Common Core](src/common/Core.ts) class.
     - **State Persistence**: Maintains game state across ticks.

2. **Managers**

   - Managers are modular controllers responsible for specific game logic. They are invoked in the main loop to perform their respective tasks.
   - Example Managers:
     - **Harvest Manager**: Handles resource harvesting logic. See [Harvest](src/arena_tutorial/managers/Harvest.ts).
     - **Military Manager**: Manages military operations. See [Military](src/arena_tutorial/managers/Military.ts).
     - **Spawn Manager**: Manages the spawning of new creeps. See [Spawn](src/arena_tutorial/managers/Spawn.ts).

3. **Creep Roles**

   - Creeps are assigned roles, each with specialized behaviors and tasks. Roles define the actions a creep can perform.
   - Example Roles:
     - **Harvester**: Gathers resources and transfers them to structures. See [Harvester](src/arena_tutorial/roles/Harvester.ts).
     - **Attacker**: Engages in combat with enemy creeps and structures. See [Attacker](src/arena_tutorial/roles/Attacker.ts).

4. **Spawn Order Queue**
   - Manage and prioritize the spawning of creeps. See [OrderQueue](src/common/classes/OrderQueue.ts).

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

Dive into the bot's architecture, customize it and develop your own strategies, and dominate the Screeps Arena. Happy coding!
