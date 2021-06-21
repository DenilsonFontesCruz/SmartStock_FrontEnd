import React, {useContext} from "react";
import styles from "../Styles/HeaderStyle/HeaderStyle.module.css";
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
        <div className={styles.headerContainer}>
            <div className={styles.headerLeft}>
                <h1>SmartStock</h1>
            </div>

            <div className={styles.headerRight}>
            { loginActive ? (
                <div className={styles.accountCont} id="accountCont">
                    <p>{accountData.nome}</p>
                    <img src="icons/avatardefault.svg" alt="avatarDefault" className={styles.avatarIcon}></img>
                </div>
                
            ) : 
            (
                <div className={styles.buttonsCont} id="buttonsCont">
                    <button id="registerButton" onClick={goToRegister}>Cadastrar</button>
                    <button id="loginButton" onClick={goToLogin}>Login</button>
                </div>
            )}
            </div>
        </div>
    )
}