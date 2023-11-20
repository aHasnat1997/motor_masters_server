import { IUser } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";


const createUserIntoDB = async (data: IUser): Promise<IUser> => {
    const result = await UserModel.create(data)
    return result;
}

export const UserService = {
    createUserIntoDB
}