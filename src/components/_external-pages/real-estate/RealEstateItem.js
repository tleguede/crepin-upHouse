import { Box, Typography, Paper, Tooltip, Button, Stack, Divider,Grid } from '@material-ui/core';

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
import { REAL_ESTATE_STATE, TRANSACTION_TYPE } from '../../../constant';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import BlockIcon from '@material-ui/icons/Block';
import RealEstateItemMenu from './RealEstateItemMenu';
import { formatDisplay } from '../../../utils/zone';
import { Icon } from '@iconify/react';
import personIcon from '@iconify/icons-akar-icons/person';
import fieldTimeOutlined from '@iconify/icons-ant-design/field-time-outlined';
import { formatDistanceToNow } from 'date-fns';
import { gDate } from '../../../utils/formatTime';
import { fr as LocalFr } from 'date-fns/locale';
import { renderFeatures } from '../../../utils/estate';

import { take } from 'lodash';

const SIZE= { height: 20, width: 20 }

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

  const featues = take(renderFeatures(item, true), 5);


  return (
    <>

      <Paper sx={{ width: 1, height: 474, boxShadow: 5 }}>
        <Stack spacing={1}>

          <Box sx={{ position: 'relative' }}>

            <Box component='img' src={item?.images[0]?.url}
                 sx={{ borderRadius: 1.5, width: 1, height: 263, filter: 'brightness(50%)' }}
                 onClick={() => goTo(item?.id)}
            />

            <Box component={Stack} direction={'row'} sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              left: 0,
              top: 0,
              // bgcolor: 'red',
              height: 1,
              width: 1
            }}>
              <Stack height={1} width={1} p={1} justifyContent={'space-between'}>
                <Stack direction={'row'} justifyContent={'end'}>

                  <Label sx={{ color: 'white' }}>
                    {item?.transactionType}
                  </Label>


                </Stack>


                <Stack direction={'row'} justifyContent={'space-between'}>


                  <Typography overflow={'hidden'} textOverflow={'clip'} fontWeight={'bold'} fontSize={18}
                              sx={{ height: 25, color: 'white' }}>
                    {item?.cost} CFA {item?.transactionType === TRANSACTION_TYPE.RENT && `  / ${item?.paymentRhythm}`}
                  </Typography>

                  <Box sx={{
                    bgcolor: isHome ? 'transparent' : 'white',
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
                      isMyPosts && (item?.state !== REAL_ESTATE_STATE.VALIDATED) && (
                        <Tooltip title={item?.state}>
                          <Button color={(isInValidation && 'success') || (isBanned && 'error') || 'default'}>
                            {isInValidation && (<AccessTimeIcon />)}
                            {isBanned && (<BlockIcon />)}
                          </Button>
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

                </Stack>

              </Stack>


            </Box>

          </Box>


          <Stack onClick={() => goTo(item?.id)} width={1} height={155} px={1} spacing={1}>

            <Typography overflow={'hidden'} textOverflow={'clip'} fontWeight={'bold'}
                        fontSize={16}
                        sx={{ height: 25 }}
            >
              {item?.name}...
            </Typography>

            {
              item?.zone &&(
                <Typography overflow={'hidden'} textOverflow={'clip'} fontSize={13} sx={{
                  height: 25, color: (theme) => theme.palette.text.disabled
                }}>
                  {formatDisplay(item?.zone)}
                </Typography>
              )
            }


            <Grid container spacing={2} m={0}>
              {
                featues?.map((one, index) => (
                  <Grid item key={index}>
                    <Tooltip title={one?.label}>
                      <Icon icon={one?.icon} {...SIZE} />
                    </Tooltip>
                  </Grid>
                ))
              }
            </Grid>


            <Typography overflow={'hidden'} textOverflow={'clip'} fontWeight={'bold'} fontSize={14}
                        sx={{ height: 25 }}>
              {item?.type}
            </Typography>

          </Stack>

          <Divider />

          <Stack onClick={() => goTo(item?.id)} direction={'row'} justifyContent={'space-between'} px={1}>

            <Stack direction={'row'} spacing={1}>

              <Icon icon={personIcon} {...SIZE} />

              <Typography overflow={'hidden'} textOverflow={'clip'} fontWeight={'bold'} fontSize={14}
                          sx={{ height: 25, color: (theme) => theme.palette.text.disabled }}>
                {item?.owner?.displayName}
              </Typography>


            </Stack>

            <Stack direction={'row'} spacing={1}>

              <Icon icon={fieldTimeOutlined} {...SIZE} />

              <Typography overflow={'hidden'} textOverflow={'clip'} fontWeight={'bold'} fontSize={14}
                          sx={{ height: 25, color: (theme) => theme.palette.text.disabled }}>

                {formatDistanceToNow(gDate(item?.createdAt) || new Date(), {
                  addSuffix: true,
                  locale: LocalFr
                })}

              </Typography>


            </Stack>

          </Stack>


        </Stack>
      </Paper>

      <FavoriteAskLogin open={open} onClose={handleClose} />

    </>
  );
}
