// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import { Container } from '@material-ui/core';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled(Container)(({ theme }) => ({
}));

// ----------------------------------------------------------------------

export default function AdminCallRequest() {
  return (
    <RootStyle title="upHouse" id="move_top">
      <ContentStyle maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading={'Demande d appel'}
          links={[
            {name:'Acceuil',href:'/'},
            {name:'Demande d appel'}
          ]}
          />

      </ContentStyle>
    </RootStyle>
  );
}
