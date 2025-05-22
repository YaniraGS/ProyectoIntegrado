import { Router } from "express";
import {  getIngredientsById, getIngredients } from "../controllers/ingredients.controller.js";

const router = Router ();

router.get('/ingredients', getIngredients)
router.get('/ingredients/:id', getIngredientsById)


export default router;
