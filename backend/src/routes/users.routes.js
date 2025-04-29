import {Router} from 'express'
import { pool } from  '../db.js';


const router = Router();

//CRUD users

router.get('/users', (req,res) =>{
    res.send("Obteniendo usuarios")
})

router.get('/users/:id', (req,res) =>{
    const {id} = req.params;
    res.send("Obteniendo" + id)
})
router.post('/users', (req,res) =>{
    res.send("creando usuario")
})
router.put('/users/:id', (req,res) =>{
    const {id} = req.params;
    res.send("Actualizando usuarios")
})
router.delete('/users/:id', (req,res) =>{
    res.send("Obteniendo")
})

export default router;