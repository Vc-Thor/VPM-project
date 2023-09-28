import { putValueEquipVector } from '../api/valueEquipVector';
import { putEquipVector } from '../api/vector';
// ? por subir

export const newPositionForVector = async (vectors = [], state = {}) => {
  if (!Array.isArray(vectors)) return;
  const posVectors = vectors.filter((x) => x.id === state.vectorId);
  let ok = false;
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
    const { ok: innerOK } = await putEquipVector(id, pos);
    ok = innerOK;
  }
  return ok;
};
// ! debe recibir dos posiciones: x y deltaX, la x se usa para el vector y la deltaX para los valores del vector
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

export const calculateGlobalLeakage = (vectors = [], leakage = 0) => {
  if (!Array.isArray(vectors)) {
    return { globalLeakage: [] };
  }
  const globalLeakage = [];
  for (let i = 0; i < vectors.length; i++) {
    const { value, position: pos } = vectors[i];
    const valueWLeakage = value * (leakage / 100);
    const vectorLeakage = { position: pos, value: valueWLeakage.toFixed(2) };
    globalLeakage.push(vectorLeakage);
  }
  const sumsPos = vectors.map((base) => ({ ...base }));
  globalLeakage.forEach((val) => {
    const findPos = sumsPos.find((v) => v.position === val.position);
    if (findPos) {
      findPos.value = (
        parseFloat(findPos.value) + parseFloat(val.value)
      ).toFixed(2);
    }
  });
  return { globalLeakage, sumsPos };
};

// export const calculateVectorLeakage = (vectors = [], leakage = 0) => {
//   if (!Array.isArray(vectors)) {
//     return {
//       vectorLeakage: [],
//     };
//   }
//   const sumVectorLeak = vectors.map((base) => ({ ...base }));
//   sumVectorLeak.forEach((subVectors) => {
//     subVectors.vectors.forEach((v) => {
//       v.value = v.value + v.value * (leakage / 100);
//     });
//   });
//   console.log(sumVectorLeak);
// };
