import express from 'express';
import {PORT} from "./config.js"
import usersRoutes from './src/routes/users.routes.js';
import recipeRoutes from './src/routes/recipes.routes.js';

const app = express();
app.use(express.json());
app.use(usersRoutes);
app.use(recipeRoutes)
app.listen(PORT);