/* eslint-disable import/no-extraneous-dependencies */
import React, { FC, SyntheticEvent, useState } from 'react';
import { addDoc, collection, getFirestore } from '@firebase/firestore';
import { getDownloadURL } from '@firebase/storage';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { Alert, Form, Input, Button } from 'antd';
import css from './Registration.module.scss';
import { IUser } from '../../models/IUser';
import { setAuth } from '../../store/isAutorized';
import { addCurrentUserToStore } from '../../utils/addCurentUserToStore';
import { writingImageToFirebase } from '../../utils/writingImageToFirebase';
import { IUserRegistration } from '../../models/IUserRegistration';

const Registration: FC = () => {
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState('');
  const [userData, setUserData] = useState<IUserRegistration>({
    email: '',
    password: '',
    id: '',
    name: '',
    avatar: '',
  } as IUserRegistration);

  const auth = getAuth();
  const handleRegistration = async (e: SyntheticEvent<HTMLFormElement>) => {
    try {
      // создаем пользвателя в БД firebase
      const user = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      // добавляем значения в поля  БД firebase
      await updateProfile(user.user, {
        displayName: userData.name,
        photoURL: userData.avatar || '',
      });
      console.log(user);

      // add to sore isAutorization true
      setAuth(true);
      addCurrentUserToStore(user.user);
    } catch (error: any) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }

    // add user to database allUsers
    await onAuthStateChanged(auth, user => {
      const db = getFirestore();
      addDoc(collection(db, 'allUsers'), {
        name: user?.displayName,
        email: user?.email,
        id: user?.uid,
        avatar: userData.avatar,
      });
    });

    setUserData({
      email: '',
      password: '',
      id: '',
      name: '',
      avatar: '',
    });
  };

  return (
    <>
      <Alert
        type='warning'
        style={{ textAlign: 'center' }}
        message='Заполните поля для регистрации'
        description='Обязательные поля отмечены *'
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
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ remember: true }}
        onFinish={handleRegistration}
        onFinishFailed={() => setErrorMsg('Ошибка регистрации')}
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

        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            placeholder='your name'
            value={userData.name}
            onChange={e => {
              setUserData({ ...userData, name: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item
          label='Avatar'
          name='avatar'
          rules={[{ required: false, message: 'Please input your avatar' }]}
        >
          <Input
            type='file'
            accept='.jpg, .jpeg, .png'
            placeholder='your avatar'
            value={userData.avatar}
            onChange={async e => {
              const files = e.target.files;
              if (files) {
                const imagesRefs = writingImageToFirebase(files[0]); // получаем ref  img файлa
                // eslint-disable-next-line no-await-in-loop
                const urlImg1 = await getDownloadURL(imagesRefs); // получаем полный url картинки
                // imagesPath = urlImg1.toString();
                setUserData({ ...userData, avatar: urlImg1 });
              }
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
    </>
  );
};

export default Registration;
