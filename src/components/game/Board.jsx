import Cell from "./Cell";
import "./Board.css";

const Board = ({ board, onCellClick }) => {
  const renderRow = (rowIndex) => {
    return board[rowIndex].map((cell, colIndex) => (
      <Cell
        key={colIndex}
        row={rowIndex}
        col={colIndex}
        value={cell}
        onClick={onCellClick}
      />
    ));
  };

  return (
    <div className="board">
      {board.map((_, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {renderRow(rowIndex)}
        </div>
      ))}
    </div>
  );
};

export default Board;
