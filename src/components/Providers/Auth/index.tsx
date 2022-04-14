import React from 'react'
import {
    createContext,
    Dispatch,
    useContext,
    useReducer,
} from 'react';
import Reducer, { Action } from './reducer'

interface AuthProviderProps {
    children: React.ReactNode
}

export interface AuthContext {
    apiKey: string
    userName?: string
    accessToken: string
}

export interface AuthStore {
    state: AuthContext
    dispatch?: Dispatch<Action>
}


const initialState: AuthContext = {
    apiKey: '',
    userName: 'Aya',
    accessToken: ''
}

const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props
    const [state, dispatch] = useReducer(Reducer, initialState)

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    )
}

export const Context = createContext<AuthStore>({ state: initialState })
export const useAuthContext = () => useContext(Context)

export default AuthProvider