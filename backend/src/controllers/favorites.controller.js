import { pool } from "../../db.js";

export const addRecipeToFavorite = async (req, res) => {
    const { userId, recipeId } = req.body;

    try {
        const { rows: existingFavorite } = await pool.query(
            'SELECT * FROM favorites WHERE user_id = 1$ AND recipe_id=$2', [userId, recipeId]
        );

        if (existingFavorite.length > 0) {
            return res.status(400).json({ error: 'Lareceta ya está en tus favoritos.' });
        } await pool.query(
            'INSERT INTO favorites (user_id, recipe_id) VALUES ($1,$2)', [userId, recipeId]);

        return res.status(200).json({ message: 'Receta añadida a favoritos' });

    } catch (error) {
        return res.status(500).json({ error: 'Error al añadir la receta a favoritos.' });
    };
}


export const getFavoriteRecipe = async (req, res) => {
    const { userId } = req.params;

    try {
        const { rows } = await pool.query(
            'SELECT recipes.id, recipes.name FROM recipes ' +
            'JOIN user_recipes ON recipes.id = user_recipes.recipe_id ' +
            'WHERE user_recipes.user_id = $1',
            [userId]
        );

        return res.status(200).json(rows);


    } catch (error) { return res.status(500).json({ error: 'Error al obtener las recetas favoritas.' }); }

}

export const removeRecipeFavorite = async (req, res) => {
    const { userId, recipeId } = req.body;

    try {
        const { rows: existingFavorite } = await pool.query(
            'SELECT * FROM user_recipes WHERE user_id = $1 AND recipe_id = $2',
            [userId, recipeId]
        );
        if (existingFavorite.length === 0) {
            return res.status(400).json({ error: 'La receta no está en tus favoritos.' });
        }
        await pool.query(
            'DELETE FROM user_recipes WHERE user_id = $1 AND recipe_id = $2',
            [userId, recipeId]
        );
        return res.status(200).json({ message: 'Receta eliminada de favoritos.' });

    } catch (error) {
        return res.status(500).json({ error: 'Error al eliminar receta de favoritos.' });

    }

}