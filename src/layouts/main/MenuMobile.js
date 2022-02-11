import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { NavLink as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Box, List, Drawer, Link, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@material-ui/core';
// components
import Logo from '../../components/Logo';
import NavSection from '../../components/NavSection';
import Scrollbar from '../../components/Scrollbar';
import { MIconButton } from '../../components/@material-extend';
//
import menuConfig, { loggedConfig, mobileGuestConfig } from './MenuConfig';
import useAuth from 'src/hooks/useAuth';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { PATH_DASHBOARD } from '../../routes/paths';
// ----------------------------------------------------------------------
import logoutOutlined from '@iconify/icons-ant-design/logout-outlined';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { useSnackbar } from 'notistack5';

const ICON_SIZE = 22;
const ITEM_SIZE = 48;
const PADDING = 2.5;

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: ITEM_SIZE,
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(PADDING),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary
}));

// ----------------------------------------------------------------------

MenuMobileItem.propTypes = {
  item: PropTypes.object,
  isOpen: PropTypes.bool,
  isActive: PropTypes.bool,
  onOpen: PropTypes.func
};

function MenuMobileItem({ item, isOpen, isActive, onOpen, onClick }) {
  const { title, path, icon, children } = item;

  if (children) {
    return (
      <div key={title}>
        <ListItemStyle onClick={onOpen}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText disableTypography primary={title} />
          <Box
            component={Icon}
            icon={isOpen ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={isOpen} timeout='auto' unmountOnExit>
          <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <NavSection
              navConfig={menuConfig[2].children}
              sx={{
                '& .MuiList-root:last-of-type .MuiListItemButton-root': {
                  height: 200,
                  backgroundSize: '92%',
                  backgroundPosition: 'center',
                  bgcolor: 'background.neutral',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: 'url(/static/illustrations/illustration_dashboard.png)',
                  '& > *:not(.MuiTouchRipple-root)': { display: 'none' }
                },
                '& .MuiListSubheader-root': {
                  pl: PADDING,
                  display: 'flex',
                  alignItems: 'center',
                  '&:before': {
                    ml: '6px',
                    mr: '22px',
                    width: 8,
                    height: 2,
                    content: '\'\'',
                    borderRadius: 2,
                    bgcolor: 'currentColor'
                  }
                },
                '& .MuiListItem-root': {
                  pl: PADDING,
                  '&:before': { display: 'none' },
                  '&.active': { color: 'primary.main', bgcolor: 'transparent' }
                },
                '& .MuiListItemIcon-root': {
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  '&:before': {
                    width: 4,
                    height: 4,
                    content: '\'\'',
                    borderRadius: '50%',
                    bgcolor: 'currentColor'
                  }
                }
              }}
            />
          </Box>
        </Collapse>
      </div>
    );
  }

  if (title === 'Documentation') {
    return (
      <ListItemStyle
        href={path}
        target='_blank'
        component={Link}
        sx={{
          ...(isActive && {
            color: 'primary.main',
            fontWeight: 'fontWeightMedium',
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
          })
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText disableTypography primary={title} />
      </ListItemStyle>
    );
  }

  return (
    <ListItemStyle
      to={path}
      component={RouterLink}
      onClick={onClick}
      sx={{
        ...(isActive && {
          color: 'primary.main',
          fontWeight: 'fontWeightMedium',
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
        })
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText disableTypography primary={title} />
    </ListItemStyle>
  );
}

MenuMobile.propTypes = {
  isOffset: PropTypes.bool,
  isHome: PropTypes.bool
};

export default function MenuMobile({ isOffset, isHome }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const { user, isAuthenticated, logout } = useAuth();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const options = useMemo(() => {
    let list = [...menuConfig];

    if (isAuthenticated) {
      list = [...list, ...loggedConfig];
      if (user?.isAdmin) {
        list = [...list, {
          title: 'Admin',
          icon: <Icon icon={settings2Fill} {...{
            width: 22,
            height: 22
          }} />,
          path: PATH_DASHBOARD.root
        }];
      }
    } else {
      list = [...list, ...mobileGuestConfig];
    }

    return list;

  }, [isAuthenticated, user?.isAdmin]);

  useEffect(() => {
    if (mobileOpen) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleDrawerOpen = () => {
    setMobileOpen(true);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      if (isMountedRef.current) {
        handleDrawerClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Impossible de se déconnecter', { variant: 'error' });
    }
  };

  return (
    <>
      <MIconButton
        onClick={handleDrawerOpen}
        sx={{
          ml: 1,
          ...(isHome && { color: 'common.white' }),
          ...(isOffset && { color: 'text.primary' })
        }}
      >
        <Icon icon={menu2Fill} />
      </MIconButton>

      <Drawer
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: 260 } }}
      >
        <Scrollbar>
          <Link component={RouterLink} to='/' sx={{ display: 'inline-flex' }}>
            <Logo sx={{ mx: PADDING, my: 3 }} />
          </Link>

          <List disablePadding>
            {options.map((link) => (
              <MenuMobileItem
                key={link.title}
                item={link}
                isOpen={open}
                onOpen={handleOpen}
                isActive={pathname === link.path}
              />
            ))}

            {
              isAuthenticated && (
                <MenuMobileItem
                  item={{
                    title: 'Déconnexion',
                    icon: <Icon icon={logoutOutlined} {...{ width: 22, height: 22 }} />,
                    path: '#'
                  }}
                  isOpen={false}
                  onOpen={handleLogout}
                  isActive={false}
                  onClick={handleLogout}
                />
              )
            }
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}
