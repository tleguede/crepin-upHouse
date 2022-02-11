// material
import { styled } from '@material-ui/core/styles';
import {
  Grid,
  Tabs,
  Tab,
  Container,
  Stack,
  TextField,
  MenuItem, Button
} from '@material-ui/core';
//
import { Apartment, Home } from '@material-ui/icons';
import LandingSearchFilterPriceBox from './LandingSearchFilterPriceBox';
import SearchIcon from '@material-ui/icons/Search';
import LandingSearchFilterTypes from './LandingSearchFilterTypes';
import { useFormik } from 'formik';
import {
  AREA_UNIT,
  REAL_ESTATE_CATEGORY,
  TRANSACTION_TYPE
} from '../../../../constant';

import { values as _values } from 'lodash';
import { useDispatch } from 'react-redux';
import { searchRealEstate } from '../../../../redux/slices/realEstate.thunks';

// ----------------------------------------------------------------------


const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15)
  }
}));


// ----------------------------------------------------------------------

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

export default function LandingSearchFilter() {

  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      zone: '',
      category: REAL_ESTATE_CATEGORY.RESIDENTIAL,
      type: [],
      transactionType: TRANSACTION_TYPE.RENT,
      cost: 0,
      costRange: { min: 0, max: 0 },
      area: 0,
      areaUnit: AREA_UNIT.MC,

      areaRange: { min: 0, max: 0 },

      //residential
      _numberOfRoom: '',
      _numberOfBathRoom: '',
      _numberOfParking: '',
      _numberOfHangar: '',
      _residentialOtherFeature: [],
      _building: [],
      _plexType: null,
      _residentialOtherCriterion: [],


      //commercial
      _featureType: null,
      _buildingOtherCriterion: []


    }
  });

  const {
    values, touched, errors, getFieldProps,
    setFieldValue
  } = formik;



  const handleApply = () => {

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
      _featureType, ..._buildingOtherCriterion, values?.type
    ].filter(one => one !== null && one !== '' && one !== undefined);

    const data = {
      ...rest,
      searchHelper,
      features: {
        numberOfRoom: _numberOfRoom === '' ? null : _numberOfRoom,
        numberOfBathRoom: _numberOfBathRoom === '' ? null : _numberOfBathRoom,
        numberOfHangar: _numberOfHangar === '' ? null : _numberOfHangar,
        numberOfParking: _numberOfParking === '' ? null : _numberOfParking,
        otherFeature: _residentialOtherFeature,
        building: _building,
        plexType: _plexType === '' ? null : _plexType,
        otherCriterion: _residentialOtherCriterion,
        featureType: _featureType === '' ? null : _featureType,
        buildingOtherCriterion: _buildingOtherCriterion
      }
    };


    console.log(data);

    dispatch(searchRealEstate(data));


  };

  return (
    <RootStyle>
      <Container maxWidth='lg'>


        <Stack direction={'column'} spacing={1}>

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

          <Grid container spacing={2}>

            <Grid item xs={3}>
              <TextField
                fullWidth
                label={'Rechercher par ville, quartier ...'}
                error={Boolean(touched.zone && errors.zone)}
                helperText={touched.zone && errors.zone}
                {...getFieldProps('zone')}
              />
            </Grid>

            <Grid item xs={2}>
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

            <Grid item xs={2}>
              <LandingSearchFilterPriceBox
                range={values.costRange}
                onChange={change => setFieldValue('costRange', change)}
              />
            </Grid>

            <Grid item xs={2}>
              <LandingSearchFilterTypes
                formik={formik}
              />
            </Grid>

            <Grid item xs={2}>
              <Button
                fullWidth
                variant={'outlined'}
                endIcon={<SearchIcon />}
                onClick={handleApply}
                style={{ height: 55, color: 'grey', borderColor: 'grey' }}
              >
                Appliquer
              </Button>
            </Grid>

          </Grid>

        </Stack>


      </Container>
    </RootStyle>
  );
}
