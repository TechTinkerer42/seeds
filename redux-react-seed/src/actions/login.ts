import { replace, push } from "react-router-redux"

export const FETCH_LOGIN = "FETCH_LOGIN"
export const REQUEST_LOGIN = "REQUEST_LOGIN"
export const RECEIVE_LOGIN = "RECEIVE_LOGIN"
export const FETCH_LOGOUT = "FETCH_LOGOUT"
export const REQUEST_LOGOUT = "REQUEST_LOGOUT"
export const RECEIVE_LOGOUT = "RECEIVE_LOGOUT"

export function requestLogin( username: string, password: string ){
	return {
		type: REQUEST_LOGIN,
		username,
		password
	}
}

export function receiveLogin( data: any ) {
    let resData: any = {
        type: RECEIVE_LOGIN
    }
    if ( data.code === "0000" ) {
        resData.userinfo = data.result.userinfo
    } else {
        resData.userinfo = {}
    }
    return resData
}

export function fetchLogin( username: string, password: string ) {
    return ( dispatch: any ) => {
        dispatch( requestLogin( username, password ) )
        return fetch("/api/login", {
                method: "POST",
                body: "username=" + username + "&password=" + password
            })
            .then( ( response ) => {
                return response.json() 
            })
            .then( ( json ) => {
                return dispatch( receiveLogin( json ) ) 
            })
           	.then( json => dispatch( replace( "/" ) ) )
    }
}


export function requestLogout(){
	return {
		type: REQUEST_LOGOUT
	}
}

export function receiveLogout( data: any ) {
    return {
        type: RECEIVE_LOGOUT,
        userinfo : {}
    }
}

export function fetchLogout() {
    return ( dispatch: any ) => {
        dispatch( requestLogout() )
        return fetch("/api/logout", {
            })
            .then( response => response.json() )
            .then( json => dispatch( receiveLogout( json ) ) )
           	.then( json => dispatch( replace( "/" ) ) )
    }
}