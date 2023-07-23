import { putValueEquipVector } from '../api/valueEquipVector';
import { putEquipVector } from '../api/vector';
// ? por subir

export const newPositionForVector = async (vectors = [], state = {}) => {
  if (!Array.isArray(vectors)) return;
  const posVectors = vectors.filter((x) => x.id === state.vectorId);
  for (let i = 0; i < posVectors.length; i++) {
    const vector = posVectors[i];
    const { id } = vector;
    const pos = { position: state.position.x };
    for (let j = 0; j < vector.vectors.length; j++) {
      const item = vector.vectors[j];
      const { id, position } = item;
      const pos = {
        position: state.position.x + position,
      };
      await putValueEquipVector(id, pos);
    }
    await putEquipVector(id, pos);
  }
};
export const resultValueVectors = (newResult = [], vectors = []) => {
  if (!Array.isArray(vectors)) {
    return { newResults: [] };
  }
  const items = vectors.slice().map((x) => x.vectors);
  const positionSums = {};
  items.forEach((i) => {
    i.forEach((vv) => {
      const { position: pos, value: valueVector, period: periodVector } = vv;
      const positionKey = `${pos}-${periodVector}`;
      if (!positionSums[positionKey]) {
        positionSums[positionKey] = {
          position: pos,
          value: valueVector,
          period: periodVector,
        };
      } else {
        positionSums[positionKey].value += valueVector;
      }
    });
  });
  const vectorSums = Object.values(positionSums);

  return { vectorSums };
};
