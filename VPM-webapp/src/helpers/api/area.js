import { axiosArea } from './api';

export const getAreas = async () => {
  try {
    const { data } = await axiosArea.get('/areas');
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
