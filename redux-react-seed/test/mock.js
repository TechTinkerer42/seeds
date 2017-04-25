let fetch0 = global.fetch

let requests = {}

export default function mock(input, responseBody, responseStatus, responseType) {
    if (typeof input !== "string" && !input instanceof RegExp) {
        throw new Error("The mock\"s first argument must be String or RegExp.")
    }
    if (typeof responseBody == "undefined") {
        throw new Error("The mock\"s second argument is required.")
    }
    responseStatus = typeof responseStatus === "number" ? responseStatus :
                    typeof responseType == "number" ? responseType :
                    200
    responseType = typeof responseType === "string" ? responseType : "text/plain"
    requests[input] = {
        regexp: input instanceof RegExp ? input : false,
        body: responseBody,
        status: responseStatus,
        type: responseType
    }
}

global.fetch = (input, request) => {
    let url = input, promise, response
    if (input instanceof Request) {
        url = input.url
    }

    response = requests[url]

    if (!response) {
        Object.keys(requests).some((requestUrl) => {
            let matchs = url.match(requests[requestUrl]["regexp"])
            response = matchs && matchs[0] ? requests[requestUrl] : null
            return response
        })
    }

    if (response) {

        if ( typeof response.body === "function" ) {
            let fields = {}
            request.body.split( "&" ).map( ( field ) => {
                field = field.split( "=" )
                fields[ field[0] ] = field[1]
            })
            request.body = fields
            response.body = response.body( request )
        }

        if ( typeof request.body !== "string" ) {
            response.body = JSON.stringify( response.body )
        }
        promise = new Promise((resolve, reject) => {
            if (response.status === 200) {
                resolve(new Response(response.body, {
                    status: 200,
                    statusText: "OK"
                }))
            } else {
                reject(new Response(response.body, {
                    status: response.status,
                    statusText: "Error"
                }))
            }
        })
    } else {
        promise = fetch0(input, request)
    }

    return promise
}