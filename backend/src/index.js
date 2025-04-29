import express from 'express';
import {PORT} from "./config.js"
import usersRoutes from './routes/users.routes.js';


const app = express();

app.use(usersRoutes);

app.listen(PORT);
