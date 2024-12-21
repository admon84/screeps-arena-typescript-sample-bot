# Screeps Arena TypeScript Sample Bot

This repository contains a TypeScript starter kit and bot base for Screeps Arena. It provides an extensible framework for developing bots, including core game state management, role-based creep behavior, and prioritized spawning.

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

## Bot Architecture

The bot is organized with a Core class for game state management, high-level task Managers, role-based stateful Creeps, and a priority Spawn queue.

### Core Components

1. **Core Class Singleton**

   - Manages game state and logic, providing access to common and arena-specific game objects. See [Core](src/arena_tutorial/Core.ts).

2. **Managers**

   - Modular controllers for specific game logic, invoked in the main loop. Examples: [Harvest](src/arena_tutorial/managers/Harvest.ts), [Military](src/arena_tutorial/managers/Military.ts), [Spawn](src/arena_tutorial/managers/Spawn.ts).

3. **Creep Roles**

   - Defines specialized behaviors and tasks for creeps. Examples: [Harvester](src/arena_tutorial/roles/Harvester.ts), [Attacker](src/arena_tutorial/roles/Attacker.ts).

4. **Spawn Order Queue**
   - Manages and prioritizes creep spawning. See [OrderQueue](src/common/classes/OrderQueue.ts).

### Arena Implementations

Each arena has its own specific bot implementation. Detailed documentation for each arena can be found in their respective README files:

- [Final Tutorial Arena](src/arena_tutorial/README.md)
- [Capture the Flag Arena](src/arena_capture_the_flag/README.md)
- [Collect and Control Arena](src/arena_collect_and_control/README.md)
- [Spawn and Swamp Arena](src/arena_spawn_and_swamp/README.md)

## Next Steps

Explore the bot's architecture and develop new strategies for different arenas. Customize the managers and role-based creeps to fit your gameplay style. Iterate and refine your bot to progress in Screeps Arena. Happy coding!
