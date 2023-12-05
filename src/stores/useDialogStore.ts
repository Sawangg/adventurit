import { create } from "zustand";

type DialogState = {
  text: string;
  setText: (text: string) => void;
};

export const useDialogStore = create<DialogState>()((set) => ({
  text: "",
  setText: (text) => set(() => ({ text })),
}));
