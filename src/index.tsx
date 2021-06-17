import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginSystemProvider from './contexts/loginContext';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <LoginSystemProvider>
      <App />
    </LoginSystemProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
