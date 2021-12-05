import { callRequestCollection } from '../../constant/firestore';
import { isFunction } from 'lodash';

export const requestCall = (data, callback = null) => {
  return async () => {
    try {

      await callRequestCollection.add({...data,createdAt:new Date()});

      isFunction(callback) && callback();

    } catch (e) {
      console.error(e);
    }
  };
};