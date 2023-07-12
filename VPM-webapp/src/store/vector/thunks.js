import {
  getVectorById,
  getVectors,
  postVector,
} from '../../helpers/api/vector';
import { createValue } from '../../helpers/data/data';
import {
  getVectorFailure,
  VectorStart,
  getVectorSucces,
  getVectorSuccesByid,
  postVectorSucces,
  postVectorFailure,
  postVectorStart,
} from './vectorSlice';

export const checkingVector = () => {
  return async (dispatch) => {
    dispatch(VectorStart());
  };
};
export const startGetVectors = () => {
  return async (distpach) => {
    distpach(VectorStart());
    const { ok, data, errorMessage } = await getVectors();
    if (!ok) return getVectorFailure({ errorMessage });
    distpach(getVectorSucces({ data }));
  };
};
export const startGetVectorById = (uid = '') => {
  return async (distpach) => {
    distpach(VectorStart());
    const {
      ok,
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
      errorMessage,
    } = await getVectorById(uid);
    if (!ok) return getVectorFailure({ errorMessage });
    distpach(
      getVectorSuccesByid({
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
      })
    );
  };
};
export const startPostVector = (vector = {}, userID = '', newData = []) => {
  return async (distpach) => {
    distpach(postVectorStart());
    const {
      ok: first,
      id: uid,
      msg: message,
      errorMessage,
    } = await postVector(vector);
    if (!first) return distpach(postVectorFailure({ errorMessage }));
    distpach(postVectorSucces({ uid, message }));
    await createValue(userID, newData, uid);
    const { ok, data, errorMessage: error } = await getVectors();
    if (!ok) return getVectorFailure({ error });
    distpach(getVectorSucces({ data }));
  };
};
