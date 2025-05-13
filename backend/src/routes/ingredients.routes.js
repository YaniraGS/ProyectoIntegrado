import { Router } from "express";
import { createIngredients, getIngrediendtsById, getIngredients } from "../controllers/ingredients.controller.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router ();

router.get('/ingredients', getIngredients)
router.get('/ingredients/:id', getIngrediendtsById)
router.post('/ingredients' , authenticateToken, createIngredients)


export default router;
