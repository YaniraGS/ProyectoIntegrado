import { pool } from "../../db.js";

export const getRecipes = async (req, res) => {
    const {rows} = await pool.query('SELECT * FROM recipes')
    res.json(rows)
}

export const createRecipe = async (req, res) => {
    const data = req.body;
    const {rows} = await pool.query(
        'INSERT INTO recipes (name, category, cuisine_type,servings, preparation_time, cooking_time, total_time, steps) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [data.name, data.category, data.cuisine_type, data.servings, data.preparation_time, data.cooking_time, data.total_time, data.steps]);
    return res.json(rows[0]);
}

export const getRecipeById = async (req, res) => {
    const { id } = req.params;
    const {rows} = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Receta no encontrada' });
     res.json(rows[0]);
   
  };

export const getIngredientsByRecipe = async (req, res) => {
  const recipeId = req.params.id;

  try {
    const result = await pool.query(`
      SELECT i.name, ri.quantity
      FROM recipe_ingredients ri
      JOIN ingredients i ON ri.ingredient_id = i.id
      WHERE ri.recipe_id = $1
    `, [recipeId]);

    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener ingredientes:', err);
    res.status(500).json({ error: 'Error al obtener ingredientes de la receta' });
  }
};

export const getRecipesByIngredient = async (req, res) => {
  console.log("Entró a getRecipesByIngredient con query:", req.query);
  const { name } = req.query;
  if (!name) return res.status(400).json({ message: 'El parámetro "name" es requerido' });

  try {const query = `
      SELECT r.*
      FROM recipes r
      JOIN recipe_ingredients ri ON r.id = ri.recipe_id
      JOIN ingredients i ON i.id = ri.ingredient_id
      WHERE i.name ILIKE '%' || $1 || '%'
      GROUP BY r.id;
    `;

    const { rows } = await pool.query(query, [name]);

    if (rows.length === 0) return res.status(404).json({ message: 'No se encontraron recetas para ese ingrediente' });

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};