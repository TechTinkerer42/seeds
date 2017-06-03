import { replace, push } from "react-router-redux"

export const REQUEST_LOGIN = "REQUEST_LOGIN"
export const RECEIVE_LOGIN = "RECEIVE_LOGIN"
export const REQUEST_LOGOUT = "REQUEST_LOGOUT"
export const RECEIVE_LOGOUT = "RECEIVE_LOGOUT"

export function requestLogin(userName: string, password: string) {
    return {
        type: REQUEST_LOGIN,
        payload: {
            userName
        }
    }
}

export function receiveLogin(data: any) {
    let resData: any = {
        type: RECEIVE_LOGIN,
        payload: {}
    }
    if (data.code === 0) {
        resData.payload = data.result
    }
    return resData
}

export function fetchLogin(userName: string, password: string) {
    return (dispatch: any) => {
        dispatch(requestLogin(userName, password))
        return fetch("/api/login", {
            method: "POST",
            body: "userName=" + userName + "&password=" + password
        })
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                return dispatch(receiveLogin(json))
            })
            .then(json => dispatch(replace("/")))
    }
}


export function requestLogout() {
    return {
        type: REQUEST_LOGOUT
    }
}

export function receiveLogout(data: any) {
    return {
        type: RECEIVE_LOGOUT,
        payload: {}
    }
}

export function fetchLogout() {
    return (dispatch: any) => {
        dispatch(requestLogout())
        return fetch("/api/logout", {
        })
            .then(response => response.json())
            .then(json => dispatch(receiveLogout(json)))
            .then(json => dispatch(replace("/login")))
    }
}