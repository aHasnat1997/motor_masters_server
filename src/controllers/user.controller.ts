import { Request, Response } from "express";
import { UserService } from "../services/user.services";

/**
 * Controller for creating single user
 * @param req API Request
 * @param res API Response
 */
const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;
        const result = await UserService.createUserIntoDB(data);
        res.status(200).json({
            status: 'success',
            massage: 'User created successfully',
            doc: result
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'failed',
            massage: error
        });
    }
}

/**
 * Controller for creating single user
 * @param req API Request
 * @param res API Response
 */
const logInUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;
        const result = await UserService.userLogInService(data);

        res.cookie('refreshToken', result.refreshToken, { httpOnly: true });
        res.cookie('accessToken', result.accessToken, { httpOnly: true });

        res.status(200).json({
            status: 'success',
            massage: 'User log-in successfully',
            doc: result.userData
        });
    } catch (error) {
        console.log(error);
        res.status(403).json({
            status: 'failed',
            massage: error
        });
    }
}

/**
 * Controller for getting all user from DB
 * @param req API Request
 * @param res API Response
 */
const getAllUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await UserService.getAllUserFromDB();

        res.status(200).json({
            status: 'success',
            massage: 'All users find successfully',
            totalDocs: result.length,
            docs: result
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'failed',
            massage: error
        });
    }
};

/**
 * Controller for getting single user from DB using ID
 * @param req API Request
 * @param res API Response
 */
const getSingleUserId = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const result = await UserService.getSingleUserFromDBById(id);

        res.status(200).json({
            status: 'success',
            massage: 'Find single user successfully',
            doc: result
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'failed',
            massage: error
        });
    }
};

/**
 * Controller for getting single user from DB using Email
 * @param req API Request
 * @param res API Response
 */
const getSingleUserEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        const email = req.params.email;
        const result = await UserService.getSingleUserFromDBByEmail(email);

        res.status(200).json({
            status: 'success',
            massage: 'Find single user successfully',
            doc: result
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'failed',
            massage: error
        });
    }
};

/**
 * Controller for update single user in DB
 * @param req API Request
 * @param res API Response
 */
const updateSingleUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const newData = req.body;
        const result = await UserService.updateUserInDB(id, newData);

        res.status(200).json({
            status: 'success',
            massage: 'User update successfully',
            doc: result
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'failed',
            massage: error
        });
    }
};

export const UserController = {
    createUser,
    logInUser,
    getAllUser,
    getSingleUserId,
    getSingleUserEmail,
    updateSingleUser
};