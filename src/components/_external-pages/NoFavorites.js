// material
import { Box, Typography, Container, Stack } from '@material-ui/core';
// components

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function NoFavorites() {
  return (
    <Container>
      <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center', my:2 }}>

        <img
          alt={'...'}
          src={'/static/illustrations/illustration_empty_content.svg'}
          sx={{ height: 260, my: { xs: 5, sm: 10 } }}
        />

        <Stack direction={'row'} justifyContent={'center'}>
          <Typography sx={{ color: 'text.secondary',width:200,right:90,my:2,position:'relative' }}>
            Il n'y a rien a voir ici!
          </Typography>
        </Stack>

      </Box>
    </Container>
  );
}
