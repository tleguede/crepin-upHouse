import {
  Container, MenuItem, Stack, TextField,
  Box, Collapse, Grid, Typography
} from '@material-ui/core';
import { UploadMultiFile } from '../../upload';
import { LoadingButton } from '@material-ui/lab';
import { values as _values, uniqBy, isEqual } from 'lodash';
import {
  COMMERCIAL_TYPE, PAYMENT_RHYTHM,
  REAL_ESTATE_CATEGORY, REAL_ESTATE_STATE,
  RESIDENCE_TYPE
} from '../../../constant';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

import { useCallback, useMemo } from 'react';
import ResidentialSection from './ResidentialSection';
import CommercialSection from './CommercialSection';

export default function Publish({ selected }) {

  const isEdit = Boolean(selected);

  const schema = Yup.object().shape({
    name: Yup.string().required('Le nom est requis')

  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {

      name: selected?.name || '',
      description: selected?.description || '',
      category: selected?.category || REAL_ESTATE_CATEGORY.RESIDENTIAL,
      type: selected?.type || RESIDENCE_TYPE.SINGLE_FAMILY_HOME,
      files: selected?.files || [],
      cost: selected?.cost || 0,
      paymentRhythm: selected?.paymentRhythm || PAYMENT_RHYTHM.PER_MONTH,

      _areaMax: selected?.area?.max || 0,
      _areaMin: selected?.area?.min || 0,


      //residential
      _numberOfRoom: selected?.features?.numberOfRoom || '',
      _numberOfBathRoom: selected?.features?.numberOfBathRoom || '',
      _numberOfParking: selected?.features?.numberOfParking || '',
      _numberOfHangar: selected?.features?.numberOfHangar || '',
      _residentialOtherFeature: selected?.features?.otherFeature || [],
      _building: selected?.features?.building || [],
      _plexType: selected?.features?.plexType || null,
      _residentialOtherCriterion: selected?.features?.otherCriterion || [],


      //commercial
      _featureType: selected?.features?.featureType || null,
      _commercialAreaMax: selected?.features?.commercialArea?.max || 0,
      _commercialAreaMin: selected?.features?.commercialArea?.min || 0,
      _buildingOtherCriterion: selected?.features?.buildingOtherCriterion || []


    },
    validationSchema: schema,

    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {

      const {
        files,
        _areaMax,
        _areaMin,

        _numberOfRoom,
        _numberOfBathRoom,
        _numberOfParking,
        _numberOfHangar,
        _residentialOtherFeature,
        _building,
        _plexType,
        _residentialOtherCriterion,

        _featureType,
        _commercialAreaMax,
        _commercialAreaMin,
        _buildingOtherCriterion,

        ...rest
      } = values;


      const searchHelper = [
        _numberOfRoom, _numberOfBathRoom, _numberOfParking, _numberOfHangar,
        ..._residentialOtherFeature, ..._building, _plexType, ..._residentialOtherCriterion,
        _featureType, ..._buildingOtherCriterion
      ].filter(one => one !== null && one !== '' && one !== undefined);

      const residential = {
        ...rest,
        searchHelper,
        area: {
          max: _areaMax,
          min: _areaMin
        },
        features: {
          numberOfRoom: _numberOfRoom === '' ? null : _numberOfRoom,
          numberOfBathRoom: _numberOfBathRoom === '' ? null : _numberOfBathRoom,
          numberOfHangar: _numberOfHangar === '' ? null : _numberOfHangar,
          otherFeature: _residentialOtherFeature,
          building: _building,
          plexType: _plexType === '' ? null : _plexType,
          otherCriterion: _residentialOtherCriterion
        }
      };

      const commercial = {
        ...rest,
        searchHelper,
        area: {
          max: _areaMax,
          min: _areaMin
        },
        features: {
          featureType: _featureType === '' ? null : _featureType,
          buildingOtherCriterion: _buildingOtherCriterion,
          commercialArea: {
            max: _commercialAreaMax,
            min: _commercialAreaMin
          }
        }
      };

      let data =(values.category === REAL_ESTATE_CATEGORY.RESIDENTIAL)
        ? residential
        : commercial;

      if(!isEdit){
        data = {
          ...data,
          state:REAL_ESTATE_STATE.WAITING_FOR_VALIDATION,
          createdAt: new Date()
        }
      }
      else {
        data = {
          ...selected,
          ...data
        }
      }

      console.log(data);

    }
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue
  } = formik;

  //#region dropzone
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.files || [];
      setFieldValue('files', uniqBy([...files, ...acceptedFiles], 'name'));
    },
    [setFieldValue, values.files]
  );

  const handleRemove = useCallback((file) => {
    setFieldValue('files', values.files.filter(one => !isEqual(one, file)));
  }, [setFieldValue, values.files]);

  const handleRemoveAll = useCallback((val) => {
    setFieldValue('files', []);
  }, [setFieldValue]);

  //#endregion

  const handleCategoryChange = (change) => {
    setFieldValue('category', change);
    switch (change) {
      case REAL_ESTATE_CATEGORY.RESIDENTIAL:
        setFieldValue('type', RESIDENCE_TYPE.SINGLE_FAMILY_HOME);
        break;

      case REAL_ESTATE_CATEGORY.COMMERCIAL:
        setFieldValue('type', COMMERCIAL_TYPE.MULTI_FAMILIAL);
        break;

      default  :
        setFieldValue('type', RESIDENCE_TYPE.SINGLE_FAMILY_HOME);

    }
  };

  const handleTypeChange = (change) => {
    setFieldValue('type', change);

    if (values.type !== RESIDENCE_TYPE.PLEX)
      setFieldValue('_plexType', null);

    setFieldValue('_featureType', null);
    setFieldValue('_commercialAreaMax', 0);
    setFieldValue('_commercialAreaMin', 0);
    setFieldValue('_areaMax', 0);
    setFieldValue('_areaMin', 0);
  };

  //#region residential
  const typeOptions = useMemo(() => {
    switch (values.category) {

      case REAL_ESTATE_CATEGORY.RESIDENTIAL:
        return _values(RESIDENCE_TYPE);

      case REAL_ESTATE_CATEGORY.COMMERCIAL:
        return _values(COMMERCIAL_TYPE);

      default  :
        return _values(RESIDENCE_TYPE);

    }
  }, [values.category]);

  const openResidentialFeature = useMemo(() => {
    return values.category === REAL_ESTATE_CATEGORY.RESIDENTIAL;
  }, [values.category]);

  const handleListChange = (key, value, shouldAdd) => {
    if (shouldAdd)
      setFieldValue(key, [...values[key], value]);
    else
      setFieldValue(key, values[key].filter(one => one !== value));
  };

  //#endregion
  // console.log(values);


  return (
    <FormikProvider value={formik}>
      <Box sx={{ mb: 5 }} />
      <Form autoComplete='off' noValidate autoCapitalize='on' onSubmit={handleSubmit}>

        <Container maxWidth={'md'} style={{ marginBottom: 50 }}>
          <Stack direction={'column'} spacing={2}>

            <TextField
              label={'Nom du bien'}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              {...getFieldProps('name')}
            />

            <TextField
              select
              label={'Categorie'}
              error={Boolean(touched.category && errors.category)}
              helperText={touched.category && errors.category}
              {...getFieldProps('category')}
              onChange={event => handleCategoryChange(event.target.value)}
            >
              {
                _values(REAL_ESTATE_CATEGORY).map(one => (
                  <MenuItem key={one} value={one}>
                    {one}
                  </MenuItem>
                ))
              }
            </TextField>

            <TextField
              select
              label={'Type de propriete'}
              error={Boolean(touched.type && errors.type)}
              helperText={touched.type && errors.type}
              {...getFieldProps('type')}
              onChange={event => handleTypeChange(event.target.value)}
            >
              {
                typeOptions.map(one => (
                  <MenuItem key={one} value={one}>
                    {one}
                  </MenuItem>
                ))
              }
            </TextField>

            <Typography variant={'subtitle1'}>
              Paiements
            </Typography>

            <Grid container spacing={2}>

              <Grid item xs={12} md={6}>
                <TextField
                  label={'Coût'}
                  type={'number'}
                  fullWidth
                  error={Boolean(touched.cost && errors.cost)}
                  helperText={touched.cost && errors.cost}
                  {...getFieldProps('cost')}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label={'Rythme de paiement'}
                  type={'number'}
                  fullWidth
                  error={Boolean(touched.paymentRhythm && errors.paymentRhythm)}
                  helperText={touched.paymentRhythm && errors.paymentRhythm}
                  {...getFieldProps('paymentRhythm')}
                >
                  {
                    _values(PAYMENT_RHYTHM).map(one => (
                      <MenuItem key={one} value={one}>
                        {one}
                      </MenuItem>
                    ))
                  }
                </TextField>
              </Grid>

            </Grid>


            <Collapse in={openResidentialFeature}>
              <ResidentialSection formik={formik} handleListChange={handleListChange} />
            </Collapse>


            <Collapse in={!openResidentialFeature}>
              <CommercialSection formik={formik} handleListChange={handleListChange} />
            </Collapse>

            <TextField
              label={'Description'}
              multiline
              minRows={10}
              error={Boolean(touched.description && errors.description)}
              helperText={touched.description && errors.description}
              {...getFieldProps('description')}
            />


            <UploadMultiFile
              files={values.files}
              accept='image/*'
              showPreview
              onDrop={handleDrop}
              onRemove={handleRemove}
              onRemoveAll={handleRemoveAll}
            />

            <LoadingButton type={'submit'} variant={'contained'} style={{ width: 200 }}>
              Créer
            </LoadingButton>

          </Stack>

        </Container>

      </Form>
    </FormikProvider>

  );
}