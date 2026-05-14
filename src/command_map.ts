import type { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
  const locations = await state.pokeapi.fetchLocations(
    state.nextLocationsURL ?? undefined,
  );
  state.nextLocationsURL = locations.next;
  state.previousLocationsURL = locations.previous;
  for (let location of locations.results) {
    console.log(location.name);
  }
}
