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

  state.readLine.on("line", async (input: string) => {
    if (input in commands) {
      try {
        await commands[input].callback(state);
      } catch (err) {
        console.log((err as Error).message);
      }
      state.readLine.prompt();
    } else {
      console.log("Unknown command");
      state.readLine.prompt();
    }
  });
}
