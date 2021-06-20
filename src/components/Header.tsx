import React, {useContext} from "react";
import "../Styles/HeaderStyle.css";
import {LoginSystemContex} from '../contexts/loginContext'
import { useHistory } from "react-router";

export default function Header() {

    const {loginActive, accountData} = useContext(LoginSystemContex);
    const history = useHistory()

    function goToLogin() {   
        history.push("/login")
    }

    function goToRegister() {
        history.push("/register")
    }

    return (
        <div className="headerContainer">
            <div className="headerLeft">
                <h1>SmartStock</h1>
            </div>

            <div className="headerRight">
            { loginActive ? (
                <div className="accountCont" id="accountCont">
                    <p>{accountData.nome}</p>
                    <img src="icons/avatardefault.svg" alt="avatarDefault" className="avatarIcon"></img>
                </div>
                
            ) : 
            (
                <div className="buttonsCont" id="buttonsCont">
                    <button id="registerButton" onClick={goToRegister}>Cadastrar</button>
                    <button id="loginButton" onClick={goToLogin}>Login</button>
                </div>
            )}
            </div>
        </div>
    )
}