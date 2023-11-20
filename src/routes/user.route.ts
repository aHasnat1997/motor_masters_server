import express from "express"
import { UserController } from "../controllers/user.controller"


export const UserRoute = express.Router()

UserRoute.post('/', UserController.createUser);