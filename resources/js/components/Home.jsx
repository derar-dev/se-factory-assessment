import { useContext, useEffect, useState } from "react"
import axios from "../axios";
import Loader from "./Loader";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Auth from "./Auth";
import QuotesList from "./QuotesList";
import { AuthContext } from "../contexts/AuthContext";
function Home() {
    const [quotes, setQuotes] = useState([]);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [state, dispatch] = useContext(AuthContext)
    useEffect(() => {
        TimeAgo.addDefaultLocale(en)
        getQuotes()
    }, [])
    // Get quotes
    function getQuotes() {
        setLoading(true)
        axios.get("/random-quotes").then((response) => {
            setQuotes(response.data.data)
        }).catch((e) => {
            setError(e.message)
        }).finally(() => {
            setLoading(false)
        })
    }
    // Copy token
    function copyToken() {
        var tokenInput = document.getElementById("token");
        tokenInput.select();
        tokenInput.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(tokenInput.value);
        setCopied(true)
    }

    return (
        <div className="container mx-auto">
            <div className="my-6 flex items-center justify-between">
                <div className="flex items-center">
                    <h2 className=" text-2xl  font-light">Today's Quotes:</h2>
                    <button type="button" disabled={loading} onClick={() => getQuotes()} className={`bg-green-400 text-white px-6 py-1 rounded ml-4 hover:bg-green-500 flex items-center ${loading && 'cursor-wait'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-1">Refresh Quotes</span>
                    </button>
                </div>
                <Auth />
            </div>
            {/* If an error occured */}
            {
                error.length > 0 &&
                <div>
                    {error}
                </div>
            }
            {/* End If an error occured */}

            {/* If request is loading */}
            {
                loading &&
                <div className=" min-h-screen flex items-center justify-center">
                    <Loader />
                </div>
            }
            {/* End If request is loading */}
            {/* if request is done */}
            <QuotesList quotes={quotes} />
            {/* end if request is done */}
            {/* show token if user is loged in */}
            {
                state.loged &&
                <div className=" bg-gray-100 rounded mt-6 p-6 flex items-center">
                    <input readOnly={true} className=" w-auto flex-grow h-9 border-none rounded-tr-none rounded-br-none outline-none" id="token" type="text" value={state.token || "   "} />
                    <button onClick={() => copyToken()} className={` text-white h-9 px-4 rounded-tr rounded-br ${copied ? 'bg-green-400' : 'bg-blue-400'}`}>
                        {
                            copied ? 'Token Copied to clipboard' : 'Copy token '
                        }
                    </button>
                </div>
            }
            {/* end show token if user is loged in */}


        </div>
    )
}

export default Home