import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/userContext"
import { getUsers, putProfile } from "../services/profile"
import { decodeToken } from "react-jwt"
import { udpateItemFromState } from "../logic/funciones"

export const useUsers = () => {
   const { user } = useContext(UserContext)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)
   const [users, setUsers] = useState([])
   
   const updateUser = async (data) => {
      try {
         setLoading(true)
         setError(null)
         const peticion = await putProfile(data, data._id, user.token)
         if(peticion?.messageError) throw new Error(peticion.messageError)
         const newList = udpateItemFromState(peticion.user, users)
         setUsers(newList)
      } catch (error) {
         setError(error.message)
      } finally {
         setLoading(false)
      }
   }
   
   useEffect(() => {
      const obtenerUsuarios = async () => {
         try {
            setLoading(true)
            setError(null)
            const userID = decodeToken(user.token).id
            const users = await getUsers(user.token, userID)
            if(users?.messageError) throw new Error(users.messageError)
            setUsers(users.users)
         } catch (error) {
            setError(error.message)
         } finally {
            setLoading(false)
         }
      }
      obtenerUsuarios()
   }, [])

   return { users, loading, error, updateUser }
}