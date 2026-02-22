import "./Header.css";

/**
 * Header component that displays the application title.
 * @returns {JSX.Element} The rendered header section with the title.
 */
const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <h1>Tic-Tac-Toe</h1>
            </div>
        </header>
    );
};

export default Header;
