import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './csski/styles.css';

function Navbar() {
    const location = useLocation();

    return (
        <nav className="nav">
            <Link to="/banana" className="site-title">
                Projekt zaliczeniowy
            </Link>
            <ul>
                <CustomLink to="/banana" isActive={location.pathname === "/banana"}>
                    Banana
                </CustomLink>
                <CustomLink to="/about" isActive={location.pathname === "/about"}>
                    About
                </CustomLink>
            </ul>
        </nav>
    );
}

function CustomLink({ to, children, isActive }) {
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to}>{children}</Link>
        </li>
    );
}

export default Navbar;
