import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/userContext"
import { obtenerHome } from "../services/home"
import { deleteProduct, getCategorias, postProduct, putProduct } from "../services/products"
import { addItemToState, udpateItemFromState, deleteItemFromState } from "../logic/funciones"
import { decodeToken } from "react-jwt"

export const useProducts = (setLoading, setError, category) => {
   const { user } = useContext(UserContext)
   const [products, setProducts] = useState([])
   const [categorias, setCategorias] = useState([])
      
   const addProduct = async (data) => {
      try {
         setLoading(true)
         setError(null)
         const userID = decodeToken(user.token).id
         const peticion = await postProduct(data, user.token, userID)
         if(peticion?.messageError) throw new Error(peticion.messageError)
         const newList = addItemToState(peticion.product, products)
         setProducts(newList)
      } catch (error) {
         setError(error.message)
      } finally {
         setLoading(false)
      }
   }

   const updateProduct = async (data, id) => {
      try {
         setLoading(true)
         setError(null)
         const userID = decodeToken(user.token).id
         const peticion = await putProduct(data, user.token, id, userID)
         if(peticion?.messageError) throw new Error(peticion.messageError)
         const newList = udpateItemFromState(peticion.product, products)
         setProducts(newList)
      } catch (error) {
         setError(error.message)
      } finally {
         setLoading(false)
      }
   }

   const removeProduct = async (id) => {
      try {
         setLoading(true)
         setError(null)
         const userID = decodeToken(user.token).id
         const peticion = await deleteProduct(user.token, id, userID)
         if(peticion?.messageError) throw new Error(peticion.messageError)
         const newList = deleteItemFromState(peticion.product, products)
         setProducts(newList)
      } catch (error) {
         setError(error.message)
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      const getHome = async () => {
         try {
            setLoading(true)
            setError(null)
            const getHome = await obtenerHome(user.token, category)
            const obtenerCategorias = await getCategorias(user.token)
            if(getHome?.messageError) throw new Error(getHome.messageError)
            setProducts(getHome.products)
            setCategorias(obtenerCategorias.categorias)
         } catch (error) {
            setError(error.message)
         } finally {
            setLoading(false)
         }
      }
      getHome()
   }, [user, category])

   return { products, categorias, addProduct, updateProduct, removeProduct}
}