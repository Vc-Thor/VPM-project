import { axiosSubArea } from './api';

export const getSubAreas = async () => {
  try {
    const { data } = await axiosSubArea.get('/subAreas');
    return {
      ok: true,
      data,
    };
  } catch (err) {
    const { msg: errorMessage } = err.response.data;
    console.log(errorMessage);
  }
};
