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
                    game_url: "https://84938be4-42ce-42a8-9968-2f5f2a7618d8.poki-gdn.com/f2e6056e-ac6f-4d61-bec9-5618e79105e7/index.html?country=IN&ccpaApplies=0&url_referrer=https%3A%2F%2Fpoki.com%2F&tag=pg-ecd7276020ac65a5badde315090dbe46e7ab44eb&site_id=3&iso_lang=en&poki_url=https%3A%2F%2Fpoki.com%2Fen%2Fg%2Ftemple-run-2&hoist=yes&nonPersonalized=n&familyFriendly=n&categories=3%2C4%2C6%2C9%2C93%2C903%2C929%2C1103%2C1126%2C1137%2C1140%2C1143%2C1147%2C1163%2C1190&game_id=84938be4-42ce-42a8-9968-2f5f2a7618d8&game_version_id=f2e6056e-ac6f-4d61-bec9-5618e79105e7&inspector=0&csp=1",
                    category: "Action"
                },
                {
                    title: "Subway Surfers",
                    image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,%E2%80%A6cover,f=auto/5a339aa7e9b27335e9750ddbfdf3f1f3.png", // Placeholder image
                    game_url: "https://5dd312fa-015f-11ea-ad56-9cb6d0d995f7.poki-gdn.com/2abbe143-c190-4a41-a68c-d7bd67437215/index.html?country=IN&ccpaApplies=0&url_referrer=https%3A%2F%2Fpoki.com%2F&tag=pg-ecd7276020ac65a5badde315090dbe46e7ab44eb&site_id=3&iso_lang=en&poki_url=https%3A%2F%2Fpoki.com%2Fen%2Fg%2Fsubway-surfers&hoist=yes&nonPersonalized=n&familyFriendly=n&categories=3%2C4%2C6%2C9%2C86%2C93%2C96%2C103%2C228%2C903%2C929%2C1103%2C1126%2C1137%2C1140%2C1143%2C1147%2C1156%2C1159%2C1160%2C1163%2C1185%2C1190%2C1193&game_id=5dd312fa-015f-11ea-ad56-9cb6d0d995f7&game_version_id=2abbe143-c190-4a41-a68c-d7bd67437215&inspector=0&csp=1",
                    category: "Action"
                },
                {
                    title: "Vectaria.io",
                    image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=auto/260f3251a55c78a27fd15b9e4d675f88.png", // Placeholder image
                    game_url: "https://e00d1cab-5c0c-46e5-8f15-e409e1215622.poki-gdn.com/fc6e63ea-86c5-47b8-8095-f6e2bfff54cc/index.html?country=IN&ccpaApplies=0&url_referrer=https%3A%2F%2Fpoki.com%2F&tag=pg-ecd7276020ac65a5badde315090dbe46e7ab44eb&site_id=3&iso_lang=en&poki_url=https%3A%2F%2Fpoki.com%2Fen%2Fg%2Fvectaria-io&hoist=yes&nonPersonalized=n&familyFriendly=n&categories=6%2C13%2C61%2C76%2C93%2C744%2C929%2C1018%2C1120%2C1122%2C1126%2C1140%2C1141%2C1143%2C1147%2C1190%2C1194%2C1197&game_id=e00d1cab-5c0c-46e5-8f15-e409e1215622&game_version_id=fc6e63ea-86c5-47b8-8095-f6e2bfff54cc&inspector=0&csp=1",
                    category: "Action"
                },
                {
                    title: "Brain Test: Tricky Puzzles",
                    image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=auto/e689238d6dcbb672b749ab65960c0d65.png", // Placeholder image
                    game_url: "https://games.poki.com/458768/0322484b-7a58-4454-9667-f805afffded5?tag=pg-ecd7276020ac65a5badde315090dbe46e7ab44eb&site_id=3&iso_lang=en&country=IN&poki_url=https://poki.com/en/g/brain-test-tricky-puzzles&hoist=yes&nonPersonalized=n&familyFriendly=n&categories=7,16,37,72,96,400,832,843,1137,1140,1141,1150,1159,1190,1193",
                    category: "Puzzle"
                },
                {
                    title: "lurkers-io",
                    image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=auto/84ed40b8ade4e9f5bbf1fa7b3acef3a3.png", // Placeholder image
                    game_url: "https://f8c09950-0a9c-4330-839c-8f46dd909595.poki-gdn.com/d930e121-9047-418a-b0ff-a87f03d5b3f4/index.html?country=IN&ccpaApplies=0&url_referrer=https%3A%2F%2Fpoki.com%2F&tag=pg-ecd7276020ac65a5badde315090dbe46e7ab44eb&site_id=3&iso_lang=en&poki_url=https%3A%2F%2Fpoki.com%2Fen%2Fg%2Flurkers-io&hoist=yes&nonPersonalized=n&familyFriendly=n&categories=3%2C6%2C13%2C48%2C76%2C77%2C744%2C929%2C1120%2C1122%2C1126%2C1141%2C1143%2C1147%2C1190%2C1191%2C1194&game_id=f8c09950-0a9c-4330-839c-8f46dd909595&game_version_id=d930e121-9047-418a-b0ff-a87f03d5b3f4&inspector=0&csp=1",
                    category: "Action"
                },
                {
                    title: "Disaster Arena",
                    image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=auto/75d6183e398510939db2e4ad311e3de3.jfif", // Placeholder image
                    game_url: "https://games.poki.com/458768/c42ea1fd-7ebe-4bc4-b543-15c26b1fc457?tag=pg-ecd7276020ac65a5badde315090dbe46e7ab44eb&site_id=3&iso_lang=en&country=IN&poki_url=https://poki.com/en/g/disaster-arena&hoist=yes&nonPersonalized=n&familyFriendly=n&categories=3,6,9,76,1141,1143,1185,1190,1193,1194",
                    category: "Action"
                },
                {
                    title: "Tribals.io",
                    image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=auto/847d61b3dd60e988a08848f4d0f6a26e.png", // Placeholder image
                    game_url: "https://7b8b38ab-a6d7-4ea3-9f17-0be497c2c953.poki-gdn.com/c5f5a8a7-fe26-4354-ae44-41fa9e4d2d17/index.html?country=IN&ccpaApplies=0&url_referrer=https%3A%2F%2Fpoki.com%2F&tag=pg-ecd7276020ac65a5badde315090dbe46e7ab44eb&site_id=3&iso_lang=en&poki_url=https%3A%2F%2Fpoki.com%2Fen%2Fg%2Ftribals-io&hoist=yes&nonPersonalized=n&familyFriendly=n&categories=3%2C6%2C64%2C76%2C87%2C91%2C93%2C144%2C744%2C929%2C1018%2C1120%2C1122%2C1126%2C1140%2C1141%2C1143%2C1147%2C1194&game_id=7b8b38ab-a6d7-4ea3-9f17-0be497c2c953&game_version_id=c5f5a8a7-fe26-4354-ae44-41fa9e4d2d17&inspector=0&csp=1",
                    category: "Action"
                },
                {
                    title: "Tennis Masters",
                    image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=auto/0cf85634812c42993399de175cd5bd00.jpeg", // Placeholder image
                    game_url: "https://games.poki.com/458768/38049e2c-6493-4b2e-9daa-8b068e89d25c?tag=pg-ecd7276020ac65a5badde315090dbe46e7ab44eb&site_id=3&iso_lang=en&country=IN&poki_url=https://poki.com/en/g/tennis-masters&hoist=yes&nonPersonalized=n&familyFriendly=n&categories=2,76,251,750,1123,1140,1141,1143,1163,1194,1197,1201",
                    category: "Action"
                },
                {
                    title: "Sky Mad",
                    image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=auto/aa00e8a59b4b3ee4524003783edde4a8.png", // Placeholder image
                    game_url: "https://1d5f3a45-810c-4fe0-bbe1-c7af1494d5d6.poki-gdn.com/a822cb7d-f4f5-43fe-9eb5-73d784c66b1e/index.html?country=IN&ccpaApplies=0&url_referrer=https%3A%2F%2Fpoki.com%2F&tag=pg-ecd7276020ac65a5badde315090dbe46e7ab44eb&site_id=3&iso_lang=en&poki_url=https%3A%2F%2Fpoki.com%2Fen%2Fg%2Fsky-mad&hoist=yes&nonPersonalized=n&familyFriendly=n&categories=1%2C3%2C9%2C37%2C91%2C101%2C379%2C929%2C1163%2C1193%2C1197&game_id=1d5f3a45-810c-4fe0-bbe1-c7af1494d5d6&game_version_id=a822cb7d-f4f5-43fe-9eb5-73d784c66b1e&inspector=0&csp=1",
                    category: "Action"
                },
                {
                    title: "Cricket World Cup",
                    image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=auto/a9d84b22bc87dc97bcd8ca7a60893404.png", // Placeholder image
                    game_url: "https://5dd33d63-015f-11ea-ad56-9cb6d0d995f7.poki-gdn.com/2b99efe1-3a3e-40ca-8d4c-43c90186a27a/index.html?country=IN&ccpaApplies=0&url_referrer=https%3A%2F%2Fpoki.com%2F&tag=pg-ecd7276020ac65a5badde315090dbe46e7ab44eb&site_id=3&iso_lang=en&poki_url=https%3A%2F%2Fpoki.com%2Fen%2Fg%2Fcricket-world-cup&hoist=yes&nonPersonalized=n&familyFriendly=n&categories=2%2C157%2C775%2C929%2C1193&game_id=5dd33d63-015f-11ea-ad56-9cb6d0d995f7&game_version_id=2b99efe1-3a3e-40ca-8d4c-43c90186a27a&inspector=0&csp=1",
                    category: "Action"
                },
                {
                    title: "Blaze Drifter",
                    image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=auto/aa36401385a23a7c1a8e1ed3023d2f37.png", // Placeholder image
                    game_url: "https://129637ee-3ce5-4cc6-8880-2755dd332f64.poki-gdn.com/031166ce-7c2e-4f49-b271-4589e986681c/index.html?country=IN&ccpaApplies=0&url_referrer=https%3A%2F%2Fpoki.com%2F&tag=pg-ecd7276020ac65a5badde315090dbe46e7ab44eb&site_id=3&iso_lang=en&poki_url=https%3A%2F%2Fpoki.com%2Fen%2Fg%2Fblaze-drifter&hoist=yes&nonPersonalized=n&familyFriendly=n&categories=1%2C78%2C765%2C893%2C929%2C1141%2C1178%2C1190&game_id=129637ee-3ce5-4cc6-8880-2755dd332f64&game_version_id=031166ce-7c2e-4f49-b271-4589e986681c&inspector=0&csp=1",
                    category: "Action"
                },
                {
                    title: "Pool Club",
                    image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=auto/fe7b5c8267b63ee56134841474fe0aea.png", // Placeholder image
                    game_url: "https://f7b7c540-0a36-4c28-8e2f-fb09424655fd.poki-gdn.com/2907d7e4-248b-4c33-8871-864eb7d4b593/index.html?country=IN&ccpaApplies=0&url_referrer=https%3A%2F%2Fpoki.com%2F&tag=pg-ecd7276020ac65a5badde315090dbe46e7ab44eb&site_id=3&iso_lang=en&poki_url=https%3A%2F%2Fpoki.com%2Fen%2Fg%2Fpool-club&hoist=yes&nonPersonalized=n&familyFriendly=n&categories=2%2C12%2C103%2C775%2C852%2C1141&game_id=f7b7c540-0a36-4c28-8e2f-fb09424655fd&game_version_id=2907d7e4-248b-4c33-8871-864eb7d4b593&inspector=0&csp=1",
                    category: "Action"
                },
                {
                    title: "Narrow.One",
                    image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=auto/d1aa04f3e65a48b458989705b4e43686.png", // Placeholder image
                    game_url: "https://e2c6282e-13db-47a4-99c8-3297118978c1.poki-gdn.com/2ec41973-e28e-47b7-8983-42740ebe8d4c/index.html?country=IN&ccpaApplies=0&url_referrer=https%3A%2F%2Fpoki.com%2F&tag=pg-ecd7276020ac65a5badde315090dbe46e7ab44eb&site_id=3&iso_lang=en&poki_url=https%3A%2F%2Fpoki.com%2Fen%2Fg%2Fnarrow-one&hoist=yes&nonPersonalized=n&familyFriendly=n&categories=3%2C76%2C77%2C93%2C144%2C253%2C1120%2C1126%2C1140%2C1141%2C1143%2C1147%2C1164%2C1190%2C1194&game_id=e2c6282e-13db-47a4-99c8-3297118978c1&game_version_id=2ec41973-e28e-47b7-8983-42740ebe8d4c&inspector=0&csp=1",
                    category: "Action"
                },
                {
                    title: "Ragdoll Hit",
                    image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=204,height=225,fit=cover,f=auto/3c892779be9dabb3589586c83ad3eeed.png", // Placeholder image
                    game_url: "https://5c4828dc-d115-406f-b45e-378ff2736277.poki-gdn.com/cdc0f5f6-0c36-40a4-9b56-42aeecda7dc4/index.html?country=IN&ccpaApplies=0&url_referrer=https%3A%2F%2Fpoki.com%2F&tag=pg-ecd7276020ac65a5badde315090dbe46e7ab44eb&site_id=3&iso_lang=en&poki_url=https%3A%2F%2Fpoki.com%2Fen%2Fg%2Fragdoll-hit&hoist=yes&nonPersonalized=n&familyFriendly=n&categories=3%2C49%2C80%2C750%2C927%2C929%2C1013%2C1126%2C1140%2C1141%2C1190%2C1194&game_id=5c4828dc-d115-406f-b45e-378ff2736277&game_version_id=cdc0f5f6-0c36-40a4-9b56-42aeecda7dc4&inspector=0&csp=1",
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
            ]);
        }, 1000); // Simulate API delay
    });
};
const fetchGamesFromAPI = async () => {
    try {
        const response = await fetch("http://localhost:5000/games");
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
        const response = await fetch("http://localhost:5000/browser");
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