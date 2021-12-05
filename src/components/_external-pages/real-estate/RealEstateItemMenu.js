import {  List, MenuItem, Popover } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useToggle from '../../../hooks/useToggle';
import { useRef, useState } from 'react';
import { PATH_PAGE } from '../../../routes/paths';
import { useNavigate } from 'react-router-dom';
import DeletePopup from '../../DeletePopup';
import { useDispatch } from '../../../redux/store';
import { deleteRealEstate, editRealEstate } from '../../../redux/slices/realEstate.thunks';
import { useSnackbar } from 'notistack5';
import { REAL_ESTATE_STATE } from '../../../constant';
import { LoadingButton } from '@material-ui/lab';

export default function RealEstateItemMenu({ item, isMyPosts, isAdminValidator, isInValidation }) {
  const anchor = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { open, handleClose, handleOpen } = useToggle();
  const { open: openDelete, handleClose: handleCloseDelete, handleOpen: handleOpenDelete } = useToggle();

  const goToDetail = () => {
    navigate(PATH_PAGE.detail.replace(':id', item?.id));
    handleClose();
  };

  const handleEdit = () => {
    navigate(PATH_PAGE.myPostsEdit.replace(':id', item?.id));
    handleClose();
  };

  const handleDeletion = () => {
    setLoading(true);
    dispatch(deleteRealEstate(item?.id, () => {
      enqueueSnackbar('La suppression a été bien faite', { variant: 'success' });
      setLoading(false);
      handleClose();
      handleOpenDelete();
    }));
  };

  const handleStateChange = state => {
    setLoading(true);
    dispatch(editRealEstate({id:item?.id,state}, () => {
      enqueueSnackbar('La modification a été bien faite', { variant: 'success' });
      setLoading(false);
      handleClose();
      handleOpenDelete();
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

          <MenuItem onClick={goToDetail}>
            Detail
          </MenuItem>

          {
            isMyPosts && !isInValidation && (
              <MenuItem onClick={() => handleStateChange(REAL_ESTATE_STATE.WAITING_FOR_VALIDATION)}>
                Demande de validation
              </MenuItem>
            )
          }

          {
            isInValidation && (isMyPosts || isAdminValidator) && (
              <MenuItem onClick={() => handleStateChange(REAL_ESTATE_STATE.NOT_AVAILABLE)}>
                Marquer non disponible
              </MenuItem>
            )
          }

          {
            isAdminValidator && (
              <MenuItem onClick={() => handleStateChange(REAL_ESTATE_STATE.VALIDATED)}>
                Valider
              </MenuItem>
            )
          }


          {
            isAdminValidator && (
              <MenuItem onClick={() => handleStateChange(REAL_ESTATE_STATE.BESPEAK)}>
                Reserver
              </MenuItem>
            )
          }

          {
            isAdminValidator && (
              <MenuItem onClick={() => handleStateChange(REAL_ESTATE_STATE.REJECTED)}>
                Bannir
              </MenuItem>
            )
          }

          {
            isMyPosts && (
              <MenuItem onClick={handleEdit}>
                Editer
              </MenuItem>
            )
          }

          {
            isMyPosts && (
              <MenuItem onClick={handleOpenDelete}>
                Supprimer
              </MenuItem>
            )
          }

        </List>

      </Popover>

      <DeletePopup
        open={openDelete}
        anchorRef={anchor}
        onClose={handleCloseDelete}
        onDelete={handleDeletion}
        text={'cet bien'}
        pending={loading}
      />

    </>
  );
}