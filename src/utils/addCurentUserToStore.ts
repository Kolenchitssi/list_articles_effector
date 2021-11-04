// eslint-disable-next-line import/no-extraneous-dependencies
import { User } from '@firebase/auth';
import { IUser } from '../models/IUser';
import { getCurrentUser } from '../store/currentUser';

export const addCurrentUserToStore = (currentUser: User) => {
  const profileUser: IUser = {
    email: currentUser.email || '',
    name: currentUser?.displayName || 'noName',
    id: currentUser.uid,
    avatar: currentUser?.photoURL || '',
  };
  console.log('profileUser', profileUser);

  getCurrentUser(profileUser);
  // добавить текущего юзера в store
};
