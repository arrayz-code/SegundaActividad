import Users from '../models/Users.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Valida el usuario por email y username que sean unicos y lo guarda en la BD
export const register = async (req, res) => {
   try {
      const { username, name, last_name, email, password } = req.body;
      let user = await Users.findOne({ $or:[ {username}, {email} ] });
      if (user) {
         if (user.username === username) return res.status(404).json({messageError: 'Este nombre de usuario ya esta en uso'});
         if (user.email === email) return res.status(404).json({messageError: 'Este correo ya esta en uso'});
      }
      
      user = new Users({username, name, last_name, email, password});
      await user.save();

      const token = jwt.sign({id: user._id}, process.env.SECRETTK, {
         expiresIn: '30m'
      })

      return res.status(201).json({
         user: {
            token,
            username: user.username,
            favorites: user.favorites,
            rol: user.rol
         }
      });

   } catch (error) {
      // console.log(error.message);
      return res.status(500).json({messageError: error.message});
   }
}

// Valida que el email existe y que la contraseña sea correcta
export const login = async (req, res) => {
   const { username, password } = req.body;
   try {
      let user = await Users.findOne({username});
      if (!user) return res.status(404).json({messageError: 'No existe este username'});

      if(!(await user.comparePassword(password))) return res.status(404).json({messageError: 'La contraseña no es correcta'});
      
      const token = jwt.sign({id: user._id}, process.env.SECRETTK, {
         expiresIn: '30m'
      })

      return res.status(200).json({
         token,
         username: user.username,
         favorites: user.favorites,
         rol: user.rol
      });
   } catch (error) {
      return res.status(500).json({messageError: error.message});
   }
}