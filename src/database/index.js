import { createClient } from "redis";

const client = createClient({
  username: process.env.REDISUSERNAME,
  password: process.env.REDISPASSWORD,
  socket: {
    host: process.env.REDISHOST,
    port: 18071,
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));

export const connectRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
    console.log("✅ Redis connected");
  }
};

export default client;
