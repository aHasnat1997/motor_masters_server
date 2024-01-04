import { Model } from "mongoose"

// user name interface
export interface IUserName {
    firstName: string,
    lastName: string
}

// user interface
export interface IUser {
    name: IUserName,
    email: string,
    password: string,
    phone: string,
    photo?: string,
    gender: 'male' | 'female' | 'other',
    dateOfBarth: string,
    role: 'admin' | 'user',
    isActive?: boolean,
    isDeleted?: boolean
}

export interface IUserMethods extends Model<IUser> {
    userPasswordMatch(plainPass: string, hashedPass: string): boolean
}

export interface IUserLogIn {
    email: string,
    password: string
}