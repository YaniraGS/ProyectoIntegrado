import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import {PORT} from "./config.js"
import usersRoutes from './src/routes/users.routes.js';
import recipeRoutes from './src/routes/recipes.routes.js';
import ingredientsRoutes from './src/routes/ingredients.routes.js';
import favoritesRoutes from './src/routes/favorites.routes.js';
import recipeIngredientsRoutes from './src/routes/recipe_ingredients.routes.js';
import shoppingListRoutes from './src/routes/shopping_list.routes.js'

const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));
dotenv.config();

app.use(express.json());
app.use( usersRoutes);
app.use('/recipes', recipeRoutes);
app.use('/ingredients', ingredientsRoutes);
app.use('/favorites', favoritesRoutes);
app.use('/recipe-ingredients', recipeIngredientsRoutes);
app.use('/shopping_list', shoppingListRoutes)


app.listen(PORT);


