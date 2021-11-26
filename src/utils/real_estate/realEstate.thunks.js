import { realEstateCollection } from '../../constant/firestore';
import { isFunction } from 'lodash';

export const createRealEstate = (data, callback = null) => {
  return async () => {
    try {

      await realEstateCollection.add(data);

      isFunction(callback) && callback();

    } catch (e) {
      console.error(e);
    }
  };
};

export const editRealEstate = (data, callback = null) => {
  return async () => {
    try {

      const { id, ...rest } = data;

      await realEstateCollection.doc(id).update(rest);

      isFunction(callback) && callback();

    } catch (e) {
      console.error(e);
    }
  };
};