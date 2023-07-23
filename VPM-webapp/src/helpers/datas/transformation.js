export const tranformAreaVectors = (data = []) => {
  if (!Array.isArray(data)) {
    return { areaVectors: [] };
  }
  const areaSums = {};
  data.forEach((item) => {
    item.vectors.forEach((vector, index) => {
      const areasKey = `${item.area}-EV`;
      if (!areaSums[areasKey]) {
        areaSums[areasKey] = {
          id: item.id,
          area: item.area,
          position: 0,
          vectors: [],
        };
      }
      const vectorIndex = areaSums[areasKey].vectors.findIndex(
        (v) => v.period === vector.period
      );
      if (vectorIndex === -1) {
        areaSums[areasKey].vectors.push({
          id: vector.id,
          position: ((index + 1) * 85.9).toFixed(1),
          value: vector.value,
          period: vector.period,
        });
      } else {
        areaSums[areasKey].vectors[vectorIndex].value += vector.value;
      }
    });
  });
  const areaVectors = Object.values(areaSums);

  return { areaVectors };
};
