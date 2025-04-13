import jwt from "jsonwebtoken";
import redis from "redis";
import logger from "../utils/logger.js";

const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});
client.connect().catch(logger.error);

export const blacklistToken = async (token, ttl) => {
  await client.set(`blacklist:${token}`, "revoked", { EX: ttl });
};

export const isBlacklisted = async (token) => {
  const result = await client.get(`blacklist:${token}`);
  return result !== null;
};

export const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};
