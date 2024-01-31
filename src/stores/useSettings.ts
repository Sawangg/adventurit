import { create } from "zustand";
import { persist } from "zustand/middleware";

type SettingsState = {
  graphics: boolean;
  setGraphics: (graphics: boolean) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      graphics: true,
      setGraphics: (graphics) => set(() => ({ graphics })),
    }),
    { name: "settings-storage" },
  ),
);
