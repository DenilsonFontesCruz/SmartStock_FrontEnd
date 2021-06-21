import React, { useState, useContext } from "react";
import styles from '../Styles/RegisterStyle/RegisterStyle.module.css';
import {LoginSystemContex} from '../contexts/loginContext';
import { useHistory } from "react-router-dom";

export default function RegisterPage() {

    const {} = useContext(LoginSystemContex);
    const history = useHistory()

    window.addEventListener("keypress", e => {
        if (e.key === 'Enter') {
            const loginButton = document.getElementById("loginButton")
            if(loginButton != null) {
                loginButton.classList.add(styles.loginButtonHover)
                setTimeout(() => {
                    loginButton.classList.remove(styles.loginButtonHover)
                    loginButton.classList.add(styles.loginButtonActive)
                    return setTimeout(() => {
                        if(loginButton != null) {
                            loginButton.classList.remove(styles.loginButtonActive)
                            loginButton.click()
                        } 
                    }, 400)
                }, 200)
                
            }
        }
    }) 




    return (
        <p>Login Page</p>
    )
}