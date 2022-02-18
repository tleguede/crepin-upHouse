// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';
import { Icon } from '@iconify/react';
import momentTimezone from '@iconify/icons-file-icons/moment-timezone';
import phoneCall from '@iconify/icons-bx/phone-call';

// ----------------------------------------------------------------------
export const SIDEBAR_ICON_SIZE = { height: 50, width: 50 };

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking')
};

const sidebarConfig = [
  // Admin
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'Validation des posts',
        path: PATH_DASHBOARD.admin.validation,
        icon: ICONS.dashboard
      },
      {
        title: 'Demande d appel',
        path: PATH_DASHBOARD.admin.callRequest,
        icon: <Icon icon={phoneCall} {...SIDEBAR_ICON_SIZE} />
      },
      {
        title: 'Les zones géographiques',
        path: PATH_DASHBOARD.admin.zones,
        icon: <Icon icon={momentTimezone} {...SIDEBAR_ICON_SIZE} />
      },
      {
        title: 'Utilisateurs',
        path: PATH_DASHBOARD.user.list,
        icon: ICONS.user

      }
    ]
  }

  //
  // // MANAGEMENT
  // // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     // MANAGEMENT : USER
  //
  //
  //   ]
  // },

];

export default sidebarConfig;
