import { Router } from "express";
import {  getIngredientsByRecipeId } from "../controllers/recipe_ingredients.controller.js";

const router = Router ();

router.get('/:recipeId/ingredients', getIngredientsByRecipeId)


export default router;
