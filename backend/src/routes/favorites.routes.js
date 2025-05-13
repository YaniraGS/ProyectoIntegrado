import { Router } from "express";
import { addRecipeToFavorite, getFavoriteRecipe, removeRecipeFavorite } from "../controllers/favorites.controller.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router ();

router.post('/favorites', authenticateToken, addRecipeToFavorite);
router.get('/:userId/favorites', authenticateToken, getFavoriteRecipe);
router.delete('/favorites', authenticateToken, removeRecipeFavorite);


export default router;
