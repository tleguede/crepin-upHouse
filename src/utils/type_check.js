import { isObject, isEmpty ,isUndefined} from 'lodash';


export const isFile = (file) => {
  return file instanceof File;
};

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

export const equalsEither = (value,collection=[])=>{
  let flag= false;

  for (const element of collection) {
    if(element===value)
      return true
  }

  return flag
}