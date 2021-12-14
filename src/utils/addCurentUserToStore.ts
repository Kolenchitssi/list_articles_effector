// eslint-disable-next-line import/no-extraneous-dependencies
import { User } from '@firebase/auth';
import { useStore } from 'effector-react';
import { IUser } from '../models/IUser';
import { setCurrentUser, $currentUser } from '../store/currentUser';

export const addCurrentUserToStore = (currentUser: User) => {
  const profileUser: IUser = {
    email: currentUser.email || '',
    name: currentUser?.displayName || 'noName',
    id: currentUser.uid,
    avatar: currentUser?.photoURL || '',
  };

  // добавить текущего юзера в store
  setCurrentUser(profileUser);
};
