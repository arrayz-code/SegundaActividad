export const getUsers = async (token) => {
   const users = await fetch(`http://localhost:3000/app/users`,{
      headers: { Authorization: `Bearer ${token}` }
   })
      .then(response => response.json())
      .then(res => {
         if (res.messageError) throw new Error(res.messageError)
         return res
      })
      .catch(e => {
         return ({messageError: e.message})
      })

   return users
}

export const getProfile = async (token, userID) => {
   const profile = await fetch(`http://localhost:3000/app/profile/${userID}`,{
      headers: { Authorization: `Bearer ${token}` }
   })
      .then(response => response.json())
      .then(res => {
         if (res.messageError) throw new Error(res.messageError)
         return res
      })
      .catch(e => {
         return ({messageError: e.message})
      })

   return profile
}

export const putProfile = async (data, userID, token) => {
   const profile = await fetch(`http://localhost:3000/app/updateUser/${userID}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
   })
      .then(response => response.json())
      .then(res => {
         if (res.messageError) throw new Error(res.messageError)
         return res
      })
      .catch(e => {
         return ({messageError: e.message})
      })

   return profile
}
