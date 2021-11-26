import {
  Checkbox, Collapse, Grid,
  Radio, Stack, TextField, Typography
} from '@material-ui/core';
import { values as _values } from 'lodash';
import {
  ACCOMMODATION_TYPE, AGRICULTURAL_TYPE,
   BUSINESS_TYPE, COMMERCIAL_BUILDING_OTHER, COMMERCIAL_TYPE, LAND_TYPE,
   OTHER_CRITERION,
} from '../../../constant';
import { equalsEither } from '../../../utils/type_check';
import { useMemo } from 'react';

export default function CommercialSection({ formik, handleListChange }) {

  const {
    values,
    errors,
    touched,
    getFieldProps,
    setFieldValue
  } = formik;

  const openFeatureBox = useMemo(() => {
    return equalsEither(values.type, [
      COMMERCIAL_TYPE.BUSINESS,
      COMMERCIAL_TYPE.ACCOMMODATION,
      COMMERCIAL_TYPE.LAND,
      COMMERCIAL_TYPE.AGRICULTURAL
    ]);
  }, [values.type]);

  const openBuildingBox = useMemo(() => {
    return !equalsEither(values.type, [
      COMMERCIAL_TYPE.BUSINESS,
      COMMERCIAL_TYPE.LAND,
    ]);
  }, [values.type]);

  const openAreaBox = useMemo(() => {
    return !equalsEither(values.type, [
      COMMERCIAL_TYPE.ACCOMMODATION,
      COMMERCIAL_TYPE.AGRICULTURAL,
    ]);
  }, [values.type]);

  const openCriterionAreaBox = useMemo(() => {
    return equalsEither(values.type, [
      COMMERCIAL_TYPE.MULTI_FAMILIAL,
      COMMERCIAL_TYPE.ACCOMMODATION,
      COMMERCIAL_TYPE.BUSINESS,
    ]);
  }, [values.type]);

  return (
    <Stack direction={'column'} spacing={2}>

      <Collapse in={openFeatureBox}>

        <Stack direction={'column'} spacing={1}>
          <Typography variant={'subtitle1'}>
            Caractéristiques
          </Typography>

          <Grid container spacing={1}>

            <Collapse in={values.type === COMMERCIAL_TYPE.ACCOMMODATION}>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {
                    _values(ACCOMMODATION_TYPE).map(one => (
                      <Grid item xs={6} key={one}>
                        <Stack direction={'row'} spacing={2}>
                          <Radio
                            checked={values._featureType===one}
                            onChange={(event, checked) => {
                              setFieldValue('_featureType', values._featureType === one ? null : one);
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
            </Collapse>

            <Collapse in={values.type === COMMERCIAL_TYPE.LAND}>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {
                    _values(LAND_TYPE).map(one => (
                      <Grid item xs={6} key={one}>
                        <Stack direction={'row'} spacing={2}>
                          <Radio
                            checked={values._featureType===one}
                            onChange={(event, checked) => {
                              setFieldValue('_featureType', values._featureType === one ? null : one);
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
            </Collapse>

            <Collapse in={values.type === COMMERCIAL_TYPE.AGRICULTURAL}>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {
                    _values(AGRICULTURAL_TYPE).map(one => (
                      <Grid item xs={6} key={one}>
                        <Stack direction={'row'} spacing={2}>
                          <Radio
                            checked={values._featureType===one}
                            onChange={(event, checked) => {
                              setFieldValue('_featureType', values._featureType === one ? null : one);
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
            </Collapse>

            <Collapse in={values.type === COMMERCIAL_TYPE.BUSINESS}>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {
                    _values(BUSINESS_TYPE).map(one => (
                      <Grid item xs={6} key={one}>
                        <Stack direction={'row'} spacing={2}>
                          <Radio
                            checked={values._featureType===one}
                            onChange={(event, checked) => {
                              setFieldValue('_featureType', values._featureType === one ? null : one);
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
            </Collapse>

          </Grid>

        </Stack>
      </Collapse>


      <Collapse in={openBuildingBox}>
        <Stack direction={'column'} spacing={1}>
          <Typography variant={'subtitle1'}>
            Bâtiment
          </Typography>

          <Collapse in={openAreaBox}>
          <Grid item xs={12}>
            <Grid container spacing={1}>

              <Grid item xs={12}>
                <Typography variant={'body1'}>
                  Superficie commerciale disponible
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label={'Min'}
                  type={'number'}
                  error={Boolean(touched._commercialAreaMin && errors._commercialAreaMin)}
                  helperText={touched._commercialAreaMin && errors._commercialAreaMin}
                  {...getFieldProps('_commercialAreaMin')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label={'Max'}
                  error={Boolean(touched._commercialAreaMax && errors._commercialAreaMax)}
                  helperText={touched._commercialAreaMax && errors._commercialAreaMax}
                  {...getFieldProps('_commercialAreaMax')}
                />
              </Grid>
            </Grid>
          </Grid>
          </Collapse>

          <Grid container spacing={1}>
            {
              _values(COMMERCIAL_BUILDING_OTHER).map(one => (
                <Grid item xs={6} key={one}>
                  <Stack direction={'row'} spacing={2}>
                    <Checkbox
                      checked={values._buildingOtherCriterion.includes(one)}
                      onChange={(event, checked) => {
                        handleListChange('_buildingOtherCriterion', one, checked);
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
        </Stack>
      </Collapse>

      <Typography variant={'subtitle1'}>
        Autres critères
      </Typography>

      <Grid container spacing={2}>

        <Collapse in={openCriterionAreaBox}>
          <Grid item xs={12}>
            <Grid container spacing={1}>

              <Grid item xs={12}>
                <Typography variant={'body1'}>
                  Superficie
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

        </Collapse>


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