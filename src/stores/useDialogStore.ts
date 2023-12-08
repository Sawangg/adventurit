import { create } from "zustand";

type DialogState = {
  text: string;
  options: string[];
  setText: (text: string) => void;
  setOptions: (options: string[]) => void;
};

export const useDialogStore = create<DialogState>()((set) => ({
  text: "",
  setText: (text) => set(() => ({ text })),
  options: [],
  setOptions: (options) => set(() => ({ options })),
}));
