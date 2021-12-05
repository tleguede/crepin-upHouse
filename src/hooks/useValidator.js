import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from '../redux/store';
import { isEmpty, isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { REAL_ESTATE_STATE } from '../constant';
import { DateTime } from 'luxon';
import {snakeCase} from 'lodash'

const weekBefore = DateTime.now().minus({ day: 7 }).toJSDate();

const useValidator = ({ startDate=weekBefore, state = REAL_ESTATE_STATE.WAITING_FOR_VALIDATION }) => {
  const selector = snakeCase(`${startDate.toString()}_${state}`);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const getData = useSelector(state => state.firestore.ordered[selector]);
  const realEstates = useMemo(() => {
    return isEmpty(getData) ? [] : getData.map(one => ({ ...one, cover: one?.images[0]?.url }));
  }, [getData]);

  useEffect(() => setLoading(!isLoaded(getData)), [getData, realEstates, dispatch]);

  useFirestoreConnect(() => [
    {
      collection: 'realEstate',
      where: [
        ['createdAt', '>=', startDate],
        ['state', '==', state]
      ],
      orderBy: [['createdAt', 'desc']],
      storeAs: selector
    }
  ]);

  return { realEstates, loading };
};

export default useValidator;