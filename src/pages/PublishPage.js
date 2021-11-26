// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import { Container } from '@material-ui/core';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import Publish from '../components/_external-pages/publish';
import useAuth from '../hooks/useAuth';
import ShouldLoginFirst from '../components/_external-pages/ShouldLoginFirst';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled(Container)(({ theme }) => ({
  marginTop: 100
}));

// ----------------------------------------------------------------------

export default function PublishPage() {

  const { isAuthenticated } = useAuth();

  return (
    <RootStyle title='upHouse' id='move_top'>
      <ContentStyle maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading={'Publier un bien immobilier'}
          links={[
            { name: 'Acceuil', href: '/' },
            { name: 'Publication' }
          ]}
        />

        {
          isAuthenticated
            ? <Publish />
            : <ShouldLoginFirst why={'publier un bien immobilier'} />
        }

      </ContentStyle>
    </RootStyle>
  );
}
