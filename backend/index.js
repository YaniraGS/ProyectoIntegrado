import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import {PORT} from "./config.js"
import usersRoutes from './src/routes/users.routes.js';
import recipeRoutes from './src/routes/recipes.routes.js';
import ingredientsRoutes from './src/routes/ingredients.routes.js';
import favoritesRoutes from './src/routes/favorites.routes.js';
import recipeIngredientsRoutes from './src/routes/recipe_ingredients.routes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));
dotenv.config();

app.use(express.json());
app.use(usersRoutes);
app.use(recipeRoutes);
app.use(ingredientsRoutes);
app.use(favoritesRoutes);
app.use(recipeIngredientsRoutes);

app.listen(PORT);


