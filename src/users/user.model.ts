export interface IUser {
    id: string;
    login: string;
    password: string;
    email: string;
    phone: string;
    age: number;
}

export class User implements IUser {
    id: string;
    login: string;
    password: string;
    email: string;
    phone: string;
    age: number;

    constructor(id: string, login: string, password: string, email: string, phone: string, age: number) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.age = age;
    }
}