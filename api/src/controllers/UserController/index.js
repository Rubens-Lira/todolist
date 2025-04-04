import bcrypt from "bcrypt";
import { User } from "../../models/index.js";

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ["id", "name", "email", "phone"],
      });
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        attributes: ["id", "name", "email", "phone", "createdAt", "updatedAt"],
      });
      res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
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
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar o usuário" });
    }
  }

  async update(req, res) {
    try {
      const { name, email, phone, password } = req.body;
      const userExists = req.userExists

      let hashedPassword = userExists.password;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      Object.assign(userExists, {
        name,
        email,
        phone,
        password: hashedPassword,
      });

      await userExists.save();

      res.status(201).json({
        id: userExists.id,
        name: userExists.name,
        email: userExists.email,
        phone: userExists.phone,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao atualizar o usuário", error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const userExists = await User.count({ where: id });

      if (!userExists) {
        return res.status(400).json({ error: "Usuário não encontrado" });
      }

      userExists.destroy({
        where: {
          id,
        },
      });
      res.sendStatus(204);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao deletar o usuário", error: error.message });
    }
  }
}

export default new UserController();
