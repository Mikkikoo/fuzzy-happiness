import express from "express";
import { ColorSnapGame, GameState } from "./gameLogic";

const app = express();
app.use(express.json());

const games: Record<string, ColorSnapGame> = {};

app.post("/start", (req, res) => {
  const id = Math.random().toString(36).slice(2);
  games[id] = new ColorSnapGame();
  res.json({ gameId: id, state: games[id].state });
});

app.post("/play", (req, res) => {
  const { gameId, color } = req.body;
  if (!games[gameId]) return res.status(404).json({ error: "Game not found" });
  const state = games[gameId].playTurn(color);
  res.json({ state });
});

app.listen(3000, () => console.log("API running on port 3000"));