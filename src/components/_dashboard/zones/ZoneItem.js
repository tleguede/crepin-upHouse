import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack5';
import useToggle from 'src/hooks/useToggle';

import { deleteZone } from '../../../redux/slices/zones';
import { getAddHintText } from 'src/utils/handlers/zones';
import { ZONE_TYPE } from '../../../constant/zones';

import { Stack, Paper, Typography, Tooltip, Box, Fade, IconButton } from '@material-ui/core';
import { Add, Delete, Edit, ArrowDropUp, ArrowDropDown, Check } from '@material-ui/icons';
import Label from '../../Label';
import DeletePopup from '../../DeletePopup';


export default function ZoneItem({
                                   hideShadow = false, hideCollapser = false, hideAdd = false,
                                   didCollapse = false,
                                   label = '', type = '', id,
                                   onAdd, onDelete, onCollapse, onEdit, onSelect
                                 }) {

  const anchor = useRef();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { open, handleClose: hide, handleOpen: appear } = useToggle();
  const { open: openDelete, handleClose, handleOpen } = useToggle();

  const handleAdd = () => onAdd && onAdd(id);

  const handleEdit = () => onEdit && onEdit(id);

  const handleDelete = () => {
    setLoading(true);
    dispatch(deleteZone(id, () => {
      enqueueSnackbar('Fait', { variant: 'success' });
      setLoading(false);
    }));
  };

  const handleCollapse = () => onCollapse && onCollapse(id);

  const handleSelect = () => onSelect && onSelect(id);

  return (
    <Paper
      ref={anchor}
      onMouseEnter={appear}
      onMouseLeave={hide}
      sx={{ boxShadow: hideShadow ? 0 : 5, p: 1 }}
      onClick={handleSelect}
    >
      <Stack direction={'row'} justifyContent={'space-between'}>

        <Stack justifyContent={'center'}>
          <Stack direction={'row'} spacing={1}>
            <Tooltip title={type}>
              <Box>
                <Label>
                  {(type[0] || '').toUpperCase()}
                </Label>
              </Box>

            </Tooltip>


            <Typography>
              {label}
            </Typography>
          </Stack>
        </Stack>


        {
          Boolean(onSelect)
            ? (
              <IconButton size='small'>
                <Check />
              </IconButton>
            )
            : (
              <Fade in={open}>
                <Stack direction={'row'}>

                  {
                    !(hideAdd || type === ZONE_TYPE.DISTRICT) && (
                      <Tooltip title={getAddHintText(type)}>
                        <IconButton size='small' onClick={handleAdd}>
                          <Add />
                        </IconButton>
                      </Tooltip>
                    )
                  }


                  <Tooltip title={'Modifier'}>
                    <IconButton size='small' onClick={handleEdit}>
                      <Edit />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={'Supprimer'}>
                    <IconButton size='small' color='error' onClick={handleOpen}>
                      <Delete />
                    </IconButton>
                  </Tooltip>

                  {
                    !(hideCollapser || type === ZONE_TYPE.DISTRICT) && (
                      <IconButton size='small' onClick={handleCollapse}>
                        {
                          !didCollapse
                            ? <ArrowDropUp />
                            : <ArrowDropDown />
                        }
                      </IconButton>
                    )
                  }

                </Stack>
              </Fade>
            )
        }


      </Stack>

      <DeletePopup
        anchorRef={anchor}
        text={'cet element'}
        onClose={handleClose}
        pending={loading}
        onDelete={handleDelete}
        open={openDelete}
      />
    </Paper>
  );
}