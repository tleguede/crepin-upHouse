import RealEstateList from '../real-estate';
import useFavorites from '../../../hooks/useFavorites';
import LoadingScreen from '../../LoadingScreen';
import { useMemo } from 'react';
import NoFavorites from '../NoFavorites';

export default function FavoriteList() {

  const { loading, realEstates } = useFavorites();
  const noResult = useMemo(() => !loading && realEstates.length === 0, [realEstates, loading]);


  return (
    <>
      {
        noResult
        ? (<NoFavorites/>)
          :(
            <>
              {
                loading
                  ? (
                    <LoadingScreen sx={{ height: '90vh' }} />
                  )
                  : (
                    <RealEstateList list={realEstates} loading={loading} />
                  )
              }
            </>
          )
      }

    </>
  );
}