import { IUser } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";

/**
 * Create single user in DB
 * @param data user json data
 * @returns Promise user json data
 */
const createUserIntoDB = async (data: IUser): Promise<IUser> => {
    const result = await UserModel.create(data)
    return result;
};

/**
 * Get all user json data from DB
 * @returns Promise array for user data
 */
const getAllUserFromDB = async (): Promise<IUser[]> => {
    const result = await UserModel.find();
    return result;
};

/**
 * Get single user json from DB
 * @param id user id
 * @returns Promise user data or null
 */
const getSingleUserFromDB = async (id: string): Promise<IUser | null> => {
    const result = await UserModel.findById({ _id: id });
    return result;
}

/**
 * Update single user json from DB
 * @param id user id that updated
 * @param updatedData updated json data
 * @returns Promise updated data or null
 */
const updateUserInDB = async (id: string, updatedData: IUser): Promise<IUser | null> => {
    const result = await UserModel.findByIdAndUpdate(id, updatedData);
    return result
}

export const UserService = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    updateUserInDB
};