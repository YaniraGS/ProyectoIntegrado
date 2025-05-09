import { Router } from "express";
import { addIngredientsToRecipe, getIngredientsByRecipeId } from "../controllers/recipe_ingredients.controller.js";

const router = Router ();

router.post('/', addIngredientsToRecipe)
router.get('/:recipeId', getIngredientsByRecipeId)


export default router;
