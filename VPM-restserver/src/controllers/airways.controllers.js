import { response, request } from 'express';
import { Airways } from '../models/airways.models.js';

export const airwaysGet = async (req = request, res = response) => {
  const airways = await Airways.findAll();
  if (airways.length !== 0) {
    res.status(200).json({
      airways,
    });
  } else {
    res.status(404).json({
      msg: 'no data in DB',
    });
  }
};
export const airwaysPost = async (req = request, res = response) => {
  const { airways } = req.body;
  const newAirways = {
    airways: airways,
  };
  const addAirways = Airways.build(newAirways);
  await addAirways.save();
  res.status(201).json({
    msg: 'airways created correctly',
  });
};
export const airwaysPut = async (req = request, res = response) => {
  const uid = req.params.id;
  const { id, ...resto } = req.body;
  const upAirways = await Airways.findByPk(uid);
  await upAirways.update(resto);
  res.json({
    msg: 'update airways',
  });
};
export const airwaysDelete = async (req = request, res = response) => {
  const uid = req.params.id;
  const deleteAirways = await Airways.findByPk(uid);
  await deleteAirways.destroy({ where: { id: uid } });
  res.status(200).json({
    msg: 'delete airways',
  });
};
