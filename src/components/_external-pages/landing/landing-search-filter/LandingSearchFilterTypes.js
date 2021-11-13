import { useRef } from 'react';
import { Button, Grid, Popover, TextField } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import useToggle from '../../../../hooks/useToggle';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';


const RootStyle = styled('div')(() => ({
  margin: 20
}));

LandingSearchFilterTypes.propTypes = {
  range: PropTypes.objectOf(PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
  })).isRequired,
  onChange: PropTypes.func
};

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

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type={'number'}
                label={'Minimum'}
                value={range.min}
                onChange={({target:{value}})=> {
                  handleChange({ ...range, min: value });
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                type={'number'}
                label={'Minimum'}
                value={range.max}
                onChange={({target:{value}})=> {
                  handleChange({ ...range, max: value });
                }}
              />
            </Grid>

          </Grid>


        </RootStyle>

      </Popover>
    </>
  );
}