import React, { useEffect, useState } from 'react';
import './PCGames.css';
import HeaderNormal from './HeaderNormal';
import GameDetailModal from './GameDetailModal';

const PCGames = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null); // State for selected game

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('https://playverse.onrender.com/games');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setGames(data.results);
            } catch (error) {
                console.error("Error fetching the games:", error);
                setError("Failed to load games. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    const handleGameClick = (game) => {
        setSelectedGame(game); // Set selected game when card is clicked
    };

    const handleCloseModal = () => {
        setSelectedGame(null); // Close the modal by resetting the selected game
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div>
            <HeaderNormal toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            <div className={`pc-games-container ${darkMode ? 'dark-mode' : ''}`}>
                <h2 className="page-title">PC Games</h2>
                <div className="games-list">
                    {games.map((game) => (
                        <div key={game.id} className="game-card" onClick={() => handleGameClick(game)}>
                            <img src={game.background_image} alt={game.name} className="game-image" />
                            <div className="game-info">
                                <h3>{game.name}</h3>
                                <p>Rating: {game.rating}</p>
                                <p>Released: {game.released}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <GameDetailModal game={selectedGame} onClose={handleCloseModal} /> {/* Modal for game details */}
            </div>
        </div>
    );
};

export default PCGames;
