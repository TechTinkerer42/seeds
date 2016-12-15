import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, browserHistory } from "react-router";
import { Provider } from "mobx-react";
import User from "./classes/User";
import Homepage from "./Homepage";
import Login from "./Login";

let user = new User();

ReactDOM.render(
    (
        <Provider user={user} >
            <Router history={browserHistory}>
                <Route path="/" component={Homepage} />
                <Route path="login" component={Login} />
            </Router>
        </Provider>
    ),
    document.getElementById("root")
);