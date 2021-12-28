import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import openFill from '@iconify/icons-eva/book-open-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import deleteFill from '@iconify/icons-ant-design/delete-fill';
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

export default function MoreMenuButton({item,  ClickOpen, ClickEdit, ClickDelete, canDelete=true, canOpen=true, canEdit=true, ...other }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    ClickOpen(item)
    setIsOpen(false);
  };

  const handleClickEdit = () => {
    ClickEdit(item)
    setIsOpen(false);
  };

  const handleClickDelete = () => {
    ClickDelete();
    setIsOpen(false);
  };


  const OPTIONS = [
    { text: 'Ouvrir', icon: openFill, action: handleClickOpen, state: canOpen },
    { text: 'Editer', icon: editFill, action: handleClickEdit, state:  canEdit},
    { text: 'Supprimer', icon: deleteFill, action: handleClickDelete, state: canDelete }
  ];

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} style={{...other}} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {OPTIONS.filter((op) => op.state).map((item) => (
          <MenuItem
            key={item.text}
            onClick={item.action}
            sx={{ color: 'text.secondary' }}
          >
            <ListItemIcon>
              <Icon icon={item.icon} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
