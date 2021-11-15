// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import LandingRealEstateList from '../components/_external-pages/landing/LandingRealEstateList';
import { Container } from '@material-ui/core';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../routes/paths';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled(Container)(({ theme }) => ({}));

// ----------------------------------------------------------------------

export default function AdminPostValidation() {
  return (
    <RootStyle title='upHouse' id='move_top'>
      <ContentStyle maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading={'Biens immobiliers en attente de validation'}
          links={[
            { name: 'Admin', href: PATH_DASHBOARD.root },
            { name: 'Biens immobiliers en attente de validation' }
          ]}
        />
        <LandingRealEstateList />
      </ContentStyle>
    </RootStyle>
  );
}
