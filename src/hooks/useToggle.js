import { useState } from 'react';

export default function useToggle(initialValue = false) {
  const [open, setOpen] = useState(initialValue);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSwitchState = () => setOpen(!open);

  return { open, handleOpen, handleClose, handleSwitchState };
}