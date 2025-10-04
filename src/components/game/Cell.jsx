import "./Cell.css";

const Cell = ({
  row,
  col,
  value,
  onClick,
  disabled = false,
  isResultView = false,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick(row, col);
    }
  };

  const getCellClass = () => {
    let className = "cell";
    if (value) {
      className += ` ${value.toLowerCase()}`;
    }
    if (disabled) {
      className += " cell-disabled";
    }
    if (isResultView) {
      className += " cell-result";
    }
    return className;
  };

  return (
    <button
      className={getCellClass()}
      onClick={handleClick}
      disabled={disabled}
    >
      {value || ""}
    </button>
  );
};

export default Cell;
