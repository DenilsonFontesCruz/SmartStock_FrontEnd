import React, { useContext } from 'react';
import Webpages from "./Webpages";
import "./App.css";
import { LoginSystemContex } from './contexts/loginContext';

function App() {

  const {haveCookiePermition} = useContext(LoginSystemContex)

  window.onload = () => {
    haveCookiePermition()
  }

  return (  
    <div className="App">
      <Webpages />
    </div>
  );
}

export default App;
