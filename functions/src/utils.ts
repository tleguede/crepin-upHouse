import { isObject } from 'lodash';

/**
 * Deep merge two objects.
 * @param target
 * @param source
 * @returns {*}
 */
export function mergeDeep(target: object, source:object) {
  let output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      // @ts-ignore
      if (isObject(source[key])) {
        if (!(key in target))
          { // @ts-ignore
            Object.assign(output, { [key]: source[key] });
          }
        else
          { // @ts-ignore
            output[key] = mergeDeep(target[key], source[key]);
          }
      } else {
        // @ts-ignore
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}


export const updateBy = (collection = [], change = {}, dataIndex = 'id') => {
  // @ts-ignore
  return collection?.map(one => (change[dataIndex] === one[dataIndex]) ? mergeDeep(one, change) : one);
};