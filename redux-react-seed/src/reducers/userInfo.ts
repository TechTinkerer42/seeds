import { fromJS, Map } from "Immutable"
import {
    REQUEST_LOGIN,
    RECEIVE_LOGIN,
    REQUEST_LOGOUT,
    RECEIVE_LOGOUT
} from "../actions/login"

export function userInfo( state = fromJS({
    "isFetching": false,
    "username": null
}), action: any ){
	switch ( action.type ) {
    case REQUEST_LOGIN:
        return state.set( "isFetching", true )
    case RECEIVE_LOGIN:
        return state.set( "isFetching", false )
            .set( "username", action.userinfo.username )
    case REQUEST_LOGOUT:
        return state.set( "isFetching", true )
    case RECEIVE_LOGOUT:
        return state.set( "isFetching", false )
            .set( "username", null )
    default:
        return state
    }
}