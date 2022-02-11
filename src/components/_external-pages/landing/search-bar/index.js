import { Stack,Tooltip } from '@material-ui/core';
import SelectedFilterDisplayer from './SelectedFilterDisplayer';
import FilterDrawer from './FilterDrawer';
import LandingSearchProvider from '../../../../contexts/LandingSearchContext';

export default function LandingSearchBar() {
  return (
    <LandingSearchProvider>
      <Tooltip title={'Cliquer pour ouvrir la barre de rechercher'}>
        <Stack direction={'row'} justifyContent={'center'} spacing={2}>

          <SelectedFilterDisplayer />

          <FilterDrawer />

        </Stack>
      </Tooltip>
    </LandingSearchProvider>
  );
}