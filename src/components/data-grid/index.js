import { filter } from 'lodash';
import { useState } from 'react';
// material
import { useTheme } from '@material-ui/core/styles';
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination
} from '@material-ui/core';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import DataGridToolbar from './DataGridToolbar';
import DataGridHeader from './DataGridHeader';
import { CircularProgress } from '@material-ui/core';


// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query, filterProperties) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user[`${filterProperties}`]?.toLowerCase()?.indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function DataGrid({ columns, data, RowItem, placeholder, loading, filterPropertie, onDeleteRecord }) {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const colorbg = theme.palette.primary.main;
  const isLight = theme.palette.mode === 'light';
  const [page, setPage] = useState(0);
  const [filterProperties, setFilterProperties] = useState(filterPropertie);
  const [holder, setPlaceholder] = useState(placeholder);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filterChange = (value) => {
    setFilterProperties(value.id);
    setPlaceholder(value.label.toString().toLowerCase());
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredData = applySortFilter(data, getComparator(order, orderBy), filterName, filterProperties);

  const isDataNotFound = filteredData.length === 0;

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <Card sx={{ bgColor: colorbg }}>
        <DataGridToolbar
          numSelected={selected.length}
          selected={data.filter(({id})=>selected.includes(id))}
          filterName={filterName}
          onFilterName={handleFilterByName}
          placeholder={holder}
          filterChange={filterChange}
          filters={columns}
          onDelete={onDeleteRecord}
        />

        <Scrollbar>
          <TableContainer>
            <Table>
              <DataGridHeader
                order={order}
                orderBy={orderBy}
                headLabel={columns}
                rowCount={data.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
                  const { id } = row;
                  const isItemSelected = selected.indexOf(id) !== -1;
                  return (
                    <RowItem
                      sx={{
                        color: isLight ? '#000000' : '#FFFFFF',
                        fontWeight: 'bold',
                        // bgcolor: alpha(colorbg, 0.3)
                      }}
                      row={row}
                      key={id}
                      id={id}
                      tabIndex={idx}
                      selected={isItemSelected}
                      handleClick={handleClick} />);
                })}
                {loading ?
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell align='center' colSpan={columns.length + 1}>
                      <CircularProgress color='primary' height={20} />
                    </TableCell>
                  </TableRow>
                  : emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={columns.length + 1} />
                  </TableRow>
                )}
              </TableBody>
              {!loading && isDataNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align='center' colSpan={columns.length + 1}>
                      <SearchNotFound searchQuery={filterName} sx={{ p: 1 }} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          sx={{ color:  isLight ? 'black' : 'white' }}
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={data.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage='Ligne par page'
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
