import Tag from "./Tag.js";
import Task from "./Task.js";
import TaskTag from "./TaskTag.js";
import User from "./User.js";

User.hasMany(Tag, { foreignKey: "userId" });
Tag.belongsTo(User, { foreignKey: "userId" }); 

User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });

Task.belongsToMany(Tag, {
  through: TaskTag,
  foreignKey: "taskId",
  otherKey: "tagId"
});

Tag.belongsToMany(Task, {
  through: TaskTag,
  foreignKey: "tagId",
  otherKey: "taskId",
});

TaskTag.belongsTo(Task, { foreignKey: "taskId" });
TaskTag.belongsTo(Tag, { foreignKey: "tagId" });
