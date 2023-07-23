import {
  postValueEquipVector,
  putValueEquipVector,
} from '../api/valueEquipVector';
// ? por subir
export const generateData = (period) => {
  const result = [];

  for (let i = 0; i <= period - 1; i++) {
    const point = { x: i, y: 0 };
    result.push(point);
  }
  return { result };
};
const number = 10;

export const { result } = generateData(number);

export const transformData = (result = []) => {
  const newData = result.map((item, index) => ({
    position: ((index + 1) * 85.9).toFixed(1),
    value: item.y,
  }));
  return newData;
};
export const transformGraphs = (data = {}) => {
  const availabilityDecimal = data.availability / 100;
  if (data.criteria === 'm/s' || data.criteria === 'ft/m') {
    const newData = data.vectors
      .slice()
      .sort((a, b) => a.period - b.period)
      .map((item) => ({
        x: item.period - 1,
        y:
          item.value / availabilityDecimal / (data.air_velocity * data.area_m2),
      }));
    return newData;
  }
  if (data.criteria === 'm3/kW' || data.criteria === 'cfm/HP') {
    const newData = data.vectors
      .slice()
      .sort((a, b) => a.period - b.period)
      .map((item) => ({
        x: item.period - 1,
        y: item.value / availabilityDecimal / data.power_input,
      }));
    return newData;
  }
  if (data.criteria === 'Fix Q') {
    const newData = data.vectors
      .slice()
      .sort((a, b) => a.period - b.period)
      .map((item) => ({
        x: item.period - 1,
        y: item.value / availabilityDecimal / data.fix_q,
      }));
    return newData;
  }
};
export const reverseTransformData = (data = []) => {
  const originalData = data.map((item) => ({
    position: item.position,
    value: 0,
  }));
  return originalData;
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
export const putValue = async (data = [], vectors = {}) => {
  const datas = vectors.vectors;
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    const item = datas[i];
    const id = item.id;
    const { position: pos, value: val } = element;
    const newValue = {
      position: pos,
      value: val,
      period: i + 1,
    };
    await putValueEquipVector(id, newValue);
  }
};
