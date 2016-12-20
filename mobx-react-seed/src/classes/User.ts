import { observable, action, useStrict } from "mobx";
import { ERROR_USER_ACCOUNT, ERROR_USER_PASSWORD, NULL, OK } from "./Const";
import Message from "./Message";

useStrict(true);

/**
 * @module classes/User
 */

 /**
  * 用户
  */

export default class User {

    @observable
    private _online : boolean

    @observable
    private _account: string

    @observable
    private _password: string

    constructor() {
    }

    @action
    setAccount (account: string) {
        this._account = account;
    }

    set account (account: string) {
        if ( User.testAccountFormat(account).code === OK ) {
            this.setAccount(account);
        } else {
            throw new Error("用户名不符合规则。");
        }
    }

    get account () {
        return this._account;
    }

    @action
    setPassword (password: string) {
        this._password = password;
    }

    set password (password: string) {
        if ( User.testPasswordFormat(password).code === OK ) {
            this._password = password;
        } else {
            throw new Error("用户密码不符合规则。")
        }
    }

    get password () {
        return this._password;
    }

    @action
    setOnline (online: boolean) {
        this._online = online;
    }

    set online (online: boolean) {
        this.setOnline(online);
    }

    get online () {
        return this._online;
    }

    static testAccountFormat (account: string): Message {
        let msg = new Message(OK, 'OK');
        if ( account.length === 0 ){
            msg.code = NULL;
            msg.text = "用户名为空";
        } else if ( !/^[a-z]\w{3,7}$/i.test(account) ) {
            msg.code = ERROR_USER_ACCOUNT;
            msg.text = "用户名必须由字母或数字组成，4~8位，首位为字母。";
        }        
        return msg;
    }

    static testPasswordFormat (password: string = ''): Message {
        let msg = new Message(OK, 'OK');
        if ( password.length === 0 ){
            msg.code = NULL;
            msg.text = '密码为空';
        } else if ( !/^.{8,16}$/i.test(password) ) {
            msg.code = ERROR_USER_PASSWORD;
            msg.text = '密码必须为8~12位';
        }
        return msg;
    }

    /**
     * 登录
     * @function login
     * @return {any} Promise
     */
    login () {
        return new Promise( (resolve: any, reject: any) => {
            if ( !this._account ) {
                reject( new Message( ERROR_USER_ACCOUNT , "缺少用户名") );
            } else if ( !this._password ) {
                reject( new Message( ERROR_USER_PASSWORD , "缺少密码") );
            } else {
                setTimeout( () => {
                    resolve( new Message( OK, "登录成功" ));
                    this.setOnline( true );
                }, 100);
            }
        });
    }

    static login (account: string, password: string): Promise<Function> {
        return new Promise( (resolve: any, reject: any) => {
            if ( User.testAccountFormat(account).code !== OK ) {
                reject( new Message( ERROR_USER_ACCOUNT , "用户名不符合规则") );
            } else if ( User.testPasswordFormat(password).code !== OK ) {
                reject( new Message( ERROR_USER_PASSWORD , "密码不符合规则") );
            } else {
                setTimeout( () => {
                    resolve( new Message( OK, "登录成功" ));
                }, 100);
            }
        });
    }

}