import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import { initializeApp } from 'firebase/app';

import App from './App';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDlZsQMrO8uhGivMlUXjf0eaaNaqW-Gurg',
  authDomain: 'listarticleseffector.firebaseapp.com',
  projectId: 'listarticleseffector',
  storageBucket: 'listarticleseffector.appspot.com',
  messagingSenderId: '148700831262',
  appId: '1:148700831262:web:b43789d6fa6eff5297980f',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
