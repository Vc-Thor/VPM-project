import { getAreas } from '../../helpers/api/area';
import { getAreasFailure, getAreasStart, getAreasSuccess } from './areaSlice';
export const checkingArea = () => {
  return async (dispatch) => {
    dispatch(getAreasStart());
  };
};
export const startGetAreas = () => {
  return async (dispatch) => {
    dispatch(getAreasStart());
    const { ok, data, errorMessage } = await getAreas();
    if (!ok) return getAreasFailure({ errorMessage });
    dispatch(getAreasSuccess({ data }));
  };
};
