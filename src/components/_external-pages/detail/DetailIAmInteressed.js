import { Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useDispatch } from '../../../redux/store';
import { requestCall } from '../../../redux/slices/callRequest.thunks';
import { useSnackbar } from 'notistack5';

export default function DetailIAmInteressed({ selected, open, onclose }) {
  const dispatch=useDispatch();
  const {enqueueSnackbar}=useSnackbar();
  const { user: { id, displayName, phoneNumber } } = useAuth();

  const [state, setState] = useState({
    displayName: '',
    phoneNumber: ''
  });

  const [error, setError] = useState({
    displayName: false,
    phoneNumber: false
  });

  const handleSubmit = () => {

    if (state.phoneNumber.trim().length === 0) {
      setError({ ...error, displayName: true });
      return;
    }
    if (state.phoneNumber.trim().length === 0) {
      setError({ ...error, phoneNumber: true });
      return;
    }

    dispatch(requestCall({
      ...state,
      realEstateId:selected?.id,
    },()=>{
      enqueueSnackbar('Votre demande a été bien reçue',{variant:'success'})
      onclose && onclose()
    }))
  };

  const handleChange = change => setState({ ...state, ...change });

  useEffect(() => {
    setState({
      ...state,
      userId: id || null,
      displayName: state?.displayName || displayName,
      phoneNumber: state?.phoneNumber || phoneNumber
    });
  // eslint-disable-next-line
  }, []);


  return (

    <Dialog open={open} onClose={onclose}>

      <DialogTitle>
        upHouse
      </DialogTitle>

      <DialogContent>
        <Stack direction={'column'} spacing={2}>
          <Typography variant={'subtitle1'}>
            Laissez nous votre contact, nous vous apellerons d'ici peu
          </Typography>
          <TextField
            fullWidth
            value={state.displayName}
            onChange={event => handleChange({ displayName: event.target.value })}
            error={error.displayName}
            helperText={error.displayName && 'Le nom est requis'}
            label={'Mon nom complet'}
          />
          <TextField
            fullWidth
            value={state.phoneNumber}
            onChange={event => handleChange({ phoneNumber: event.target.value })}
            error={error.phoneNumber}
            helperText={error.phoneNumber && 'Le numero est requis'}
            label={'Mon Numero de telephone'}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <LoadingButton variant={'contained'} onClick={handleSubmit}>
          Soumettre
        </LoadingButton>
      </DialogActions>

    </Dialog>

  );
}