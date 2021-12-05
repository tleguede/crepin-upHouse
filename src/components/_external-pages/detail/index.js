import {
  Button,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography
} from '@material-ui/core';
import CarouselThumbnail from '../../carousel/CarouselThumbnail';
import { Favorite, FavoriteBorder, Room, Wifi } from '@material-ui/icons';
import { fNumber } from '../../../utils/formatNumber';
import { LoadingButton } from '@material-ui/lab';
import useToggle from '../../../hooks/useToggle';
import useAuth from '../../../hooks/useAuth';
import { useMemo, useState } from 'react';
import { useDispatch } from '../../../redux/store';
import { changeBookMarkState } from '../../../redux/slices/realEstate.thunks';
import FavoriteAskLogin from '../FavoriteAskLogin';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function Detail({ selected }) {
  const { isAuthenticated, user: { id } } = useAuth();
  const dispatch = useDispatch();
  const { handleOpen, open, handleClose } = useToggle();
  const { handleOpen: handleOpenFavorite, open: openFavorite, handleClose: handleCloseFavorite } = useToggle();
  const [loading, setLoading] = useState(false);
  // const { handleOpen, open, handleClose } = useToggle();

  const isFavorite = useMemo(() => {
    return selected?.bookmarkedByIds?.includes(id) || false;
  }, [selected?.bookmarkedByIds, id]);

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

  console.log(isFavorite);

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
              {isFavorite ? <Favorite/>:<FavoriteBorder/>}
            </LoadingButton>
            <Button variant={'outlined'} color={'error'} onClick={handleOpen}>
              Je suis interesse
            </Button>
          </Stack>
        </Stack>

        <CarouselThumbnail images={selected?.images} />

        <Divider />

        <Stack direction={'row'} justifyContent={'space-between'}>

          <Typography variant={'subtitle1'}>
            {selected?.bookmarked || 0}x Favoris
          </Typography>

          <Typography variant={'subtitle1'}>
            {selected?.callrequests || 0}x Demandes d'appel
          </Typography>

        </Stack>


        <Divider />

        <Typography variant={'subtitle1'}>
          Caracteristiques
        </Typography>

        <Grid container spacing={2}>
          <Grid item>
            <Stack direction={'row'}>
              <Wifi />
              <Typography variant={'body1'}>
                Wifi
              </Typography>
            </Stack>
          </Grid>

          <Grid item>
            <Stack direction={'row'}>
              <Room />
              <Typography variant={'body1'}>
                2 Chambres
              </Typography>
            </Stack>
          </Grid>

        </Grid>


        <Divider />

        <Typography variant={'subtitle1'}>
          Description
        </Typography>

        {selected?.description}


        <Divider />

        <Typography variant={'subtitle1'}>
          Modalite de paiement
        </Typography>

        <Stack direction={'row'} spacing={1} justifyContent={'space-between'}>
          <Typography variant={'body1'}>
            {`${fNumber(selected?.cost)} CFA ${selected?.paymentRhythm}`}
          </Typography>
          <Button variant={'outlined'} color={'error'} onClick={handleOpen}>
            Je suis interesse
          </Button>
        </Stack>

      </Stack>

      <Dialog open={open} onClose={handleClose}>

        <DialogTitle>
          upHouse
        </DialogTitle>

        <DialogContent>
          <Stack direction={'column'} spacing={2}>
            <Typography variant={'subtitle1'}>
              Laissez nous votre contact, nous vous apellerons d'ici peu
            </Typography>
            <TextField
              fullWidth
              label={'Mon nom'}
            />
            <TextField
              fullWidth
              label={'Mon nom'}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <LoadingButton variant={'contained'} onClick={handleClose}>
            Soumettre
          </LoadingButton>
        </DialogActions>

      </Dialog>

      <FavoriteAskLogin open={openFavorite} onClose={handleCloseFavorite}/>
    </>
  );
}