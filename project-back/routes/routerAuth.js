import { Router } from 'express';
import { register, login } from '../controllers/authController.js';

const router = Router()

// Registrar Usuario
router.post('/register', register)

// Iniciar Sesion
router.post('/login', login)

export default router