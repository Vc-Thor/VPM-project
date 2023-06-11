import { Area } from '../models/area.models.js';
import { Role } from '../models/roles.models.js';
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
    throw new Error('there is no area');
  }
};
