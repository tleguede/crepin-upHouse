import { Box, Typography, Paper, Grid, Tooltip, IconButton } from '@material-ui/core';

import Label from '../../Label';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { LoadingButton } from '@material-ui/lab';
import { changeBookMarkState } from '../../../redux/slices/realEstate.thunks';
import useAuth from '../../../hooks/useAuth';
import { useDispatch } from '../../../redux/store';
import useToggle from '../../../hooks/useToggle';
import FavoriteAskLogin from '../FavoriteAskLogin';
import { useMemo, useState } from 'react';
import { PATH_DASHBOARD, PATH_PAGE } from '../../../routes/paths';
import { useLocation, useNavigate } from 'react-router-dom';
import { REAL_ESTATE_STATE } from '../../../constant';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import BlockIcon from '@material-ui/icons/Block';
import RealEstateItemMenu from './RealEstateItemMenu';

export function RealEstateItem({ item }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = useMemo(() => location.pathname === '/', [location.pathname]);
  const isMyPosts = useMemo(() => location.pathname === PATH_PAGE.myPosts, [location.pathname]);
  const isAdminValidator = useMemo(() => location.pathname === PATH_DASHBOARD.admin.validation, [location.pathname]);
  const isInValidation = useMemo(() => item?.state === REAL_ESTATE_STATE.WAITING_FOR_VALIDATION, [item?.state]);
  const isBanned = useMemo(() => item?.state === REAL_ESTATE_STATE.REJECTED, [item?.state]);


  const dispatch = useDispatch();
  const { isAuthenticated, user: { id } } = useAuth();
  const { handleOpen, open, handleClose } = useToggle();
  const [loading, setLoading] = useState(false);
  const isFavorite = useMemo(() => {
    return item?.bookmarkedByIds?.includes(id) || false;
  }, [item?.bookmarkedByIds, id]);

  const { name, cover, type, cost } = item;

  const handleFavorite = () => {
    if (!isAuthenticated) {
      handleOpen();
    } else {
      setLoading(true);
      dispatch(changeBookMarkState({ id: item?.id, state: !isFavorite }, () => {
        setLoading(false);
      }));
    }
  };


  const goTo = (id) => {
    navigate(PATH_PAGE.detail.replace(':id', id));
  };

  return (
    <>
      <Paper sx={{ mx: 1.5, borderRadius: 2, bgcolor: 'background.neutral' }}>
        <Box sx={{ p: 1, position: 'relative' }}>

          <Box sx={{
            position: 'absolute',
            bottom:  110,
            right: 5,
            bgcolor: isHome? 'transparent':'white',
            borderRadius: 20,
            mr: 2
          }}>
            {
              !isMyPosts && (
                <LoadingButton
                  loading={loading} variant={'text'}
                  color={isFavorite ? 'error' : 'primary'}

                  onClick={handleFavorite}
                >
                  {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </LoadingButton>
              )
            }

            {
              isMyPosts&& (item?.state !== REAL_ESTATE_STATE.VALIDATED) && (
                <Tooltip title={item?.state}>
                  <IconButton color={(isInValidation && 'success') || (isBanned && 'error') || 'default'}>
                    {isInValidation && (<AccessTimeIcon />)}
                    {isBanned && (<BlockIcon />)}
                  </IconButton>
                </Tooltip>
              )
            }

            {
              (isMyPosts || isAdminValidator) && (
                <RealEstateItemMenu
                  item={item}
                  isMyPosts={isMyPosts}
                  isBanned={isBanned}
                  isInValidation={isInValidation}
                  isAdminValidator={isAdminValidator}
                />
              )
            }


          </Box>


          <Label
            variant='filled'
            color={'info'}
            sx={{ position: 'absolute', bottom: 16, right: 16, textTransform: 'capitalize' }}
          >
            <Typography variant='body1'>
              {`${cost} CFA`}
            </Typography>
          </Label>

          <Box component='img' src={cover} sx={{ borderRadius: 1.5, width: 1,height:150 }} onClick={() => goTo(item?.id)} />
        </Box>

        <Grid container spacing={2} sx={{ p: 3, pt: 1, pb: 2.5 }} onClick={() => goTo(item?.id)}>

          <Grid item xs={12}>
            <Typography variant='subtitle2' sx={{ overflow: 'hidden', textOverflow: 'clip', height: 50 }}>
              {name}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='subtitle2'>
              {type}
            </Typography>
          </Grid>

        </Grid>

      </Paper>
      <FavoriteAskLogin open={open} onClose={handleClose} />

    </>
  );
}
