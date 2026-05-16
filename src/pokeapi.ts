import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  cache: Cache;

  constructor(interval: number) {
    this.cache = new Cache(interval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const currentURL = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area`;

    const dataInCache = this.cache.get<ShallowLocations>(currentURL);
    if (dataInCache) {
      return dataInCache;
    }

    const response = await fetch(currentURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const locations: ShallowLocations = await response.json();
    this.cache.add<ShallowLocations>(currentURL, locations);

    return locations;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const currentURL = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const dataInCache = this.cache.get<Location>(currentURL);
    if (dataInCache) {
      return dataInCache;
    }

    const response = await fetch(currentURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const locationDetail = await response.json();

    const pokemonEncounters = locationDetail.pokemon_encounters.map(
      (enounter: any) => {
        return { name: enounter.pokemon.name };
      },
    );

    const Location: Location = {
      name: locationName,
      pokemonEncounters,
    };

    this.cache.add<Location>(currentURL, Location);

    return Location;
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  name: string;
  pokemonEncounters: {
    name: string;
  }[];
};
