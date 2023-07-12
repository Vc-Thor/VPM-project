import { axiosValuesEquip } from './api';

export const postValueEquipVector = async (valueEquip = null) => {
  if (!valueEquip) return;
  try {
    const resp = await axiosValuesEquip.post('/newValue', valueEquip);
    console.log(resp);
  } catch (err) {
    const { errors } = err.response.data;
    const errorMessage = errors.map((e) => e.msg)[0];
    return {
      ok: false,
      errorMessage,
    };
  }
};
