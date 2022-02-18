import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from '../redux/store';
import { isEmpty, isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { flattenDeep, isString, uniq } from 'lodash';
import { zoneCollection } from '../constant/firestore';

const selector = 'zones';

const upwardMeta = (element, _, list) => {
  const children = list?.filter(child => child?.parentId === element?.id);
  const _helper = uniq(flattenDeep([...flattenDeep(children?.map(one => one?._helper)), element?._helper]));

  return {
    ...element,
    _helper
  };
};

const addMetas = (list) => {
  return list?.map(one => {
    let keywords = [one?.label];

    if (one?.parentId) {
      const parent = list?.find(parent => parent?.id === one?.parentId);
      keywords = [...keywords, parent?.label];

      if (parent?.parentId) {
        const ancestor = list?.find(ancestor => ancestor?.id === parent?.parentId);
        keywords = [...keywords, ancestor?.label];
      }

    }

    const _helper = keywords?.filter(one => isString(one))?.reverse();

    return {
      ...one,
      _helper,
      _meta: _helper?.toString()
    };
  })
    ?.map(upwardMeta)
    ?.map(upwardMeta)
    ?.map(upwardMeta)
    ?.map(one => ({
      ...one,
      _helper: one?._helper?.toString()
    }));
};

export default function useZones() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const getData = useSelector(state => state.firestore.ordered[selector]);
  const zones = useMemo(() => {
    return addMetas(flattenDeep((isEmpty(getData) ? [] : getData)?.map(one => one?.records || [])));
  }, [getData]);

  useFirestoreConnect(() => [
    {
      collection: zoneCollection.path,
      storeAs: selector
    }
  ]);

  useEffect(() => setLoading(!isLoaded(getData)), [getData, dispatch]);

  return { zones, loading };
};