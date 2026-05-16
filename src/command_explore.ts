import type { State } from "./state.js";

export async function commandExplore(
  state: State,
  ...args: string[]
): Promise<void> {
  const locationName = args[0];
  if (!locationName) {
    console.log("Please provide a location first!");
    return;
  }
  console.log(`Exploring ${locationName}...`);
  const Location = await state.pokeapi.fetchLocation(locationName);
  console.log("Found Pokemon:");
  for (let pokemon of Object.values(Location.pokemonEncounters)) {
    console.log(` - ${pokemon.name}`);
  }
}
