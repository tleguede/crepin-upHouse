import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Button, Container, Typography } from '@material-ui/core';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import { ResetPasswordForm } from '../../components/authentication/reset-password';
//
import { SentIcon } from '../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <RootStyle title="Réinitialiser le mot de passe | upHouse">
      <LogoOnlyLayout />

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {!sent ? (
            <>
              <Typography variant="h3" paragraph>
                Mot de passe oublié?
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                Veuillez saisir l'adresse e-mail associée à votre compte et nous vous enverrons par e-mail un lien pour réinitialiser votre
                le mot de passe.
              </Typography>

              <ResetPasswordForm onSent={() => setSent(true)} onGetEmail={(value) => setEmail(value)} />

              <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 1 }}>
                Retour
              </Button>
            </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

              <Typography variant="h3" gutterBottom>
                Demande envoyée avec succès
              </Typography>
              <Typography>
                Nous avons envoyé un e-mail de confirmation à &nbsp;
                <strong>{email}</strong>
                <br />
                Merci de consulter vos emails.
              </Typography>

              <Button size="large" variant="contained" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 5 }}>
                Retour
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </RootStyle>
  );
}
