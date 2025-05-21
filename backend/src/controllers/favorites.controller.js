import { pool } from "../../db.js";

export const addRecipeToFavorite = async (req, res) => {
  const userId = req.user.id;        // viene del token
  const { recipeId } = req.body;

  if (!userId) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  try {
    const { rows: existingFavorite } = await pool.query(
      'SELECT * FROM favorites WHERE user_id = $1 AND recipe_id = $2',
      [userId, recipeId]
    );

    if (existingFavorite.length > 0) {
      return res.status(400).json({ error: 'La receta ya está en tus favoritos.' });
    }

    await pool.query(
      'INSERT INTO favorites (user_id, recipe_id) VALUES ($1, $2)',
      [userId, recipeId]
    );

    return res.status(200).json({ message: 'Receta añadida a favoritos' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al añadir la receta a favoritos.' });
  }
};

export const getFavoriteRecipes = async (req, res) => {
  const userId = req.user.id;  // viene del token

  if (!userId) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  try {
    const { rows } = await pool.query(
      `SELECT recipes.id, recipes.name FROM recipes 
       JOIN favorites ON recipes.id = favorites.recipe_id 
       WHERE favorites.user_id = $1`,
      [userId]
    );

    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener las recetas favoritas.' });
  }
};

export const removeRecipeFavorite = async (req, res) => {
  const userId = req.user.id;  // viene del token
  const { recipeId } = req.body;

  if (!userId) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  try {
    const { rows: existingFavorite } = await pool.query(
      'SELECT * FROM favorites WHERE user_id = $1 AND recipe_id = $2',
      [userId, recipeId]
    );

    if (existingFavorite.length === 0) {
      return res.status(400).json({ error: 'La receta no está en tus favoritos.' });
    }

    await pool.query(
      'DELETE FROM favorites WHERE user_id = $1 AND recipe_id = $2',
      [userId, recipeId]
    );

    return res.status(200).json({ message: 'Receta eliminada de favoritos.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al eliminar receta de favoritos.' });
  }
};
