import useToggle from 'src/hooks/useToggle';
import DrawerContainer from '../components/DrawerContainer';

export default function useDrawer() {
  const { open, handleOpen, handleClose } = useToggle();

  const Drawer = ({ children }) => {
    return (
      <DrawerContainer open={open} onClose={handleClose}>
        {children}
      </DrawerContainer>
    );
  };

  return { handleOpen, handleClose, Drawer, isDrawerOpen: open };
}