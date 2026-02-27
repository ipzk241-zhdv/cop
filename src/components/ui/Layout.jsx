import Header from "./Header";
import "./Layout.css";

/**
 * A wrapper component that provides a consistent page structure.
 * Includes a global Header and a main content area for page children
 * @param {React.ReactNode} children - The content to be rendered inside the layout's main container.
 * @returns {JSX.Element} The structured page layout.
 */
const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <main className="main-content">{children}</main>
        </div>
    );
};

export default Layout;
