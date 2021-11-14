// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  Button,
  Container,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack, TextField,
  Typography
} from '@material-ui/core';
import CarouselThumbnail from '../components/carousel/CarouselThumbnail';
import { Room, Wifi } from '@material-ui/icons';
import useToggle from '../hooks/useToggle';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled(Container)(({ theme }) => ({
  marginTop: 100,
  marginBottom:100
}));

// ----------------------------------------------------------------------

export default function LandingPageDetail() {
  const {handleOpen,open,handleClose}=useToggle()

  return (
    <RootStyle title='upHouse | Detail' id='move_top'>
      <ContentStyle maxWidth={'lg'}>
        <Stack direction={'column'} spacing={3}>

          <Stack direction={'row'} spacing={1} justifyContent={'space-between'}>
            <Typography variant={'h4'}>
              Sunflower House
            </Typography>
            <Button variant={'outlined'} color={'error'} onClick={handleOpen}>
              Je suis interesse
            </Button>
          </Stack>

          <CarouselThumbnail/>

          <Divider />

          <Typography variant={'subtitle1'}>
            Caracteristiques
          </Typography>

          <Grid container spacing={2}>
            <Grid item>
              <Stack direction={'row'}>
                <Wifi/>
                <Typography variant={'body1'}>
                  Wifi
                </Typography>
              </Stack>
            </Grid>

            <Grid item>
              <Stack direction={'row'}>
                <Room/>
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

          <Typography variant={'body1'}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley
            of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </Typography>


          <Divider />

          <Typography variant={'subtitle1'}>
            Modalite de paiement
          </Typography>

          <Stack direction={'row'} spacing={1} justifyContent={'space-between'}>
            <Typography variant={'body1'}>
              100.000 CFA/ mois
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

      </ContentStyle>
    </RootStyle>
  );
}
