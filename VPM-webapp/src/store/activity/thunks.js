import { getActivitys } from '../../helpers/activity';
import {
  getActivityFailure,
  getActivityStart,
  getActivitySuccess,
} from './activitySlice';

export const checkingActivity = () => {
  return async (dispactch) => {
    dispactch(getActivityStart());
  };
};
export const startGetActivitys = () => {
  return async (dispatch) => {
    dispatch(getActivityStart());
    const { ok, data, errorMessage } = await getActivitys();
    if (!ok) return dispatch(getActivityFailure({ errorMessage }));
    dispatch(getActivitySuccess({ data }));
  };
};
