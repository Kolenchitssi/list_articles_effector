import { Avatar } from 'antd';
import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { $currentUser } from '../../store/currentUser';
import css from './Profile.module.scss';

const Profile: FC = () => {
  // console.log('user.user', user.user, 'authUser', authUser);
  // const currentUser: IUser = {
  //   email: userData.email,
  //   id: user.user.uid,
  //   name: user.user.displayName || 'noName',
  //   avatar: user.user.photoURL || '',
  // };
  // setCurrentUser(currentUser);
  const user = useStore($currentUser);

  console.log(
    'current user in store',
    $currentUser.defaultState,
    'defaultState-не использовать!!',
    'user',
    user
  );
  return (
    <div className={css.profileWrapper}>
      <div className={css.card}>
        <p className={css.headerCard}>Профиль пользователя</p>
        <div className={css.wrapperCard}>
          <div className={css.leftCard}>
            <Avatar src={user.avatar} size={120} shape='square' />
          </div>
          <div className={css.leftCard}>
            <p> Имя пользователя: {user.name} </p>
            <p> e-mail: {user.email}</p>
            <p>id: {user.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
