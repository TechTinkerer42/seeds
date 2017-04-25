import * as React from "react"
import { createStore, combineReducers, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import { HashRouter as Router, Route } from "react-router-dom"
import * as ReactRouterRedux from "react-router-redux"
import thunkMiddleware from "redux-thunk"
import logger from "redux-logger"
import * as reducers from "./reducers/"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Logout from "./pages/Logout"

let createStoreWithMiddleware

if ( process.env.NODE_ENV === "production" ) {
    createStoreWithMiddleware= applyMiddleware(
        thunkMiddleware
    )( createStore )
} else {
    createStoreWithMiddleware= applyMiddleware(
        logger,
        thunkMiddleware
    )( createStore )
}

const store = createStoreWithMiddleware(
    combineReducers( Object.assign({}, reducers, {
        routing: ReactRouterRedux.routerReducer
    }))
)

export default class Root extends React.Component<any, any> {
    render() {
        return (
            <Provider store={ store } >
                <Router >
                    <div className="container">
                        <Route exact path="/" component={ Home } />
                        <Route path="/login" component={ Login } />
                        <Route path="/logout" component={ Logout } />
                    </div>
                </Router>
            </Provider>
        )
    }
}