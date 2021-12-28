import { useDispatch, useSelector } from '../redux/store';
import { useEffect, useMemo, useState } from 'react';
import { isEmpty, isLoaded, useFirestoreConnect } from 'react-redux-firebase';

export default function useUsers() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const getData = useSelector(state => state.firestore.ordered.users)
  const users = useMemo(() => isEmpty(getData) ? [] : getData, [getData])

  useFirestoreConnect(() => [
    {
      collection: "users",
      storeAs: 'users'
    }
  ]);

  useEffect(() => setLoading(!isLoaded(getData)), [getData, users, dispatch]);

  return {users, loading};
}