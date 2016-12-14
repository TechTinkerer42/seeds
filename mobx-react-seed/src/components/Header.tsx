import * as React from "react";
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
export default class Login extends React.Component<HeaderProps, HeaderState> {

    user: User

    constructor(props: any) {
        super(props);
        this.user = this.props.user;
    }

    render() {

        let nodeUserInfo;

        if ( this.user.online ) {
            nodeUserInfo = <span>用户名：{this.user.account} </span>
        }

        return (
            <header>
                { nodeUserInfo }
            </header>
        );
    }
}