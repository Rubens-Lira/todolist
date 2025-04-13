import Tag from "../models/Tag.js";
import { colorIsValid } from "../utils/index.js";
import logger from "../utils/logger.js";

class ValidacaoTag {
  async byId(req, res, next) {
    const { id } = req.params;

    try {
      const tag = await Tag.findByPk(id);

      if (tag.userId !== req.user.id) {
        return res.status(404).json({ message: "Tag não encontrada" });
      }

      req.tag = tag;
      next();
    } catch (error) {
      logger.error(error);
      return res.status(500).json({  error: "Erro interno no servidor"  });
    }
  }

  async title(req, res, next) {
    const { id } = req.params;
    let { title, color } = req.body;

    title = title?.trim() ?? ""
    if (title.length < 3) {
      return res
        .status(400)
        .json({ message: "Sua tag precisa ter no minimo 3 digitos" });
    }

    try {
      const tagExists = await Tag.findOne({
        where: { title, userId: req.user.id },
      });

      if (tagExists && tagExists.id !== id) {
        return res
          .status(400)
          .json({ error: "Você já esta usando esse título em outra tag" });
      }

      color = color?.trim() ?? "";
      if (!colorIsValid(color)) {
        color = "#000000";
      }

      req.id = id;
      req.tagData = { title, color };
      next();
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ error: "Erro interno no servidor"  });
    }
  }
}

export default new ValidacaoTag();
