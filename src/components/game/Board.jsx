import Cell from "./Cell";
import "./Board.css";

const Board = ({ onCellClick }) => {
  const renderRow = (rowIndex) => {
    return Array(3)
      .fill(null)
      .map((_, colIndex) => (
        <Cell
          key={colIndex}
          row={rowIndex}
          col={colIndex}
          value={null}
          onClick={onCellClick}
        />
      ));
  };

  return (
    <div className="board">
      {Array(3)
        .fill(null)
        .map((_, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {renderRow(rowIndex)}
          </div>
        ))}
    </div>
  );
};

export default Board;
