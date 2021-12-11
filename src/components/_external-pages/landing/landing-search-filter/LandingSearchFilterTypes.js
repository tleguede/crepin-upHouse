import { useMemo, useRef } from 'react';
import {
  Button,
  Collapse,
  IconButton,
  Popover,
  Stack,

} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import useToggle from '../../../../hooks/useToggle';
import {
  REAL_ESTATE_CATEGORY,
} from '../../../../constant';
import { Close } from '@material-ui/icons';
import ResidentialSection from './ResidentialSection';
import CommercialSection from './CommercialSection';



const RootStyle = styled('div')(() => ({
  margin: 20,
  width:450
}));

export default function LandingSearchFilterTypes({ formik, onChange }) {
  const ref = useRef();
  const { open, handleOpen, handleClose } = useToggle();
  const {
    values,

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

          <Collapse in={openResidentialFeature}>
            <ResidentialSection formik={formik} handleListChange={handleListChange} />
          </Collapse>


          <Collapse in={!openResidentialFeature}>
            <CommercialSection formik={formik} handleListChange={handleListChange} />
          </Collapse>

          <Button variant={'contained'}>
            Réinitialiser
          </Button>

        </RootStyle>

      </Popover>
    </>
  );
}