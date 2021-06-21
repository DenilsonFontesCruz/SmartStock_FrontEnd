import React, { useState, useContext } from "react";
import styles from '../Styles/LoginStyle/LoginStyle.module.css';
import {LoginSystemContex} from '../contexts/loginContext';
import { useHistory } from "react-router-dom";

export default function LoginPage() {

    const {loginGetToken} = useContext(LoginSystemContex);
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [serverError, setServerError] = useState("")
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
    

    function selectInputs() {

        const emailCamp = document.getElementById("username")
        const passwordCamp = document.getElementById("password")

        if(email === "" && senha === "") {
            if(emailCamp != null) emailCamp.focus()
        }
        else if(passwordError !== "" && emailError !== ""){
            if(emailCamp != null) emailCamp.focus()
        }
        else if(email === "") {
            if(emailCamp != null) emailCamp.focus()
        }
        else if(emailError !== "") {
            if(emailCamp != null) emailCamp.focus()
        }
        else if(senha === "") {
            if(passwordCamp != null) passwordCamp.focus()
        }
        else if(passwordError !== "") {
            if(passwordCamp != null) passwordCamp.focus()
        }
    }

    function loadingStart() {
        const contErrorAndLoading = document.getElementById('titleLogin')
        if(contErrorAndLoading != null) contErrorAndLoading.style.display = 'none'

        const loginElement = document.getElementById('loadingCont')
        if(loginElement != null) loginElement.style.display = 'flex'

        const serveErrorCamp = document.getElementById('serverError')
        if(serveErrorCamp != null) serveErrorCamp.style.display = 'none'
    }

    function errorStart() {
        const contErrorAndLoading = document.getElementById('titleLogin')
        if(contErrorAndLoading != null) contErrorAndLoading.style.display = 'none'

        const loginElement = document.getElementById('loadingCont')
        if(loginElement != null) loginElement.style.display = 'none'

        const serveErrorCamp = document.getElementById('serverError')
        if(serveErrorCamp != null) serveErrorCamp.style.display = 'flex'
    }

    function sendData() {

        if(email !== "" && senha !== "") {
            if(emailError === "" && passwordError === "") {

                loadingStart()

                ///Only delay Test
                setTimeout(() => {  
                    const data = loginGetToken({email, senha})
        
                    data.then(value => {
                        if(value === 0) {
                            history.push("/")
                        }
                        else {
                            errorStart()
                            setServerError(String(value))
                        }
                    })
            
                }, 1000);
            }
            else {
                selectInputs()
            }
        }
        else {
            selectInputs()
        }
        
        
    }

    function handleEmailVerify(txtValue: string) {
        setEmail(txtValue)

        const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
        
        if(pattern.test(txtValue)) {
            const emailCamp = document.getElementById('emailCamp')
            if(emailCamp != null) emailCamp.classList.remove(styles.errorLabel)
            setEmailError("")
        }
        else {
            const emailCamp = document.getElementById('emailCamp')
            if(emailCamp != null) emailCamp.classList.add(styles.errorLabel)
            setEmailError("Email Incorreto")
        }
        
    }

    function handlePasswordVerify(txtValue: string) {
        setSenha(txtValue)
        const passwordCamp = document.getElementById('passwordCamp')

        if(txtValue.length > 16 || txtValue.length < 4) {
            setPasswordError("A senha deve conter de 4 a 16 Caracteres")
            if(passwordCamp != null) passwordCamp.classList.add(styles.errorLabel)
        }
        else {
            setPasswordError("")
            if(passwordCamp != null) passwordCamp.classList.remove(styles.errorLabel)
        }
        
    }

    return (
        <div className={styles.pageCont}>
            <div className={styles.loginCont}>
                <h1>LOGIN</h1>
                <div id="errorAndLoadingCont" className={styles.errorAndLoadingCont}>
                    <p id="serverError" className={styles.errorMessage}>{serverError}</p>
                    <div id="loadingCont" className={styles.loadingCont}></div>
                    <p id="titleLogin" className={styles.titleLogin}>SmartStock</p>
                </div>
                <label id="emailCamp">
                    <p>EMAIL</p>
                    <span></span>
                    <input type="email" id="username" autoComplete="off" value={email} onChange={e => {handleEmailVerify(e.target.value)}} />
                    <img src="icons/emailIcon.svg"></img>
                    <p>{emailError}</p>    
                </label>
                
                <label id="passwordCamp">
                    <p>SENHA</p>
                    <span></span>
                    <input type="password" id="password" autoComplete="off" value={senha} onChange={e => {handlePasswordVerify(e.target.value)}}/>
                    <img src="icons/LockIcon.svg"></img>
                    <p>{passwordError}</p>    
                </label>
                
                <div className={styles.loginButtonsCont}>
                    <button id="loginButton" onClick={sendData}>ENTRAR</button>
                    <button onClick={() => history.push("/register")}>Registrar-se</button>
                </div>
                
            </div>
        </div>
    )
}