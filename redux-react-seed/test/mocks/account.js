import { Random } from 'mockjs'
import * as Mock from 'mockjs'
import mock from '../mock'

mock("/api/login", ( request ) => {

    let responseData = {
        code: 0,
        message: "ok",
        result: {
            id: Random.increment(),
            userName: request.body.userName
        }
    }

    if ( request.body.password.toString() === "123" ) {
        responseData = {
            code: 10001,
            message: "密码不正确"
        }
    }

    return responseData
})

mock("/api/logout", {
    code: 0,
    message: "ok",
    result: {
    }
})

