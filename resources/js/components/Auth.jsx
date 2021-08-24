import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import Loader from "./Loader"
import axios from "../axios"
import Cookies from "js-cookie"

function Auth() {
    const [state, dispatch] = useContext(AuthContext)
    const [menu, setMenu] = useState(false)

    useEffect(() => {
        checkLogin()
    }, [])
    // check if user is logged in
    function checkLogin() {
        console.log("Checkking ")
        axios.post("auth/me").then((response) => {
            dispatch({ type: "setLoged", payload: true })
            dispatch({ type: "setUser", payload: response.data.user })
            dispatch({ type: "setToken", payload: response.data.token })
        }).catch((e) => {
            if (e.response) {
                if (e.response.status === 401) {
                    dispatch({ type: "setLoged", payload: false })
                }
            }
        }).finally(() => {
            dispatch({ type: "setLoading", payload: false })
        })
    }
    // Logout
    function logout() {
        dispatch({ type: "setLoading", payload: false })
        setMenu(false)
        axios.post("auth/logout").then(() => {
            Cookies.remove("access-token")
            dispatch({ type: "setLoged", payload: false })
            dispatch({ type: "setUser", payload: null })
            dispatch({ type: "setToken", payload: null })
        }).finally(() => {
            dispatch({ type: "setLoading", payload: false })
        })


    }
    return (
        <div>

            {/* if auth is loading */}
            {
                state.loading &&
                <Loader></Loader>
            }
            {/* end if auth is loading */}

            {/* If user is not loged in */}
            {
                (!state.loading && !state.loged) &&
                <div className="flex">
                    <Link to="/login">Login</Link>
                </div>
            }
            {/* end If user is not loged in */}

            {/* If user is not loged in */}
            {
                (!state.loading && state.loged) &&
                <div className="flex text-xs items-center relative">
                    <div className="flex flex-col">
                        <span>Hello {state.user.name}</span>
                        <span className="text-gray-500">{state.user.email}</span>
                    </div>
                    <button className="text-blue-400 text-lg ml-4 font-extralight w-10 text-center flex items-center justify-center" onClick={() => setMenu(!menu)}>
                        {

                            <svg xmlns="http://www.w3.org/2000/svg" className={`transition-all transform h-6 w-6 ${menu && 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        }
                    </button>
                    {
                        menu &&
                        <button onClick={() => logout()} className="absolute top-9 bg-gray-200 w-full z-10 px-2 py-4 rounded  cursor-pointer hover:bg-gray-300 text-sm flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="ml-2">
                                Logout
                            </span>
                        </button>
                    }
                </div>
            }
            {/* end If user is not loged in */}
        </div>
    )
}

export default Auth