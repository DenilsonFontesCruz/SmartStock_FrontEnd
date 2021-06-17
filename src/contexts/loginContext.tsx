import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import SmartStockAPI from '../services/SmartStockApi'

interface loginData {
    email: string,
    senha: string,
}

interface LoginSystemContexData {
    token: string,
    loginActive: boolean,
    loginGetToken: ({}: loginData) => Promise<unknown>,
}

interface LoginSystemProviderProps {
    children: ReactNode;
}

export const LoginSystemContex = createContext({} as LoginSystemContexData);

export default function LoginSystemProvider({ children, ...rest }: LoginSystemProviderProps) {

    const [token, setToken] = useState("")
    const [loginActive, setLoginActive] = useState(false)

    async function loginGetToken(LoginData: loginData) {
        
            const data = await SmartStockAPI.post(`/login`, JSON.stringify(LoginData))
            
            .then(res => {
                setToken(res.headers.authorization)
            })
            .then(() => {
                setLoginActive(true)
                return 0
            })
            .catch (error => {
                if(error.response.data.message != null) {
                    return error.response.data.message
                }
                else {
                    return "Erro não identificado"
                } 
            })

            return data
    }



    return (
        <LoginSystemContex.Provider 
        value={{
            token,
            loginActive,
            loginGetToken
        }}
        >
            {children}
        </LoginSystemContex.Provider>
    )
    

}