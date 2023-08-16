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
export const resultValueVectors = (baseArray = [], vectors = []) => {
  if (!Array.isArray(vectors)) {
    return { newResults: [] };
  }
  const vectorSums = baseArray.map((baseItem) => ({ ...baseItem }));
  vectors.forEach((array) => {
    array.vectors.forEach((item) => {
      const existeItem = vectorSums.find(
        (x) => Number(x.position) === item.position
      );
      if (existeItem) {
        existeItem.value += item.value;
      }
    });
  });
  return { vectorSums };
};
