import { Random } from 'mockjs'
import * as Mock from 'mockjs'
import mock from '../mock'

mock("/api/login", ( request ) => {

    let responseData = {
        code: "0000",
        message: "ok",
        result: {
            userinfo: {
                id: Random.increment(),
                username: request.body.username
            }
        }
    }

    if ( request.body.password.toString() === "123" ) {
        responseData = {
            code: "0004",
            message: "密码不正确"
        }
    }

    return responseData
})

mock("/api/logout", {
    code: "0000",
    message: "ok",
    result: {
    }
})

