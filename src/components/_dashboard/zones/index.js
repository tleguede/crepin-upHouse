import { useMemo, useState } from 'react';
import useZones from '../../../hooks/useZones';
import useToggle from '../../../hooks/useToggle';

import { cloneDeep } from 'lodash';
import { searchList, transformToTree } from 'src/utils/array';

import { Stack, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import ZoneList from './ZoneList';
import ZoneAddForm from './ZoneAddForm';

export default function Zones({onSelect}) {
  const { loading, zones } = useZones();
  const { open, handleClose, handleOpen } = useToggle();

  const [keyword, setKeyword] = useState('');
  const list = useMemo(()=>searchList(zones,keyword),[zones,keyword])

  const tree = useMemo(() => transformToTree(cloneDeep(list), {
    index: 'id',
    parentIndex: 'parentId',
    childrenIndex: 'children'
  }), [list]);

  // console.group('Zones');
  // console.log(keyword);
  // console.log(zones);
  // console.log(list);
  // console.log(tree);
  // console.groupEnd();

  return (
    <Stack spacing={3}>

      <TextField
        fullWidth
        value={keyword}
        onChange={env=>setKeyword(env.target.value)}
      />

      <ZoneList list={tree} raw={zones} onSelect={onSelect}/>

      {
        !Boolean(onSelect) && (
          <Stack direction={'row'} justifyContent={'center'}>
            <LoadingButton loading={loading} onClick={handleOpen}>
              Ajouter un pays
            </LoadingButton>
          </Stack>
        )
      }
      <ZoneAddForm open={open} onClose={handleClose} />

    </Stack>
  );
}