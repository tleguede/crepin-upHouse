import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';

import favoriteFilled from '@iconify/icons-carbon/favorite-filled';
import buildingIcon from '@iconify/icons-bi/building';

// routes
import { PATH_PAGE,  PATH_AUTH } from '../../routes/paths';

// ----------------------------------------------------------------------

export const ICON_SIZE = {
  width: 22,
  height: 22
};

const menuConfig = [
  {
    title: 'Acceuil',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
    path: '/'
  },

  {
    title: 'Publier',
    icon: <Icon icon={buildingIcon} {...ICON_SIZE} />,
    path: PATH_PAGE.publish
  },


  // {
  //   title: 'Admin',
  //   icon: <Icon icon={fileFill} {...ICON_SIZE} />,
  //   path: PATH_DASHBOARD.root
  // },

];

export const loggedConfig =[
  ...menuConfig,
  {
    title: 'Mes favoris',
    icon: <Icon icon={favoriteFilled} {...ICON_SIZE} />,
    path: PATH_PAGE.myFavorites
  },

  {
    title: 'Mes Biens',
    icon: <Icon icon={buildingIcon} {...ICON_SIZE} />,
    path: PATH_PAGE.myPosts
  },
]

export const mobileGuestConfig =[
  ...menuConfig,
  {
    title: 'Se connecter',
    icon: <Icon icon={buildingIcon} {...ICON_SIZE} />,
    path: PATH_AUTH.login
  },

  {
    title: "S'inscrire",
    icon: <Icon icon={buildingIcon} {...ICON_SIZE} />,
    path: PATH_AUTH.register
  },
]


export const mobileLoggedConfig =[
  ...loggedConfig,

]

export default menuConfig;
