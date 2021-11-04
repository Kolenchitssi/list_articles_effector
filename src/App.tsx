import { Layout } from 'antd';
import { useStore } from 'effector-react';
import React, { FC } from 'react';
import './App.scss';
import AppRouter from './components/AppRouter/AppRouter';
import FooterPage from './components/Footer/FooterPage';
import HeaderPage from './components/header/HeaderPage';
// import { $store, $users, plus, minus } from './store/store';
import { $isAuthorized } from './store/isAutorized';

const App: FC = () => {
  // const { defaultState } = $store;
  // $store.defaultState = 8; //так наверно нельзя делать
  const isAuthorized = useStore($isAuthorized);
  // const count = useStore($store);

  return (
    <>
      <HeaderPage isAuthorized={isAuthorized} />
      <Layout style={{ minHeight: '82vh' }}>
        <AppRouter isAuthorized={isAuthorized} />
      </Layout>
      <FooterPage />

      {/* <div className='App'>
        <button type='button' onClick={() => plus(count + 1)}>
          +
        </button>
        <h2>score: {count} </h2>{' '}
        <button type='button' onClick={() => minus(count - 2)}>
          -
        </button>
      </div> */}
    </>
  );
};

export default App;
