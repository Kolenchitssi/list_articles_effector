import { createEvent, createStore } from 'effector';
import { IUser } from '../models/IUser';

// Создаем событие, принимающее значение авторизирован пользователь или нет
export const setAuth = createEvent<boolean>();

// создаем store  и подписываемся на созданное событие
export const $isAuthorized = createStore<boolean>(false).on(
  setAuth,
  (store, payload) => payload
);
