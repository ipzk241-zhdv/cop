import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSettingsStore = create(
  persist(
    (set, get) => ({
      boardSize: 3,
      winningLength: 3,

      setBoardSize: (size) => {
        const currentState = get();
        set({
          boardSize: size,
          winningLength: Math.min(currentState.winningLength, size),
        });
      },

      setWinningLength: (length) => set({ winningLength: length }),

      setSettings: (settings) => set(settings),

      resetSettings: () => set({ boardSize: 3, winningLength: 3 }),
    }),
    {
      name: "tic-tac-toe-settings",
    }
  )
);
