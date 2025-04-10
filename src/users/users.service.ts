import { IUser } from "./user.model";

export class UserService {
    private _users: IUser[] = []

    getUsers() {
        return this._users;
    }

    createUser(user: IUser) {
        this._users.push(user);
        return user;
    }

    getUserById(id: string) {
        return this._users.find(p => p.id === id);
    }

    deleteUserById(id: string) {
        this._users = this._users.filter(p => p.id !== id);
    }

    updateUserById(id: string, user: IUser) {
        this._users = this._users.map(p => p.id === id ? user : p);
        return user;
    }
}