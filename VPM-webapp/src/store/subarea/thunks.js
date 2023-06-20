import { getSubAreas } from '../../helpers/subarea';
import {
  getSubareasFailure,
  getSubareasStart,
  getSubareasSuccess,
} from './subareaSlice';

export const checkingSubareas = () => {
  return async (dispatch) => {
    dispatch(getSubareasStart());
  };
};

export const startGetSubareas = () => {
  return async (dispatch) => {
    dispatch(getSubareasStart());
    const { data, ok, errorMessage } = await getSubAreas();
    if (!ok) return dispatch(getSubareasFailure({ errorMessage }));
    dispatch(getSubareasSuccess({ data }));
  };
};
