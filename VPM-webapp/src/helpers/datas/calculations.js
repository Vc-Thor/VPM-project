import { putValueEquipVector } from '../api/valueEquipVector';
import { putEquipVector } from '../api/vector';
// ? por subir

export const newPositionForVector = async (vectors = [], state = {}) => {
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
  const items = vectors.flatMap((x) => x.vectors);
  const newValueVector = {};
  items?.forEach((value) => {
    if (newValueVector[value.position]) {
      newValueVector[value.position].push(value.value);
    } else {
      newValueVector[value.position] = [value.value];
    }
  });

  newResult?.forEach((value) => {
    if (newValueVector[value.position]) {
      newValueVector[value.position].push(value.value);
    } else {
      newValueVector[value.position] = [value.value];
    }
  });

  const newResults = Object.keys(newValueVector).map((val) => {
    const values = newValueVector[val];
    const sum =
      values.length > 0 ? values.reduce((total, value) => total + value, 0) : 0;
    return { position: parseInt(val), value: sum };
  });

  return { newResults };
};
