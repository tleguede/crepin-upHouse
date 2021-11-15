// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import { Container, IconButton } from '@material-ui/core';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import EnhancedDataGrid from '../components/enhanced-data-grid';
import { fDate } from '../utils/formatTime';
import LinkIcon from '@material-ui/icons/Link';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled(Container)(({ theme }) => ({}));

// ----------------------------------------------------------------------

const thead = [
  { id: 'username', label: 'Utilisateur' },
  { id: 'phoneNumber', label: 'Numero' },
  { id: 'state', label: 'Etat' },
  { id: 'link', label: 'Lien',
    render:link=>(
      <IconButton href={link}>
        <LinkIcon/>
      </IconButton>
    )
  },
  { id: 'createdAt', label: '...' ,
    render:date=>fDate(date)
  }

];
const data = [
  {
    id: 'adfasdf',
    username: 'Random User',
    phoneNumber: '00030003000',
    state: 'Non contacter',
    link: '/detail/asdf4w4fq34rwqef',
    createdAt: new Date()
  }
];
export default function AdminCallRequest() {
  return (
    <RootStyle title='upHouse' id='move_top'>
      <ContentStyle maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading={'Demande d appel'}
          links={[
            { name: 'Acceuil', href: '/' },
            { name: 'Demande d appel' }
          ]}
        />
        <EnhancedDataGrid
          columns={thead}
          data={data}
        />

      </ContentStyle>
    </RootStyle>
  );
}
