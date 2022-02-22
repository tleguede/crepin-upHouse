import { createContext, useState } from 'react';
import useToggle from '../hooks/useToggle';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { AREA_UNIT, REAL_ESTATE_CATEGORY, TRANSACTION_TYPE } from '../constant';
import { searchRealEstate } from '../redux/slices/realEstate.thunks';
import { isString, isEmpty } from 'lodash';

export const LandingSearchContext = createContext(null);

export default function LandingSearchProvider({ children }) {
  const [helper, setHelper] = useState([]);
  const { open, handleClose, handleOpen } = useToggle();

  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      zone: null,
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

  const { values, resetForm } = formik;

  const apply = () => {
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

    const { zone, category, type, costRange, areaRange, areaUnit } = values;

    const searchHelper = [
      _numberOfRoom, _numberOfBathRoom, _numberOfParking, _numberOfHangar,
      ..._residentialOtherFeature, ..._building, _plexType, ..._residentialOtherCriterion,
      _featureType, ..._buildingOtherCriterion, values?.type,
      category, ...type
    ].filter(one => isString(one));

    let copy = [];

    if (!isEmpty(zone)) {
      copy = [...copy, `À ${zone}`];
    }

    if (costRange?.min !== 0 || costRange?.max !== 0) {
      copy = [...copy, `Prix entre ${costRange?.min} - ${costRange?.max}`];
    }

    if (areaRange?.min !== 0 || areaRange?.max !== 0) {
      copy = [...copy, `Superficie entre ${areaRange?.min} - ${areaRange?.max} ${areaUnit}`];
    }

    copy = [...copy, ...searchHelper]?.filter(one => !isEmpty(one));


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


    console.group('Search');
    console.log(data);
    console.log(copy);
    console.groupEnd();

    setHelper(copy);

    dispatch(searchRealEstate(data));

    handleClose();
  };

  const reset = () => {
    resetForm();
    setHelper([]);
    dispatch(searchRealEstate({}));
  };

  return (
    <LandingSearchContext.Provider value={{
      isDrawerOpen: open,
      closeDrawer: handleClose,
      showDrawer: handleOpen,
      apply, reset,
      formik,
      helper
    }}>
      {children}
    </LandingSearchContext.Provider>
  );
}
