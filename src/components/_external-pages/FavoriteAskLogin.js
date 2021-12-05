import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@material-ui/core';
import { PATH_AUTH } from '../../routes/paths';

export default function FavoriteAskLogin({open,onClose}) {
  return(
    <Dialog open={open} onClose={onClose}>

      <DialogTitle>
        Oops!
      </DialogTitle>

      <DialogContent>
        <Stack direction={'column'} spacing={2}>
          <Typography variant={'body1'}>
            Vous devez être connecté pour mettre ce bien en favoris
          </Typography>

        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant={'contained'} href={PATH_AUTH.login}>
          Se connecter
        </Button>
      </DialogActions>

    </Dialog>
  )
}