import client from "../database/index.js";

const WINDOW = 60 * 1000; // 1 min
const LIMIT = 5;

export const rateLimiter = async (req, res, next) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "user_id required" });
  }

  const key = `rate:${user_id}`;

  try {
    // count increase
    const count = await client.incr(key);

    // first request → set expiry
    if (count === 1) {
      await client.expire(key, WINDOW);
    }

    if (count > LIMIT) {
      return res.status(429).json({
        error: "Rate limit exceeded",
      });
    }

    req.rateLimit = {
      remaining: LIMIT - count,
    };

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Redis error" });
  }
};
