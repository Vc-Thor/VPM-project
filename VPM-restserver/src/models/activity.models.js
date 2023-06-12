import { DataTypes } from 'sequelize';
import db from '../database/config.db.js';
import { Project } from './project.models.js';

export const Activity = db.define(
  'activity',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    activity: { type: DataTypes.STRING },
  },
  {
    tableName: 'Activity',
    timestamps: false,
  },
);
Activity.hasMany(Project, {
  foreignKey: 'activity_id',
  sourceKey: 'id',
});
Project.belongsTo(Activity, {
  foreignKey: 'activity_id',
  targetKey: 'id',
});
