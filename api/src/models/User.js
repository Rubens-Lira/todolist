import { DataTypes } from "sequelize";
import sequelize from "../config/index.js";
import { formatFullDate } from "../utils/index.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.STRING,
      defaultValue: () => formatFullDate(new Date()),
    },
    updatedAt: {
      type: DataTypes.STRING,
      defaultValue: () => formatFullDate(new Date()),
    },
  },
  {
    freezeTableName: true,
    tableName: "users",
    timestamps: false,
    hooks: {
      beforeUpdate: (user) => {
        user.updatedAt = formatFullDate(new Date());
      },
    },
  }
);

export default User;
