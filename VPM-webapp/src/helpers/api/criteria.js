import { axiosCriteria } from './api';

export const getCriterias = async () => {
  try {
    const { data } = await axiosCriteria.get('/criterias');
    return {
      ok: true,
      data,
    };
  } catch (err) {
    const { msg: errorMessage } = err.response.data;
    return {
      ok: false,
      errorMessage,
    };
  }
};
