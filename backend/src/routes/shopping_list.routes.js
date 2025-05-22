import { Router } from "express";
import { addIngredientToShoppingList, getShoppingList, removeItemFromShoppingList } from "../controllers/shopping_list.controller.js";

const router = Router();

router.post('/shopping-list', addIngredientToShoppingList);
router.get('/shopping-list', getShoppingList);
router.delete('/shopping-list/:shoppingListItemId', removeItemFromShoppingList);


export default router;
