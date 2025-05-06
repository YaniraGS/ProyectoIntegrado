import { pool } from "../../db";

export const getRecipes = async (req, res) => {
    const result = await pool.query('SELECT * FROM recipes')
    res.json(result)
}

export const createRecipe = async (req, res) => {
    const data = req.body;
    const result = await pool.query(
        'INSERT INTO recipes (name, category, cuisine_type,servings, preparation_time, cooking_time, total_time, steps) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [data.name, data.category, data.cuisine_type, data.servings, data.preparation_time, data.cooking_time, data.total_time, data.steps]);

    return res.json(result.row[0]);
}

export const getRecipeById = async (req, res) => {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM recipes WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Receta no encontrada' });
     res.json(result.rows[0]);
   
  };