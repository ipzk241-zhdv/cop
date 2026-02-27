/** @module Board */
import Cell from "./Cell";
import "./Board.css";

/**
 * Board component that renders the game grid.
 * It dynamically generates rows and cells based on the provided board state.
 * @param {string[][]} board - A 2D array representing the game state (e.g., [['X', 'O', null], ...]).
 * @param {Function} onCellClick - Callback function executed when a cell is clicked.
 * @param {boolean} [disabled=false] - If true, prevents interaction with the board.
 * @param {boolean} [isResultView=false] - If true, applies specific styles for the results screen.
 * @returns {JSX.Element} The rendered game board grid.
 */
const Board = ({
    board,
    onCellClick,
    disabled = false,
    isResultView = false,
}) => {
    /**
     * Renders a specific row of the game board.
     * Maps through the column data to generate Cell components.
     * @param {number} rowIndex - The index of the row to be rendered.
     * @returns {JSX.Element[]} An array of Cell components for the given row.
     */
    const renderRow = (rowIndex) => {
        return board[rowIndex].map((cell, colIndex) => (
            <Cell
                key={colIndex}
                row={rowIndex}
                col={colIndex}
                value={cell}
                onClick={onCellClick}
                disabled={disabled}
                isResultView={isResultView}
            />
        ));
    };

    return (
        <div className={`board ${isResultView ? "board-result" : ""}`}>
            {board.map((_, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {renderRow(rowIndex)}
                </div>
            ))}
        </div>
    );
};

export default Board;
