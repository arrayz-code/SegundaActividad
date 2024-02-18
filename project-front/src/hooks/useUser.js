import { useState } from "react"

export const useUser = () => {
   const [user, setUser] = useState({
      username: '',
      name: '',
      last_name: '',
      email: '',
      password: ''
   })

   const handleChange = e => {
      setUser({
         ...user,
         [e.target.name]: e.target.value
      })
   }

   return { user, handleChange }
}