import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';
import fileFill from '@iconify/icons-eva/file-fill';
import roundGrain from '@iconify/icons-ic/round-grain';
import bookOpenFill from '@iconify/icons-eva/book-open-fill';
import favoriteFilled from '@iconify/icons-carbon/favorite-filled';
import buildingIcon from '@iconify/icons-bi/building';

// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE, PATH_DASHBOARD } from '../../routes/paths';

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

  {
    title: 'Components',
    icon: <Icon icon={roundGrain} {...ICON_SIZE} />,
    path: PATH_PAGE.components
  },
  {
    title: 'Pages',
    path: '/pages',
    icon: <Icon icon={fileFill} {...ICON_SIZE} />,
    children: [
      {
        subheader: 'Other',
        items: [
          { title: 'About us', path: PATH_PAGE.about },
          { title: 'Contact us', path: PATH_PAGE.contact },
          { title: 'FAQs', path: PATH_PAGE.faqs },
          { title: 'Pricing', path: PATH_PAGE.pricing },
          { title: 'Payment', path: PATH_PAGE.payment },
          { title: 'Maintenance', path: PATH_PAGE.maintenance },
          { title: 'Coming Soon', path: PATH_PAGE.comingSoon }
        ]
      },
      {
        subheader: 'Authentication',
        items: [
          { title: 'Login', path: PATH_AUTH.loginUnprotected },
          { title: 'Register', path: PATH_AUTH.registerUnprotected },
          { title: 'Reset password', path: PATH_AUTH.resetPassword },
          { title: 'Verify code', path: PATH_AUTH.verify }
        ]
      },
      {
        subheader: 'Error',
        items: [
          { title: 'Page 404', path: PATH_PAGE.page404 },
          { title: 'Page 500', path: PATH_PAGE.page500 }
        ]
      },
      {
        subheader: 'Dashboard',
        items: [{ title: 'Dashboard', path: PATH_DASHBOARD.root }]
      }
    ]
  },
  {
    title: 'Documentation',
    icon: <Icon icon={bookOpenFill} {...ICON_SIZE} />,
    path: PATH_DOCS
  }
];

export default menuConfig;
