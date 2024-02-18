import Users from '../models/Users.js';
import jwt from 'jsonwebtoken';

export const isAutheticated = async (req, res, next) => {
   try {
      const header = req.headers['authorization']
      const accessToken = header ? header.split(' ')[1] : null
      if (!accessToken) return res.status(401).json({messageError: 'Not token provided'})
   
      const decoded = jwt.verify(accessToken, process.env.SECRETTK)
      
      let user = await verifyUser(decoded)
      req.user = user
      
      return next()
   } catch (error) {
      return res.status(401).json({messageError: error.message});
   }
}

const verifyUser = async (decodedToken) => {
   let user = await Users.findById(decodedToken.id, {rol: 1}).lean();
   if (!user) throw new Error('User not found');
   if (user.rol === 'User' || user.rol === 'Admin') {
      user._id = user._id.toString();
      return user
   }
   throw new Error('Not role assigned')
}

export const verifyAdmin = async (req, res, next) => {
   try {
      if (!req.user) return res.status(404).json({messageError: 'User not found'})
      if (req.user.rol === 'Admin') {
         return next()
      }
      throw new Error('Require Admin role')
   } catch (error) {
      return res.status(401).json({messageError: error.message})
   }
}
