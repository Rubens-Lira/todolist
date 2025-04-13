import bcrypt from "bcrypt";
import User from "../models/User.js";
import logger from "../utils/logger.js";

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ["id", "name", "email", "phone"],
      });
      res.status(200).json(users);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ message: "Erro ao buscar usuários" });
    }
  }

  show(req, res) {
    res.status(200).json(req.userExists);
  }

  async create(req, res) {
    try {
      const { name, email, phone, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name: name.trim(),
        email,
        phone: phone || "",
        password: hashedPassword,
      });

      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ message: "Erro ao criar o usuário" });
    }
  }

  async update(req, res) {
    try {
      const { name, email, phone, password } = req.body;
      const userExists = req.userExists;

      let hashedPassword = userExists.password;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      await User.update(
        {
          name: name.trim(),
          email,
          phone,
          password: hashedPassword,
        },
        { where: { id: userExists.id } }
      );

      const updatedUser = await User.findByPk(userExists.id, {
        attributes: ["id", "name", "email", "phone"],
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      logger.error(error);
      res
        .status(500)
        .json({ message: "Erro ao atualizar o usuário", error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const user = req.userExists;

      await user.destroy();
      res.status(204).end();
    } catch (error) {
      logger.error(error);
      res
        .status(500)
        .json({ message: "Erro ao deletar o usuário", error: error.message });
    }
  }
}

export default new UserController();
