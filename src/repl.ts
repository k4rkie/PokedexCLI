import process from "process";
import { createInterface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  let cleanedWords: string[] = [];
  const words = input.trim().split(" ");
  for (let word of words) {
    if (word) {
      cleanedWords.push(word.toLowerCase());
    }
  }
  return cleanedWords;
}

export function startRepl(state: State) {
  state.readLine.prompt();

  const commands = state.commands;

  state.readLine.on("line", (input: string) => {
    if (input in commands) {
      commands[input].callback(state);
      state.readLine.prompt();
    } else {
      console.log("Unknown command");
      state.readLine.prompt();
    }
  });
}
