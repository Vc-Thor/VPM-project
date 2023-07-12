import { axiosActivity } from './api';

export const getActivitys = async () => {
  try {
    const { data } = await axiosActivity.get('/activitys');
    return {
      ok: true,
      data,
    };
  } catch (err) {
    const { msg: errorMessage } = err.response.data;
    console.log(err);
    return {
      ok: false,
      errorMessage,
    };
  }
};
