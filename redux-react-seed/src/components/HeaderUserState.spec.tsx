import * as React from "react"
import * as ReactTestUtils from "react-dom/test-utils"
import * as ReactTestRenderer from "react-test-renderer"
import { NavLink } from "react-router-dom"

import HeaderUserState from "./HeaderUserState"

let renderer = ReactTestUtils.createRenderer();

describe("components/Header", () => {

    let userinfo: any
    let result: any

    it("not login", () => {
        userinfo = {
        }
        renderer.render(<HeaderUserState userinfo={userinfo} />)
        result = renderer.getRenderOutput();
        expect(result.props.children[1]).toEqual(<NavLink to="/login" >登录</NavLink>)
    });

    it("has login", () => {
        userinfo = {
            username: "abc"
        }
        renderer.render(<HeaderUserState userinfo={userinfo} />)
        result = renderer.getRenderOutput()
        expect(result.props.children[0]).toEqual(<span>{ "欢迎，" + userinfo.username }</span>)
    })
})