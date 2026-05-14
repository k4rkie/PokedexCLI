import type { State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");
  for (let command in state.commands) {
    console.log(`${command}: ${state.commands[command].description}`);
  }
}
