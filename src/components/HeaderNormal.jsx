import React from "react";
import { FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './Header.css'; // Import your header-specific styles

const HeaderNormal = ({ toggleDarkMode, darkMode}) => {
    
    return (
        <header className={`header ${darkMode ? "dark-mode" : ""}`}>
            <div className="logo">
                <h1>Games Playground</h1>
            </div>
            <nav className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
                <Link to="/pc-games">PC Games</Link>
                <Link to="/contact">Contact</Link>
            </nav>
            <div className="dark-mode-toggle">
                <button onClick={toggleDarkMode}>
                    {darkMode ? <FaMoon /> : <FaSun />}
                </button>
            </div>
        </header>
    );
};

export default HeaderNormal;
