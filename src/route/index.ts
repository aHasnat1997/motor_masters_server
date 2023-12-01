import express, { Router } from "express"
import { UserRoutes } from "./user.route";

// creating user route 
export const AppRoutes = express.Router();


// App route array
interface TRoute {
    path: string,
    route: Router
}
const routes: TRoute[] = [
    {
        path: '/users',
        route: UserRoutes
    }
];


routes.forEach(route => AppRoutes.use(route.path, route.route));