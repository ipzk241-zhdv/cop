import Cell from "./Cell";
import "./Board.css";

const Board = ({
  board,
  onCellClick,
  disabled = false,
  isResultView = false,
}) => {
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
