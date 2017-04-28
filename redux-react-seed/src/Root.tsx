import * as React from "react"
import { createStore, combineReducers, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunkMiddleware from "redux-thunk"
import logger from "redux-logger"
import createHistory from "history/createHashHistory"
import { Route } from "react-router"
import { ConnectedRouter, routerReducer, routerMiddleware } from "react-router-redux"

import * as reducers from "./reducers/"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Logout from "./pages/Logout"

const history = createHistory()
const historyMiddleware = routerMiddleware( history )
let createStoreWithMiddleware

if ( process.env.NODE_ENV === "production" ) {
    createStoreWithMiddleware= applyMiddleware(
        thunkMiddleware,
        historyMiddleware
    )( createStore )
} else {
    createStoreWithMiddleware= applyMiddleware(
        logger,
        thunkMiddleware,
        historyMiddleware
    )( createStore )
}

const store = createStoreWithMiddleware(
    combineReducers( Object.assign({}, reducers, {
        routing: routerReducer
    }))
)

export default class Root extends React.Component<any, any> {
    render() {
        return (
            <Provider store={ store } >
                <ConnectedRouter history={ history } >
                    <div className="container">
                        <Route exact path="/" component={ Home } />
                        <Route path="/login" component={ Login } />
                        <Route path="/logout" component={ Logout } />
                    </div>
                </ConnectedRouter>
            </Provider>
        )
    }
}