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
