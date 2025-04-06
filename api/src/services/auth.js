import jwt from "jsonwebtoken";
import redis from "redis";

// Conexão com o Redis
const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});
client.connect().catch(console.error);

// Função para adicionar o token à blacklist
export const blacklistToken = async (token, ttl) => {
  await client.set(`blacklist:${token}`, "revoked", { EX: ttl });
};

// Função para verificar se o token está na blacklist
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
