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
