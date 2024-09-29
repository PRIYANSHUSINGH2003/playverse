import React, { useState } from 'react';
import './AboutUs.css'; // Import your styles for the About Us page
import HeaderNormal from './HeaderNormal';

const AboutUs = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };
    return (
        <div>
            <HeaderNormal
                toggleDarkMode={toggleDarkMode}
                darkMode={darkMode}
            />
            <div className="about-us">
                <h2>About Us</h2>
                <p>
                    Welcome to Games Playground, your number one source for all things gaming.
                    We're dedicated to giving you the very best of games, with a focus on
                    dependability, customer service, and uniqueness.
                </p>
                <p>
                    Founded in 2024, Games Playground has come a long way from its beginnings.
                    When we first started out, our passion for gaming drove us to start our own
                    business.
                </p>
                <h3>Our Mission</h3>
                <p>
                    Our mission is to provide gamers with the best possible gaming experience.
                    We aim to offer a diverse selection of games across various platforms.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
