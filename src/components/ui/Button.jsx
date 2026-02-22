import "./Button.css";

/**
 * A reusable UI button component with different style variants.
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {Function} props.onClick - Event handler for the click event.
 * @param {string} [props.variant="primary"] - The visual style variant (e.g., "primary", "secondary", "outline", "dark").
 * @param {boolean} [props.disabled=false] - Whether the button is interactive.
 * @param {string} [props.type="button"] - The HTML button type attribute ("button", "submit", "reset").
 * @returns {JSX.Element} The rendered button element.
 */
const Button = ({
    children,
    onClick,
    variant = "primary",
    disabled = false,
    type = "button",
}) => {
    return (
        <button
            className={`btn btn-${variant}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;
