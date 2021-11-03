import { createEvent, createStore } from 'effector';
import { IUser } from '../models/IUser';

// Создаем хранилище, в котором будет лежать массив пользователей
// IUser — интерфейс, описывающий пользователя (имя, фамилия и т.п.)

export const $users = createStore<IUser[]>([]);
export const $isAuthorized = createStore<boolean>(false);

// Создаем событие, принимающее параметр IUser
export const update = createEvent<IUser>();

export const plus = createEvent<number>();
export const minus = createEvent<number>();

// Обычный хендлер на обновление. Добавляем или изменяем пользователя
const updateStore = (state: IUser[], data: IUser) => {
  const userIndex = state.findIndex(user => user.id === data.id);

  // Изменяем стейт
  if (userIndex > -1) {
    state.splice(userIndex, 1, data);
  } else {
    state.push(data);
  }

  // Возвращаем измененный стейт
  return [...state];
};

// Подписываемся на событие в хранилище
$users.on(update, updateStore);

export const $store = createStore<number>(5)
  .on(plus, (state, payload) => payload)
  .on(minus, (state, num) => {
    if (num >= 0) return num;
    return 0;
  });
