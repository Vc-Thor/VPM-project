import { DataTypes } from 'sequelize';
import db from '../database/config.db.js';
import { Scenario } from './scenario.models.js';

export const Vector = db.define(
  'vector',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    user_id: { type: DataTypes.INTEGER },
    vector: { type: DataTypes.STRING },
    position: { type: DataTypes.INTEGER },
    value: { type: DataTypes.INTEGER },
  },
  {
    tableName: 'Vector',
    timestamps: false,
  },
);
Vector.hasMany(Scenario, {
  foreignKey: 'vector_id',
  sourceKey: 'id',
});
Scenario.belongsTo(Vector, {
  foreignKey: 'vector_id',
  targetKey: 'id',
});
