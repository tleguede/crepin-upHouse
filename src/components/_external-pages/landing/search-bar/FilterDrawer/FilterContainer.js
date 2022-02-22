import { Typography, Grid, MenuItem, Stack, Tab, Tabs, TextField, Checkbox, Collapse } from '@material-ui/core';
import useLandingSearch from '../../../../../hooks/useLandingSearch';
import { Apartment, Home } from '@material-ui/icons';
import { COMMERCIAL_TYPE, REAL_ESTATE_CATEGORY, RESIDENCE_TYPE, TRANSACTION_TYPE } from '../../../../../constant';
import { values as _values } from 'lodash';
import { SectionAccordion } from '../../../../SectionAccordion';
import ResidentialSection from '../../landing-search-filter/ResidentialSection';
import CommercialSection from '../../landing-search-filter/CommercialSection';
import { useMemo } from 'react';
import ZonePicker from '../../../../_dashboard/zones/ZonePicker';

const TABS = [
  {
    icon: <Home />,
    value: REAL_ESTATE_CATEGORY.RESIDENTIAL
  },
  {
    icon: <Apartment />,
    value: REAL_ESTATE_CATEGORY.COMMERCIAL
  }
];

export default function FilterContainer() {
  const { formik } = useLandingSearch();

  const { values, setFieldValue, touched, errors, getFieldProps } = formik;


  const handleListChange = (key, value, shouldAdd) => {
    if (shouldAdd)
      setFieldValue(key, [...values[key], value]);
    else
      setFieldValue(key, values[key].filter(one => one !== value));
  };

  const openResidentialFeature = useMemo(() => {
    return values.category === REAL_ESTATE_CATEGORY.RESIDENTIAL;
  }, [values.category]);

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

  return (
    <Stack direction={'column'} spacing={1} sx={{ width: { sm: '73vw', xs: '73vw', md: '28vw' } }}>

      <Tabs
        value={values.category}
        scrollButtons='auto'
        variant='scrollable'
        allowScrollButtonsMobile
        style={{ marginLeft: 20 }}
        onChange={(_, tabName) => setFieldValue('category', tabName)}
      >
        {
          TABS.map(tab => (
            <Tab
              key={tab.value}
              label={tab.value}
              icon={tab.icon}
              value={tab.value}
            />
          ))
        }
      </Tabs>


      {/**/}
      <Grid container spacing={1}>

        <Grid item md={4} sm={12} xs={12}>
          <TextField
            select
            fullWidth
            error={Boolean(touched.transactionType && errors.transactionType)}
            helperText={touched.transactionType && errors.transactionType}
            {...getFieldProps('transactionType')}
          >
            {
              _values(TRANSACTION_TYPE).map(one => (
                <MenuItem key={one} value={one}>
                  {one}
                </MenuItem>
              ))
            }
          </TextField>
        </Grid>

        <Grid item md={6} sm={12} xs={12}>
          <ZonePicker
            selected={values.zone}
            onPick={zone => setFieldValue('zone', zone)}
            error={touched.zone && errors.zone}
          />
        </Grid>

      </Grid>

      {/*Pricing*/}
      <Grid container spacing={1}>

        <Grid item xs={12}>
          <Typography>
            Prix
          </Typography>
        </Grid>

        <Grid item xs={5}>
          <TextField
            fullWidth
            type={'number'}
            label={'Minimum'}
            value={values.costRange.min}
            onChange={({ target: { value } }) => {
              setFieldValue('costRange', { ...values.costRange, min: value });

            }}
          />
        </Grid>

        <Grid item xs={5}>
          <TextField
            fullWidth
            type={'number'}
            label={'Maximun'}
            value={values.costRange.max}
            onChange={({ target: { value } }) => {
              setFieldValue('costRange', { ...values.costRange, max: value });
            }}
          />
        </Grid>


      </Grid>


      <Stack direction={'column'} spacing={2}>
        <SectionAccordion defaultExpanded={false} hideShadow title={'Type de propriété'}>
          {
            typeOptions.map(one => (
              <Stack direction={'row'} key={one}>
                <Checkbox
                  checked={values.type.includes(one)}
                  onChange={(event, checked) => handleListChange('type', one, checked)}
                />

                <Typography variant={'body1'}>
                  {one}
                </Typography>
              </Stack>

            ))
          }
        </SectionAccordion>
      </Stack>

      <Collapse in={openResidentialFeature}>
        <ResidentialSection formik={formik} handleListChange={handleListChange} />
      </Collapse>


      <Collapse in={!openResidentialFeature}>
        <CommercialSection formik={formik} handleListChange={handleListChange} />
      </Collapse>


    </Stack>
  );
}
