import { Route } from 'react-router-dom';
import BookIcon from '../components/icons/BookIcon';
import BuildIcond from '../components/icons/BuildIcond';
import GridIcon from '../components/icons/GridIcon';
import KeyIcon from '../components/icons/KeyIcon';
import UsersIcon from '../components/icons/UsersIcon';
import { Bookings, Contact, Dashboard, Rooms } from '../pages';
import Users from '../pages/Users';

interface Route {
  to: string;
  path: string;
  Component: () => JSX.Element;
  name: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

export const routes: Route[] = [
  {
    to: '/dashboard',
    path: 'dashboard',
    Component: Dashboard,
    name: 'Dashboard',
    Icon: GridIcon,
  },
  {
    to: '/bookings',
    path: 'bookings',
    Component: Bookings,
    name: 'Bookings',
    Icon: BookIcon,
  },
  {
    to: '/rooms',
    path: 'rooms',
    Component: Rooms,
    name: 'Rooms',
    Icon: KeyIcon,
  },
  {
    to: '/contact',
    path: 'contact',
    Component: Contact,
    name: 'Contact',
    Icon: BuildIcond,
  },
  {
    to: '/users',
    path: 'users',
    Component: Users,
    name: 'Users',
    Icon: UsersIcon,
  },
];
