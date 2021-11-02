import { useStore } from 'effector-react';
import React, { FC } from 'react';
import './App.scss';
import HeaderPage from './components/header/HeaderPage';
import { $store, $users, plus, minus } from './store/store';

const App: FC = () => {
  console.log($store, $users);
  const { defaultState } = $store;
  // $store.defaultState = 8;
  const count = useStore($store);

  return (
    <>
      <HeaderPage />
      <div className='App'>
        <button type='button' onClick={() => plus(count + 1)}>
          +
        </button>
        <h2>score: {count} </h2>{' '}
        <button type='button' onClick={() => minus(count - 2)}>
          -
        </button>
      </div>
    </>
  );
};

export default App;
