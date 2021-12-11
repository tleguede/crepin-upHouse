import { useRef } from 'react';
import { Button, Grid, Popover, TextField } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import useToggle from '../../../../hooks/useToggle';
import { isFunction } from 'lodash';


const RootStyle = styled('div')(() => ({
  margin: 20,
  width:400
}));

export default function LandingSearchFilterPriceBox({ range, onChange }) {
  const ref = useRef();
  const { open, handleOpen, handleClose } = useToggle();

  const handleChange = (change) =>
    (change.min >= 0 || change.max >= 0)
    && isFunction(onChange) && onChange({min: Number(change.min), max:Number(change.max)});

  return (
    <>
      <Button
        fullWidth
        ref={ref}
        variant={'outlined'}
        endIcon={<AttachMoneyIcon />}
        onClick={handleOpen}
        style={{ height: 55, color: 'grey', borderColor: 'grey' }}
      >
        Prix
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
                label={'Maximun'}
                value={range.max}
                onChange={({target:{value}})=> {
                  handleChange({ ...range, max: value });
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant={'contained'} style={{width:200}} onClick={()=>handleChange({min:0,max:0})}>
                Réinitialiser
              </Button>
            </Grid>

          </Grid>


        </RootStyle>

      </Popover>
    </>
  );
}