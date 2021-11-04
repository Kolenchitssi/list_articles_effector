import { createEvent, createStore } from 'effector';
import { IUser } from '../models/IUser';
// Создаем хранилище, в котором будет лежать текущий пользователь
// IUser — интерфейс, описывающий пользователя (имя, фамилия и т.п.)

// Создаем событие, принимающее значение авторизирован пользователь или нет
export const getCurrentUser = createEvent<IUser>();

// создаем store  и подписываемся на созданное событие
export const $currentUser = createStore<IUser>({} as IUser).on(
  getCurrentUser,
  (store, payload) => payload
);
