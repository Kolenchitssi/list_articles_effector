import React, { FC, SyntheticEvent, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { Alert, Button, Form, Input } from 'antd';
import { $isAuthorized, isAuth } from '../../store/isAutorized';
import { $currentUser } from '../../store/currentUser';

import css from './Auth.module.scss';

export interface IUserData {
  email: string;
  password: string;
}

const Auth: FC = () => {
  const [userData, setUserData] = useState<IUserData>({
    email: '',
    password: '',
  } as IUserData);

  const [errorMsg, setErrorMsg] = useState('');
  const authUser = getAuth();

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    try {
      const user = await signInWithEmailAndPassword(
        authUser,
        userData.email,
        userData.password
      );
      console.log(user);
      // isAutorization=true //add to sore
    } catch (error: any) {
      setErrorMsg(error.message);
    }

    setUserData({
      email: '',
      password: '',
    });
  };

  return (
    <div>
      <Alert
        type='warning'
        style={{ textAlign: 'center' }}
        message='Доступ закрыт'
        description='Просмотр доступен только для авторизированных пользователей. Войдите или зарегистрируйтесь'
      />

      {errorMsg && (
        <Alert
          type='error'
          style={{ marginBottom: 20, textAlign: 'center' }}
          message='Error registration'
          description={errorMsg}
        />
      )}
      <Form
        className={css.form}
        name='auth'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ remember: true }}
        onFinish={handleLogin}
        onFinishFailed={() => setErrorMsg('Неправильный логин или пароль')}
        autoComplete='off'
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            placeholder='email'
            value={userData.email}
            onChange={e => {
              setUserData({ ...userData, email: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            placeholder='password'
            value={userData.password}
            onChange={e => {
              setUserData({ ...userData, password: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type='ghost'
            size='large'
            htmlType='submit'
            className={css.buttonRegistration}
          >
            Registration
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Auth;
