import { postValueEquipVector } from '../api/valueEquipVector';
// ? por subir
export const generateData = (period) => {
  const data = [];

  for (let i = 0; i <= period - 1; i++) {
    const point = { x: i, y: 0 };
    data.push(point);
  }
  return data;
};
const number = 10;

export const result = generateData(number);

export const transformData = (result = []) => {
  const newData = result.map((item, index) => ({
    position: index * 100,
    value: item.y,
  }));
  return { newData };
};

export const calculateCriteria = (
  result = [],
  disable = '',
  formState = {}
) => {
  const availabilityDecimal = formState.availability / 100;
  if (disable === 'Fix Q') {
    const newResult = result.map((item) => ({
      x: item.x,
      y: item.y * formState.fix_q * availabilityDecimal,
    }));

    return { newResult };
  }
  if (disable === 'm/s' || disable === 'ft/m') {
    const newResult = result.map((item) => ({
      x: item.x,
      y:
        item.y *
        formState.air_velocity *
        formState.area_m2 *
        availabilityDecimal,
    }));

    return { newResult };
  }
  if (disable === 'm3/kW' || disable === 'cfm/HP') {
    //! MODIFICAR CALCULO SEGUN VALOR DEL CRITERIO.
    // ? VER COMO MODIFICAR DATOS.
    const newResult = result.map((item) => ({
      x: item.x,
      y: item.y * formState.power_input * availabilityDecimal,
    }));

    return { newResult };
  } else {
    const newResult = result.map((item) => ({
      x: item.x,
      y: item.y,
    }));
    return { newResult };
  }
};
export const createValue = async (uidUser = '', data = [], uidVector) => {
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    const newPosition = element.position;
    const newValue = element.value;

    const newCreatedValue = {
      vector_id: uidVector,
      value: newValue,
      position: newPosition,
      user_id: uidUser,
      period: i + 1,
    };
    await postValueEquipVector(newCreatedValue);
  }
};
