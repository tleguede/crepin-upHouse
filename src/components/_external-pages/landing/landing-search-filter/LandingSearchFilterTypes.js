import { useRef } from 'react';
import { Button, Checkbox, Grid, IconButton, MenuItem, Popover, Stack, TextField, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import useToggle from '../../../../hooks/useToggle';
import { isFunction, values } from 'lodash';
import { SectionAccordion } from '../../../SectionAccordion';
import {
  BUILDING_TYPE,
  NUMBER_OF_BATHROOM,
  NUMBER_OF_HANGAR,
  NUMBER_OF_PARKING,
  NUMBER_OF_ROOM, OTHER_CRITERION, OTHER_FEATURES, PLEX_TYPE,
  RESIDENCE_TYPE
} from '../../../../constant';
import { Close } from '@material-ui/icons';


const RootStyle = styled('div')(() => ({
  margin: 20,
  width:450
}));

export default function LandingSearchFilterTypes({ range, onChange }) {
  const ref = useRef();
  const { open, handleOpen, handleClose } = useToggle();

  const handleChange = (change) =>
    (change.min >= 0 || change.max >= 0)
    && isFunction(onChange) && onChange(change);

  return (
    <>
      <Button
        fullWidth
        ref={ref}
        variant={'outlined'}
        endIcon={<FilterListIcon />}
        onClick={handleOpen}
        style={{ height: 55, color: 'grey', borderColor: 'grey' }}
      >
        Filtre
      </Button>

      <Popover
        open={open}
        anchorEl={ref.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >

        <RootStyle>
          <Stack direction={'row'} justifyContent={'end'}>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Stack>

          <SectionAccordion title={'Type de propriete'} hideShadow>

            <Grid container spacing={1}>
              {
                values(RESIDENCE_TYPE).map(one => (
                  <Grid item xs={6} key={one}>
                    <Stack direction={'row'} spacing={2}>
                      <Checkbox />
                      <Typography variant={'body1'} style={{ marginTop: 10 }}>
                        {one}
                      </Typography>
                    </Stack>
                  </Grid>
                ))
              }
            </Grid>

          </SectionAccordion>

          <SectionAccordion title={'Caracteristiques'} hideShadow>

            <Grid container spacing={1}>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  select
                  label={'Nombre de chambres'}
                >
                  {
                    values(NUMBER_OF_ROOM).map(one => (
                      <MenuItem key={one} value={one}>
                        {one}
                      </MenuItem>
                    ))
                  }
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  select
                  label={'Nombre de salles de bain/d\'eau'}
                >
                  {
                    values(NUMBER_OF_BATHROOM).map(one => (
                      <MenuItem key={one} value={one}>
                        {one}
                      </MenuItem>
                    ))
                  }
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  select
                  label={'Nombre de stationnement'}
                >
                  {
                    values(NUMBER_OF_PARKING).map(one => (
                      <MenuItem key={one} value={one}>
                        {one}
                      </MenuItem>
                    ))
                  }
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  select
                  label={'Nombre de garages'}
                >
                  {
                    values(NUMBER_OF_HANGAR).map(one => (
                      <MenuItem key={one} value={one}>
                        {one}
                      </MenuItem>
                    ))
                  }
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {
                    values(OTHER_FEATURES).map(one => (
                      <Grid item xs={6} key={one}>
                        <Stack direction={'row'} spacing={2}>
                          <Checkbox />
                          <Typography variant={'body1'} style={{ marginTop: 10 }}>
                            {one}
                          </Typography>
                        </Stack>
                      </Grid>
                    ))
                  }
                </Grid>
              </Grid>


            </Grid>

          </SectionAccordion>

          <SectionAccordion title={'Batiment'} hideShadow>
            <Grid container spacing={1}>
              {
                values(BUILDING_TYPE).map(one => (
                  <Grid item xs={6} key={one}>
                    <Stack direction={'row'} spacing={2}>
                      <Checkbox />
                      <Typography variant={'body1'} style={{ marginTop: 10 }}>
                        {one}
                      </Typography>
                    </Stack>
                  </Grid>
                ))
              }
            </Grid>
          </SectionAccordion>

          <SectionAccordion title={'Plex'} hideShadow>
            <Grid container spacing={1}>
              {
                values(PLEX_TYPE).map(one => (
                  <Grid item xs={6} key={one}>
                    <Stack direction={'row'} spacing={2}>
                      <Checkbox />
                      <Typography variant={'body1'} style={{ marginTop: 10 }}>
                        {one}
                      </Typography>
                    </Stack>
                  </Grid>
                ))
              }
            </Grid>
          </SectionAccordion>

          <SectionAccordion title={'Autres critères'} hideShadow>

            <Grid container spacing={2}>

              <Grid item xs={12}>
                <Grid container spacing={1}>

                  <Grid item xs={12}>
                    <Typography variant={'subtitle2'}>
                      Superficie du terrain
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label={'Min'}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label={'Max'}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type={'date'}
                  label={'Nouveau depuis'}
                />
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {
                    values(OTHER_CRITERION).map(one => (
                      <Grid item xs={6} key={one}>
                        <Stack direction={'row'} spacing={2}>
                          <Checkbox />
                          <Typography variant={'body1'} style={{ marginTop: 10 }}>
                            {one}
                          </Typography>
                        </Stack>
                      </Grid>
                    ))
                  }
                </Grid>
              </Grid>

            </Grid>


          </SectionAccordion>

          <Button variant={'contained'}>
            Réinitialiser
          </Button>

        </RootStyle>

      </Popover>
    </>
  );
}