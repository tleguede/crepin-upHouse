import useMyPosts from 'src/hooks/useMyPosts';
import RealEstateList from '../real-estate';
import { useMemo } from 'react';
import NoFavorites from '../NoFavorites';


export default function PostList() {
  const { loading, realEstates } = useMyPosts();
  const noResult = useMemo(() => !loading && realEstates.length === 0, [realEstates, loading]);

  return (
    <>

      {
        noResult
          ? (<NoFavorites/>)
          :(
            <>
              <RealEstateList list={realEstates} loading={loading} />
            </>
          )
      }

    </>
  );
}