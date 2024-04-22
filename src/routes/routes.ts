import { Route } from 'react-router-dom';
import BookIcon from '../components/icons/BookIcon';
import GridIcon from '../components/icons/GridIcon';
import InBoxIcon from '../components/icons/InBoxIcon';
import KeyIcon from '../components/icons/KeyIcon';
import UsersIcon from '../components/icons/UsersIcon';
import { BookingsPage, ContactPage, DashboardPage, RoomsPage, UsersPage } from '../pages';

interface Route {
  to: string;
  path: string;
  Component: () => JSX.Element;
  name: string;
  Icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

export const routes: Route[] = [
  {
    to: 'dashboard',
    path: 'dashboard',
    Component: DashboardPage,
    name: 'Dashboard',
    Icon: GridIcon,
  },
  {
    to: 'bookings',
    path: 'bookings',
    Component: BookingsPage,
    name: 'Bookings',
    Icon: BookIcon,
  },
  {
    to: 'rooms',
    path: 'rooms',
    Component: RoomsPage,
    name: 'Rooms',
    Icon: KeyIcon,
  },
  {
    to: 'contact',
    path: 'contact',
    Component: ContactPage,
    name: 'Contact',
    Icon: InBoxIcon,
  },
  {
    to: 'users',
    path: 'users',
    Component: UsersPage,
    name: 'Users',
    Icon: UsersIcon,
  },
];
