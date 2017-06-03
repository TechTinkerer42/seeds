import { fromJS, Map } from "immutable"
import {
    REQUEST_LOGIN,
    RECEIVE_LOGIN,
    REQUEST_LOGOUT,
    RECEIVE_LOGOUT
} from "../actions/login"

export function user( state = fromJS({
    "isFetching": false,
    "userInfo": Map()
}), action: any ){
	switch ( action.type ) {
    case REQUEST_LOGIN:
        return state.set( "isFetching", true )
            .set( "userInfo", Map() )
    case RECEIVE_LOGIN:
        return state.set( "isFetching", false )
            .set( "userInfo", fromJS( action.payload ) )
    case REQUEST_LOGOUT:
        return state.set( "isFetching", true )
    case RECEIVE_LOGOUT:
        return state.set( "isFetching", false )
            .set( "userInfo", Map() )
    default:
        return state
    }
}