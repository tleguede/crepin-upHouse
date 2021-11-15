import ReactExport from '@ibrahimrahmani/react-export-excel';
import { useMemo } from 'react';
import { keys } from 'lodash';
import { isFirebaseTimestamp } from 'src/utils/type_check';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ExcelFile.ExcelSheet;
const ExcelColumn = ExcelFile.ExcelColumn;

export default function DataGridExporter({ children, data, colDef }) {

  const formatted = useMemo(() => {
    return data.map(one => {
      let result = {};

      keys(one).forEach(key => {
        result[key] = isFirebaseTimestamp(one[key]) ? one[key].toDate() : one[key];
      });

      return result;
    });
  }, [data]);


  return (
    <>

      <ExcelFile element={
        <>
          {children}
        </>
      }>
        <ExcelSheet data={formatted} name='file'>
          {
            colDef.map(one => (
              <ExcelColumn label={one.label} value={one.id} key={one.id} />
            ))
          }
        </ExcelSheet>
      </ExcelFile>
    </>
  );
}