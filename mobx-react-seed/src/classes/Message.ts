import { NULL } from "./Const";

export default class Message {

    code: number

    text: string

    constructor(code = NULL, text = "null") {
        this.code = code;
        this.text = text;
    }

}