import {
    createContext,
    Dispatch,
    useEffect,
    useContext,
    useReducer,
} from 'react';
import Reducer, { Action, AuthActions } from './reducer'

interface AuthProviderProps {
    children: React.ReactNode
}

export interface AuthContext {
    apiKey: string
    accessToken: string
}

export interface AuthStore {
    state: AuthContext
    dispatch?: Dispatch<Action>
}


const initialState: AuthContext = {
    apiKey: '',
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