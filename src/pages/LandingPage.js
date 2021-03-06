// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  LandingHero,

} from '../components/_external-pages/landing';
import LandingRealEstateList from '../components/_external-pages/_landing';
import LandingSearchFilter from '../components/_external-pages/landing/landing-search-filter';

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
      <ContentStyle id={'list'}>
        <LandingSearchFilter/>
        <LandingRealEstateList/>
      </ContentStyle>
    </RootStyle>
  );
}
