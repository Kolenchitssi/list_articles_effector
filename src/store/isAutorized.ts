import { createEvent, createStore } from 'effector';
import { IUser } from '../models/IUser';

// Создаем событие, принимающее значение авторизирован пользователь или нет
export const isAuth = createEvent<boolean>();

// создаем store  и подписываемся на созданное событие
export const $isAuthorized = createStore<boolean>(false).on(
  isAuth,
  (store, payload) => payload
);
