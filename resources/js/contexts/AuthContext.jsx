import { useReducer, createContext } from "react"
import { AuthReducer, initialState } from "../reducers/AuthReducer"

export const AuthContext = createContext({
    state: initialState,
    dispatch: () => null
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    return (
        <AuthContext.Provider value={[state, dispatch]}>
            {children}
        </AuthContext.Provider>
    )
}