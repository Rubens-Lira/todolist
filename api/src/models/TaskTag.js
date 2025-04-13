import { DataTypes } from "sequelize";
import sequelize from "../config/index.js";

const TaskTag = sequelize.define(
  "TaskTag",
  {
    taskId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "tasks",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    tagId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "tags",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    freezeTableName: true,
    tableName: "tasktags",
    timestamps: false,
  }
);

export default TaskTag;
