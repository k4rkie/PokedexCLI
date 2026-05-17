import { Pokemon } from "./pokeapi.js";
import type { State } from "./state.js";

export async function commandInspect(
  state: State,
  ...args: string[]
): Promise<void> {
  const pokemonName = args[0];
  if (!pokemonName) {
    console.log("Please provide a pokemon first!");
    console.log("Use `help` command to see usage");
    return;
  }
  if (!state.pokedex[pokemonName]) {
    console.log(`You have not caught that pokemon`);
    return;
  }
  const pokemon = await state.pokeapi.fetchPokemon(pokemonName);
  console.log(`Name: ${pokemonName}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  console.log("Stats:");
  for (let [stat, statValue] of Object.entries(pokemon.stats)) {
    console.log(` - ${stat}: ${statValue}`);
  }
  console.log("Types:");
  for (let type of pokemon.types) {
    console.log(` - ${type}`);
  }
  return;
}
