import { Button, Stack } from '@material-ui/core';
import useLandingSearch from '../../../../../hooks/useLandingSearch';

export default function ToolBar() {
  const { apply, reset } = useLandingSearch();

  return (
    <Stack direction={'row'} justifyContent={'space-between'} >

      <Button variant={'contained'} onClick={apply}>
        Appliquer
      </Button>

      <Button variant={'outlined'} color={'error'} onClick={reset}>
        Réinitialiser
      </Button>

    </Stack>
  );
}