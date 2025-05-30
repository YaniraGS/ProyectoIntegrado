import { Router } from 'express'
import {  getUser, getUsers,login,register} from '../controllers/users.controller.js';
import { authenticateToken } from '../middleware/authMiddleware.js';


const router = Router();

//CRUD users
router.post('/login', login);

router.post('/register', register);


router.get('/users', authenticateToken, getUsers);

router.get('/users/:id',authenticateToken, getUser);



export default router;