import { emailIsValid, phoneIsValid } from "../utils/index.js";
import { User } from "../models/User.js";
import logger from "../utils/logger.js";

export const validateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, password, password_2 } = req.body;

    if (id && req.user.id !== id) {
      logger.warn(
        `Tentativa de edição não autorizada | Usuário: ${req.user.id} tentou editar o usuário ${id} | IP: ${req.ip}`
      );
      return res
        .status(403)
        .json({ error: "Você não tem permissão para editar este usuário" });
    }

    let userExists = null;
    if (id) {
      userExists = await User.findByPk(id);
      if (!userExists) {
        return res.status(400).json({ error: "Usuário não encontrado" });
      }
    }

    if (!name || name.trim().length < 3) {
      return res
        .status(400)
        .json({ error: "Seu nome precisa ter no míno 3 caracteres" });
    }

    if (!emailIsValid(email)) {
      return res.status(400).json({ error: "Seu email é inválido" });
    }

    if (phone && !phoneIsValid(phone)) {
      return res.status(400).json({
        error: "Seu telefone é inválido, coloque o DDD e use apenas números",
      });
    }

    if (!id && password !== password_2) {
      return res
        .status(400)
        .json({ error: "Senhas não coincidem ou estão vazias" });
    }

    if (id && password !== password_2) {
      return res.status(400).json({ error: "Senhas não coincidem" });
    }

    const emailExist = await User.findOne({ where: { email } });
    if (emailExist && (!id || emailExist.id !== id)) {
      return res.status(400).json({ error: "Esse E-mail já está em uso" });
    }

    req.userExists = userExists;
    next();
  } catch (error) {
    logger.error(error)
    return res.status(500).json({ message: "Erro na validação do usuário" });
  }
};
