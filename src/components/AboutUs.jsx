import React, { useState } from 'react';
import './AboutUs.css'; // Import the new styles
import HeaderNormal from './HeaderNormal';

const AboutUs = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <div className={darkMode ? 'dark-mode' : ''}>
            <HeaderNormal toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            <div className="about-container">
                <div className="about-content">
                    <div className="about-text">
                        <h2 className="about-title">About Us</h2>
                        <p className="about-description">
                            Welcome to <span className="highlight">Games Playground</span>, your number one source for all things gaming. We're dedicated to providing the best of games, focusing on reliability, customer service, and uniqueness.
                        </p>
                        <p className="about-description">
                            Founded in 2024, <span className="highlight">Games Playground</span> has come a long way. Our passion for gaming drove us to create a platform that serves gamers globally.
                        </p>
                        <h3 className="about-mission-title">Our Mission</h3>
                        <p className="about-mission">
                            We aim to offer gamers an unparalleled experience with a diverse selection of games across various platforms.
                        </p>
                    </div>
                    <div className="about-image">
                        <img
                            src="https://img.freepik.com/premium-photo/gamer-playing-desktop-pc-computer-gaming-illustration_691560-5611.jpg?w=1380" // Replace with a real image URL
                            alt="Gaming"
                            className="image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
