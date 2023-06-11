import { DataTypes } from 'sequelize';
import db from '../database/config.db.js';
import { Project } from './project.models.js';

export const SubArea = db.define(
  'subarea',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sub_area: { type: DataTypes.STRING },
  },
  {
    tableName: 'Subarea',
    timestamps: false,
  },
);
SubArea.hasMany(Project, {
  foreignKey: 'sub_area_id',
  sourceKey: 'id',
});
Project.belongsTo(SubArea, {
  foreignKey: 'sub_area_id',
  targetKey: 'id',
});
