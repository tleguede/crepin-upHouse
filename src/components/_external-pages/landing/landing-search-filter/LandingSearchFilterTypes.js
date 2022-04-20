import { useMemo, useRef } from 'react';
import {
  Button, Checkbox,
  Collapse,
  IconButton,
  Popover,
  Stack, Typography

} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import useToggle from '../../../../hooks/useToggle';
import {
  COMMERCIAL_TYPE,
  REAL_ESTATE_CATEGORY, RESIDENCE_TYPE
} from '../../../../constant';
import { Close } from '@material-ui/icons';
import ResidentialSection from './ResidentialSection';
import CommercialSection from './CommercialSection';
import { SectionAccordion } from '../../../SectionAccordion';
import { values as _values,keys } from 'lodash';



const RootStyle = styled('div')(() => ({
  margin: 20,
  width:450
}));

export default function LandingSearchFilterTypes({ formik, onChange }) {
  const ref = useRef();
  const { open, handleOpen, handleClose } = useToggle();
  const {
    values,resetForm,
    setFieldValue,
  } = formik;


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

  const handleResetSection = ()=>{
    const toSaveKeys = keys(values).filter(one=>one.includes('_'));
    let data ={};

    for (const key of toSaveKeys) {
      data[key]= values[key];
    }

    resetForm();
    for (const key in data) {
      setFieldValue(key,data[key])
    }

  }

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
          vertical: 'top',
          horizontal: 'left'
        }}
      >

        <RootStyle>
          <Stack direction={'row'} justifyContent={'end'}>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Stack>

          <Stack direction={'row'} spacing={2}>
            <SectionAccordion defaultExpanded={false} hideShadow title={'Type de propriété'}>
              {
                typeOptions.map(one => (
                  <Stack direction={'row'} key={one} >
                    <Checkbox
                      checked={values.type.includes(one)}
                      onChange={(event, checked) => handleListChange('type',one,checked)}
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

          <Button variant={'contained'} onClick={handleResetSection}>
            Réinitialiser
          </Button>

        </RootStyle>

      </Popover>
    </>
  );
}