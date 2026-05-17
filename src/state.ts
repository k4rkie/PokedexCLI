import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  readLine: Interface;
  commands: Record<string, CLICommand>;
  nextLocationsURL: string | null;
  previousLocationsURL: string | null;
  pokeapi: PokeAPI;
  pokedex: Record<string, Pokemon>;
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
      explore: {
        name: "explore <area_name>",
        description: "Displays list of Pokemons in the given area",
        callback: commandExplore,
      },
      catch: {
        name: "catch <pokemon>",
        description: "Catch a Pokemon",
        callback: commandCatch,
      },
      inspect: {
        name: "inspect <pokemon>",
        description: "See details about the pokemon you've caught",
        callback: commandInspect,
      },
      pokedex: {
        name: "pokedex",
        description: "See the list of pokemon you've caught",
        callback: commandPokedex,
      },
    },
    pokeapi: new PokeAPI(30000),
    pokedex: {},
    nextLocationsURL: null,
    previousLocationsURL: null,
  };
}
