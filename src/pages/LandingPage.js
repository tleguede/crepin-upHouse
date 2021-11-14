// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  LandingHero,

} from '../components/_external-pages/landing';
import LandingSearchFilter from '../components/_external-pages/landing/landing-search-filter';
import LandingRealEstateList from '../components/_external-pages/landing/LandingRealEstateList';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <RootStyle title="upHouse" id="move_top">
      <LandingHero />
      <ContentStyle>
        <LandingSearchFilter/>
        <LandingRealEstateList/>
      </ContentStyle>
    </RootStyle>
  );
}
