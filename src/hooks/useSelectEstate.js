import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isEmpty, isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import {  useSelector } from '../redux/store';

const selector = (id) => `${id}_estate`;

export default function useSelectEstate() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const getData = useSelector(state => state.firestore.ordered[selector(id)]);
  const [estate] = useMemo(() => {
    return isEmpty(getData) ? [] : getData.map(one => ({ ...one, cover: one?.images[0]?.url }));
  }, [getData]);

  useFirestoreConnect(() => [
    {
      collection: 'realEstate',
      doc: id,
      storeAs: selector(id)
    }
  ]);

  useEffect(() => setLoading(!isLoaded(getData)), [getData]);

  return { estate, loading };
}