import type { State } from "./state.js";

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
  const pokemonName = args[0];
  if (!pokemonName) {
    console.log("Please provide a pokemon first!");
    console.log("Use `help` command to see usage");
    return;
  }
  console.log(`Throwing a Pokeball at ${pokemonName}...`);
  const pokemon = await state.pokeapi.fetchPokemon(pokemonName);
  const randomChance = Math.ceil(
    Math.random() * Math.round(pokemon.baseExperience / 10),
  );
  const catchThreadHold = 5;
  if (randomChance <= 5) {
    state.pokedex[pokemonName] = pokemon;
    console.log(`${pokemonName} was caught!`);
  } else {
    console.log(`${pokemonName} escaped!`);
  }
  return;
}
