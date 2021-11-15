import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import export2Fill from '@iconify/icons-eva/upload-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  MenuItem,Grid
} from '@material-ui/core';
import { useState, useRef } from 'react';
import MenuPopover from '../MenuPopover';
import { isEmpty, isFunction } from 'lodash';
import { isNot } from '../../utils/type_check';
import DataGridExporter from './DataGridExporter';
// ---------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  color: 'black',
  backgroundColor: 'white',
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

DataGridToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func
};

export default function DataGridToolbar({
                                          selected,
                                          filterName,
                                          onFilterName,
                                          placeholder,
                                          filterChange,
                                          filters,
                                          onDelete
                                        }) {
  const numSelected = selected.length;
  const theme = useTheme();
  const colorbg = theme.palette.primary.main;
  const isLight = theme.palette.mode === 'light';
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilterChange = (value) => {
    filterChange(value);
    setOpen(false);
  };

  const handleDelete = () => isFunction(onDelete) && onDelete(selected);

  return (
    <>
      <RootStyle
        sx={{
          bgcolor: colorbg,
          ...(isNot(isEmpty(selected)) && {
            color: isLight ? 'primary.main' : 'text.primary',
            bgcolor: isLight ? 'primary.lighter' : 'primary.dark'
          })
        }}
      >

        {
          isNot(isEmpty(selected)) && (
            <Grid container justifyContent={'space-between'}>
              <Grid item>
                <Typography component='div' variant='subtitle1' sx={{ mt: 1 }}>
                  {numSelected} selectionné(s)
                </Typography>
              </Grid>
              <Grid item>

                <DataGridExporter data={selected} colDef={filters}>
                  <Tooltip title='Exporter Excel'>
                    <IconButton>
                      <Icon icon={export2Fill} />
                    </IconButton>
                  </Tooltip>
                </DataGridExporter>

                <Tooltip title='Supprimer'>
                  <IconButton onClick={handleDelete}>
                    <Icon icon={trash2Fill} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          )
        }

        {
          isEmpty(selected) && (
            <Grid container justifyContent={'space-between'}>

              <Grid item>
                <SearchStyle
                  value={filterName}
                  onChange={onFilterName}
                  placeholder={placeholder ? `Rechercher par ${placeholder}...` : 'Rechercher ...'}
                  startAdornment={
                    <InputAdornment position='start'>
                      <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  }
                />
              </Grid>

              <Grid item>
                <Tooltip title='Liste de filtre'>
                  <IconButton onClick={handleOpen} ref={anchorRef}>
                    <Icon icon={roundFilterList} color={isLight ? '#FFFFFF' : '#00000F'} />
                  </IconButton>
                </Tooltip>
              </Grid>

            </Grid>
          )
        }
      </RootStyle>
      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
        {filters.map((filter, idx) => (
          <MenuItem key={idx} onClick={() => handleFilterChange(filter)}> {filter.label} </MenuItem>
        ))}
      </MenuPopover>
    </>
  );
}
