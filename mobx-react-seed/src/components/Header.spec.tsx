import * as React from "react";
import * as ReactTestUtils from "react-addons-test-utils";
import { Link } from "react-router";

import User from "../classes/User";
import Header from "./Header";

let renderer = ReactTestUtils.createRenderer();

describe("components/Header", () => {

    let user: User;
    let result: any;

    it("not login", () => {
        user = new User();
        renderer.render(<Header user={user} />);
        result = renderer.getRenderOutput();
        expect(result.props.children[1]).toEqual(<Link to="/login" >登录 </Link>);
    });

    it("has login", () => {
        user = new User();
        user.online = true;
        user.account = "username";
        renderer.render(<Header user={user} />);
        result = renderer.getRenderOutput();
        expect(result.props.children[1]).toEqual(<span>用户名：{ user.account }</span>);
    });
});
