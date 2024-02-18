import { Router } from 'express';
import { createProduct, deleteProduct,favorites,getCategorias,home, product, toggleFavorites, updateProduct } from '../controllers/productsController.js';
const router = Router()
import { isAutheticated, verifyAdmin } from '../middlewares/isAuthenticated.js';

// Devuelve todos los productos disponibles y los testimonios disponibles
router.get('/home/:filter', isAutheticated, home)

// Devuelve un producto
router.get('/get-product/:productID', isAutheticated, product)

// Crea un producto (Solo tiene acceso un Administrator)
router.post('/create-product/:userID', isAutheticated, verifyAdmin, createProduct)

// Modifica un producto (Solo tiene acceso un Administrator)
router.put('/update-product/:productID/:userID', isAutheticated, verifyAdmin, updateProduct)

// Elimina un producto (Solo tiene acceso un Administrator)
router.delete('/delete-product/:productID/:userID', isAutheticated, verifyAdmin, deleteProduct)

// Cambiar el producto favorito del usuario
router.put('/toggle-favorite/:productID', isAutheticated, toggleFavorites)

// Trae los productos favoritos del usuario
router.get('/favorites/:userID', isAutheticated, favorites)

// Trae las categorias de los productos 
router.get('/categorias', isAutheticated, getCategorias)
export default router