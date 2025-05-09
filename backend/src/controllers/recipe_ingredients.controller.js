import { pool } from "../../db.js";


export const addIngredientsToRecipe = async (req, res) => {

    const { recipeId, ingredientsId, quantity } = req.body;

    try {
        const { rows } = await pool.query(
            'INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity) VALUES ($1, $2, $3) RETURNING *',
            [recipeId, ingredientId, quantity]
        );
        return res.status(201).json(rows[0]);

    } catch (error) {
        return res.status(500).json({ error: 'Error al añadir ingrediente a receta.' });
    }
}

export const getIngredientsByRecipeId = async (req, res) => {
    const { recipeId } = req.params;

    try {
        const { rows } = await pool.query(`
      SELECT ingredients.id, ingredients.name, ri.quantity
      FROM recipe_ingredients ri
      JOIN ingredients ON ri.ingredient_id = ingredients.id
      WHERE ri.recipe_id = $1
    `, [recipeId]);

        return res.status(200).json(rows);
        
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener ingredientes de la receta.' });
    }
};
