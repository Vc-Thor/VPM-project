import { DataTypes } from 'sequelize';
import db from '../database/config.db.js';
import { Scenario } from './scenario.models.js';

export const Project = db.define(
  'project',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    area_id: { type: DataTypes.INTEGER },
    sub_area_id: { type: DataTypes.INTEGER },
    airways_id: { type: DataTypes.INTEGER },
    activity_id: { type: DataTypes.INTEGER },
    criteria_id: { type: DataTypes.INTEGER },
    user_id: { type: DataTypes.INTEGER },
    position: { type: DataTypes.INTEGER },
  },
  {
    tableName: 'Project',
    timestamps: false,
  },
);
Project.hasMany(Scenario, {
  foreignKey: 'project_id',
  sourceKey: 'id',
});
Scenario.belongsTo(Project, {
  foreignKey: 'project_id',
  targetKey: 'id',
});
