import {
    REQUEST_LOGIN,
    RECEIVE_LOGIN,
    REQUEST_LOGOUT,
    RECEIVE_LOGOUT
} from "../actions/login"

export function userInfo( state = {
    isFetching: false,
    userinfo: {
    }
}, action: any ){
	switch ( action.type ) {
    case REQUEST_LOGIN:
        return Object.assign({}, state, {
            isFetching: true
        })
    case RECEIVE_LOGIN:
        return Object.assign( {}, state, {
            isFetching: false,
            userinfo: action.userinfo
        } )
    case REQUEST_LOGOUT:
        return Object.assign({}, state, {
            isFetching: true
        })
    case RECEIVE_LOGOUT:
        return Object.assign( {}, state, {
            isFetching: false,
            userinfo: action.userinfo
        } )
    default:
        return state
    }
}