import {  List, MenuItem, Popover } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useToggle from '../../../hooks/useToggle';
import { useRef, useState } from 'react';
import { useDispatch } from '../../../redux/store';
import {  editRealEstate } from '../../../redux/slices/realEstate.thunks';
import { useSnackbar } from 'notistack5';
import { REAL_ESTATE_STATE } from '../../../constant';
import { values } from 'lodash';
import { LoadingButton } from '@material-ui/lab';

export default function DetailStateSwitcher({ item }) {
  const anchor = useRef();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { open, handleClose, handleOpen } = useToggle();


  const handleStateChange = state => {
    setLoading(true);
    dispatch(editRealEstate({ id: item?.id, state }, () => {
      enqueueSnackbar('La modification a été bien faite', { variant: 'success' });
      setLoading(false);
      handleClose();
    }));
  };


  return (
    <>
      <LoadingButton loading={loading} onClick={handleOpen} ref={anchor}>
        <MoreVertIcon />
      </LoadingButton>

      <Popover
        open={open} onClose={handleClose} anchorEl={anchor.current}
      >
        <List>

          {
            values(REAL_ESTATE_STATE).map(one => (
              <MenuItem key={one} onClick={() => handleStateChange(one)}>
                {one}
              </MenuItem>
            ))
          }

        </List>

      </Popover>

    </>
  );
}