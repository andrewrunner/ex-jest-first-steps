import { HTTP_METHODS } from "../../src/model/ServerModel";

export class RequestTestWrapper {

    public body: object;
    public method: HTTP_METHODS;
    public url: string;
    public headers: {};

    public on(eventName, callback) {
        if(eventName == "data") {
            callback(JSON.stringify(this.body))
        } else {
            callback();
        }
    }

    public clearFields() {
        this.body = undefined;
        this.method = undefined;
        this.url = undefined;
        this.headers = {};
    }

}