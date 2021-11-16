// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import LandingRealEstateList from '../components/_external-pages/landing/LandingRealEstateList';
import { Container, Stack ,Typography} from '@material-ui/core';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled(Container)(({ theme }) => ({
  marginTop: 100
}));

const Waiting = styled(Container)(({ theme }) => ({
  border: 'solid',
  borderWidth: 1,
  borderColor: 'green',
  borderRadius:20,
  paddingTop:20
}));


// ----------------------------------------------------------------------

export default function MyPosts() {
  return (
    <RootStyle title='upHouse' id='move_top'>
      <ContentStyle maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading={'Mes Biens'}
          links={[
            {name:'Acceuil',href:'/'},
            {name:'Mes Biens'}
          ]}
        />

        <Waiting>
          <Stack direction={'column'} spacing={2}>
            <Typography variant={'h6'}>
              En attente de validation
            </Typography>
            <LandingRealEstateList />
          </Stack>


        </Waiting>

        <LandingRealEstateList />

      </ContentStyle>
    </RootStyle>
  );
}
