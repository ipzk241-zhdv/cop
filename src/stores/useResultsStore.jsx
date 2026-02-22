import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useResultsStore = create(
  persist(
    (set, get) => ({
      results: [],

      addResult: (result) => {
        const newResult = {
          id: result.id || `game_${Date.now()}`,
          playerId: result.playerId,
          movesCount: result.movesCount,
          result: result.result,
          winner: result.winner,
          boardSize: result.boardSize,
          winningLength: result.winningLength,
          timestamp: Date.now(),
          duration: result.duration || 0,
          board: result.board || null,
          reason: result.reason || "game_end",
        };

        set((state) => ({
          results: [newResult, ...state.results].slice(0, 100),
        }));

        return newResult;
      },

      getResultsByPlayer: (playerId) => {
        const { results } = get();
        return results.filter((result) => result.playerId === playerId);
      },

      getRecentResults: (limit = 10) => {
        const { results } = get();
        return results.slice(0, limit);
      },

      clearResults: () => set({ results: [] }),

      getStats: () => {
        const { results } = get();
        const totalGames = results.length;
        const wins = results.filter((r) => r.result === "win").length;
        const draws = results.filter((r) => r.result === "draw").length;

        return {
          totalGames,
          wins,
          draws,
        };
      },
    }),
    {
      name: "tic-tac-toe-results",
    }
  )
);
