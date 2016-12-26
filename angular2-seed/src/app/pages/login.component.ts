import { Component } from "@angular/core";

import UserService from "../services/user";

@Component({
    selector: 'my-login',
    template: `
        <my-header></my-header>
        <form method="post" (submit)=login()>
            <input type="text" [(ngModel)]="userInfo.account" name="account" required minlength="4" maxlength="8"
       #name="ngModel" />
            <br/>
            <input type="password" [(ngModel)]="userInfo.password" name="password" required minlength="4" maxlength="8"
       #name="ngModel" />
            <br />
            <button>ok</button>
        </form>
    `,
    providers: [UserService]
})

export class LoginComponent  {

    userInfo: {
        account: string,
        password: string
    }

    constructor(private userService: UserService) {
        this.userInfo = {
            account: "",
            password: ""
        }
    }

    login():void {
        this.userService.login(this.userInfo.account, this.userInfo.password)
            .then((result) => {
                console.log(result);
            })
            .catch((result) => {
                console.log(result);
            });
    }
}