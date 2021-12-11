import {
  Checkbox, Collapse, Grid, MenuItem,
  Radio, Stack, TextField, Typography
} from '@material-ui/core';
import { values as _values } from 'lodash';
import {
  AREA_UNIT,
  BUILDING_TYPE,
  NUMBER_OF_BATHROOM,
  NUMBER_OF_HANGAR,
  NUMBER_OF_PARKING,
  NUMBER_OF_ROOM, OTHER_CRITERION,
  OTHER_FEATURES, PLEX_TYPE, RESIDENCE_TYPE
} from 'src/constant';
import { SectionAccordion } from '../../../SectionAccordion';

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

      <SectionAccordion defaultExpanded={false}  hideShadow title={'Caractéristiques'}>
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
      </SectionAccordion>

      <SectionAccordion defaultExpanded={false}  hideShadow title={'Bâtiment'}>
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
      </SectionAccordion>


      <Collapse in={values.type === RESIDENCE_TYPE.PLEX}>
        <SectionAccordion defaultExpanded={false}  hideShadow title={'Plex'}>
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
        </SectionAccordion>
      </Collapse>

      <SectionAccordion defaultExpanded={false}  hideShadow title={'Autres critères'}>
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
                  label={'digit'}
                  type={'number'}
                  error={Boolean(touched.area && errors.area)}
                  helperText={touched.area && errors.area}
                  {...getFieldProps('area')}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  select
                  label={'unit'}
                  error={Boolean(touched.areaUnit && errors.areaUnit)}
                  helperText={touched.areaUnit && errors.areaUnit}
                  {...getFieldProps('areaUnit')}
                >
                  {
                    _values(AREA_UNIT).map(one => (
                      <MenuItem key={one} value={one}>
                        {one}
                      </MenuItem>
                    ))
                  }
                </TextField>
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
      </SectionAccordion>

    </Stack>
  );
}