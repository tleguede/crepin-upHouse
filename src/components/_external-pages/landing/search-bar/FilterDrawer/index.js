import { Drawer, Box } from '@material-ui/core';
import useLandingSearch from '../../../../../hooks/useLandingSearch';
import ToolBar from './ToolBar';
import Scrollbar from '../../../../Scrollbar';
import FilterContainer from './FilterContainer';

export default function FilterDrawer() {
  const { isDrawerOpen, closeDrawer } = useLandingSearch();

  return (
    <Drawer
      anchor={'right'}
      open={isDrawerOpen}
      onClose={closeDrawer}
      ModalProps={{ keepMounted: true }}
      PaperProps={{ sx: {  pb: 5, width: 500, maxWidth: '80vw' } }}
    >
      <Box sx={{ m: 1 }}>

        <ToolBar />

        <Scrollbar sx={{ height: '85vh', marginTop: 2 }}>

          <FilterContainer />

        </Scrollbar>

      </Box>
    </Drawer>
  );
}