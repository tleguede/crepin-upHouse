import { format, getTime, formatDistanceToNow } from 'date-fns';
import {isDate,isString} from 'lodash'

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}

export const gDate = date => {
  if ((typeof date === 'object') && ('toDate' in date))
    return date.toDate();
  else if (isDate(date))
    return date;
  else if (isString(date))
    return new Date(date);
  return null;
};

export const gfDate = date => {
  return date ? fDate(gDate(date)) : null;
};