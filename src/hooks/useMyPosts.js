import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "../redux/store";
import {isEmpty, isLoaded, useFirestoreConnect} from "react-redux-firebase";
import useAuth from './useAuth';

export const useLoans = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState();
  const getData = useSelector(state => state.firestore.ordered.myPosts)
  const realEstates = useMemo(() => isEmpty(getData) ? [] : getData, [getData])

  useFirestoreConnect(() => [
    {
      collection: "realEstate",
      where:[['owner.id','==',user?.id]],
      orderBy:[['createdAt','desc']],
      storeAs: 'myPosts'
    }
  ]);

  useEffect(() => setLoading(!isLoaded(getData)), [getData, realEstates, dispatch]);

  return {realEstates, loading};
}