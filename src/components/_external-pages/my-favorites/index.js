import RealEstateList from '../real-estate';
import useFavorites from '../../../hooks/useFavorites';

export default function FavoriteList() {

  const { loading, realEstates } = useFavorites();


  return (
    <>
      <RealEstateList list={realEstates} loading={loading} />

    </>
  );
}