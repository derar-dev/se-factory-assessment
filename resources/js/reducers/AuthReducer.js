export const AuthReducer = (state, action) => {
    switch (action.type) {
        case "setLoged":
            return {
                ...state,
                loged: action.payload
            }
        case "setLoading":
            return {
                ...state,
                loading: action.payload
            }
        case "setUser":
            return {
                ...state,
                user: action.payload
            }
        case "setToken":
            console.log(action.payload)
            return {
                ...state,
                token: action.payload
            }
        default:
            return state
    }
}
export const initialState = {
    loged: false,
    loading: true,
    user: null,
    token: null
}