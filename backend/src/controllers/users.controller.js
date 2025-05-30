import { pool } from "../../db.js";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const login = async (req, res) => {
    const { email, password,name } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }
        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: user.uid, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ token, user: { id: user.uid, email: user.email, name: user.name } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};


export const register = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: 'El email ya está registrado' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING uid, email, name',
            [email, passwordHash, name]
        );

        const newUser = result.rows[0];

        const token = jwt.sign(
            { id: newUser.uid, email: newUser.email, name: newUser.name },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({ token, user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};


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


