import { Router } from "express";
import { createRecipe, getRecipeById, getRecipes,getIngredientsByRecipe, getRecipesByIngredient } from "../controllers/recipes.controller.js";

const router = Router();

router.get('/',getRecipes);
router.post('/', createRecipe);
router.get('/:id/ingredients', getIngredientsByRecipe);
router.get('/search-by-ingredient', getRecipesByIngredient);
router.get ('/:id', getRecipeById);

export default router;
