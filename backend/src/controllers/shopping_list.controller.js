import { pool } from "../../db.js";

export const addRecipeToShoppingList = async (req, res) => {
  const { userId, recipeId, servings } = req.body;

  try {
    const recipeRes = await pool.query(`SELECT servings FROM recipes WHERE id = $1`, [recipeId]);
    if (recipeRes.rowCount === 0) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }
    const baseServings = recipeRes.rows[0].servings;

    const ingredients = await pool.query(`
      SELECT ingredient_id, quantity, units FROM recipe_ingredients WHERE recipe_id = $1
    `, [recipeId]);

    for (const ing of ingredients.rows) {
      const adjustedQuantity = (ing.quantity * servings) / baseServings;

      await pool.query(`
        INSERT INTO shopping_list (user_id, ingredient_id, quantity, units)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id, ingredient_id) DO UPDATE
          SET quantity = shopping_list.quantity + EXCLUDED.quantity
      `, [userId, ing.ingredient_id, adjustedQuantity, ing.units]);
    }

    res.status(201).json({ message: 'Ingredientes agregados a la lista de la compra' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar ingredientes a la lista de la compra' });
  }
};




export const getShoppingListByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const { rows } = await pool.query(`
      SELECT sl.id, i.name, sl.quantity, sl.units
      FROM shopping_list sl
      JOIN ingredients i ON sl.ingredient_id = i.id
      WHERE sl.user_id = $1
    `, [userId]);

    res.json(rows);
  } catch (err) {
    console.error('Error al obtener la lista de la compra:', err);
    res.status(500).json({ error: 'Error al obtener la lista de la compra' });
  }
};


export const deleteShoppingItem = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(`DELETE FROM shopping_list WHERE id = $1`, [id]);
    res.status(204).send();
  } catch (err) {
    console.error('Error al eliminar ingrediente:', err);
    res.status(500).json({ error: 'Error al eliminar el ingrediente' });
  }
};

export const clearShoppingListByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await pool.query(`DELETE FROM shopping_list WHERE user_id = $1`, [userId]);
    res.status(204).send();
  } catch (err) {
    console.error('Error al vaciar la lista:', err);
    res.status(500).json({ error: 'Error al vaciar la lista de la compra' });
  }
};