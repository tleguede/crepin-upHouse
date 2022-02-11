import { useContext } from 'react';
import { LandingSearchContext } from '../contexts/LandingSearchContext';

const useLandingSearch = () => useContext(LandingSearchContext);
export default useLandingSearch;