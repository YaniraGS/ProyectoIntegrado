import { Router } from "express";
import { addRecipeToFavorite, getFavoriteRecipe, removeRecipeFavorite } from "../controllers/favorites.controller.js";

const router = Router ();

router.post('/favorites', addRecipeToFavorite);
router.get('/:userId/favorites', getFavoriteRecipe);
router.delete('/favorites', removeRecipeFavorite);


export default router;
