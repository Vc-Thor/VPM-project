import { DataTypes } from 'sequelize';
import db from '../database/config.db.js';
import { ValueVector } from './valueVector.models.js';

export const Vector = db.define(
  'vector',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: { type: DataTypes.UUID },
    area_id: { type: DataTypes.UUID },
    sub_area_id: { type: DataTypes.UUID },
    activity_id: { type: DataTypes.UUID },
    criteria_id: { type: DataTypes.UUID },
    vector: { type: DataTypes.STRING },
    availability: { type: DataTypes.INTEGER },
    power_input: { type: DataTypes.INTEGER },
    air_velocity: { type: DataTypes.INTEGER },
    area_m2: { type: DataTypes.INTEGER },
    fix_q: { type: DataTypes.INTEGER },
    position: { type: DataTypes.INTEGER },
  },
  {
    tableName: 'Vector',
    timestamps: false,
  },
);
Vector.hasMany(ValueVector, {
  foreignKey: 'vector_id',
  sourceKey: 'id',
});
ValueVector.belongsTo(Vector, {
  foreignKey: 'vector_id',
  targetKey: 'id',
});
