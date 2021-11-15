import { isObject, isEmpty ,isUndefined} from 'lodash';

export const isNot = (value) => {
  return Boolean(value) === false;
};

export const isNotEmpty = (value) => {
  return isNot(isEmpty(value));
};

export const isNotUndefined= (value) => {
  return isNot(isUndefined(value));
};

export const isFirebaseTimestamp = (timestamp) => {
  return isObject(timestamp) && ('toDate' in timestamp);
};