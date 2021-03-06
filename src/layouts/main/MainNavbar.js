import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Box, AppBar, Toolbar, Container, ButtonGroup, Button } from '@material-ui/core';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
// components
import Logo from '../../components/Logo';
import Label from '../../components/Label';
import { MHidden } from '../../components/@material-extend';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig, { ICON_SIZE, loggedConfig, mobileGuestConfig, mobileLoggedConfig } from './MenuConfig';
import useAuth from '../../hooks/useAuth';
import AccountPopover from '../dashboard/AccountPopover';
import { useMemo } from 'react';
import { Icon } from '@iconify/react';
import {  PATH_DASHBOARD } from '../../routes/paths';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import NotificationsPopover from '../dashboard/NotificationsPopover';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP
  }
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8
}));

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const { isAuthenticated,user:{isAdmin=false} } = useAuth();
  const isOffset = useOffSetTop(100);
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const navConf= useMemo(() => isAuthenticated ? loggedConfig : navConfig, [isAuthenticated]);
  const mobileNavConf= useMemo(() => isAuthenticated ? mobileLoggedConfig : mobileGuestConfig, [isAuthenticated]);
  const mobileConfig = useMemo(() => {

    return isAdmin ? [
      ...mobileNavConf,
      {
        title: "Admin",
        icon: <Icon icon={settings2Fill} {...ICON_SIZE} />,
        path: PATH_DASHBOARD.admin.validation
      }
    ] :mobileNavConf

  }, [mobileNavConf,isAdmin]);

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            bgcolor: 'background.default',
            height: { md: APP_BAR_DESKTOP - 16 }
          })
        }}
      >
        <Container
          maxWidth='lg'
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <RouterLink to='/'>
            <Logo />
          </RouterLink>
          <Label color='info' sx={{ ml: 1 }}>
            v2.5.0
          </Label>
          <Box sx={{ flexGrow: 1 }} />

          <MHidden width='mdDown'>
            <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConf} />

            {
              !isAuthenticated && (
                <ButtonGroup>
                  <Button variant={'contained'} href={'/auth/register'}>
                    Creer un compte
                  </Button>

                  <Button variant={'outlined'} href={'/auth/login'}>
                    Se connecter
                  </Button>
                </ButtonGroup>
              )
            }


            {
              isAuthenticated &&(
                <NotificationsPopover />
              )
            }

            {
              isAuthenticated &&(
                <AccountPopover/>
              )
            }


          </MHidden>

          <MHidden width='mdUp'>
            <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={mobileConfig} />
          </MHidden>
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
