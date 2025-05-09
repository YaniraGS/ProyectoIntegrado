import { Router } from "express";
import { createIngredients, getIngrediendtsById, getIngredients } from "../controllers/ingredients.controller.js";

const router = Router ();

router.get('/ingredients', getIngredients)
router.get('/ingredients/:id', getIngrediendtsById)
router.post('/ingredients' , createIngredients)


export default router;
