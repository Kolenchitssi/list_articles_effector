import {
  ContainerTwoTone,
  CopyFilled,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { RoutePath } from '../../router/RoutePath';
import Navigation from '../Navigation/Navigation';
import css from './HeaderPage.module.scss';

interface IProps {
  isAuthorized: boolean;
}

const HeaderPage: FC<IProps> = props => {
  const { isAuthorized } = props;
  const history = useHistory();
  return (
    <Header className={css.header}>
      {isAuthorized ? (
        <>
          <div className={css.headerWrapper}>
            <h1>
              <CopyFilled /> <span className={css.h1Text}> Articles List</span>{' '}
            </h1>
            <div>
              <span className={css.text}>{' userName:'} </span>
              <Button type='ghost' size='large' className={css.buttonLogout}>
                <LogoutOutlined />
                Logout
              </Button>
            </div>
          </div>
          <div className={css.navigation}>
            <Navigation />
          </div>
        </>
      ) : (
        <>
          {' '}
          <div className={css.headerWrapper}>
            <h1>Articles List </h1>
            <div>
              <span className={css.text}> Гость: </span>
              <Button type='ghost' size='large' className={css.buttonLogin}>
                <LoginOutlined />
                Login
              </Button>
              <Button
                type='ghost'
                size='large'
                className={css.buttonRegistration}
                onClick={() => {
                  history.push(RoutePath.REGISTRATION);
                }}
              >
                <UserAddOutlined />
                Registration
              </Button>
            </div>
          </div>
        </>
      )}
    </Header>
  );
};

export default HeaderPage;
