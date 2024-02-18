import Products from '../models/Products.js'
import Users from '../models/Users.js'

// Devuelve los productos filtrados
export const home = async (req, res) => { //✅
   try {
      const { filter } = req.params

      if (filter === 'all') {
         const products = await Products.find({}, { __v: 0 }).lean()
         return res.status(200).json({ products })
      }

      const products = await Products.find({categoria: filter}, { __v: 0 }).lean()
      return res.status(200).json({ products })

   } catch (error) {
      return res.status(500).json({ messageError: error.message })
   }
}

// Devuelve un producto
export const product = async (req, res) => { //✅
   try {
      const { productID } = req.params
      const product = await Products.findById(productID, { __v: 0 }).lean()

      return res.status(200).json({ product })
   } catch (error) {
      return res.status(500).json({ messageError: error.message })
   }
}

// Crea un producto
export const createProduct = async (req, res) => { //✅
   try {
      const { titulo, descripcion, categoria, precio, cantidad } = req.body;
      
      let product = await Products.findOne({titulo: titulo});
      if (product) return res.status(404).json({messageError: 'Este titulo de producto ya existe'})
      
      product = new Products({ titulo, descripcion, categoria, precio, cantidad });

      await product.save();

      return res.status(201).json({product});

   } catch (error) {
      return res.status(500).json({messageError: error.message});
   }
}

// Modifica un producto
export const updateProduct = async (req, res) => { //✅
   try {
      const { productID } = req.params;
      const update = req.body;

      const product = await Products.findByIdAndUpdate(productID, update, {new: true})

      return res.status(200).json({product});
   } catch (error) {
      return res.status(500).json({messageError: error.message});
   }
}

// Elimina un producto
export const deleteProduct = async (req, res) => { //✅
   try {
      
      const { productID } = req.params;
      const product = await Products.findByIdAndDelete(productID)

      if (!product) return res.status(404).json({messageError: 'Este producto no fue encontrado'})

      await Users.updateMany({}, {$pull: {favorites: {$in: [productID]}}}, { multi: true })

      return res.status(200).json({product});
   } catch (error) {
      return res.status(500).json({messageError: error.message});
   }
}

// Si encuentra el productos entre sus favoritos lo borra y si no lo encuentra lo agrega
export const toggleFavorites = async (req, res) => { //✅
   try {
      const { productID } = req.params
      const { userID } = req.body
      let fav = true
      const product = await Products.findById(productID).lean()
      if (!product) return res.status(404).json({messageError: 'product no encontrado'})

      let user = await Users.findById(userID).lean()
      if (!user) return res.status(404).json({messageError: 'Usuario no encontrado'})

      user = await Users.updateOne({ _id: userID }, {$pull: {favorites: {$in: [productID]}}})
   
      if (user.modifiedCount === 1){
         fav = false
         // console.log("Se elimino de favoritos")
         return res.status(200).json({fav})
      }
   
      if (user.modifiedCount !== 1){
         user = await Users.updateOne({ _id: userID }, {$push: {favorites: productID}})
         // console.log("Se agrego a favoritos")
         return res.status(200).json({fav})
      }
   } catch (error) {
      return res.status(500).json({messageError: error.message})
   }
}

// Trae los productos favoritos del usuario
export const favorites = async (req, res) => { //✅
   try {
      const {userID} = req.params
      const user = await Users.findOne({_id: userID}).populate({path: 'favorites', select: 'titulo descripcion precio cantidad'}).lean();
      
      return res.status(200).json({favorites: user.favorites})
   } catch (error) {
      return res.status(500).json({messageError: error.message})
   }
}

// Trae las categorias de los productos
export const getCategorias = async (req, res) => { //✅
   try {
      const categorias = await Products.distinct('categoria').lean();

      return res.status(200).json({categorias})
   } catch (error) {
      return res.status(500).json({messageError: error.message})
   }
}
