import { IRoute } from '../models/IRoute';
import { RoutePath } from './RoutePath';

import Auth from '../pages/Auth/Auth';
import Registration from '../pages/Registration/Registration';
import Home from '../pages/Home/Home';
import Profile from '../pages/Profile/Profile';
import AddArticle from '../pages/AddArticle/AddArticle';
import Error from '../pages/Error/Error';
import EditProfile from '../pages/EditProfile/EditProfile';
import EditArticle from '../pages/EditArticle/EditArticles';

export const publicRoutes: IRoute[] = [
  { path: RoutePath.AUTH, exact: true, component: Auth },
  { path: RoutePath.REGISTRATION, exact: true, component: Registration },
  { path: RoutePath.ERROR, exact: true, component: Error },
];

export const privateRoutes: IRoute[] = [
  { path: RoutePath.HOME, exact: true, component: Home },
  { path: RoutePath.PROFILE, exact: true, component: Profile },
  { path: RoutePath.PROFILE, exact: true, component: Registration },
  { path: RoutePath.ERROR, exact: true, component: Error },
  { path: RoutePath.ADD_ARTICLE, exact: true, component: AddArticle },
  { path: RoutePath.EDIT_PROFILE, exact: true, component: EditProfile },
  { path: RoutePath.EDIT_ARTICLE, exact: false, component: EditArticle },
];
