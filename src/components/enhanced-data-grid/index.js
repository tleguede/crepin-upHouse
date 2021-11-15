import { Checkbox, TableCell, TableRow } from '@material-ui/core';
import DataGrid from '../data-grid';
import { isFunction } from 'lodash';

const RowItem = ({ theadDef, onRowClick, row, id, tabIndex, selected, handleClick, sx }) => {

  const handleRowClick = (col) => {
    const { click } = theadDef.find(one => one.id === col);
    return Boolean(click) && isFunction(onRowClick) && onRowClick(row);
  };

  return (
    <TableRow
      hover
      key={id}
      tabIndex={tabIndex}
      role='checkbox'
      selected={selected}
      aria-checked={selected}
    >
      <TableCell sx={sx} padding='checkbox' onClick={(event) => handleClick(event, id)}>
        <Checkbox checked={selected} />
      </TableCell>

      {
        theadDef.map(({ id, render }) => (
            <TableCell
              key={id}
              sx={sx}
              scope='row'
              component='th'
              style={{cursor:'pointer'}}
              onClick={() => handleRowClick(id)}
            >
              {(isFunction(render) && render(row[id], row)) || row[id]}
            </TableCell>
          )
        )
      }

    </TableRow>
  );

};

export default function EnhancedDataGrid({
                                           columns,
                                           data,
                                           placeholder,
                                           loading,
                                           filterProperties,
                                           onDeleteRecord,
                                           onRowClick
                                         }) {

  return (
    <DataGrid
      columns={columns}
      data={data}
      RowItem={(props) => (
        <RowItem
          theadDef={columns}
          onRowClick={onRowClick}
          {...props}
        />
      )}
      placeholder={placeholder}
      loading={loading}
      filterPropertie={filterProperties}
      onDeleteRecord={onDeleteRecord}
    />
  );
}