import { DataTypes } from "sequelize";
import sequelize from "../config/index.js";

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUID,
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    tagId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "tags",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    freezeTableName: true,
    tableName: "tags",
    timestamps: false,
  }
);

export default Task
