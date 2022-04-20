// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import { Container, } from '@material-ui/core';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import useAuth from '../hooks/useAuth';
import ShouldLoginFirst from '../components/_external-pages/ShouldLoginFirst';
import PostList from '../components/_external-pages/my-posts';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled(Container)(({ theme }) => ({
  marginTop: 100
}));


// ----------------------------------------------------------------------

export default function MyPosts() {

  const { isAuthenticated } = useAuth();

  return (
    <RootStyle title='SoluxImmo' id='move_top'>
      <ContentStyle maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading={'Mes Biens'}
          links={[
            {name:'Acceuil',href:'/'},
            {name:'Mes Biens'}
          ]}
        />

        {
          isAuthenticated
            ? <PostList />
            : <ShouldLoginFirst why={'voir la liste de vos biens'} />
        }

      </ContentStyle>
    </RootStyle>
  );
}
