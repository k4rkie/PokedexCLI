import type { State } from "./state.js";

export async function commandMapb(state: State): Promise<void> {
  if (!state.previousLocationsURL) {
    console.log("You're on the first page");
    return;
  }
  const locations = await state.pokeapi.fetchLocations(
    state.previousLocationsURL,
  );
  state.nextLocationsURL = locations.next;
  state.previousLocationsURL = locations.previous;
  for (let location of locations.results) {
    console.log(location.name);
  }
}
