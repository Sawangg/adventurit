import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SettingsState = {
  sounds: boolean;
};

const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      sounds: true,
    }),
    {
      name: "settings-storage",
    },
  ),
);
