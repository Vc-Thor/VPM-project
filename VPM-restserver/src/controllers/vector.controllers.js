import { response, request } from 'express';
import { Vector } from '../models/vector.models.js';
import { User } from '../models/user.models.js';
import { Area } from '../models/area.models.js';
import { SubArea } from '../models/subArea.models.js';
import { Activity } from '../models/activity.models.js';
import { Criteria } from '../models/criteria.models.js';
import { transformedDatas } from '../helpers/transformData.js';

export const vectorGet = async (req = request, res = response) => {
  const vectors = await Vector.findAll({
    include: [
      { model: User, attributes: ['user_name'] },
      { model: Area, attributes: ['name'] },
      { model: SubArea, attributes: ['name'] },
      { model: Activity, attributes: ['name'] },
      { model: Criteria, attributes: ['name'] },
    ],
    attributes: {
      exclude: [
        'user_id',
        'area_id',
        'sub_area_id',
        'activity_id',
        'criteria_id',
      ],
    },
    raw: true,
  });
  if (vectors.length !== 0) {
    const { transformedDataArray } = transformedDatas(vectors);
    res.status(200).json(transformedDataArray);
  } else {
    res.status(200).json({
      msg: 'no data in DB',
    });
  }
};
export const vectorGetById = async (req = request, res = response) => {
  const { id } = req.params;
  const vector = await Vector.findByPk(id, {
    include: [
      { model: User, attributes: ['user_name'] },
      { model: Area, attributes: ['name'] },
      { model: SubArea, attributes: ['name'] },
      { model: Activity, attributes: ['name'] },
      { model: Criteria, attributes: ['name'] },
    ],
    attributes: {
      exclude: [
        'user_id',
        'area_id',
        'sub_area_id',
        'activity_id',
        'criteria_id',
      ],
    },
    raw: true,
  });
  const { transformedData } = transformedDatas([], vector);
  if (vector.length !== 0) {
    res.status(200).json(transformedData);
  } else {
    res.status(200).json({
      msg: 'no data in DB',
    });
  }
};
export const vectorPost = async (req = request, res = response) => {
  const {
    user_id,
    area_id,
    sub_area_id,
    activity_id,
    criteria_id,
    availability,
    power_input,
    air_velocity,
    area_m2,
    fix_q,
    vector,
    position,
  } = req.body;
  const newVector = {
    user_id: user_id,
    area_id: area_id,
    sub_area_id: sub_area_id,
    activity_id: activity_id,
    criteria_id: criteria_id,
    availability: availability,
    air_velocity: air_velocity,
    area_m2: area_m2,
    fix_q: fix_q,
    vector: vector,
    power_input: power_input,
    position: position,
  };
  const addVector = Vector.build(newVector);
  await addVector.save();
  res.status(201).json({
    msg: 'vector created correctly',
  });
};
export const vectorPut = async (req = request, res = response) => {
  const uuid = req.params.id;
  const { id, ...resto } = req.body;
  const upVector = await Vector.findByPk(uuid);
  await upVector.update(resto);
  res.status(200).json({ msg: 'update vector' });
};
export const vectorDelete = async (req = request, res = response) => {
  const uuid = req.params.id;
  const deleteVector = await Vector.findByPk(uuid);
  await deleteVector.destroy({ where: { id: uuid } });
  res.status(200).json({ msg: 'vector deleted' });
};
