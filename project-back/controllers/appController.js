import Users from '../models/Users.js';
import dotenv from 'dotenv';
dotenv.config();

// Trae los datos de los usuarios excepto los del Admin
export const users = async (req, res) => {
   try {
      const users = await Users.find({rol: 'User'}, {__v: 0}).lean();
      if(!users) return res.status(404).json({messageError: 'No se encontraron usuarios'})
      return res.status(200).json({users})
   } catch (error) {
      return res.status(500).json({messageError: error.message})
   }
}

// Trae los datos del usuario
export const profile = async (req, res) => {
   try {
      const { userID } = req.params
      const user = await Users.findById(userID, {favorites: 0, __v: 0, password: 0, rol: 0}).lean();
      if(!user) return res.status(404).json({messageError: 'Usuario no encontrado'})
      // console.log(user);
      return res.status(200).json({user})
   } catch (error) {
      return res.status(500).json({messageError: error.message})
   }
}

// Modifica el perfil de un usuario por ID
export const updateUser = async (req, res) => {
   try {
      const {userID} = req.params
      const update = req.body

      let user = await Users.findById(userID).lean()
      if(!user) return res.status(404).json({messageError: 'Usuario no encontrado'})
      
      user = await Users.findByIdAndUpdate(userID, update, {new: true}).lean();
      return res.status(200).json({user})
   } catch (error) {
      return res.status(500).json({messageError: error.message})
   }
}
