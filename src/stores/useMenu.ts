import { create } from "zustand";

export type MenuState = {
  currentMenu: string;
  setCurrentMenu: (newMenu: string) => void;
};

export const useMenu = create<MenuState>()((set) => ({
  currentMenu: "anykey",
  setCurrentMenu: (newMenu) => set(() => ({ currentMenu: newMenu })),
}));
