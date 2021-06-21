import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import SmartStockAPI from '../services/SmartStockApi'
import useCallbackState from '../modules/useCallbackState/useCallbackState'
import cookies, {useCookies} from 'react-cookie';

interface loginData {
    email: string,
    senha: string,
}

interface accountData {
    email: string,
    nome: string,
    id: number,
}

interface LoginSystemContexData {
    token: string,
    accountData: accountData,
    loginActive: boolean,
    loginGetToken: ({}: loginData) => Promise<unknown>,
    haveCookiePermition: () => void,
}

interface LoginSystemProviderProps {
    children: ReactNode;
}

export const LoginSystemContex = createContext({} as LoginSystemContexData);

export default function LoginSystemProvider({ children, ...rest }: LoginSystemProviderProps) {

    const [cookies, setCookie, removeCookie] = useCookies(['SmartStockCookies'])
    const [token, setToken] = useState("")
    const [loginActive, setLoginActive] = useState(false)
    const [accountData, setAccountData] = useState({} as accountData)

    function haveCookiePermition() {
        if(cookies.permission != null) {
            if(cookies.permission === 'true') {
                console.log("troxa")
                haveAccountInCookies()
            }  
        }
        else {
            setCookie('permission', window.confirm("Você permite que o site salve Cookies com seus Dados?")) 
        }
    }

    function haveAccountInCookies() {
        if(cookies.accountData != null && cookies.token != null && cookies.loginActive != null) {
            setToken(cookies.token)
            setAccountData(cookies.accountData)
            setLoginActive(cookies.loginActive)
        }
    }

    async function loginGetToken(LoginData: loginData) {
        
                const data = await SmartStockAPI.post(`/login`, JSON.stringify(LoginData))
    
                .then(res => {
                    setToken(res.headers.authorization)
                    if(cookies.permission === 'true'){
                        setCookie('token', res.headers.authorization)
                    }   
                    return res.data
                })
                .then(data => {
                    const {Email, ID, Nome} = data
                    setAccountData({
                        email: Email,
                        nome: Nome,
                        id: ID
                    })
                    if(cookies.permission === 'true'){
                        setCookie('accountData', {
                            email: Email,
                            nome: Nome,
                            id: ID
                        })
                    }              
                })
                .then(() => {
                    setLoginActive(true)
                    if(cookies.permission === 'true'){
                        setCookie('loginActive', true)
                    }     
                    return 0
                })
                .catch (error => {
                    if(error.response != null) {
                        if(error.response.data.message != null) {
                            return error.response.data.message
                        }
                        else {
                            return "Erro não identificado"
                        } 
                    }
                    else {
                        return "Erro no servidor"
                    }
                })
    
                return data

            
    }


    return (
        <LoginSystemContex.Provider 
        value={{
            token,
            accountData,
            loginActive,
            loginGetToken,
            haveCookiePermition
        }}
        >
            {children}
        </LoginSystemContex.Provider>
    )
    

}