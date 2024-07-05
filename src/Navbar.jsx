import './styles.css';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();

    return (
        <nav className="nav">
            <Link to="/banana" className="site-title">
                Projekt zaliczeniowy
            </Link>
            <ul>
                <CustomLink to="/banana" isActive={location.pathname === "/banana"}>Banana</CustomLink>
                <CustomLink to="/about" isActive={location.pathname === "/about"}>About</CustomLink>
            </ul>
        </nav>
    );
}

// eslint-disable-next-line react/prop-types
function CustomLink({ to, children, ...props }) {
    const path = window.location.pathname;
    return (
        <li className={path === to ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    );
}

export default Navbar;