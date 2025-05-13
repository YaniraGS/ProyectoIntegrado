import { Router } from 'express'
import { deleteUser, getUser, getUsers, updateUser,login,register} from '../controllers/users.controller.js';
import { authenticateToken } from '../middleware/authMiddleware.js';


const router = Router();

//CRUD users
router.post('/login', login);

router.post('/register', register);


router.get('/users', authenticateToken, getUsers);

router.get('/users/:id',authenticateToken, getUser);

router.put('/users/:id', authenticateToken, updateUser);

router.delete('/users/:id', authenticateToken, deleteUser);

export default router;