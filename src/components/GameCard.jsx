import React from "react";
import './GameCard.css'; // Import your game card styles

const GameCard = ({ title, image, onClick }) => {
    return (
        <div className="game-card" onClick={onClick}>
            <div className="image-container">
                <img src={image} alt={title} className="game-image" />
            </div>
            <h3 className="game-title">{title}</h3>
        </div>
    );
};

export default GameCard;
