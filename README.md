# Screeps Arena TypeScript Sample Bot

This repo has a TypeScript bot for Screeps Arena. It's a working example to help you create and manage your own bots, and it can beat the final stage of the Tutorial Arena.

## Features

- **Core Class Singleton**: A central class that manages game state and logic, with inheritance for different arenas.
- **Logic Controllers (Managers)**: Modular controllers that handle specific game logic, such as spawning, harvesting, and military operations.
- **Creep Roles**: Predefined roles for creeps, each with specialized behaviors and tasks.
- **Spawn Order Queue**: A system to manage and prioritize the spawning of creeps based on game needs.
- **Arena Samples**: Basic examples demonstrating different game strategies and mechanics.
- **Tutorial Final Stage Bot**: A fully functional bot designed to complete the final stage of the Tutorial Arena.

## Getting Started

To get started with this sample bot, follow these steps:

1. Clone the repository

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:

   ```bash
   npm run build
   ```

4. Change the Screeps Arena client to point to the desired `dist/*` folder

## Next Steps

Explore the bot's architecture, tweak it with your own strategies, and dominate the Screeps Arena. Happy coding!
