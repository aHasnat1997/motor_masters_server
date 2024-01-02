// user name interface
export interface IUserName {
    firstName: string,
    lastName: string
}

// user interface
export interface IUser {
    name: IUserName,
    email: string,
    phone: string,
    photo?: string,
    gender: 'male' | 'female' | 'other',
    dateOfBarth: string,
    role: 'admin' | 'user',
    isActive?: boolean,
    isDeleted?: boolean
}