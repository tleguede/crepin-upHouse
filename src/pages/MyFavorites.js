// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import { Container } from '@material-ui/core';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import useAuth from '../hooks/useAuth';
import ShouldLoginFirst from '../components/_external-pages/ShouldLoginFirst';
import FavoriteList from '../components/_external-pages/my-favorites';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled(Container)(({ theme }) => ({
  marginTop:100,
}));

// ----------------------------------------------------------------------

export default function MyFavorites() {
  const { isAuthenticated } = useAuth();

  return (
    <RootStyle title="upHouse" id="move_top">
      <ContentStyle maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading={'Mes Favoris'}
          links={[
            {name:'Acceuil',href:'/'},
            {name:'Mes favoris'}
          ]}
          />
        {
          isAuthenticated
            ? <FavoriteList />
            : <ShouldLoginFirst why={'voir la liste de vos favoris'} />
        }
      </ContentStyle>
    </RootStyle>
  );
}
