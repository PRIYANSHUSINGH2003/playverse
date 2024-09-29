import React from 'react';
import './GameDetailModal.css'; // Import styles for your modal

const GameDetailModal = ({ game, onClose }) => {
    if (!game) return null; // Return null if no game is selected

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>{game.name}</h2>
                <img src={game.background_image} alt={game.name} className="modal-image" />
                <p className="rating">Rating: {game.rating}</p>
                <p>Released: {game.released}</p>
                <p>Playtime: {game.playtime} hours</p>
                <p>Metacritic Score: {game.metacritic}</p>
                <h3>Requirements:</h3>
                <div>
                    <h4>Minimum:</h4>
                    <p>{game.platforms[0]?.requirements_en?.minimum || 'Not available'}</p>
                    <h4>Recommended:</h4>
                    <p>{game.platforms[0]?.requirements_en?.recommended || 'Not available'}</p>
                </div>
                {/* New section for game availability */}
                <h3>Where is this game available?</h3>
                {game.stores.length > 0 && (
                    <div className="store-info">
                        <img
                            src={game.stores[0].store.image_background}
                            alt={game.stores[0].store.name}
                            className="store-logo"
                        />
                        <p>{game.stores[0].store.name}</p>
                        <a
                            href={`https://${game.stores[0].store.domain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="store-link"
                        >
                            Visit Store
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameDetailModal;