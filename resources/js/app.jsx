
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
// Components
const Home = React.lazy(() => import('./components/Home'));
const Login = React.lazy(() => import('./components/Login'));
// Providers
import { AuthProvider } from "./contexts/AuthContext";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function App() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    {/* Home page */}
                    <Route path="/" exact>
                        <Suspense fallback={<div></div>}>
                            <Home />
                        </Suspense>
                    </Route>
                    {/* Login page */}
                    <Route path="/login">
                        <Suspense fallback={<div></div>}>
                            <Login />
                        </Suspense>
                    </Route>
                </Switch>
            </AuthProvider>
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));
