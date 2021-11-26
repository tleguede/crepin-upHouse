import {
  Checkbox, Collapse, Grid, MenuItem,
  Radio, Stack, TextField, Typography
} from '@material-ui/core';
import { values as _values } from 'lodash';
import {
  BUILDING_TYPE,
  NUMBER_OF_BATHROOM,
  NUMBER_OF_HANGAR,
  NUMBER_OF_PARKING,
  NUMBER_OF_ROOM, OTHER_CRITERION,
  OTHER_FEATURES, PLEX_TYPE, RESIDENCE_TYPE
} from '../../../constant';

export default function ResidentialSection({ formik, handleListChange }) {

  const {
    values,
    errors,
    touched,
    getFieldProps,
    setFieldValue
  } = formik;

  return (
    <Stack direction={'column'} spacing={2}>
      <Typography variant={'subtitle1'}>
        Caractéristiques
      </Typography>

      <Grid container spacing={1}>

        <Grid item xs={6}>
          <TextField
            fullWidth
            select
            label={'Nombre de chambres'}
            error={Boolean(touched._numberOfRoom && errors._numberOfRoom)}
            helperText={touched._numberOfRoom && errors._numberOfRoom}
            {...getFieldProps('_numberOfRoom')}
          >

            <MenuItem value={''}>
              Aucune
            </MenuItem>

            {
              _values(NUMBER_OF_ROOM).map(one => (
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
            error={Boolean(touched._numberOfBathRoom && errors._numberOfBathRoom)}
            helperText={touched._numberOfBathRoom && errors._numberOfBathRoom}
            {...getFieldProps('_numberOfBathRoom')}
          >

            <MenuItem value={''}>
              Aucune
            </MenuItem>

            {
              _values(NUMBER_OF_BATHROOM).map(one => (
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
            error={Boolean(touched._numberOfParking && errors._numberOfParking)}
            helperText={touched._numberOfParking && errors._numberOfParking}
            {...getFieldProps('_numberOfParking')}
          >

            <MenuItem value={''}>
              Aucune
            </MenuItem>

            {
              _values(NUMBER_OF_PARKING).map(one => (
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
            error={Boolean(touched._numberOfHangar && errors._numberOfHangar)}
            helperText={touched._numberOfHangar && errors._numberOfHangar}
            {...getFieldProps('_numberOfHangar')}
          >

            <MenuItem value={''}>
              Aucune
            </MenuItem>

            {
              _values(NUMBER_OF_HANGAR).map(one => (
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
              _values(OTHER_FEATURES).map(one => (
                <Grid item xs={6} key={one}>
                  <Stack direction={'row'} spacing={2}>
                    <Checkbox
                      checked={values._residentialOtherFeature.includes(one)}
                      onChange={(event, checked) => {
                        handleListChange('_residentialOtherFeature', one, checked);
                      }}
                    />
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

      <Typography variant={'subtitle1'}>
        Bâtiment
      </Typography>

      <Grid container spacing={1}>
        {
          _values(BUILDING_TYPE).map(one => (
            <Grid item xs={6} key={one}>
              <Stack direction={'row'} spacing={2}>
                <Checkbox
                  checked={values._building.includes(one)}
                  onChange={(event, checked) => {
                    handleListChange('_building', one, checked);
                  }}
                />
                <Typography variant={'body1'} style={{ marginTop: 10 }}>
                  {one}
                </Typography>
              </Stack>
            </Grid>
          ))
        }
      </Grid>


      <Collapse in={values.type === RESIDENCE_TYPE.PLEX}>
        <Typography variant={'subtitle1'}>
          Plex
        </Typography>

        <Grid container spacing={1}>
          {
            _values(PLEX_TYPE).map(one => (
              <Grid item xs={6} key={one}>
                <Stack direction={'row'} spacing={2}>
                  <Radio
                    checked={values._plexType === one}
                    onChange={(event, checked) => {
                      setFieldValue('_plexType', values._plexType === one ? null : one);
                    }}
                  />
                  <Typography variant={'body1'} style={{ marginTop: 10 }}>
                    {one}
                  </Typography>
                </Stack>
              </Grid>
            ))
          }
        </Grid>
      </Collapse>

      <Typography variant={'subtitle1'}>
        Autres critères
      </Typography>

      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Grid container spacing={1}>

            <Grid item xs={12}>
              <Typography variant={'body1'}>
                Superficie du terrain
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label={'Min'}
                type={'number'}
                error={Boolean(touched._areaMin && errors._areaMin)}
                helperText={touched._areaMin && errors._areaMin}
                {...getFieldProps('_areaMin')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={'Max'}
                error={Boolean(touched._areaMax && errors._areaMax)}
                helperText={touched._areaMax && errors._areaMax}
                {...getFieldProps('_areaMax')}
              />
            </Grid>
          </Grid>
        </Grid>


        <Grid item xs={12}>
          <Grid container spacing={1}>
            {
              _values(OTHER_CRITERION).map(one => (
                <Grid item xs={6} key={one}>
                  <Stack direction={'row'} spacing={2}>
                    <Checkbox
                      checked={values._residentialOtherCriterion.includes(one)}
                      onChange={(event, checked) => {
                        handleListChange('_residentialOtherCriterion', one, checked);
                      }}
                    />
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
    </Stack>
  );
}