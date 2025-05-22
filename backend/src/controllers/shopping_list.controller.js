import { pool } from "../../db.js";

export const addIngredientToShoppingList = async (req, res) => {
  const userId = req.user.id; // viene del token
  const { recipeIngredientId, quantity } = req.body;

  if (!userId) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }
  if (!recipeIngredientId || !quantity) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    const insertQuery = `
      INSERT INTO shopping_list (user_id, recipe_ingredient_id, quantity, units)
      SELECT $1, id, $2, units
      FROM recipe_ingredients
      WHERE id = $3
      RETURNING *;
    `;

    const { rows } = await pool.query(insertQuery, [userId, quantity, recipeIngredientId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'recipe_ingredient_id no encontrado' });
    }

    return res.status(201).json({ message: 'Ingrediente añadido a la lista de la compra', item: rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al añadir ingrediente a la lista de la compra' });
  }
};

export const getShoppingList = async (req, res) => {
  const userId = req.user.id; // viene del token

  if (!userId) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  try {
    const query = `
      SELECT sl.id, ri.id AS recipe_ingredient_id, i.name AS ingredient_name,
             sl.quantity, sl.units,
             r.name AS recipe_name
      FROM shopping_list sl
      JOIN recipe_ingredients ri ON sl.recipe_ingredient_id = ri.id
      JOIN ingredients i ON ri.ingredient_id = i.id
      JOIN recipes r ON ri.recipe_id = r.id
      WHERE sl.user_id = $1
      ORDER BY sl.id;
    `;

    const { rows } = await pool.query(query, [userId]);
    return res.status(200).json(rows);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener la lista de la compra' });
  }
};

export const removeItemFromShoppingList = async (req, res) => {
  const userId = req.user.id;  // viene del token
  const { shoppingListItemId } = req.params;

  if (!userId) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  if (!shoppingListItemId) {
    return res.status(400).json({ error: 'Falta el id del item a eliminar' });
  }

  try {
    // Primero verificamos que el item pertenece al usuario
    const { rows } = await pool.query(
      'SELECT * FROM shopping_list WHERE id = $1 AND user_id = $2',
      [shoppingListItemId, userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Item no encontrado o no pertenece al usuario' });
    }

    // Eliminamos el item
    await pool.query(
      'DELETE FROM shopping_list WHERE id = $1 AND user_id = $2',
      [shoppingListItemId, userId]
    );

    return res.status(200).json({ message: 'Item eliminado de la lista de la compra' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al eliminar el item de la lista de la compra' });
  }
};

