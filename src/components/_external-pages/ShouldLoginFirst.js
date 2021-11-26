import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Button, Typography, Container } from '@material-ui/core';
import { PATH_AUTH } from '../../routes/paths';
// components

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function ShouldLoginFirst({why=''}) {
  return (
    <Container>
      <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
        <Typography variant="h3" paragraph>
           Ops!
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {`Ops! vous devez vous connecter pour ${why}`}
        </Typography>

        <img
          alt={'...'}
          src={'/static/illustrations/illustration_register.png'}
          sx={{ height: 260, my: { xs: 5, sm: 10 } }}
        />

        <Button to={PATH_AUTH.login} size="large" variant="contained" component={RouterLink}>
          Se connecter
        </Button>
      </Box>
    </Container>
  );
}
