import { model } from 'mongoose'
import { Schema } from 'mongoose'

const productSchema = new Schema({
   titulo: {
      type: String,
      unique: true,
      required: true
   },
   imagen: {
      type: Object,
      public_id: String,
      secure_url: String,
      default: null
   },
   descripcion: {
      type: String,
      required: true
   },
   categoria: {
      type: String,
      required: true
   },
   precio: {
      type: Number,
      required: true
   },
   cantidad: {
      type: Number,
      required: true
   }
})

const Products = model('Products', productSchema)
export default Products
