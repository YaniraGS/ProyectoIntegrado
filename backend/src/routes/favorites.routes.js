import { Router } from "express";
import { addRecipeToFavorite, getFavoriteRecipes, removeRecipeFavorite } from "../controllers/favorites.controller.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router ();

router.post('/', authenticateToken, addRecipeToFavorite);
router.get('/', authenticateToken, getFavoriteRecipes);
router.delete('/', authenticateToken, removeRecipeFavorite);


export default router;
