import sequelize from '../config/index.js';
import User from './User.js';
import Tag from './Tag.js';
import TaskTag from './TaskTag.js';
import './associations.js'; 

export { sequelize, User, Tag, TaskTag };
