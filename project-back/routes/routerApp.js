import { Router } from 'express';
import { users, profile, updateUser } from '../controllers/appController.js';
import { isAutheticated, verifyAdmin } from '../middlewares/isAuthenticated.js';

const router = Router()

// Obtener usuarios
router.get('/users', isAutheticated, verifyAdmin, users)

// Obtener perfil
router.get('/profile/:userID', isAutheticated, profile)

// Modificar perfil
router.put('/updateUser/:userID', isAutheticated, updateUser)

export default router