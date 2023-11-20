import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { UserRoute } from './routes/user.route';

// cerate an app using express
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// api routes
app.use('/api/v1/user', UserRoute);

// home route
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../view/index.html'))
});

export default app;