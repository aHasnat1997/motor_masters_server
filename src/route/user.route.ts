import express from "express";
import { UserController } from "../controllers/user.controller";

// creating user route 
export const UserRoutes = express.Router();


// POST route for creating user and sing-in in DB
UserRoutes.post('/sing-in', UserController.createUser);

// POST route for user log-in
UserRoutes.post('/log-in', UserController.logInUser);

// GET route for all user from DB
UserRoutes.get('/', UserController.getAllUser);

// GET route for single user from DB using id
UserRoutes.get('/:id', UserController.getSingleUserId);

// GET route for single user from DB using email
UserRoutes.get('/email/:email', UserController.getSingleUserEmail);

// PATCH route for update single user in DB
UserRoutes.patch('/:id', UserController.updateSingleUser);