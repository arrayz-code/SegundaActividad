import dotenv from 'dotenv';
dotenv.config();
import { set, connect } from 'mongoose';
import Users from '../models/Users.js';
import Products from '../models/Products.js';
import addAdmin from './dbAdmin.js'; // Agrega Admin
import addProducts from './dbProducts.js'; // Agrega los Servicios

set('strictQuery', false)

connect(process.env.URI) 
   .then(async()=> {
      const admin = await Users.findOne({email: process.env.ADMIN_EMAIL}).lean();
      const products = await Products.findOne().lean();
      if (!admin) {
         addAdmin()
         console.log('Administrador Creado');
      }
      if (!products) {
         addProducts()
         console.log('Productos Agregados');
      }
      console.log('DB Conectada🚀')
   })
   .catch((e) => console.log("Fallo de Conexion " + e));