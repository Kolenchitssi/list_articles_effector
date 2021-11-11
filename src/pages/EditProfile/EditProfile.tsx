/* eslint-disable import/no-extraneous-dependencies */
import { getDownloadURL } from '@firebase/storage';
import { Alert, Button, Form, Input, Row } from 'antd';
import {
  getAuth,
  updateProfile,
  updateEmail,
  updatePassword,
} from 'firebase/auth';

import { FC, SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IUserRegistration } from '../../models/IUserRegistration';
import { addCurrentUserToStore } from '../../utils/addCurentUserToStore';
import { writingImageToFirebase } from '../../utils/writingImageToFirebase';
import css from './EditProfile.module.scss';

const EditProfile: FC = () => {
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

  // 1-обновить имя
  // 2-обновить фото
  // 3-обновить e-mail
  // 4-обновить пароль

  const handleForm = () => {
    history.push('/');
  };

  // обновляем значение поля  имя   БД firebase
  const updateNameUser = async () => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: userData.name,
        });
        addCurrentUserToStore(auth.currentUser);
      }
    } catch (error: any) {
      const errorMessage = error.message;
    }
  };

  // обновляем значение фото  БД firebase
  const updateEmailUser = async () => {
    try {
      if (auth.currentUser) {
        await updateEmail(auth.currentUser, userData.email);
        addCurrentUserToStore(auth.currentUser);
      }
    } catch (error: any) {
      const errorMessage = error.message;
    }
  };

  const updatePasswordUser = async () => {
    try {
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, userData.password);
        addCurrentUserToStore(auth.currentUser);
      }
    } catch (error: any) {
      const errorMessage = error.message;
    }
  };

  const updatePhotoUser = async () => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          photoURL: userData.avatar,
        });
        addCurrentUserToStore(auth.currentUser);
      }
    } catch (error: any) {
      const errorMessage = error.message;
    }
  };

  return (
    <div className={css.wrapperForm}>
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
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={handleForm}
        onFinishFailed={() => setErrorMsg('Ошибка')}
        autoComplete='off'
      >
        <div className={css.rowInput}>
          <span className={css.inputLabel}> E-mail: </span>
          <Input
            placeholder='email'
            value={userData.email}
            onChange={e => {
              setUserData({ ...userData, email: e.target.value });
            }}
          />
          <Button
            type='ghost'
            size='large'
            htmlType='button'
            className={css.buttonEdit}
            onClick={() => updateEmailUser()}
          >
            Save
          </Button>
        </div>

        <div className={css.rowInput}>
          <span className={css.inputLabel}> Password: </span>

          <Input.Password
            placeholder='password'
            value={userData.password}
            onChange={e => {
              setUserData({ ...userData, password: e.target.value });
            }}
          />
          <Button
            type='ghost'
            size='large'
            htmlType='button'
            className={css.buttonEdit}
            onClick={() => updatePasswordUser()}
          >
            Save
          </Button>
        </div>

        <div className={css.rowInput}>
          <span className={css.inputLabel}> Name: </span>
          <Input
            placeholder='your name'
            value={userData.name}
            onChange={e => {
              setUserData({ ...userData, name: e.target.value });
            }}
          />
          <Button
            type='ghost'
            size='large'
            htmlType='button'
            className={css.buttonEdit}
            onClick={() => updateNameUser()}
          >
            Save
          </Button>
        </div>

        <div className={css.rowInput}>
          <span className={css.inputLabel}> Avatar: </span>
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
          <Button
            type='ghost'
            size='large'
            htmlType='button'
            className={css.buttonEdit}
            onClick={() => updatePhotoUser()}
          >
            Save
          </Button>
        </div>
        <div className={css.rowInput}>
          <Button
            type='ghost'
            size='large'
            htmlType='submit'
            className={css.buttonCancel}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditProfile;
