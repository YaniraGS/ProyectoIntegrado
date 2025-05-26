import { Router } from "express";
import { addRecipeToShoppingList, clearShoppingListByUser, deleteShoppingItem, getShoppingListByUser } from "../controllers/shopping_list.controller.js";

const router = Router();

router.post('/add-recipe', addRecipeToShoppingList );
router.get('/:userId', getShoppingListByUser );
router.delete('/:id', deleteShoppingItem);
router.delete('/user/:userId', clearShoppingListByUser)


export default router;
