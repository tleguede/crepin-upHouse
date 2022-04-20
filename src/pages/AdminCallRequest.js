// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import { Checkbox, Container, IconButton } from '@material-ui/core';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import EnhancedDataGrid from '../components/enhanced-data-grid';
import { fDate } from '../utils/formatTime';
import LinkIcon from '@material-ui/icons/Link';
import useCallRequest from '../hooks/useCallRequest';
import { useDispatch } from '../redux/store';
import { useState } from 'react';
import { editCallRequest } from '../redux/slices/callRequest.thunks';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled(Container)(({ theme }) => ({}));

// ----------------------------------------------------------------------

export default function AdminCallRequest() {
  const dispatch = useDispatch();
  const { loading, calls } = useCallRequest();
  const [editLoading, setEditLoading] = useState(false);

  const handleChange = change => {
    setEditLoading(true);
    dispatch(editCallRequest(change, () => {
      setEditLoading(false);
    }));
  };

  const thead = [
    { id: 'displayName', label: 'Utilisateur' },
    { id: 'phoneNumber', label: 'Numero' },
    {
      id: 'realEstateId', label: 'Lien',
      render: id => (
        <IconButton href={`/detail/${id}`}>
          <LinkIcon />
        </IconButton>
      )
    },
    {
      id: 'createdAt', label: 'Le',
      render: date => date ? fDate(date?.toDate()) : ''
    },
    {
      id: 'isDone', label: 'Fait',
      render: (isDone, { id }) => (
        <Checkbox
          disabled={editLoading}
          checked={isDone||false}
          onChange={(event, checked) => handleChange({ id, isDone: checked })}
        />
      )

    }

  ];


  return (
    <RootStyle title='SoluxImmo' id='move_top'>
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
          data={calls}
          loading={loading}
        />

      </ContentStyle>
    </RootStyle>
  );
}
