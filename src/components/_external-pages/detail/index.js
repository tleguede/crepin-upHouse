import {
  Button, Container,

  Divider,
  Grid,
  Stack,
  TextField,
  Typography
} from '@material-ui/core';
import CarouselThumbnail from '../../carousel/CarouselThumbnail';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { fNumber } from '../../../utils/formatNumber';
import { LoadingButton } from '@material-ui/lab';
import useToggle from '../../../hooks/useToggle';
import useAuth from '../../../hooks/useAuth';
import { useMemo, useState } from 'react';
import { useDispatch } from '../../../redux/store';
import { changeBookMarkState } from '../../../redux/slices/realEstate.thunks';
import FavoriteAskLogin from '../FavoriteAskLogin';
import { isString, isArray } from 'lodash';
import { Icon } from '@iconify/react';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import outlineBedroomParent from '@iconify/icons-ic/outline-bedroom-parent';
import bathroomIcon from '@iconify/icons-cil/bathroom';
import bxsParking from '@iconify/icons-bx/bxs-parking';
import areaCustom from '@iconify/icons-carbon/area-custom';
import { FEATURE_ICON, REAL_ESTATE_STATE } from '../../../constant';
import DetailIAmInteressed from './DetailIAmInteressed';
import DetailStateSwitcher from './DetailStateSwitcher';

const SIZE = { height: 30, width: 30 };

const Item = ({ icon, label }) => {
  return (
    <Container sx={{
      borderRadius: 1,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#dcdcdc'

    }}>
      <Stack direction={'row'}  spacing={1}>

        <Icon icon={icon} {...SIZE} />

        <Stack direction={'column'} justifyContent={'center'}>
          <Typography variant={'body'} sx={{ pl: 1 }}>
            {label}
          </Typography>
        </Stack>

      </Stack>
    </Container>
  );
};

export default function Detail({ selected }) {
  const { isAuthenticated, user: { id, isAdmin } } = useAuth();
  const dispatch = useDispatch();
  const { handleOpen, open, handleClose } = useToggle();
  const { handleOpen: handleOpenFavorite, open: openFavorite, handleClose: handleCloseFavorite } = useToggle();
  const [loading, setLoading] = useState(false);
  // const { handleOpen, open, handleClose } = useToggle();

  const isFavorite = useMemo(() => {
    return selected?.bookmarkedByIds?.includes(id) || false;
  }, [selected?.bookmarkedByIds, id]);

  const isOwner = useMemo(() => {
    return selected?.owner?.id === id || false;
  }, [selected?.owner?.id, id]);


  const handleFavorite = () => {
    if (!isAuthenticated) {
      handleOpenFavorite();
    } else {
      setLoading(true);
      dispatch(changeBookMarkState({ id: selected?.id, state: !isFavorite }, () => {
        setLoading(false);
      }));
    }
  };

  const otherFeatures = useMemo(() => {
    let list = [];
    selected?.features?.plexType && list.push(selected?.features?.plexType);
    selected?.features?.featureType && list.push(selected?.features?.featureType);

    if (isArray(selected?.features?.otherFeature)) {
      list = list.concat(selected?.features?.otherFeature);
    }
    if (isArray(selected?.features?.building)) {
      list = list.concat(selected?.features?.building);
    }
    if (isArray(selected?.features?.otherCriterion)) {
      list = list.concat(selected?.features?.otherCriterion);
    }
    if (isArray(selected?.features?.buildingOtherCriterion)) {
      list = list.concat(selected?.features?.buildingOtherCriterion);
    }
    return list.filter(one => isString(one));
  }, [selected?.features]);


  return (
    <>
      <Stack direction={'column'} spacing={3}>

        <Stack direction={'row'} spacing={1} justifyContent={'space-between'}>
          <Typography variant={'h4'}>
            {selected?.name}
          </Typography>
          <Stack direction={'row'} spacing={1}>
            <LoadingButton loading={loading} variant={'text'}
                           color={isFavorite ? 'error' : 'primary'}
                           onClick={handleFavorite}>
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </LoadingButton>

            {
              !isOwner && (
                <Button variant={'outlined'} color={'error'} onClick={handleOpen}

                        disabled={selected?.state !== REAL_ESTATE_STATE.VALIDATED}
                >
                  Je suis interesse
                </Button>
              )
            }


            {
              isAdmin && (
                <DetailStateSwitcher item={selected} />
              )
            }

          </Stack>
        </Stack>

        <CarouselThumbnail images={selected?.images} />


        <Divider />

        <Stack direction={'row'} justifyContent={'space-between'}>

          <Typography variant={'subtitle1'}>
            {selected?.category}
          </Typography>

          <Typography variant={'subtitle1'}>
            {selected?.type}
          </Typography>

        </Stack>


        <Divider />

        <Stack direction={'row'} justifyContent={'space-between'}>

          <Typography variant={'subtitle1'}>
            {selected?.bookmarked || 0}x Favoris
          </Typography>

          <Typography variant={'subtitle1'}>
            {selected?.callRequests || 0}x Demandes d'appel
          </Typography>

        </Stack>


        <Divider />

        <Typography variant={'subtitle1'}>
          Caracteristiques
        </Typography>

        <Grid container spacing={2}>

          {
            (selected?.features?.numberOfRoom) && (
              <Grid item >
                <Item
                  icon={outlineBedroomParent}
                  label={selected?.features?.numberOfRoom}
                />
              </Grid>
            )
          }


          {
            (selected?.features?.numberOfBathRoom) && (
              <Grid item >
                <Item
                  icon={bathroomIcon}
                  label={selected?.features?.numberOfBathRoom}
                />

              </Grid>
            )
          }

          {
            (selected?.features?.numberOfParking) && (
              <Grid item >
                <Item
                  icon={bxsParking}
                  label={selected?.features?.numberOfParking}
                />
              </Grid>
            )
          }

          {
            (selected?.area) && selected?.area !== 0 && (
              <Grid item >
                <Item
                  icon={areaCustom}
                  label={`${selected?.area} ${selected?.areaUnit}`}
                />
              </Grid>
            )
          }


        </Grid>

        <Grid container spacing={3}>
          {otherFeatures.map(one => {
            const icon = FEATURE_ICON[one];
            return (
              <Grid item key={one}>
                <Stack direction={'row'} spacing={1}>

                  <>
                    {icon ? <Icon icon={icon} {...SIZE} /> : '#'}
                  </>

                  <Stack justifyContent={'center'}>
                    <Typography variant={'body'}>
                      {one}
                    </Typography>
                  </Stack>

                </Stack>
              </Grid>
            );
          })}
        </Grid>

        <Divider />


        <Typography variant={'subtitle1'}>
          Description
        </Typography>

        <TextField
          disabled
          fullWidth
          multiline
          minRows={5}
          value={selected?.description}
        />


        <Divider />

        <Typography variant={'subtitle1'}>
          Modalite de paiement
        </Typography>

        <Stack direction={'row'} spacing={1} justifyContent={'space-between'}>
          <Typography variant={'body1'}>
            {`${selected?.transactionType}  -  ${fNumber(selected?.cost)} CFA`}
          </Typography>

          {
            !isOwner && (
              <Button variant={'outlined'} color={'error'} onClick={handleOpen}
                      disabled={selected?.state !== REAL_ESTATE_STATE.VALIDATED}

              >
                Je suis interesse
              </Button>
            )
          }

        </Stack>

      </Stack>

      <DetailIAmInteressed selected={selected} open={open} onclose={handleClose} />

      <FavoriteAskLogin open={openFavorite} onClose={handleCloseFavorite} />
    </>
  );
}