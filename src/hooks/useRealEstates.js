import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "../redux/store";
import {isEmpty, isLoaded, useFirestoreConnect} from "react-redux-firebase";

const useRealEstates= () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState();
  const getData = useSelector(state => state.firestore.ordered.realEstates)
  const realEstates = useMemo(() => {
    return isEmpty(getData) ? [] : getData.map(one => ({ ...one, cover: one?.images[0]?.url }));
  }, [getData])

  useFirestoreConnect(() => [
    {
      collection: "realEstate",
      orderBy:[['createdAt','desc']],
      storeAs: 'realEstates'
    }
  ]);

  useEffect(() => setLoading(!isLoaded(getData)), [getData, realEstates, dispatch]);

  return {realEstates, loading};
}

export default useRealEstates