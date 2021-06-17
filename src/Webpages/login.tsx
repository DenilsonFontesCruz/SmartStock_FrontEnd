import React, { useState } from "react";
import '../Styles/LoginStyle.css';
import {LoginSystemContex} from '../contexts/loginContext';
import { useHistory } from "react-router-dom";

export default function LoginPage() {

    const {loginActive, loginGetToken, token} = React.useContext(LoginSystemContex);
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const history = useHistory()

    function sendData() {
        
        const data = loginGetToken({email, senha})

        data.then(value => {
            if(value === 0) {
                history.push("/")
            }
            else {
                console.log(value)
            }
        })

    }

    return (
        <div className="pageCont">
            <div className="loginCont">
                <h1>LOGIN</h1>
                <p>EMAIL:</p>
                <input type="text" id="username" onChange={e => setEmail(e.target.value)}/>
                <p>SENHA:</p>
                <input type="text" id="password" onChange={e => setSenha(e.target.value)}/>
                <button onClick={sendData}>Enviar</button>
            </div>
        </div>
    )
}