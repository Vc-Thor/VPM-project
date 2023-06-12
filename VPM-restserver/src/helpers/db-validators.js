import { Activity } from '../models/activity.models.js';
import { Airways } from '../models/airways.models.js';
import { Area } from '../models/area.models.js';
import { Criteria } from '../models/criteria.models.js';
import { Role } from '../models/roles.models.js';
import { SubArea } from '../models/subArea.models.js';
import { User } from '../models/user.models.js';

export const validatorEmail = async (email = '') => {
  const thereEmail = await User.findOne({ where: { email: email } });
  if (thereEmail) {
    throw new Error(`this email: '${email}' already in use `);
  }
};
export const validatorUserName = async (user_name = '') => {
  const thereEmail = await User.findOne({ where: { user_name: user_name } });
  if (thereEmail) {
    throw new Error(`this user name: '${user_name}' already in use `);
  }
};
export const validatorRole = async (role_id = '') => {
  const existsRole = await Role.findOne({ where: { id: role_id } });
  if (!existsRole) {
    throw new Error(`this role: ${role_id} not exists`);
  }
};
export const existsRole = async (role = '') => {
  const thereRole = await Role.findOne({ where: { role: role } });
  if (thereRole) {
    throw new Error(`this role: ${role} already exists`);
  }
};
export const validatorArea = async (area = '') => {
  const existsArea = await Area.findOne({ where: { area: area } });
  if (existsArea) {
    throw new Error(`this area: ${area} already exists`);
  }
};
export const noArea = async (id = '') => {
  const findArea = await Area.findOne({ where: { id: id } });
  if (!findArea) {
    throw new Error('this area does not exists');
  }
};
export const validatorSubArea = async (sub_area = '') => {
  const existsSubArea = await SubArea.findOne({
    where: { sub_area: sub_area },
  });
  if (existsSubArea) {
    throw new Error(`this area: ${sub_area} already exists`);
  }
};
export const noSubArea = async (id = '') => {
  const findSubArea = await SubArea.findOne({ where: { id: id } });
  if (!findSubArea) {
    throw new Error('this area does not exists');
  }
};
export const validatorActivity = async (activity = '') => {
  const existsActivity = await Activity.findOne({
    where: { activity: activity },
  });
  if (existsActivity) {
    throw new Error(`this area: ${activity} already exists`);
  }
};
export const noActivity = async (id = '') => {
  const findActivity = await Activity.findOne({ where: { id: id } });
  if (!findActivity) {
    throw new Error('this area does not exists');
  }
};
export const validatorAirways = async (airways = '') => {
  const existsAirways = await Airways.findOne({
    where: { airways: airways },
  });
  if (existsAirways) {
    throw new Error(`this area: ${airways} already exists`);
  }
};
export const noAirways = async (id = '') => {
  const findAirways = await Airways.findOne({ where: { id: id } });
  if (!findAirways) {
    throw new Error('this area does not exists');
  }
};
export const validatorCriteria = async (criteria = '') => {
  const existsCriteria = await Criteria.findOne({
    where: { criteria: criteria },
  });
  if (existsCriteria) {
    throw new Error(`this area: ${criteria} already exists`);
  }
};
export const noCriteria = async (id = '') => {
  const findCriteria = await Criteria.findOne({ where: { id: id } });
  if (!findCriteria) {
    throw new Error('this area does not exists');
  }
};
