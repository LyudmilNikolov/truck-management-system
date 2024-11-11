import { ROUTE_PATHS } from '../../shared/constants/route-paths.constants';

export const sidebarData = [
  {
    routeLink: ROUTE_PATHS.DASHBOARD,
    icon: 'home',
    label: 'Dashboard',
  },
  {
    routeLink: ROUTE_PATHS.VEHICLES,
    icon: 'local_shipping',
    label: 'Vehicles',
  },
  {
    routeLink: ROUTE_PATHS.EMPLOYEES,
    icon: 'people',
    label: 'Employees',
  },
  {
    routeLink: 'settings',
    icon: 'settings',
    label: 'Settings',
  },

  {
    routeLink: '/logout', // Route to be used or "#" if no routing
    icon: 'logout',
    label: 'Sign Out',
    isLogout: true, // add this flag to style/logout action specifically
  },
];
