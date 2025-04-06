import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    logger.info(`${req.method} ${req.originalUrl} | Usuário: ${decoded.id} | IP: ${req.ip}`)

    console.log(
      `[${new Date().toISOString()}] ${req.method} ${
        req.originalUrl
      } | Usuário: ${decoded.id} | IP: ${req.ip}`
    );

    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido ou expirado" });
  }
};
