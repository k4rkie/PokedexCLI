import { State } from "./state.js";

export function commandExit(state: State): Promise<void> {
  console.log("Closing the Pokedex... Goodbye!");
  state.readLine.close();
  process.exit(0);
}
