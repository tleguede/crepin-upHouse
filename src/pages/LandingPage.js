// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  LandingHero,

} from '../components/_external-pages/landing';
import LandingRealEstateList from '../components/_external-pages/_landing';
import LandingSearchFilter from '../components/_external-pages/landing/landing-search-filter';
import { Hidden,} from '@material-ui/core'
import LandingSearchBar from '../components/_external-pages/landing/search-bar/index';
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
    <RootStyle title="SoluxImmo" id="move_top">
      <LandingHero />
      <ContentStyle id={'list'}>

        <Hidden smDown>
          <LandingSearchFilter />
        </Hidden>

        <Hidden smUp>
          <LandingSearchBar />
        </Hidden>

        <LandingRealEstateList />
      </ContentStyle>
    </RootStyle>
  );
}
