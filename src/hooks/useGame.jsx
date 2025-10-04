import { useState, useCallback, useEffect } from "react";

export const useGame = (boardSize = 3, winningLength = 3) => {
  const [board, setBoard] = useState(createEmptyBoard(boardSize));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [movesCount, setMovesCount] = useState(0);

  function createEmptyBoard(size) {
    return Array(size)
      .fill()
      .map(() => Array(size).fill(null));
  }

  useEffect(() => {
    resetGame();
  }, [boardSize]);

  const checkWinner = useCallback(
    (board, row, col) => {
      const player = board[row][col];
      if (!player) return false;

      const size = board.length;
      const directions = [
        [0, 1], // горизонталь
        [1, 0], // вертикаль
        [1, 1], // діагональ \
        [1, -1], // діагональ /
      ];

      for (const [dx, dy] of directions) {
        let count = 1;

        for (let i = 1; i < winningLength; i++) {
          const newRow = row + dx * i;
          const newCol = col + dy * i;
          if (
            newRow >= 0 &&
            newRow < size &&
            newCol >= 0 &&
            newCol < size &&
            board[newRow][newCol] === player
          ) {
            count++;
          } else {
            break;
          }
        }

        for (let i = 1; i < winningLength; i++) {
          const newRow = row - dx * i;
          const newCol = col - dy * i;
          if (
            newRow >= 0 &&
            newRow < size &&
            newCol >= 0 &&
            newCol < size &&
            board[newRow][newCol] === player
          ) {
            count++;
          } else {
            break;
          }
        }

        if (count >= winningLength) {
          return true;
        }
      }

      return false;
    },
    [winningLength]
  );

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

      if (newMovesCount === boardSize * boardSize) {
        setIsDraw(true);
        return true;
      }

      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      return true;
    },
    [board, currentPlayer, winner, isDraw, movesCount, boardSize, checkWinner]
  );

  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard(boardSize));
    setCurrentPlayer("X");
    setWinner(null);
    setIsDraw(false);
    setMovesCount(0);
  }, [boardSize]);

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
