import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown, FaExpand, FaCompress } from "react-icons/fa"; // Icons for like/dislike and fullscreen
import './GameIframe.css'; // Import the CSS for styling

const GameIframe = ({ game, onBack }) => {
    const [liked, setLiked] = useState(null); // State for like/dislike
    const [isFullScreen, setIsFullScreen] = useState(false); // State for fullscreen

    useEffect(() => {
        // Ensure the ad script runs when the component is mounted
        const adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({});
    }, []);

    // Handle like/dislike
    const handleLike = () => setLiked(true);
    const handleDislike = () => setLiked(false);

    // Toggle full-screen
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        setIsFullScreen(!isFullScreen);
    };

    return (
        <div className={`iframe-container ${isFullScreen ? "fullscreen" : ""}`}>
            <iframe
                src={game.game_url}
                title={game.title}
                frameBorder="0"
                className="game-iframe"
            ></iframe>
            <div className="iframe-header">
                <button onClick={onBack} className="back-button">Back</button>
                <div className="like-dislike">
                    <button
                        className={`like-button ${liked === true ? "active" : ""}`}
                        onClick={handleLike}
                    >
                        <FaThumbsUp />
                    </button>
                    <button
                        className={`dislike-button ${liked === false ? "active" : ""}`}
                        onClick={handleDislike}
                    >
                        <FaThumbsDown />
                    </button>
                </div>
                <button onClick={toggleFullScreen} className="fullscreen-button">
                    {isFullScreen ? <FaCompress /> : <FaExpand />}
                </button>
            </div>
            {/* First Google AdSense Block */}
            <div className="ads-container">
                <ins className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-8553283570584154"
                    data-ad-slot="6330670942"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
            </div>

            {/* Second Google AdSense Block */}
            <div className="ads-container">
                <ins className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-8553283570584154"
                    data-ad-slot="4757696834"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
            </div>
        </div>
    );
};

export default GameIframe;
