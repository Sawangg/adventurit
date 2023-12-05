import { create } from "zustand";
import { useDialogStore } from "./useDialogStore";

export type Command = {
  type: string;
  args: unknown[];
};

type CommandState = {
  commands: Command[];
  add: (commands: Command[]) => void;
  remove: () => void;
};

export const useCommandStore = create<CommandState>()((set) => ({
  commands: [],
  add: (commands) =>
    set((state) => {
      commandHandler(commands[0]);
      return { commands: [...state.commands, ...commands] };
    }),
  remove: () =>
    set((state) => {
      const commands = state.commands.slice(1);
      if (commands[0]) commandHandler(commands[0]);
      else commandHandler({ type: "clear", args: [] });
      return { commands: state.commands.slice(1) };
    }),
}));

const commandHandler = (command: Command) => {
  switch (command.type) {
    case "action":
      console.log("action");
      console.log(command.args);
      break;
    case "dialog":
      {
        const dialogStore = useDialogStore.getState();
        dialogStore.setText(command.args[0] as string);
      }
      break;
    case "progess":
      console.log(command.args);
      break;
    case "question":
      console.log(command.args);
      break;
    case "clear":
      {
        const dialogStore = useDialogStore.getState();
        dialogStore.setText("");
      }
      break;
    default:
      break;
  }
};
