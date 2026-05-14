import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export type State = {
  readLine: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationsURL: string | null;
  previousLocationsURL: string | null;
};

export function initState(): State {
  return {
    readLine: createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "Pokedex > ",
    }),
    commands: {
      exit: {
        name: "exit",
        description: "Exits the pokedex",
        callback: commandExit,
      },
      help: {
        name: "help",
        description: "Displays a help message",
        callback: commandHelp,
      },
      map: {
        name: "map",
        description: "Displays the next 20 location areas",
        callback: commandMap,
      },
      mapb: {
        name: "mapb",
        description: "Displays the previous 20 location areas",
        callback: commandMapb,
      },
    },
    pokeapi: new PokeAPI(),
    nextLocationsURL: null,
    previousLocationsURL: null,
  };
}
