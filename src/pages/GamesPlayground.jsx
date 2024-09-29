import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import GameCard from "../components/GameCard";
import GameIframe from "../components/GameIframe";
import "./GamesPlayground.css";
import evImage from '../image/ev.io.jpeg'

// Simulated fetch function for Poki games
const fetchGamesFromPoki = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    title: "Temple Run 2",
                    image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=auto/f4b3ac7fe25cad9bc028b33f7a407f28.png", // Placeholder image
                    game_url: "https://www.gamenora.com/embed/temple-run-2",
                    category: "Action"
                },
                {
                    title: "Subway Surfers",
                    image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,%E2%80%A6cover,f=auto/5a339aa7e9b27335e9750ddbfdf3f1f3.png", // Placeholder image
                    game_url: "https://www.gamenora.com/embed/subway-surfers",
                    category: "Action"
                },
                {
                    title: "Vectaria.io",
                    image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=auto/260f3251a55c78a27fd15b9e4d675f88.png", // Placeholder image
                    game_url: "https://vectaria.io/",
                    category: "Action"
                },
                {
                    title: "lurkers.io",
                    image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=auto/84ed40b8ade4e9f5bbf1fa7b3acef3a3.png", // Placeholder image
                    game_url: "https://lurkers.io",
                    category: "Action"
                },
                {
                    title: "Tribals.io",
                    image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=auto/847d61b3dd60e988a08848f4d0f6a26e.png", // Placeholder image
                    game_url: "http://tribals.io/",
                    category: "Action"
                },
                {
                    title: "Tennis Masters",
                    image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=auto/0cf85634812c42993399de175cd5bd00.jpeg", // Placeholder image
                    game_url: "https://www.gamenora.com/embed/tennis-masters",
                    category: "Action"
                },
                {
                    title: "Pool Club",
                    image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=auto/fe7b5c8267b63ee56134841474fe0aea.png", // Placeholder image
                    game_url: "https://playzone.app/full/pool-club",
                    category: "Action"
                },
                {
                    title: "Narrow.One",
                    image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=auto/d1aa04f3e65a48b458989705b4e43686.png", // Placeholder image
                    game_url: "https://narrow.one",
                    category: "Action"
                },
                {
                    title: "Ragdoll Hit",
                    image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=204,height=225,fit=cover,f=auto/3c892779be9dabb3589586c83ad3eeed.png", // Placeholder image
                    game_url: "https://classroom-6x.org/games/ragdoll-hit/",
                    category: "Action"
                },
                {
                    title: "ev.io",
                    image: evImage, // Placeholder image
                    game_url: "http://ev.io/",
                    category: "Action"
                },
                {
                    title: "Wall Of Danger Dash",
                    image: "https://img.gamemonetize.com/fvjp9obhregh67131r2fz47r2vsaoaoj/512x384.jpg", // Placeholder image
                    game_url: "https://html5.gamemonetize.co/fvjp9obhregh67131r2fz47r2vsaoaoj/",
                    category: "Adventure"
                },
                {
                    title: "Zumba Quest",
                    image: "https://img.gamemonetize.com/y0fe6m34dwew292ezc3a14t43882m4w7/512x384.jpg", // Placeholder image
                    game_url: "https://html5.gamemonetize.co/y0fe6m34dwew292ezc3a14t43882m4w7/",
                    category: "Adventure"
                },
                {
                    title: "Huge Slap Run",
                    image: "https://img.gamemonetize.com/78buhui9gefu0ha2h7ifsw2898p1tsex/512x384.jpg", // Placeholder image
                    game_url: "https://html5.gamemonetize.co/78buhui9gefu0ha2h7ifsw2898p1tsex/",
                    category: "Racing"
                },
                {
                    title: "Diamond Painting Asmr Coloring 2",
                    image: "https://img.gamemonetize.com/zd14u44mw7fbs7day2tovihldqavfxa2/512x384.jpg", // Placeholder image
                    game_url: "https://html5.gamemonetize.co/zd14u44mw7fbs7day2tovihldqavfxa2/",
                    category: "Puzzle"
                },
                {
                    title: "Meet The Birds",
                    image: "https://img.gamemonetize.com/pkzpz6rydlh39ix5wcm0vw71fvdpq3jn/512x384.jpg", // Placeholder image
                    game_url: "https://html5.gamemonetize.co/pkzpz6rydlh39ix5wcm0vw71fvdpq3jn/",
                    category: "Adventure"
                },
                {
                    title: "Little master of assembly",
                    image: "https://img.gamemonetize.com/vbajipphlhhl4jo66fzj40ux0l2hk8f0/512x384.jpg", // Placeholder image
                    game_url: "https://html5.gamemonetize.co/vbajipphlhhl4jo66fzj40ux0l2hk8f0/",
                    category: "Puzzle"
                },
                {
                    title: "Multiplication: Bird Image Uncover",
                    image: "https://img.gamemonetize.com/g5tg9kxhio4ed81kt3pxv333y2mn4fuh/512x384.jpg", // Placeholder image
                    game_url: "https://html5.gamemonetize.co/g5tg9kxhio4ed81kt3pxv333y2mn4fuh/",
                    category: "Puzzle"
                },
                {
                    title: "Urban Derby Stunt And Drift",
                    image: "https://img.gamemonetize.com/g1pdb30jmob4f5pf3xadcsycl8b7ubsa/512x340.jpg", // Placeholder image
                    game_url: "https://html5.gamemonetize.co/g1pdb30jmob4f5pf3xadcsycl8b7ubsa/",
                    category: "Racing"
                },
                {
                    title: "Toilet Monster Evolution",
                    image: "https://img.gamemonetize.com/plobtg9uk627hqijunt3sdchtbpqa3qv/512x384.jpg", // Placeholder image
                    game_url: "https://html5.gamemonetize.co/plobtg9uk627hqijunt3sdchtbpqa3qv/",
                    category: "Action"
                },
                {
                    title: "Hamster Kombat Pairs",
                    image: "https://img.gamemonetize.com/kt7gguvb3y32ofvegei28wbnvfwnms81/512x512.jpg", // Placeholder image
                    game_url: "https://html5.gamemonetize.co/kt7gguvb3y32ofvegei28wbnvfwnms81/",
                    category: "Puzzle"
                },
                {
                    title: "Kids Safety Tips",
                    image: "https://img.gamemonetize.com/pxhxk8smb3daovcdj2fhb0a5qk2dc4mc/512x384.jpg", // Placeholder image
                    game_url: "https://html5.gamemonetize.co/pxhxk8smb3daovcdj2fhb0a5qk2dc4mc/",
                    category: "Racing"
                },
                {
                    title: "AOD: Art Of Defense",
                    image: "https://www.gamenora.com/upload/games/thumbnails/AOD%20Art%20Of%20Defense.webp", // Placeholder image
                    game_url: "https://www.gamenora.com/embed/aod-art-of-defense",
                    category: "Action"
                },
                {
                    title: "Madness: Sheriff's Compound",
                    image: "https://www.gamenora.com/upload/games/thumbnails/Madness%20Sheriff's%20Compound.webp", // Placeholder image
                    game_url: "https://www.gamenora.com/embed/madness-sheriff-s-compound",
                    category: "Action"
                },
            ]);
        }, 1000); // Simulate API delay
    });
};
const fetchGamesFromAPI = async () => {
    try {
        const response = await fetch("https://playverse.onrender.com/games");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.map(game => ({ ...game, id: game.id.toString() }));
    } catch (error) {
        console.error("Failed to fetch games:", error);
        return [];
    }
};

