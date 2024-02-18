import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/userContext"
import { getProduct } from "../services/product"

export const useProduct = (id) => {
   const { user } = useContext(UserContext)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)
   const [product, setProduct] = useState([])
   
   useEffect(() => {
      const obtenerServicio = async () => {
         try {
            setLoading(true)
            setError(null)
            const product = await getProduct(user.token, id)
            if(product?.messageError) throw new Error(product.messageError)
            setProduct(product.product)
         } catch (error) {
            setError(error.message)
         } finally {
            setLoading(false)
         }
      }
      obtenerServicio()
   }, [])

   return { product, loading, error }
}