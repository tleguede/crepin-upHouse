import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "../redux/store";
import {isEmpty, isLoaded, useFirestoreConnect} from "react-redux-firebase";
import useAuth from './useAuth';

const useFavorites= () => {
  const {user:{id}}=useAuth()
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const getData = useSelector(state => state.firestore.ordered.favorites)
  const realEstates = useMemo(() => {
    return isEmpty(getData) ? [] : getData.map(one => ({ ...one, cover: one?.images[0]?.url }));
  }, [getData])

  useFirestoreConnect(() => [
    {
      collection: "realEstate",
      where:[['bookmarkedByIds','array-contains',id]],
      orderBy:[['createdAt','desc']],
      storeAs: 'favorites'
    }
  ]);

  useEffect(() => setLoading(!isLoaded(getData)), [getData, realEstates, dispatch]);

  return {realEstates, loading};
}

export default useFavorites