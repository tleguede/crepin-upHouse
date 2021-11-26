import useRealEstates from '../../../hooks/useRealEstates';
import RealEstateList from '../real-estate';

export default function LandingRealEstateList() {
  const { realEstates, loading } = useRealEstates();

  return (
    <RealEstateList list={realEstates} loading={loading} />
  );
}