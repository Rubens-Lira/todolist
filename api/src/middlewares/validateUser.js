import { emailIsValid, phoneIsValid } from "../utils/index.js";
import User from "../models/User.js";
import logger from "../utils/logger.js";

class ValidateUser {
  async validateSelect(req, res, next) {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ messege: "Usuário não encontrado" });
      }

      req.userExists = user;
      next();
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ error: "Erro ao buscar o usuário" });
    }
  }

  async validateCreate(req, res, next) {
    const { name, email, phone, password, password_2 } = req.body;

    try {
      if (!name || name.trim().length < 3) {
        return res
          .status(400)
          .json({ messege: "Seu nome precisa ter no mínimo 3 caracteres" });
      }

      if (!emailIsValid(email)) {
        return res.status(400).json({ messege: "Seu email é inválido" });
      }

      if (phone && !phoneIsValid(phone)) {
        return res.status(400).json({
          messege:
            "Seu telefone é inválido, coloque o DDD e use apenas números",
        });
      }

      if (!password || password !== password_2) {
        return res
          .status(400)
          .json({ messege: "Senhas não coincidem ou estão vazias" });
      }

      const emailExist = await User.findOne({ where: { email } });
      if (emailExist) {
        return res.status(400).json({ messege: "Esse E-mail já está em uso" });
      }

      next();
    } catch (error) {
      logger.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao validar criação de usuário" });
    }
  }

  async validateUpdate(req, res, next) {
    const { id } = req.params;
    const { name, email, phone, password, password_2 } = req.body;

    try {
      if (req.user.id !== id) {
        logger.warn(
          `Tentativa de edição não autorizada | Usuário: ${req.user.id} tentou editar o usuário ${id} | IP: ${req.ip}`
        );
        return res
          .status(403)
          .json({ messege: "Você não tem permissão para editar este usuário" });
      }

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(400).json({ messege: "Usuário não encontrado" });
      }

      if (!name || name.trim().length < 3) {
        return res
          .status(400)
          .json({ error: "Seu nome precisa ter no mínimo 3 caracteres" });
      }

      if (!emailIsValid(email)) {
        return res.status(400).json({ messege: "Seu email é inválido" });
      }

      if (phone && !phoneIsValid(phone)) {
        return res.status(400).json({
          messege:
            "Seu telefone é inválido, coloque o DDD e use apenas números",
        });
      }

      if (password !== password_2) {
        return res.status(400).json({ error: "Senhas não coincidem" });
      }

      const emailExist = await User.findOne({ where: { email } });
      if (emailExist && emailExist.id !== id) {
        return res.status(400).json({ messege: "Esse E-mail já está em uso" });
      }

      req.userExists = user;
      next();
    } catch (error) {
      logger.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao validar atualização de usuário" });
    }
  }

  async validateDelete(req, res, next) {
    const { id } = req.params;

    try {
      if (req.user.id !== id) {
        logger.warn(
          `Tentativa de exclusão não autorizada | Usuário: ${req.user.id} tentou excluir o usuário ${id} | IP: ${req.ip}`
        );
        return res
          .status(403)
          .json({
            messege: "Você não tem permissão para excluir este usuário",
          });
      }

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(400).json({ messege: "Usuário não encontrado" });
      }

      req.userExists = user;
      next();
    } catch (error) {
      logger.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao validar exclusão de usuário" });
    }
  }
}

export default new ValidateUser();
