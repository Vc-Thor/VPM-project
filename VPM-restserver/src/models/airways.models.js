import { DataTypes } from 'sequelize';
import db from '../database/config.db.js';
import { Project } from './project.models.js';

export const Airways = db.define(
  'airways',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    airways: { type: DataTypes.STRING },
  },
  {
    tableName: 'Airways',
    timestamps: false,
  },
);
Airways.hasMany(Project, {
  foreignKey: 'airways_id',
  sourceKey: 'id',
});
Project.belongsTo(Airways, {
  foreignKey: 'airways_id',
  targetKey: 'id',
});
