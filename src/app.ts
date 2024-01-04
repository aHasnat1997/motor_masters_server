import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { AppRoutes } from './route';
import cookieParser from 'cookie-parser';

// cerate an app using express
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// api routes
app.use('/api/v1', AppRoutes);

// home route
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../view/index.html'))
});

export default app;