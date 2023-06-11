import { DataTypes } from 'sequelize';
import db from '../database/config.db.js';
import { Project } from './project.models.js';

export const Activiy = db.define(
  'activity',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    activiy: { type: DataTypes.STRING },
  },
  {
    tableName: 'Activity',
    timestamps: false,
  },
);
Activiy.hasMany(Project, {
  foreignKey: 'activity_id',
  sourceKey: 'id',
});
Project.belongsTo(Activiy, {
  foreignKey: 'activity_id',
  targetKey: 'id',
});
