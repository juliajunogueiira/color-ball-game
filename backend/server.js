const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Enable CORS with specific options
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  }),
);
app.use(express.json());

const SCORES_FILE = path.join(__dirname, "scores.json");

if (!fs.existsSync(SCORES_FILE)) {
  fs.writeFileSync(
    SCORES_FILE,
    JSON.stringify({ globalHighScore: 0, players: [] }, null, 2),
  );
}

app.get("/api/high-score", (req, res) => {
  try {
    if (!fs.existsSync(SCORES_FILE)) {
      return res.json({ highScore: 0 });
    }
    const data = JSON.parse(fs.readFileSync(SCORES_FILE, "utf-8"));
    res.json({ highScore: data.globalHighScore || 0 });
  } catch (err) {
    console.error("Error reading high-score:", err);
    res.json({ highScore: 0 });
  }
});

app.post("/api/score", (req, res) => {
  try {
    const { playerName, score } = req.body;

    if (!playerName || !score) {
      return res.status(400).json({ error: "Missing playerName or score" });
    }

    if (!fs.existsSync(SCORES_FILE)) {
      fs.writeFileSync(
        SCORES_FILE,
        JSON.stringify({ globalHighScore: 0, players: [] }, null, 2),
      );
    }

    const data = JSON.parse(fs.readFileSync(SCORES_FILE, "utf-8"));
    if (score > data.globalHighScore) {
      data.globalHighScore = score;
    }
    fs.writeFileSync(SCORES_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true, highScore: data.globalHighScore });
  } catch (err) {
    console.error("Error saving score:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/leaderboard", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(SCORES_FILE, "utf-8"));
    res.json(data.players.slice(0, 10));
  } catch (err) {
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
