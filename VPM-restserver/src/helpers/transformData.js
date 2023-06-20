export const transformedDatas = (datas = [], dataObject = {}) => {
  const transformedDataArray = datas.map((data) => {
    const transformedData = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const newKey = key.split('.').pop();
        transformedData[newKey] = data[key];
      }
    }
    return transformedData;
  });
  const transformedData = {};
  for (const key in dataObject) {
    if (dataObject.hasOwnProperty(key)) {
      const newKey = key.split('.').pop();
      transformedData[newKey] = dataObject[key];
    }
  }
  return { transformedDataArray, transformedData };
};
export const valueForm = (valueArray = []) => {
  const newValueForm = valueArray.map((value) => ({
    id: value.id,
    position: value.position,
    value: value.value,
    user_name: value['user.user_name'],
    vector: {
      vector_name: value['vector.vector'],
      availability: value['vector.availability'],
      power_input: value['vector.power_input'],
      air_velocity: value['vector.air_velocity'],
      area_m2: value['vector.area_m2'],
      fix_q: value['vector.fix_q'],
      area: value['vector.area.name'],
      sub_area: value['vector.subarea.name'],
      activity: value['vector.activiry.name'],
      criteria: value['vector.criterion.name'],
    },
  }));
  return { newValueForm };
};
