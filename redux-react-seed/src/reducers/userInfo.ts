import { fromJS, Map } from "immutable"
import {
    REQUEST_LOGIN,
    RECEIVE_LOGIN,
    REQUEST_LOGOUT,
    RECEIVE_LOGOUT
} from "../actions/login"

export function userInfo( state = fromJS({
    "isFetching": false,
    "userinfo": Map()
}), action: any ){
	switch ( action.type ) {
    case REQUEST_LOGIN:
        return state.set( "isFetching", true )
            .set( "userinfo", Map() )
    case RECEIVE_LOGIN:
        return state.set( "isFetching", false )
            .set( "userinfo", fromJS( action.userinfo ) )
    case REQUEST_LOGOUT:
        return state.set( "isFetching", true )
    case RECEIVE_LOGOUT:
        return state.set( "isFetching", false )
            .set( "userinfo", Map() )
    default:
        return state
    }
}