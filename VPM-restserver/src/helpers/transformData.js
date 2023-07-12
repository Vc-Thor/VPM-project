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
      id: value['vector.id'],
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
export const vectorForm = (vectors = [], vector = {}) => {
  const newVectorFormArray = vectors.map((v) => ({
    id: v.id,
    vector: v.vector,
    availability: v.availability,
    power_input: v.power_input,
    air_velocity: v.air_velocity,
    area_m2: v.area_m2,
    fix_q: v.fix_q,
    position: v.position,
    user: v.user?.user_name,
    area: v.area?.name,
    sub_area: v.subarea?.name,
    activity: v.activity?.name,
    criteria: v.criterion?.name,
    vectors: v.valuevectors,
  }));
  const newVectorFormObj = {
    id: vector.id,
    vector: vector.vector,
    availability: vector.availability,
    power_input: vector.power_input,
    air_velocity: vector.air_velocity,
    area_m2: vector.area_m2,
    fix_q: vector.fix_q,
    position: vector.position,
    user: vector.user?.user_name,
    area: vector.area?.name,
    sub_area: vector.subarea?.name,
    activity: vector.activity?.name,
    criteria: vector.criterion?.name,
    values: vector.valuevectors?.map((valueVector) => ({
      id: valueVector.id,
      position: valueVector.position,
      value: valueVector.value,
      period: valueVector.period,
    })),
  };

  return { newVectorFormArray, newVectorFormObj };
};
