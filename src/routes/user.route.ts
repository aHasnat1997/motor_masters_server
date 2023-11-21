import express from "express"
import { UserController } from "../controllers/user.controller"

// creating user route 
export const UserRoute = express.Router()

// POST route for creating user in DB
UserRoute.post('/', UserController.createUser);

// GET route for all user from DB
UserRoute.get('/', UserController.getAllUser);

// GET route for single user from DB using id
UserRoute.get('/:id', UserController.getSingleUserId);

// GET route for single user from DB using email
UserRoute.get('/email/:email', UserController.getSingleUserEmail);

// PATCH route for update single user in DB
UserRoute.patch('/:id', UserController.updateSingleUser);