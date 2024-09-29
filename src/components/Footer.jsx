import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.css'; // Import your footer-specific styles

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h4>About Us</h4>
                    <p>
                        We are a dedicated team of gamers bringing you the latest news, reviews, and gaming experiences.
                    </p>
                </div>
                <div className="footer-section links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#games">Games</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-section social">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/priyanshusingh.rajawat.37" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                        <a href="https://www.linkedin.com/in/priyanshu-singh-0859211b6/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                        <a href="https://www.instagram.com/___priyanshusinghrajawat___/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://www.youtube.com/@technicalworld9464" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Gaming Website. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
