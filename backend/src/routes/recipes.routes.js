import { Router } from "express";
import { createRecipe, getRecipeById, getRecipes,getIngredientsByRecipe } from "../controllers/recipes.controller.js";

const router = Router();

router.get('/recipes',getRecipes);
router.get ('/recipes/:id', getRecipeById);
router.post('/recipes', createRecipe);
router.get('/recipes/:id/ingredients', getIngredientsByRecipe);


export default router;
