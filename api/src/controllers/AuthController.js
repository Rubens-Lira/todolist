import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
  blacklistToken,
  isBlacklisted,
  generateTokens,
} from "../services/auth.js";
import logger from "../utils/logger.js";

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        logger.warn(`Login | Usuário não encontrado: ${email} | IP: ${req.ip}`);
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        // logger.warn(`Login | Senha incorreta para: ${email} | IP: ${req.ip}`);
        return res.status(401).json({ message: "Senha incorreta" });
      }

      const { accessToken, refreshToken } = generateTokens(user);
      logger.info(
        `Login | Usuário ${user.id} autenticado com sucesso | IP: ${req.ip}`
      );

      return res.json({ accessToken, refreshToken });
    } catch (err) {
      logger.error(`Login | Erro no login de ${email}: ${err.message}`);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  }

  async refresh(req, res) {
    const { token } = req.body;

    if (!token) {
      logger.warn(`Refresh | Token ausente | IP: ${req.ip}`);
      return res.status(401).json({ message: "Token ausente" });
    }

    const blacklisted = await isBlacklisted(token);
    if (blacklisted) {
      logger.warn(`Refresh | Token revogado | IP: ${req.ip}`);
      return res.status(403).json({ message: "Token revogado" });
    }

    try {
      const payload = jwt.verify(token, process.env.REFRESH_SECRET);
      const user = await User.findByPk(payload.id);

      if (!user) {
        logger.warn(
          `Refresh | Usuário não encontrado (ID: ${payload.id}) | IP: ${req.ip}`
        );
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const { accessToken, refreshToken } = generateTokens(user);
      logger.info(
        `Refresh | Novo token gerado para usuário ${user.id} | IP: ${req.ip}`
      );

      return res.json({ accessToken, refreshToken });
    } catch (err) {
      logger.warn(`Refresh | Token inválido ou expirado | IP: ${req.ip}`);
      return res.status(403).json({ message: "Token inválido ou expirado" });
    }
  }

  async logout(req, res) {
    const { token } = req.body;

    if (!token) {
      logger.warn(`Logout | Token ausente | IP: ${req.ip}`);
      return res.status(400).json({ message: "Token ausente" });
    }

    try {
      const { exp } = jwt.decode(token);
      const now = Math.floor(Date.now() / 1000);
      const ttl = exp - now;

      if (ttl > 0) {
        await blacklistToken(token, ttl);
        logger.info(
          `Logout | Token revogado para o usuário ${
            req.user?.id || "desconhecido"
          } | IP: ${req.ip}`
        );
      }

      return res.status(200).json({ message: "Logout realizado com sucesso" });
    } catch (err) {
      logger.warn(`Logout | Token inválido ao tentar logout | IP: ${req.ip}`);
      return res.status(400).json({ message: "Token inválido" });
    }
  }
}

export default new AuthController();
