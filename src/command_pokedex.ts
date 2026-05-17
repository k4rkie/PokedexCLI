import { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
  if (Object.keys(state.pokedex).length === 0) {
    return console.log("You have not caught any pokemon yet!");
  }
  console.log("Your pokedex:");
  for (let pokemon in state.pokedex) {
    console.log(` - ${pokemon}`);
  }
  return;
}
