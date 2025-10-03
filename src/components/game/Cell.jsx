import "./Cell.css";

const Cell = ({ row, col, value, onClick }) => {
  const handleClick = () => {
    onClick(row, col);
  };

  const getCellClass = () => {
    let className = "cell";
    if (value) {
      className += ` ${value.toLowerCase()}`;
    }
    return className;
  };

  return (
    <button className={getCellClass()} onClick={handleClick}>
      {value || ""}
    </button>
  );
};

export default Cell;
