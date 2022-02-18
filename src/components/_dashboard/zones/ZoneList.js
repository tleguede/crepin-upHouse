import { useState } from 'react';
import useToggle from 'src/hooks/useToggle';

import { isEmpty, uniq } from 'lodash';

import { Stack, Box, Collapse } from '@material-ui/core';
import ZoneItem from './ZoneItem';
import ZoneAddForm from './ZoneAddForm';

const render = (item, handlers) => {
  const { collapsedIds } = handlers;
  const didCollapse = collapsedIds?.includes(item?.id);

  return (
    <Stack spacing={1}>
      <ZoneItem {...item} {...handlers} didCollapse={didCollapse} />

      {
        !isEmpty(item?.children) && (
          <Collapse in={!didCollapse}>
            <Stack spacing={1} sx={{ pl: 5 }}>
              {
                item?.children?.map(child => (
                  <Box key={child?.id}>
                    {
                      render(child, handlers)
                    }
                  </Box>
                ))
              }
            </Stack>
          </Collapse>
        )
      }

    </Stack>
  );
};


export default function ZoneList({ list = [], raw = [],onSelect }) {
  const { open, handleClose, handleOpen } = useToggle();

  const [collapsedIds, setCollapsedIds] = useState([]);
  const [parent, setParent] = useState(null);
  const [selected, setSelected] = useState(null);

  const onCollapse = id => {
    const isRemove = collapsedIds?.includes(id);

    if (isRemove) {
      setCollapsedIds(state => state?.filter(one => one !== id));
    } else {
      setCollapsedIds(state => uniq([...state, id]));
    }

  };


  const onAdd = id => {
    setParent(raw?.find(one => one?.id === id));
    handleOpen();
  };

  const onEdit = id => {
    handleOpen()
    setSelected(raw?.find(one => one?.id === id));
  };

  const interceptClosing = () => {
    handleClose();
    setParent(null);
    setSelected(null);
  };

  return (
    <Stack spacing={2}>

      {
        list?.map(child => (
          <Box key={child?.id}>
            {
              render(child, { onCollapse, onEdit, onAdd, collapsedIds,onSelect })
            }
          </Box>
        ))
      }

      <ZoneAddForm
        open={open}
        onClose={interceptClosing}
        parent={parent}
        selected={selected}
      />

    </Stack>
  );
}