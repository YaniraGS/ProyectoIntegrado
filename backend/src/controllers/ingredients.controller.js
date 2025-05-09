import { pool } from "../../db.js";


export const getIngredients = async (req,res) => {
    const {rows} = await pool.query ('SELECT * FROM ingredients')
    res.json(rows)
}

export const getIngrediendtsById = async (req,res) => {
    const {id} = req.params;
    const {rows} = await pool.query (
        'SELECT * FROM ingredients WHERE id=$1', [id])

        if (rows.length === 0) return res.status(404).json({error: 'Ingrediente no encontrado'
        })
        res.json(rows[0]);
}

export const createIngredients = async (req,res) => {
    try{
    const data = req.body;
    const {rows} = await pool.query(
        'INSERT INTO ingredients (name) VALUES ($1) RETURNING *', [data.name]
    )
    return res.json(rows[0]);
    } catch (error) {return res.json ({error: 'Error al añadir el ingediente, es probable que ya exista'})
}
}