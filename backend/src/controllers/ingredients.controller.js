import { pool } from "../../db.js";


export const getIngredients = async (req,res) => {
    const {rows} = await pool.query ('SELECT * FROM ingredients')
    res.json(rows)
}

export const getIngredientsById = async (req,res) => {
    const {id} = req.params;
    const {rows} = await pool.query (
        'SELECT * FROM ingredients WHERE id=$1', [id])

        if (rows.length === 0) return res.status(404).json({error: 'Ingrediente no encontrado'
        })
        res.json(rows[0]);
}
