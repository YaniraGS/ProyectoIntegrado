import { pool } from "../../db.js";

export const getUsers = async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM users')
    res.json(rows)

}

export const getUser = async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM users WHERE uid = $1', [id])
    if (rows.length === 0) {
        return res.status(404).json({ message: "User not found" })
    }
    res.send(rows[0])
}

export const createUser = async (req, res) => {
    const data = req.body;
    const { rows } = await pool.query(
        'INSERT INTO users (email,password,username) VALUES ($1,$2,$3)',
        [data.email, data.password, data.username]);
    return res.json(rows[0])
}


export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE FROM users WHERE uid = $1', [id])
    if (rowCount === 0) {
        return res.status(404).json({ message: "User not found" })
    }
    return res.json({ message: "User deleted" });
}


export const updateUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const { rows } = await pool.query(
        'UPDATE users SET email =$1, password = $2, username =$3 WHERE uid= $4',
        [data.email, data.password, data.username, id])
    res.json(rows[0])
}