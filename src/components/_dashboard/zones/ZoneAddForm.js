import { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack5';

import { isEmpty } from 'lodash';
import { nanoid } from '@reduxjs/toolkit';
import { addZone, updateZone } from '../../../redux/slices/zones';
import { getAddHintText, getChildType } from 'src/utils/handlers/zones';

import { Dialog, DialogContent, DialogTitle, DialogActions, TextField, Button } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

const check = (label) => {
  return {
    isValid: !isEmpty(label),
    message: isEmpty(label) ? 'Le nom ne doit pas etre vide!' : ''
  };
};

export default function ZoneAddForm({ open, onClose, parent, selected }) {
  const isEdit = Boolean(selected);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState('');
  const validity = useMemo(() => check(label), [label]);

  useEffect(() => {

    if (!isEmpty(selected?.label)) {
      setLabel(selected?.label);
    }

  }, [selected?.label]);

  // console.group()
  // console.log(id)
  // console.log(type)
  // console.groupEnd()

  const handleSubmit = () => {
    if (!validity.isValid) {
      enqueueSnackbar(validity.message, { variant: 'error' });
      return;
    }

    setLoading(true);

    if (isEdit)
      dispatch(updateZone({
        id: selected?.id,
        label,
        updated: new Date()
      }, () => {
        enqueueSnackbar('Fait', { variant: 'success' });
        setLabel('');
        setLoading(false);
        onClose && onClose();
      }));
    else
      dispatch(addZone({
        id: nanoid(),
        label,
        type: getChildType(parent?.type),
        ...(parent?.id && { parentId: parent?.id }),
        createdAt: new Date()
      }, () => {
        enqueueSnackbar('Fait', { variant: 'success' });
        setLabel('');
        setLoading(false);
        onClose && onClose();
      }));

  };

  return (
    <Dialog open={open} onClose={onClose}>

      <DialogTitle>
        {isEdit ? 'Editer le nom' : getAddHintText(parent?.type)}
      </DialogTitle>

      <DialogContent sx={{ mt: 3 }}>
        <TextField
          label={'Nom'}
          value={label}
          disabled={loading}
          onChange={event => setLabel(event.target.value)}
        />
      </DialogContent>

      <DialogActions>

        <Button color={'error'} onClick={onClose}>
          Anuler
        </Button>

        <LoadingButton variant={'contained'} loading={loading} onClick={handleSubmit}>
          Ajouter
        </LoadingButton>

      </DialogActions>

    </Dialog>
  );
}