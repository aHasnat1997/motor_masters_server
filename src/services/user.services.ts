import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";
import config from "../config";

/**
 * Create single user in DB
 * @param data user json data
 * @returns Promise user json data
 */
const createUserIntoDB = async (data: IUser) => {
    const result = await UserModel.create(data)

    const jwtPayload = {
        email: result.email,
        phone: result.phone,
        role: result.role
    }
    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: config.jwt_access_expires_in })
    const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret as string, { expiresIn: config.jwt_refresh_expires_in })

    return {
        result,
        accessToken,
        refreshToken
    };
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
 * Get single user json from DB using ID
 * @param id user id
 * @returns Promise user data or null
 */
const getSingleUserFromDBById = async (id: string): Promise<IUser | null> => {
    const result = await UserModel.findById({ _id: id });
    return result;
}

/**
 * Get single user json from DB using Email
 * @param id user id
 * @returns Promise user data or null
 */
const getSingleUserFromDBByEmail = async (email: string): Promise<IUser[] | null> => {
    const result = await UserModel.aggregate([
        {
            $match: { email: email }
        }
    ])
    return result;
}

/**
 * Update single user json from DB
 * @param id user id that updated
 * @param updatedData updated json data
 * @returns Promise updated data or null
 */
const updateUserInDB = async (id: string, updatedData: IUser): Promise<IUser | null> => {
    const result = await UserModel.findByIdAndUpdate(id, updatedData, { runValidators: true });
    return result
}

export const UserService = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDBById,
    getSingleUserFromDBByEmail,
    updateUserInDB
};