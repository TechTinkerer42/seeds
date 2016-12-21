import * as React from "react";
import { Link } from "react-router";
import { observable, action, useStrict } from "mobx";
import { observer } from "mobx-react";
import User from "../classes/User";

useStrict(true);

interface HeaderProps {
    user: User
};

interface HeaderState {
};


@observer
export default class Homepage extends React.Component<HeaderProps, HeaderState> {

    constructor(props: any) {
        super(props);
    }

    render() {

        let nodeUserInfo: any;

        if ( this.props.user.online ) {
            nodeUserInfo = <span>用户名：{this.props.user.account}</span>
        } else {
            nodeUserInfo = <Link to="/login" >登录 </Link>
        }

        return (
            <header>
                <Link to="/">Home</Link>
                { nodeUserInfo }
            </header>
        );
    }
}