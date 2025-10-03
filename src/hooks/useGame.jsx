import { useState, useCallback } from "react";

export const useGame = () => {
  const [board, setBoard] = useState(
    Array(3)
      .fill()
      .map(() => Array(3).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [movesCount, setMovesCount] = useState(0);

  const checkWinner = useCallback((board, row, col) => {
    const player = board[row][col];
    if (!player) return false;

    if (
      board[row][0] === player &&
      board[row][1] === player &&
      board[row][2] === player
    ) {
      return true;
    }

    if (
      board[0][col] === player &&
      board[1][col] === player &&
      board[2][col] === player
    ) {
      return true;
    }

    if (
      row === col &&
      board[0][0] === player &&
      board[1][1] === player &&
      board[2][2] === player
    ) {
      return true;
    }

    if (
      row + col === 2 &&
      board[0][2] === player &&
      board[1][1] === player &&
      board[2][0] === player
    ) {
      return true;
    }

    return false;
  }, []);

  const makeMove = useCallback(
    (row, col) => {
      if (board[row][col] || winner || isDraw) {
        return false;
      }

      const newBoard = board.map((r) => [...r]);
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);

      const newMovesCount = movesCount + 1;
      setMovesCount(newMovesCount);

      if (checkWinner(newBoard, row, col)) {
        setWinner(currentPlayer);
        return true;
      }

      if (newMovesCount === 9) {
        setIsDraw(true);
        return true;
      }

      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      return true;
    },
    [board, currentPlayer, winner, isDraw, movesCount, checkWinner]
  );

  const resetGame = useCallback(() => {
    setBoard(
      Array(3)
        .fill()
        .map(() => Array(3).fill(null))
    );
    setCurrentPlayer("X");
    setWinner(null);
    setIsDraw(false);
    setMovesCount(0);
  }, []);

  const gameStatus = {
    isGameActive: !winner && !isDraw,
    isGameFinished: winner || isDraw,
  };

  return {
    board,
    currentPlayer,
    winner,
    isDraw,
    movesCount,
    gameStatus,

    makeMove,
    resetGame,
  };
};
