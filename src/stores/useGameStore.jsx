import { create } from "zustand";

export const useGameStore = create((set, get) => ({
  currentGame: null,
  gameHistory: [],

  startNewGame: (playerId, settings) => {
    const gameId = `game_${Date.now()}`;
    const newGame = {
      id: gameId,
      playerId,
      settings,
      startTime: Date.now(),
      moves: [],
      board: Array(settings.boardSize)
        .fill()
        .map(() => Array(settings.boardSize).fill(null)),
      currentPlayer: "X",
      status: "playing",
    };

    set((state) => ({
      currentGame: newGame,
      gameHistory: [...state.gameHistory, newGame],
    }));

    return newGame;
  },

  makeMove: (row, col) => {
    const { currentGame } = get();
    if (!currentGame || currentGame.status !== "playing") return false;

    const newBoard = currentGame.board.map((r) => [...r]);
    if (newBoard[row][col]) return false;

    newBoard[row][col] = currentGame.currentPlayer;
    const newMove = {
      player: currentGame.currentPlayer,
      row,
      col,
      timestamp: Date.now(),
    };

    set((state) => ({
      currentGame: {
        ...state.currentGame,
        board: newBoard,
        currentPlayer: state.currentGame.currentPlayer === "X" ? "O" : "X",
        moves: [...state.currentGame.moves, newMove],
      },
    }));

    return true;
  },

  finishGame: (result) => {
    const { currentGame } = get();
    if (!currentGame) return;

    const finishedGame = {
      ...currentGame,
      endTime: Date.now(),
      status: "finished",
      result: result.result,
      winner: result.winner,
      duration: Date.now() - currentGame.startTime,
    };

    set({ currentGame: finishedGame });

    const { addResult } = useResultsStore.getState();
    addResult({
      playerId: currentGame.playerId,
      movesCount: currentGame.moves.length,
      result: result.result,
      winner: result.winner,
      boardSize: currentGame.settings.boardSize,
      winningLength: currentGame.settings.winningLength,
      duration: finishedGame.duration,
    });

    return finishedGame;
  },

  resetCurrentGame: () => {
    const { currentGame } = get();
    if (!currentGame) return;

    set({
      currentGame: {
        ...currentGame,
        board: Array(currentGame.settings.boardSize)
          .fill()
          .map(() => Array(currentGame.settings.boardSize).fill(null)),
        moves: [],
        currentPlayer: "X",
        status: "playing",
        startTime: Date.now(),
      },
    });
  },

  clearCurrentGame: () => set({ currentGame: null }),
}));
