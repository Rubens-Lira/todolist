import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
import { schemeIsValid } from "../utils/index.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido!" });
  }

  const [scheme, token] = authHeader.split(" ");

  if (!schemeIsValid(scheme)) {
    return res.status(401).json({ message: "Token mal formatado!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    logger.info(`${req.method} ${req.originalUrl} | Usuário: ${decoded.id} | IP: ${req.ip}`)

    next();
  } catch (error) {
    logger.warn(`Erro de autenticação: ${error.message}`);
    return res.status(403).json({ message: "Token inválido ou expirado!" });
  }
};

export default authMiddleware
