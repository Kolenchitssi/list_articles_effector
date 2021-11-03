import { Layout } from 'antd';
import { useStore } from 'effector-react';
import React, { FC } from 'react';
import './App.scss';
import AppRouter from './components/AppRouter/AppRouter';
import HeaderPage from './components/header/HeaderPage';
import { $store, $users, plus, minus } from './store/store';

const App: FC = () => {
  console.log($store, $users);
  const { defaultState } = $store;
  // $store.defaultState = 8; //так наверно нельзя делать
  const count = useStore($store);

  return (
    <>
      <HeaderPage />
      <Layout>
        <AppRouter />
      </Layout>

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
