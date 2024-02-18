import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/userContext"
import { getProfile, putProfile } from "../services/profile"
import { decodeToken } from "react-jwt"

export const useProfile = () => {
   const { user } = useContext(UserContext)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)
   const [profile, setProfile] = useState([])
   
   const updateProfile = async (data) => {
      try {
         setLoading(true)
         setError(null)
         const userID = decodeToken(user.token).id
         const peticion = await putProfile(data, userID, user.token)
         if(peticion?.messageError) throw new Error(peticion.messageError)
         setProfile(data)
      } catch (error) {
         setError(error.message)
      } finally {
         setLoading(false)
      }
   }
   
   useEffect(() => {
      const obtenerPerfil = async () => {
         try {
            setLoading(true)
            setError(null)
            const userID = decodeToken(user.token).id
            const profile = await getProfile(user.token, userID)
            if(profile?.messageError) throw new Error(profile.messageError)
            setProfile(profile.user)
         } catch (error) {
            setError(error.message)
         } finally {
            setLoading(false)
         }
      }
      obtenerPerfil()
   }, [])

   return { profile, loading, error, updateProfile }
}