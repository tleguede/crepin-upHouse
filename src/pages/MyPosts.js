// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import LandingRealEstateList from '../components/_external-pages/landing/LandingRealEstateList';
import { Container } from '@material-ui/core';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled(Container)(({ theme }) => ({
  marginTop:100,
}));

// ----------------------------------------------------------------------

export default function MyPosts() {
  return (
    <RootStyle title="upHouse" id="move_top">
      <ContentStyle maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading={'Mes Biens immobiliers'}
          links={[
            {name:'Acceuil',href:'/'},
            {name:'Mes Biens immobiliers'}
          ]}
          />
        <LandingRealEstateList/>
      </ContentStyle>
    </RootStyle>
  );
}
