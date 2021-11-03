// import { createUserWithEmailAndPassword, getAuth } from '@firebase/auth';
import React, { FC, useState } from 'react';

export interface IUserData {
  email: string;
  password: string;
}

const Auth: FC = () => {
  //   const [userData, setUserData] = useState<IUserData>({
  //     email: '',
  //     password: '',
  //   } as IUserData);

  const [error, setError] = useState('');

  //   const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     // const auth = getAuth();
  //     if (isRegForm) {
  //       try {
  //         const user = await createUserWithEmailAndPassword(
  //           ga,
  //           userData.email,
  //           userData.password
  //         );
  //         await updateProfile(user.user, {
  //           displayName: userData.name,
  //         });
  //         console.log(user);
  //       } catch (error: any) {
  //         setError(error.message);
  //       }
  //     } else {
  //       try {
  //         const user = await signInWithEmailAndPassword(
  //           ga,
  //           userData.email,
  //           userData.password
  //         );
  //         console.log(user);
  //       } catch (error: any) {
  //         setError(error.message);
  //       }
  //     }

  //     setUserData({
  //       email: '',
  //       password: '',
  //       name: '',
  //     });
  //   };

  return (
    <div>
      <p>
        Просмотр доступен только для авторизированных пользователей. Войдите или
        зарегистрируйтесь
      </p>
    </div>
  );
};

export default Auth;
