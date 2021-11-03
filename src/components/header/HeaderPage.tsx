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
        <div>
          <Button type='ghost' size='large' className={css.buttonLogout}>
            {' userName:'}
            Выйти
          </Button>
        </div>
      ) : (
        <div>
          {' '}
          Гость:{' '}
          <Button type='ghost' size='large' className={css.buttonLogIn}>
            Войти
          </Button>
          <Button type='ghost' size='large' className={css.buttonLogIn}>
            регистрация
          </Button>
        </div>
      )}
    </Header>
  );
};

export default HeaderPage;
