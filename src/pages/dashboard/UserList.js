import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Button,
  Container,
  Checkbox
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';

import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import EnhancedDataGrid from '../../components/enhanced-data-grid';
import useUsers from '../../hooks/useUsers';
import { updateUser } from '../../redux/slices/user.thunk';
import { useDispatch } from '../../redux/store';
import { useCallback, useMemo } from 'react';
import MoreMenuButton from '../../components/MoreMenuButton';

// ----------------------------------------------------------------------

const columns = [
  { id: 'displayName', label: 'Name' },
  { id: 'email', label: 'Email' },
  {
    id: 'isAdmin', label: 'Est admin?',
    render: (state, { id, handleChange }) => (
      <Checkbox
        checked={state || false}
        onChange={(event, checked) => handleChange({ id, isAdmin: checked })}
      />
    )
  },
  {
    id: 'disabled', label: 'Est Actif?',
    render: (state, { id, handleChange }) => (
      <Checkbox
        checked={!state || true}
        onChange={(event, checked) => handleChange({ id, disabled: checked })}
      />
    )
  },
  {
    id: '',
    render: (_, { goToDetail, handleDeleteUser, ...rest }) => {
      return (
        <MoreMenuButton
          item={rest}
          canOpen={false}
          ClickEdit={goToDetail}
          ClickOpen={goToDetail}
          ClickDelete={handleDeleteUser}
        />
      );
    }
  }
];

// ----------------------------------------------------------------------


export default function UserList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();
  const { users, loading } = useUsers();


  const handleChange = useCallback((change) => {
    dispatch(updateUser(change));
  }, [dispatch]);

  const goToDetail = useCallback(({ id }) => {
    console.log('---d');
    navigate(PATH_DASHBOARD.user.editById.replace(':id', id));
  },[navigate]);

  const handleDeleteUser = useCallback((record) => {
    console.log(record);
  },[]);


  const render = useMemo(() => users?.map(record => ({
    ...record,
    handleChange,
    goToDetail,
    handleDeleteUser
  })), [users, handleChange, handleDeleteUser, goToDetail]);

  return (
    <Page title='User: List | Minimal-UI'>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='User List'
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'List' }
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_DASHBOARD.user.newUser}
              startIcon={<Icon icon={plusFill} />}
            >
              New User
            </Button>
          }
        />

        <EnhancedDataGrid
          data={render}
          loading={loading}
          columns={columns}
          onRowClick={goToDetail}
        />

      </Container>
    </Page>
  );
}
