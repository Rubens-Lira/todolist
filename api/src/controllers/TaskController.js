import Task from "../models/Task.js";
import Tag from "../models/Tag.js";
import User from "../models/User.js";
import logger from "../utils/logger.js";

class TaskController {
  async index(req, res) {
    try {
      const tasks = await Task.findAll({
        attributes: ["title", "status", "priority", "description"],
        where: { userId: req.user.id },
        include: [
          {
            model: User,
            attributes: ["name"],
          },
          {
            model: Tag,
            attributes: ["title", "color"],
            through: { attributes: [] },
          },
        ],
      });

      const response = tasks.map((task) => {
        const plain = task.get({ plain: true });

        return {
          title: plain.title,
          status: plain.status,
          priority: plain.priority,
          description: plain.description,
          name: plain.User?.name || "",
          tags: plain.Tags || [],
        };
      });

      res.status(200).json(response);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const task = await Task.findOne({
        attributes: ["title", "status", "priority", "description"],
        where: { id, userId: req.user.id },
        include: [
          {
            model: Tag,
            attributes: ["title", "color"],
            through: { attributes: [] },
          },
          {
            model: User,
            attributes: ["name"],
          },
        ],
      });

      if (!task) {
        return res.status(404).json({ error: "Task não encontrada" });
      }

      const plain = task.get({ plain: true });

      const response = {
        title: plain.title,
        status: plain.status,
        priority: plain.priority,
        description: plain.description,
        name: plain.User?.name || null,
        tags: plain.Tags || [],
      };

      res.status(200).json(response);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  async create(req, res) {
    const { title, status, priority, description } = req.taskData;
    const validTags = req.validTags;

    try {
      const task = await Task.create({
        title,
        status,
        priority,
        description,
        userId: req.user.id,
      });

      await task.setTags(validTags);
      res.status(201).json({ task, tags: validTags });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  async update(req, res) {
    const { title, status, priority, description } = req.taskData;
    const validTags = req.validTags;
    const task = req.task;

    try {
      const [updated] = await Task.update(
        { title, status, priority, description },
        { where: { id: task.id } }
      );

      if (updated === 0) {
        return res.status(404).json({ error: "Task não encontrada" });
      }

      await task.setTags(validTags.map((tag) => tag.id));

      const updatedTask = await Task.findByPk(task.id, {
        include: { model: Tag, through: { attributes: [] } },
      });

      res.status(200).json(updatedTask);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      if (id !== req.user.id) {
        res.status(401).json({
          error: "Você não tem autorização para deletar esse usuário",
        });
      }
      await Task.destroy({ where: { id } });
      res.status(204).json({ message: "Task deletada" });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

export default new TaskController();
