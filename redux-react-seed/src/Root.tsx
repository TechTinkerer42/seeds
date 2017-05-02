import * as React from "react"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunkMiddleware from "redux-thunk"
import logger from "redux-logger"
import { Router, Route, hashHistory } from "react-router"
import { syncHistoryWithStore, routerReducer, routerMiddleware } from "react-router-redux"
import { Map } from "immutable"
import { combineReducers } from "redux-immutable"

import * as reducers from "./reducers/"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Logout from "./pages/Logout"

let initialState = Map()
let createStoreWithMiddleware
let historyMiddleware = routerMiddleware( hashHistory )

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
    })), 
    initialState
)

const history = syncHistoryWithStore( hashHistory, store, {
    selectLocationState( state ) {
        return state.get( "routing" );
    }
})

export default class Root extends React.Component<any, any> {
    render() {
        return (
            <Provider store={ store } >
                <div className="container">
                    <Router  history={ history } >
                        <Route path="/" component={ Home } />
                        <Route path="/login" component={ Login } />
                        <Route path="/logout" component={ Logout } />
                    </Router >
                </div>
            </Provider>
        )
    }
}