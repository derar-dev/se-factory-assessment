import Cookies from "js-cookie";
import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../axios"
import { AuthContext } from "../contexts/AuthContext";
function Login() {
    const [state, dispatch] = useContext(AuthContext)
    const emailRef = useRef("")
    const passwordRef = useRef("")
    const [error, setError] = useState("")
    const history = useHistory();
    // Login 
    function login(e) {
        // Prevent default submittion of the form
        e.preventDefault();
        // Get user's input
        const email = emailRef.current.value
        const password = passwordRef.current.value
        // prepare requests-body
        const body = { email, password }
        // send credentials
        axios.post("/auth/login", body).then((response) => {
            response = response.data;
            Cookies.set("access-token", response.access_token)
            dispatch({ type: "setLoged", payload: true })
            dispatch({ type: "setUser", payload: response.user })
            dispatch({ type: "setToken", payload: response.access_token })
            history.push({
                pathname: "/"
            })
        }).catch((e) => {
            if (e.response) {
                const response = e.response
                if (response.status === 401) {
                    setError(response.data.error)
                }
                else {
                    setError("Unknown error !")
                }
            }
        })

    }
    return (
        <div className="min-h-screen flex items-center justify-center">

            <form className="border border-gray-200 w-2/6 px-10 py-12 rounded" onSubmit={(e) => login(e)}>
                <h2 className="mb-12 text-4xl font-semibold text-gray-600 text-center">Account Login</h2>
                {/* If there is an error */}
                {
                    error.length > 0 &&
                    <div className="text-white bg-red-400 px-2 py-3 rounded mb-4 text-sm flex justify-between items-center">
                        <span>{error}</span>
                        <span className="cursor-pointer" onClick={() => setError("")}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </div>
                }
                {/* end If there is an error */}
                <div className="mb-6">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" autoFocus required ref={emailRef} />
                </div>
                <div className="mb-6">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required minLength={3} ref={passwordRef} />
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white block py-2 w-full rounded">Login</button>
            </form>
        </div>
    )
}


export default Login