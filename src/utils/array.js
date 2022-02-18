import { mergeDeep } from 'src/utils/object';
import _, { take } from 'lodash';

export const updateBy = (collection = [], change = {}, dataIndex = 'id') => {
  return collection?.map(one => (change[dataIndex] === one[dataIndex]) ? mergeDeep(one, change) : one);
};

export const updateListBy = (destination = [], source = [], dataIndex = 'id') => {
  let result = [...destination];

  source?.forEach(record => {
    result = updateBy(result, record, dataIndex);
  });

  return result;
};

export const setsBy = (collection = [], change = {}, dataIndex = 'id') => {
  const isEdit = collection?.find(one => one[dataIndex]);

  if (isEdit) {
    return updateBy(collection, change, dataIndex);
  } else {
    return [
      ...collection,
      change
    ];
  }

};

export const setsListBy = (destination = [], source = [], dataIndex = 'id') => {
  let result = [...destination];

  source?.forEach(record => {
    result = setsBy(result, record, dataIndex);
  });

  return result;
};
export const transformToTree = (collection, {
  index = 'name',
  parentIndex = 'parent',
  childrenIndex = 'children'
} = {}) => {
  let nodes = {};
  return collection.filter(function(obj) {
    let id = obj[index];
    let parentId = obj[parentIndex];

    nodes[id] = _.defaults(obj, nodes[id], { [childrenIndex]: [] });
    parentId && (nodes[parentId] = (nodes[parentId] || { [childrenIndex]: [] }))[childrenIndex].push(obj);

    return !parentId;
  });
};

export const accumulate = (collection, accumulatorIndex) => {
  let first = [...collection];

  let second = [];


  while (first.length !== 0) {
    const selected = first[0];
    const duplicate = first.filter(one => one?.id === selected?.id);
    first = first.filter(one => one?.id !== selected?.id);

    const countList = duplicate.map(one => Number(one[accumulatorIndex] || 0));
    const count = (countList.length === 0) ? [0] : countList.reduce((a, b) => a + b);

    second.push({
      ...selected,
      [accumulatorIndex]: count
    });
  }

  return second;
};

/**
 *
 * @param text {string}
 * @param collection {string[]}
 * @returns {{fail: number, match: number}}
 */
export const includesEither = (text, collection) => {
  const _text = text?.trim()?.toLowerCase();

  let result = {
    match: 0,
    fail: 0
  };

  collection.forEach(keyword => {

    const _keyword = keyword?.trim()?.toLowerCase();

    if (_text.includes(_keyword))
      result.match += 1;
    else result.fail += 1;

  });

  return result;
};

/**
 *
 * @param array {*[]}
 * @param keyword {string}
 * @param key {string}
 * @returns {*}
 */
export const searchList = (array = [], keyword = '', key = '_helper') => {
  return array
    ?.map(item => ({
      ...item,
      ...includesEither(String(item[key]), keyword.split(' '))
    }))
    ?.filter(item => item.match >= 1)
    ?.sort((a, b) => b.match - a.match)
    ?.map(({ match, fail, ...rest }) => ({ ...rest }));
};

export const paginate = (collection, limit = 400) => {

  let list = [...collection];
  let result = [];

  while (list.length !== 0) {

    const taken = take(list, limit);
    result = [...result, taken];
    list = list.filter(one => !taken.includes(one));

  }

  return result;
};

export const sum = collection => {
  let result = 0;
  collection?.forEach(val => result += Number(val || 0));

  return result;
};

export const equalsEither = (element, collection) => {
  let flag = false;

  collection?.forEach(val => {
    if (element === val) {
      flag = true;
    }
  });

  return flag;
};

export const containsEither = (element, collection) => {
  let flag = false;

  collection?.forEach(val => {
    if (String(element).toLowerCase().includes(String(val).toLowerCase())) {
      flag = true;
    }
  });

  return flag;
};