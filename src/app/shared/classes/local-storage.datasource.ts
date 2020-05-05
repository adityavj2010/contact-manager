import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';
import { DataSource } from './datasource.interface';

const USERLIST_KEY = 'Users';

export class LocalStorageDataSource implements DataSource {

    userList$: BehaviorSubject<Array<User>> = new BehaviorSubject([]);

    constructor() {
        const userList = this.getUserListFromStorage();
        this.userList$.next(userList);
    }

    getUsers() {
        return this.userList$.asObservable();
    }

    addUser(user: User): Promise<string> {
        return new Promise((resolve, reject) => {
            const userList = this.userList$.value;
            if (this.userIndex(user) !== -1) {
                reject('User with associated phone number already present!');
            } else {
                userList.push(user);
                this.updateUserList(userList);
                resolve('User Added to the contact list successfully!');
            }
        });
    }

    editUser(user: User): Promise<string> {
        return new Promise((resolve, reject) => {
            const userList = this.userList$.value;
            const userIndex = this.userIndex(user);
            if (userIndex === -1) {
                reject('No User found with the associated phone number');
            } else {
                userList[userIndex] = user;
                this.updateUserList(userList);
                resolve('User updated successfully!');
            }
        });
    }

    deleteUser(user: User): Promise<string> {
        return new Promise((resolve, reject) => {
            const userList = this.userList$.value;
            const userIndex = this.userIndex(user);
            if (userIndex === -1) {
                reject('No User found with the associated phone number');
            } else {
                userList.splice(userIndex, 1);
                this.updateUserList(userList);
                resolve('User has been deleted.');
            }
        });

    }

    updateUserList(userList: Array<User>) {
        this.userList$.next(userList);
        this.saveUserListToStorage();
    }

    userIndex(user: User): number {
        const userList = this.userList$.value;
        return userList.findIndex((tmp) => tmp.phoneNumber === user.phoneNumber);
    }

    saveUserListToStorage() {
        localStorage.setItem(USERLIST_KEY, JSON.stringify(this.userList$.value));
    }

    getUserListFromStorage(): Array<User> {
        const userListStr = localStorage.getItem(USERLIST_KEY);
        try {
            const userList: Array<User> = JSON.parse(userListStr);

            /** @todo Add instance check */
            if (Array.isArray(userList)) {
                return userList;
            } else {
                throw new Error('Corrupted LocalStorage');
            }
        } catch (e) {
            console.error(e);
            localStorage.setItem(USERLIST_KEY, JSON.stringify([]));
            return [];
        }
    }

}
