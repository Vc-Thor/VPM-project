import { response, request } from 'express';
import { Area } from '../models/area.models.js';

export const areaGet = async (req = request, res = response) => {
  const area = await Area.findAll();
  if (area.length !== 0) {
    res.status(200).json({
      area,
    });
  } else {
    res.status(404).json({
      msg: 'no data in DB',
    });
  }
};
export const areaPost = async (req = request, res = response) => {
  const { area } = req.body;
  const newArea = {
    area: area,
  };
  const addArea = Area.build(newArea);
  await addArea.save();
  res.status(201).json({
    msg: 'area created correctly',
  });
};
export const areaPut = async (req = request, res = response) => {};
export const areaDelete = async (req = request, res = response) => {};
