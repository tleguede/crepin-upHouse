// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import { Container } from '@material-ui/core';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import Publish from '../components/_external-pages/publish';
import useAuth from '../hooks/useAuth';
import ShouldLoginFirst from '../components/_external-pages/ShouldLoginFirst';
import { selectRealEstate } from '../redux/selectors';
import { useSelector, useDispatch } from 'src/redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { getRealEstate } from '../redux/slices/realEstate.thunks';
import { gotSelectedRealEstate } from '../redux/slices/realEstate.slice';
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled(Container)(({ theme }) => ({
  marginTop: 100
}));

// ----------------------------------------------------------------------

const editLinks = [
  { name: 'Acceuil', href: '/' },
  { name: 'Mes posts', href: '/my_posts' },
  { name: 'Editer le bien' }
];

const createLinks = [
  { name: 'Acceuil', href: '/' },
  { name: 'Publication' }
];

export default function PublishPage() {

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, selected } = useSelector(selectRealEstate);
  const isEdit = useMemo(() => Boolean(id && selected), [id, selected]);

  useEffect(() => {
    if (id && !loading && !Boolean(selected) && !Boolean(error)) {
      dispatch(getRealEstate(id));
    }
  }, [id, loading, dispatch, selected, error]);

  useEffect(() => {
    return () => {
      dispatch(gotSelectedRealEstate(null));
    };
  }, [dispatch]);

  useEffect(() => {
    if (id && !loading && !Boolean(selected) && Boolean(error)) {
      navigate('/404');
    }
  }, [id, loading, navigate, selected, error]);


  return (
    <RootStyle title='upHouse' id='move_top'>
      <ContentStyle maxWidth={'lg'}>

        {
          loading
            ? (
              <LoadingScreen />
            )
            : (
              <>
                <HeaderBreadcrumbs
                  heading={isEdit ? 'Editer un bien immobilier' : 'Publier un bien immobilier'}
                  links={isEdit ? editLinks : createLinks}
                />

                {
                  isAuthenticated
                    ? <Publish selected={id && selected} />
                    : <ShouldLoginFirst why={'publier un bien immobilier'} />
                }
              </>
            )
        }


      </ContentStyle>
    </RootStyle>
  );
}
