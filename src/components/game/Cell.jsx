import "./Cell.css";

const Cell = ({ row, col, value, onClick }) => {
  const handleClick = () => {
    onClick(row, col);
  };

  return (
    <button className="cell" onClick={handleClick}>
      {value || ""}
    </button>
  );
};

export default Cell;
