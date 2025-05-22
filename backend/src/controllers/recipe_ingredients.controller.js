import { pool } from "../../db.js";


export const getIngredientsByRecipeId = async (req, res) => {
    const { recipeId } = req.params;

    try {
        const { rows } = await pool.query(`
      SELECT  ri.id AS recipe_ingredient_id, ingredients.id, ingredients.name, ri.quantity, ri.units
      FROM recipe_ingredients ri
      JOIN ingredients ON ri.ingredient_id = ingredients.id
      WHERE ri.recipe_id = $1
    `, [recipeId]);

        return res.status(200).json(rows);
        
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener ingredientes de la receta.' });
    }
};