const fetchGamesFromAPIbrowser = async () => {
    try {
        const response = await fetch("https://playverse.onrender.com/browser");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.map(game => ({ ...game, id: game.id.toString() }));
    } catch (error) {
        console.error("Failed to fetch games:", error);
        return [];
    }
};

const GamesPlayground = () => {
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [category, setCategory] = useState("All");
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(""); // Error state

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading
            setError(""); // Clear previous errors
            try {
                const pokiData = await fetchGamesFromPoki();
                const apiData = await fetchGamesFromAPI();
                const apiDatabrowser = await fetchGamesFromAPIbrowser();
                const combinedGames = [...pokiData, ...apiData, ...apiDatabrowser];
                setGames(combinedGames);
            } catch (error) {
                setError("Failed to load games. Please try again later.");
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchData();
    }, []);

    const handleGameClick = (game) => {
        setSelectedGame(game);
    };

    const handleBackClick = () => {
        setSelectedGame(null);
    };

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    const handleSearch = (value) => {
        setSearchValue(value);
    };

    const handleCategoryChange = (category) => {
        setCategory(category);
    };

    // Filter games based on search input and selected category
    const filteredGames = games.filter((game) => {
        const matchesSearch = game.title.toLowerCase().includes(searchValue.toLowerCase());
        const matchesCategory = category === "All" || (game.category && game.category.toLowerCase() === category.toLowerCase());
        return matchesSearch && matchesCategory;
    });

    return (
        <div className={`body ${darkMode ? "dark-mode" : ""}`}>
            <Header
                toggleDarkMode={toggleDarkMode}
                darkMode={darkMode}
                onSearch={handleSearch}
                searchValue={searchValue}
            />

            <div className="category-filter">
                <label>Filter by category:</label>
                <select value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Action">Action</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Shooter">Shooter</option>
                    <option value="MMORPG">MMORPG</option>
                    <option value="MOBA">MOBA</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Racing">Racing</option>
                </select>
            </div>
            {/* Google AdSense Ad */}
            <div className="ads-container" style={{ margin: "20px 0", textAlign: "center" }}>
                <ins className="adsbygoogle"
                    style={{ display: "block" }}
                    data-ad-client="ca-pub-8553283570584154"
                    data-ad-slot="6330670942"
                    data-ad-format="auto"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({ });
                </script>
            </div>
            <div className="playground-container">
                {loading ? (
                    <p>Loading games...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : !selectedGame ? (
                    <div className="games-grid game-list">
                        {filteredGames.length === 0 ? (
                            <p>No games found...</p>
                        ) : (
                            filteredGames.map((game, index) => (
                                <GameCard
                                    key={game.id || index}
                                    title={game.title}
                                    image={game.image || game.thumbnail}
                                    game={game}
                                    onClick={() => handleGameClick(game)}
                                />
                            ))
                        )}
                    </div>
                ) : (
                    <GameIframe game={selectedGame} onBack={handleBackClick} />
                )}
            </div>
        </div>
    );
};

export default GamesPlayground;
