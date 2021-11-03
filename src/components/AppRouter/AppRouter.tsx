import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import { useTypedSelector } from '../hooks/useTypeSelector';
import { RoutePath } from '../../router/RoutePath';
import { privateRoutes, publicRoutes } from '../../router/Router';

interface IProps {
  isAuthorized: boolean;
}

const AppRouter: FC<IProps> = ({ isAuthorized }) =>
  isAuthorized === true ? (
    <Switch>
      {privateRoutes.map(route => (
        <Route
          path={route.path}
          exact={route.exact}
          component={route.component}
          key={route.path}
        />
      ))}
      <Redirect to={RoutePath.HOME} />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map(route => (
        <Route
          path={route.path}
          exact={route.exact}
          component={route.component}
          key={route.path}
        />
      ))}
      <Redirect to={RoutePath.AUTH} />
    </Switch>
  );

export default AppRouter;
