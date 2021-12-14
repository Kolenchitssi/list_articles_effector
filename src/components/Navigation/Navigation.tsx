import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { FilePptOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons';
import { RoutePath } from '../../router/RoutePath';
import css from './Navigation.module.scss';

const Navigation = () => {
  const history = useHistory();
  return (
    <>
      {' '}
      <ul>
        <li>
          <NavLink to={RoutePath.HOME}>
            <HomeOutlined />
            <span className={css.link}>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={RoutePath.PROFILE}>
            <TeamOutlined />
            <span className={css.link}>Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={RoutePath.ADD_ARTICLE}>
            <FilePptOutlined />
            <span className={css.link}>Add New Article</span>
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Navigation;
