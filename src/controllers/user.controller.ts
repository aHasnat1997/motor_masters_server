import { Request, Response } from "express";
import { UserService } from "../services/user.services";


const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;
        const result = await UserService.createUserIntoDB(data);

        res.status(200).json({
            status: 'success',
            massage: 'User created successfully',
            doc: result
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'failed',
            massage: error
        })
    }
}


export const UserController = {
    createUser
}