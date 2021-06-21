import React, { useState } from "react";
import '../Styles/LoginStyle.css';
import {LoginSystemContex} from '../contexts/loginContext';
import { useHistory } from "react-router-dom";

export default function LoginPage() {

    const {loginGetToken} = React.useContext(LoginSystemContex);
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [serverError, setServerError] = useState("")
    const history = useHistory()

    function sendData() {
        
        const contErrorAndLoading = document.getElementById('errorAndLoadingCont')
        if(contErrorAndLoading != null) contErrorAndLoading.style.display = 'flex'

        const serveErrorCamp = document.getElementById('serverError')
        if(serveErrorCamp != null) serveErrorCamp.style.display = 'none'

        const loginElement = document.getElementById('loadingCont')
        if(loginElement != null) loginElement.style.display = "flex"


        ///Only delay Test
        setTimeout(function(){  
            const data = loginGetToken({email, senha})

            data.then(value => {
                if(value === 0) {
                    history.push("/")
                }
                else {
                    if(loginElement != null) loginElement.style.display = "none"
                    if(serveErrorCamp != null) serveErrorCamp.style.display = 'block'
                    setServerError(String(value))
                }
            })
    
        }, 1000);
        
    }

    function handleEmailVerify(txtValue: string) {
        setEmail(txtValue)

        const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
        
        if(pattern.test(txtValue)) {
            const emailCamp = document.getElementById('emailCamp')
            if(emailCamp != null) emailCamp.classList.remove('errorLabel')
            setEmailError("")
        }
        else {
            const emailCamp = document.getElementById('emailCamp')
            if(emailCamp != null) emailCamp.classList.add('errorLabel')
            setEmailError("Email Incorreto")
        }
        
    }

    function handlePasswordVerify(txtValue: string) {
        setSenha(txtValue)
        const passwordCamp = document.getElementById('passwordCamp')

        if(txtValue.length > 16 || txtValue.length < 4) {
            setPasswordError("A senha deve conter de 4 a 16 Caracteres")
            if(passwordCamp != null) passwordCamp.classList.add('errorLabel')
        }
        else {
            setPasswordError("")
            if(passwordCamp != null) passwordCamp.classList.remove('errorLabel')
        }
        
    }

    return (
        <div className="pageCont">
            <div className="loginCont">
                <h1>LOGIN</h1>
                <div id="errorAndLoadingCont" className="errorAndLoadingCont">
                    <p id="serverError" className="errorMessage">{serverError}</p>
                    <div id="loadingCont" className="loadingCont"></div>
                </div>
                <label id="emailCamp">
                    <p>EMAIL</p>
                    <span></span>
                    <input type="email" id="username" autoComplete="off" value={email} onChange={e => {handleEmailVerify(e.target.value)}} />
                    <p>{emailError}</p>    
                </label>
                
                <label id="passwordCamp">
                    <p>SENHA</p>
                    <span></span>
                    <input type="password" id="password" autoComplete="off" value={senha} onChange={e => {handlePasswordVerify(e.target.value)}}/>
                    <p>{passwordError}</p>    
                </label>
                
                <div className="loginButtonsCont">
                    <button onClick={sendData}>ENTRAR</button>
                    <button onClick={sendData}>Registrar-se</button>
                </div>
                
            </div>
        </div>
    )
}