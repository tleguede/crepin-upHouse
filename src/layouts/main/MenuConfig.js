import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';
import fileFill from '@iconify/icons-eva/file-fill';

import favoriteFilled from '@iconify/icons-carbon/favorite-filled';
import buildingIcon from '@iconify/icons-bi/building';

// routes
import { PATH_PAGE, PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

const ICON_SIZE = {
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

  {
    title: 'Admin',
    icon: <Icon icon={fileFill} {...ICON_SIZE} />,
    path: PATH_DASHBOARD.root
  },

];

export default menuConfig;
