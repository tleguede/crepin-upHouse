import { useEffect } from 'react';
import { useDispatch, useSelector } from '../redux/store';

import { selectRealEstate } from '../redux/selectors';
import { searchRealEstate } from '../redux/slices/realEstate.thunks';

export default function useRealEstates (){
  const dispatch = useDispatch();
  const { list=[], loading, init } = useSelector(selectRealEstate);


  useEffect(() => {

    if (!init && !loading) {
      console.log('--init--');
      dispatch(searchRealEstate({}));
    }

    // eslint-disable-next-line
  }, []);

  return { realEstates: list, loading };
};

