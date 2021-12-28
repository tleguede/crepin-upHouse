import { isFunction } from 'lodash';
import axios from 'axios';
import { functionsPath } from '../../constant/firestore';


export const updateUser = (data, callback) => {
  return async () => {
    try {
      await axios.post(functionsPath('updateUserProfile'), data);

      isFunction(callback) && callback();
    } catch (error) {
      console.error(error);
    }
  };
};