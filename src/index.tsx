import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginSystemProvider from './contexts/loginContext';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {CookiesProvider} from 'react-cookie';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider >
      <LoginSystemProvider>
        <App />
      </LoginSystemProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
