import { Button } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { FC } from 'react';
import css from './HeaderPage.module.scss';

const HeaderPage: FC = () => {
  const isAuthorized = true;
  return (
    <Header className={css.header}>
      Articles List
      {isAuthorized ? (
        <Button type='ghost' size='large' className={css.button}>
          {' '}
          LogOut
        </Button>
      ) : null}
    </Header>
  );
};

export default HeaderPage;
