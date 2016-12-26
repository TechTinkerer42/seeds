import { Injectable } from '@angular/core';

@Injectable()
export default class UserService {

    login(account: string, password: string): Promise<any> {
        return Promise.resolve({
            code: 0,
            msg: "OK"
        });
    }
}