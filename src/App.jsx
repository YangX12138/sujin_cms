import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Layouts from './layouts/Layouts';
import Login from './containers/Login/Login';
import history from './history';

function App() {
    return (
        <Router history={history}>
            <div>
                <Switch>
                    <Route path={"/login"} component={Login} />
                    <Route path={"/"} component={Layouts} />
                </Switch>
            </div>
        </Router>
    )
}

export default App;