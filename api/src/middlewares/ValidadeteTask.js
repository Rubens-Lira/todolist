import Tag from "../models/Tag.js";
import Task from "../models/Task.js";
import { uuidIsValids } from "../utils/index.js";
import logger from "../utils/logger.js";

class ValidadeTask {
  async validateUser(req, res, next) {
    const userId = req.user.id;
    let { id } = req.params;
    const { tagIds } = req.body;
    let validTags = [];

    try {
      const task = await Task.findByPk(id);

      if (id && userId !== task.userId) {
        return res.status(401).json({ error: "Usuário não autorizado" });
      }

      if (!Array.isArray(tagIds) || tagIds.length === 0) {
        return res
          .status(400)
          .json({ error: "Deve ser fornecido um vetor de tagIds não vazio" });
      }

      const validUUIDs = uuidIsValids(tagIds)
      for (const id of validUUIDs) {
        const tag = await Tag.findOne({ where: { id, userId } });
        if (tag) {
          validTags.push(id);
        }
      }

      if (validTags.length === 0) {
        return res
          .status(404)
          .json({ error: "Nenhuma tag válida foi encontrada" });
      }

      req.validTags = validTags;
      req.task = task;
      next();
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  async validateValue(req, res, next) {
    const user = req.user;
    const { id } = req.params;
    let { title, status, priority, description } = req.body;

    try {
      title = title?.trim() || "";
      if (title.length < 3) {
        return res
          .status(400)
          .json({ error: "Seu título precisa ter no minimo 3 digitos" });
      }

      const taskExists = await Task.findOne({
        where: { title: title, userId: user.id },
      });

      if (taskExists && String(taskExists.id) !== String(id)) {
        return res
          .status(400)
          .json({ error: "Você já esta usando esse título em outra task" });
      }

      status = status?.trim();
      const validStatus = ["not started", "in progress", "finished"];
      status = validStatus.includes(status) ? status : "not started";

      priority = parseInt(priority);
      if (isNaN(priority) || priority > 10 || priority < 1) {
        priority = 6;
      }

      description = description?.trim() || "";

      req.taskData = { title, status, priority, description };
      next();
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new ValidadeTask();
