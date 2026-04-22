import express from "express";
import "dotenv/config";
import { rateLimiter } from "./middleware/rateLimiter.js";
import { connectRedis } from "./database/index.js";
import client from "./database/index.js";

const app = express();
app.use(express.json());

await connectRedis();

// POST /request
app.post("/request", rateLimiter, (req, res) => {
  res.json({
    message: "Request accepted",
    remaining: req.rateLimit.remaining,
  });
});

app.get("/stats", async (req, res) => {
  try {
    const keys = await client.keys("rate:*");

    const stats = {};

    for (const key of keys) {
      const userId = key.split(":")[1];
      const count = await client.get(key);

      stats[userId] = {
        requests_in_current_window: Number(count),
      };
    }

    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
