import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import { useTypedSelector } from '../hooks/useTypeSelector';
import { RoutePath } from '../../router/RoutePath';
import { privateRoutes, publicRoutes } from '../../router/Router';

const AppRouter = () => {
  // const { isAuth } = useTypedSelector(state => state.auth); надо переделать на effect
  const isAuth = true;
  return isAuth === true ? (
    <Switch>
      {privateRoutes.map(route => (
        <Route
          path={route.path}
          exact={route.exact}
          component={route.component}
          key={route.path}
        />
      ))}
      <Redirect to={RoutePath.ERROR} />
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
};

export default AppRouter;
