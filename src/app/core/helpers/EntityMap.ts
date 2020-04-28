export class EntityMap<T> {
  constructor(array: T, key: string) {
    return convertArrayToMap(array, key);
  }
}

const convertArrayToMap = (array, key) =>
  array.reduce((mapAccumulator, object) => {
    mapAccumulator.set(object[key], object);
    return mapAccumulator;
  }, new Map());
