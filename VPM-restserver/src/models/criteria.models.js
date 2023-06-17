import { DataTypes } from 'sequelize';
import db from '../database/config.db.js';
import { Vector } from './vector.models.js';

export const Criteria = db.define(
  'criteria',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    criteria: { type: DataTypes.STRING },
  },
  { tableName: 'Criteria', timestamps: false },
);
Criteria.hasMany(Vector, {
  foreignKey: 'criteria_id',
  sourceKey: 'id',
});
Vector.belongsTo(Criteria, {
  foreignKey: 'criteria_id',
  targetKey: 'id',
});
