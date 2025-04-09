import { DataTypes } from "sequelize";
import sequelize from "../config/index.js";

const Tag = sequelize.define(
  "Tag",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUID,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    color: DataTypes.STRING,
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
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

export default Tag;
