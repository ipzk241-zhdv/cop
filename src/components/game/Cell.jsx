/** @module Cell */
import "./Cell.css";

/**
 * Component representing an individual interactive cell on the game board.
 * @param {Object} props - Component properties.
 * @param {number} props.row - The row index of the cell.
 * @param {number} props.col - The column index of the cell.
 * @param {string|null} props.value - The symbol to display ("X", "O", or null).
 * @param {Function} props.onClick - Function to call when the cell is clicked.
 * @param {boolean} [props.disabled=false] - Whether the cell is non-interactive.
 * @param {boolean} [props.isResultView=false] - If true, applies styling for the result summary.
 * @returns {JSX.Element} A button element representing the board cell.
 */
const Cell = ({
    row,
    col,
    value,
    onClick,
    disabled = false,
    isResultView = false,
}) => {
    /**
     * Handles the click event and prevents action if the cell is disabled.
     */
    const handleClick = () => {
        if (!disabled) {
            onClick(row, col);
        }
    };

    /**
     * Determines the CSS classes based on current state and props.
     * @returns {string} Combined class names.
     */
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
