import { IRoute } from '../models/IRoute';
import Auth from '../pages/Auth/Auth';
import Home from '../pages/Home/Home';
import Profile from '../pages/Profile/Profile';
import Registration from '../pages/Registration/Registration';
import { RoutePath } from './RoutePath';

export const publicRoutes: IRoute[] = [
  { path: RoutePath.AUTH, exact: true, component: Auth },
  { path: RoutePath.PROFILE, exact: true, component: Registration },
];

export const privateRoutes: IRoute[] = [
  { path: RoutePath.HOME, exact: true, component: Home },
  { path: RoutePath.PROFILE, exact: true, component: Profile },
  { path: RoutePath.PROFILE, exact: true, component: Registration },
];
