import express from "express";
import "dotenv/config";
import { rateLimiter } from "./middleware/rateLimiter.js";
import { connectRedis } from "./database/index.js";

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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
