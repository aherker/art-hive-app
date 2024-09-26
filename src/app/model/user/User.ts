export class User {
    email: string;
    id: string;

    constructor(email: string = "", id: string = "") {
        this.email = email;
        this.id = id;
    }
}