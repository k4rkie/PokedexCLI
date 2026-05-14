export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const currentURL = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area`;
    const response = await fetch(currentURL, {
      method: "GET",
      headers: {
        "Content-Type": "application.json",
      },
    });
    return await response.json();
  }

  // async fetchLocation(locationName: string): Promise<Location> {}
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

export type Location = {};
