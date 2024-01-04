import jwt from "jsonwebtoken";
import { IUser, IUserLogIn } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";
import config from "../config";

/**
 * Create single user in DB
 * @param data user json data
 * @returns Promise user json data
 */
const createUserIntoDB = async (payload: IUser) => {
    const result = await UserModel.create(payload)
    return result;
};

/**
 * user log in service
 * @param payload user email and password
 * @returns user data access and refresh token
 */
const userLogInService = async (payload: IUserLogIn) => {
    const userData = await UserModel.findOne({ email: payload?.email });

    if (!userData) {
        throw new Error('No user found');
    } else if (!(await UserModel.userPasswordMatch(payload.password, userData.password))) {
        throw new Error('password not matched');
    }

    const jwtPayload = {
        email: userData.email,
        phone: userData.phone,
        role: userData.role
    }
    const accessToken = `Bearer ${jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: config.jwt_access_expires_in })}`
    const refreshToken = `Bearer ${jwt.sign(jwtPayload, config.jwt_refresh_secret as string, { expiresIn: config.jwt_refresh_expires_in })}`

    return {
        userData,
        accessToken,
        refreshToken
    };
}

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
    userLogInService,
    getAllUserFromDB,
    getSingleUserFromDBById,
    getSingleUserFromDBByEmail,
    updateUserInDB
};