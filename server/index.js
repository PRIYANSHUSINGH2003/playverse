const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

const API_KEY = "f52d2874c696449aae2cc924336c2c04";

app.get("/games", async (req, res) => {
    try {
        const response = await axios.get(`https://api.rawg.io/api/games`, {
            params: {
                key: API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching games:", error); // Log the error for debugging
        res.status(500).send("Error fetching games");
    }
});

app.get("/browser", async (req, res) => {
    try {
        const response = await axios.get("https://www.freetogame.com/api/games?platform=browser");
        res.json(response.data);
    } catch (error) {
        res.status(500).send("Error fetching games");
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
