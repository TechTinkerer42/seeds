import * as React from "react"
import * as ReactTestUtils from "react-dom/test-utils"
import * as ReactTestRenderer from "react-test-renderer"
import { Link } from "react-router"

import HeaderUserState from "./HeaderUserState"

let renderer = ReactTestUtils.createRenderer();

describe("components/Header", () => {

    let userInfo: any
    let result: any

    it("not login", () => {
        userInfo = {
        }
        renderer.render(<HeaderUserState />)
        result = renderer.getRenderOutput();
        expect(result.props.children[1]).toEqual(<Link to="/login" >登录</Link>)
    });

    it("has login", () => {
        userInfo = {
            userName: "abc"
        }
        renderer.render(<HeaderUserState />)
        result = renderer.getRenderOutput()
        expect(result.props.children[0]).toEqual(<span>{ "欢迎，" + userInfo.userName }</span>)
    })
})