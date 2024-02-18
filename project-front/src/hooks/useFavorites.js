import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/userContext"
import { getFavorites, putFavorite } from "../services/favorites"
import { decodeToken } from "react-jwt"
import { toggleFavToState } from "../logic/funciones"

export const useFavorites = (setLoading, setError) => {
   const { user, setUser } = useContext(UserContext)
   const [favorites, setFavorites] = useState([])

   const updateFavorite = async (productID) => {
      try {
         setLoading(true)
         setError(null)
         const userID = decodeToken(user.token).id
         const peticion = await putFavorite(userID, productID, user.token)
         if(peticion?.messageError) throw new Error(peticion.messageError)
         const newList = toggleFavToState(productID, user.favorites)
         setUser({
            ...user,
            favorites: newList
         })
      } catch (error) {
         setError(error.message)
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      const obtenerReservaciones = async () => {
         try {
            setLoading(true)
            setError(null)
            const userID = decodeToken(user.token).id
            const get = await getFavorites(user.token, userID)
            if(get?.messageError) throw new Error(get.messageError)
            setFavorites(get.favorites)
         } catch (error) {
            setError(error.message)
         } finally {
            setLoading(false)
         }
      }
      obtenerReservaciones()
   }, [user])

   return { favorites, updateFavorite }
}