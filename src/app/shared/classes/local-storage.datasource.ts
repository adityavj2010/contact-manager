import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';
import { DataSource } from './datasource.interface';

const USERLIST_KEY = "Users"

export class LocalStorageDataSource implements DataSource {

    userList$: BehaviorSubject<Array<User>> = new BehaviorSubject([]);

    constructor() {
        const userList = this.getUserListFromStorage()
        this.userList$.next(userList)
    }

    getUsers() {
        return this.userList$.asObservable()
    }

    addUser(user: User): Promise<Function> {
        return new Promise((resolve, reject) => {
            let userList = this.userList$.value
            if (this.userIndex(user) !== -1) {
                reject("User with associated phone number already present!")
            }
            else {
                userList.push(user)
                this.updateUserList(userList)
                resolve()
            }
        })
    }

    editUser(user: User): Promise<string> {
        return new Promise((resolve, reject) => {
            let userList = this.userList$.value
            const userIndex = this.userIndex(user)
            if (userIndex === -1) {
                reject("No User found with the associated phone number")
            }
            else {
                userList[userIndex] = user
                this.updateUserList(userList)
                resolve()
            }
        })
    }

    deleteUser(user: User): Promise<string> {
        return new Promise((resolve, reject) => {
            let userList = this.userList$.value
            const userIndex = this.userIndex(user)
            if (userIndex === -1) {
                reject("No User found with the associated phone number")
            }
            else {
                userList.splice(userIndex, 1)
                this.updateUserList(userList)
                resolve()
            }
        })

    }

    updateUserList(userList: Array<User>) {
        this.userList$.next(userList)
        this.saveUserListToStorage()
    }

    userIndex(user: User): number {
        let userList = this.userList$.value
        return userList.findIndex((_user) => _user.phoneNumber == user.phoneNumber)
    }

    saveUserListToStorage() {
        localStorage.setItem(USERLIST_KEY, JSON.stringify(this.userList$.value))
    }

    getUserListFromStorage(): Array<User> {
        let userListStr = localStorage.getItem(USERLIST_KEY)
        try {
            let userList:Array<User> = JSON.parse(userListStr)
            
            /** @todo Add instance check */
            if(Array.isArray(userList))
            {
                return userList
            }
            else {
                throw "Corrupted LocalStorage"
            }
        }
        catch(e) {
            console.error(e)
            localStorage.setItem(USERLIST_KEY, JSON.stringify([]))
            return []
        }
    }

}