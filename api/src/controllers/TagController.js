import Tag from "../models/Tag.js";
import User from "../models/User.js";

import logger from "../utils/logger.js";

class TagController {
  async index(req, res) {
    try {
      const tags = await Tag.findAll({
        attributes: ["title", "color"],
        where: { userId: req.user.id },
        include: {
          model: User,
          attributes: ["name"],
        },
      });

      const response = tags.map((tag) => {
        const plain = tag.get({ plain: true });

        return {
          title: plain.title,
          color: plain.color,
          name: plain.User?.name || null,
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
      const tag = await Tag.findOne({
        attributes: ["title", "color"],
        where: { id, userId: req.user.id },
        include: {
          model: User,
          attributes: ["name"],
        },
      });

      if (!tag) {
        return res.status(404).json({ error: "Tag não encontrada" });
      }

      const plain = tag.get({ plain: true });

      const response = {
        title: plain.title,
        color: plain.color,
        name: plain.User?.name || null,
      };

      res.status(200).json(response);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Erro interno no servidor 7" });
    }
  }

  async create(req, res) {
    try {
      const { title, color } = req.tagData;

      const tag = await Tag.create({
        title: title.trim(),
        color,
        userId: req.user.id,
      });

      res.status(201).json(tag);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  async update(req, res) {
    try {
      const { title, color } = req.tagData;

      const [updated] = await Tag.update(
        { title: title.trim(), color },
        { where: { id: req.id } }
      );

      if (!updated) {
        return res.status(404).json({ error: "Tag não encontrada" });
      }

      const updatedTag = await Tag.findByPk(req.id);
      res.status(200).json(updatedTag);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  async delete(req, res) {
    try {
      await req.tag.destroy();
      res.sendStatus(204);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

export default new TagController();
