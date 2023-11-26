import express, { Request, Response } from "express"
import { UserController } from "../controllers/user.controller"

// creating user route 
export const AppRoutes = express.Router();


// App route array
interface TRoute {
    path: string,
    controller: (req: Request, res: Response) => Promise<void>
}
const routes: TRoute[] = [
    {
        path: '/users',
        controller: UserController.createUser
    },
    {
        path: '/users',
        controller: UserController.getAllUser
    },
    {
        path: '/users/:id',
        controller: UserController.getSingleUserId
    },
    {
        path: '/users/email/:email',
        controller: UserController.getSingleUserEmail
    },
    {
        path: '/users/:id',
        controller: UserController.updateSingleUser
    }
];


routes.forEach(route => AppRoutes.use(route.path, route.controller));

// POST route for creating user in DB
// AppRoutes.post('/', UserController.createUser);

// GET route for all user from DB
// AppRoutes.get('/', UserController.getAllUser);

// GET route for single user from DB using id
// AppRoutes.get('/:id', UserController.getSingleUserId);

// GET route for single user from DB using email
// AppRoutes.get('/email/:email', UserController.getSingleUserEmail);

// PATCH route for update single user in DB
// AppRoutes.patch('/:id', UserController.updateSingleUser);