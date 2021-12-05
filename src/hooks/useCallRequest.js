import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "../redux/store";
import {isEmpty, isLoaded, useFirestoreConnect} from "react-redux-firebase";

 const useCallRequest = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState();
  const getData = useSelector(state => state.firestore.ordered.myPosts)
  const calls = useMemo(() => isEmpty(getData) ? [] : getData, [getData])

  useFirestoreConnect(() => [
    {
      collection: "callRequest",
      orderBy:[['createdAt','desc']],
      storeAs: 'myPosts'
    }
  ]);

  useEffect(() => setLoading(!isLoaded(getData)), [getData, calls, dispatch]);

  return {calls, loading};
}

export default useCallRequest