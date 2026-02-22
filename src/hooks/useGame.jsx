/** @module useGame */
import { useState, useCallback, useEffect } from "react";

/**
 * Custom hook to manage Tic-Tac-Toe game logic.
 * Handles board state, move validation, win detection, and draw conditions.
 * * @param {number} [boardSize=3] - The dimensions of the square board.
 * @param {number} [winningLength=3] - The number of marks in a row required to win.
 * @returns {Object} Game state and control functions.
 */
export const useGame = (boardSize = 3, winningLength = 3) => {
    /**
     * @name board
     * @type {Array<Array<string|null>>}
     * @description 2D array representing the current state of the game board.
     * @inner
     */
    const [board, setBoard] = useState(createEmptyBoard(boardSize));

    /**
     * @name currentPlayer
     * @type {string}
     * @description The player whose turn it is ("X" or "O").
     * @inner
     */
    const [currentPlayer, setCurrentPlayer] = useState("X");

    /**
     * Checks if a move at the specified coordinates results in a win.
     * @function
     * @param {Array<Array<string|null>>} board - The current board to check.
     * @param {number} row - Row index of the latest move.
     * @param {number} col - Column index of the latest move.
     * @returns {boolean} True if the move is a winning move.
     */
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);
    const [movesCount, setMovesCount] = useState(0);

    /**
     * @function createEmptyBoard
     * @param {number} size - Height and width of the board
     * @returns
     */
    function createEmptyBoard(size) {
        return Array(size)
            .fill()
            .map(() => Array(size).fill(null));
    }

    useEffect(() => {
        resetGame();
    }, [boardSize]);

    /**
     * Checks if a move at the specified coordinates results in a win.
     * @function checkWinner
     * @param {Array<Array<string|null>>} board - The current board to check.
     * @param {number} row - Row index of the latest move.
     * @param {number} col - Column index of the latest move.
     * @returns {boolean} True if the move is a winning move.
     */
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
        [winningLength],
    );

    /**
     * Executes a move at the specified coordinates.
     * @function makeMove
     * @param {number} row - Target row index.
     * @param {number} col - Target column index.
     * @returns {boolean} True if the move was successfully processed.
     */
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
        [
            board,
            currentPlayer,
            winner,
            isDraw,
            movesCount,
            boardSize,
            checkWinner,
        ],
    );

    /**
     * Resets the game state to its initial values.
     * @function resetGame
     */
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
