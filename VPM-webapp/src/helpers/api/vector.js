import { axiosVector } from './api';

export const getVectors = async () => {
  try {
    const { data } = await axiosVector.get('/vectors');
    return {
      ok: true,
      data,
    };
  } catch (err) {
    const { errors } = err.response.data;
    const errorMessage = errors.map((e) => e.msg)[0];
    return {
      ok: false,
      errorMessage,
    };
  }
};
export const getVectorById = async (uid = '') => {
  try {
    const { data } = await axiosVector.get(`/${uid}`);
    const {
      activity,
      air_velocity,
      area,
      area_m2,
      availability,
      criteria,
      fix_q,
      id,
      position,
      power_input,
      sub_area,
      user,
      vector,
      values,
    } = data;
    return {
      ok: true,
      activity,
      air_velocity,
      area,
      area_m2,
      availability,
      criteria,
      fix_q,
      id,
      position,
      power_input,
      sub_area,
      user,
      vector,
      values,
      data,
    };
  } catch (err) {
    const { errors } = err.response.data;
    const errorMessage = errors.map((e) => e.msg)[0];
    return {
      ok: false,
      errorMessage,
    };
  }
};
export const postVector = async (vector = {}) => {
  try {
    const { data } = await axiosVector.post('/newVector', vector);
    const { id, msg } = data;
    return {
      ok: true,
      id,
      msg,
    };
  } catch (err) {
    const { errors } = err.response.data;
    const errorMessage = errors.map((e) => e.msg)[0];
    return {
      ok: false,
      errorMessage,
    };
  }
};
export const putEquipVector = async (id = null, datas = null) => {
  if (!id && !datas) return;
  try {
    const { data } = await axiosVector.put(`/${id}`, datas);
    const { msg } = data;
    return {
      ok: true,
      message: msg,
    };
  } catch (err) {
    const { errors } = err.response.data;
    const errorMessage = errors.map((e) => e.msg)[0];
    return {
      ok: false,
      errorMessage,
    };
  }
};
export const deleteEquipVector = async (id = null) => {
  if (!id) return;
  try {
    const { data } = await axiosVector.delete(`/${id}`);
    const { msg: message } = data;
    return {
      ok: true,
      message,
    };
  } catch (err) {
    const { response } = err;
    const { errors } = response.data;
    return {
      ok: false,
      errorMessage: errors[0].msg,
    };
  }
};
