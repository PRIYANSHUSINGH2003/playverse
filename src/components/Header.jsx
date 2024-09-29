import React from "react";
import { FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './Header.css'; // Import your header-specific styles

const Header = ({ toggleDarkMode, darkMode, onSearch, searchValue }) => {
    
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
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search for games..." 
                    value={searchValue} 
                    onChange={(e) => onSearch(e.target.value)} 
                />
                <button className="search-button">
                    <FaSearch />
                </button>
            </div>
            <div className="dark-mode-toggle">
                <button onClick={toggleDarkMode}>
                    {darkMode ? <FaMoon /> : <FaSun />}
                </button>
            </div>
        </header>
    );
};

export default Header;
