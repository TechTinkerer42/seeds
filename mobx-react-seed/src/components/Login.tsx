import * as React from "react";
import { observable, action, useStrict } from "mobx";
import { observer } from "mobx-react";
import { ERROR_USER_ACCOUNT, ERROR_USER_PASSWORD, OK, NULL } from "../classes/Const";
import Message from "../classes/Message";
import User from "../classes/User";
import Header from "./Header"

useStrict(true);

interface LoginProps {
};

interface LoginState {
};

let user = new User();

@observer
export default class Login extends React.Component<LoginProps, LoginState> {

    @observable
    loginInfo: {
        account: string
        password: string
    }

    @observable
    errorInfo: {
        accountError: Message
        passwordError: Message
    }

    constructor(props: any) {
        super(props);

        this.loginInfo = {
            account: "",
            password: ""
        }

        this.errorInfo = {
            accountError: new Message(),
            passwordError: new Message()
        }
    }

    @action
    handleAccountChange(evt: any) {
        this.errorInfo.accountError = User.testAccountFormat(evt.target.value);
        if (this.errorInfo.accountError.code === OK) {
            this.loginInfo.account = evt.target.value;
        }
    }

    @action
    handlePasswordChange(evt: any) {
        this.errorInfo.passwordError = User.testPasswordFormat(evt.target.value);
        if (this.errorInfo.passwordError.code === OK) {
            this.loginInfo.password = evt.target.value;
        }
    }

    login(evt: any) {
        evt.preventDefault();
        User.login(this.loginInfo.account, this.loginInfo.password)
            .then( (result) => {
                user.account = this.loginInfo.account;
                user.online = true;
                alert("登录成功！")
            }, (errorMsg) => {
                alert(errorMsg.text);
            });
    }

    render() {

        let nodeAccountError, nodePasswordError;

        if (this.errorInfo.accountError.code === OK) {
            nodeAccountError = <span>OK</span>;
        } else if (this.errorInfo.accountError.code !== NULL) {
            nodeAccountError = <span>{this.errorInfo.accountError.text}</span>;
        }

        if (this.errorInfo.passwordError.code === OK) {
            nodePasswordError = <span>OK</span>;
        } else if (this.errorInfo.passwordError.code !== NULL) {
            nodePasswordError = <span>{this.errorInfo.passwordError.text}</span>;
        }

        return (
            <div>
                <Header user = {user} />
                <h1>Login</h1>
                <form onSubmit = {this.login.bind(this)} >
                    <p>
                        <input name="account" onChange={this.handleAccountChange.bind(this)} />
                        {nodeAccountError}
                    </p>
                    <p>
                        <input type="password" onChange={this.handlePasswordChange.bind(this)} />
                        {nodePasswordError}
                    </p>
                    <button>提交</button>
                </form>
            </div>
        );
    }
}