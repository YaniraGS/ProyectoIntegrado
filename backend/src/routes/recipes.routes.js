import { Router } from "express";
import { createRecipe, getRecipeById, getRecipes } from "../controllers/recipes.controller.js";

const router = Router();

router.get('/recipes',getRecipes);
router.get ('/recipes/:id', getRecipeById);
router.post('/recipes', createRecipe);

export default router;
