const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());
app.use(express.json());

const SCORES_FILE = path.join(__dirname, "scores.json");

console.log("SCORES_FILE path:", SCORES_FILE);

// Initialize scores file if it doesn't exist
try {
  if (!fs.existsSync(SCORES_FILE)) {
    console.log("Creating new scores.json file...");
    const initialData = { globalHighScore: 0, players: [] };
    fs.writeFileSync(SCORES_FILE, JSON.stringify(initialData, null, 2));
    console.log("scores.json created successfully");
  } else {
    console.log("scores.json already exists");
    const content = fs.readFileSync(SCORES_FILE, "utf-8");
    console.log("Current content:", content);
  }
} catch (err) {
  console.error("Error initializing scores file:", err);
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/high-score", (req, res) => {
  try {
    console.log("GET /api/high-score");
    const data = JSON.parse(fs.readFileSync(SCORES_FILE, "utf-8"));
    res.json({ highScore: data.globalHighScore || 0 });
  } catch (err) {
    console.error("Error reading high-score:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/score", (req, res) => {
  try {
    console.log("POST /api/score - body:", req.body);
    const { playerName, score } = req.body;

    if (score === undefined) {
      console.log("Score is undefined");
      return res.status(400).json({ error: "Missing score" });
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
    res.json(data.players || []);
  } catch (err) {
    console.error("Error reading leaderboard:", err);
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
