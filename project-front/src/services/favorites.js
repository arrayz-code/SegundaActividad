export const getFavorites = async (token, userID) => {
   const favorites = await fetch(`http://localhost:3000/products/favorites/${userID}`,{
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

   return favorites
}

export const putFavorite = async (userID, productID, token) => {
   const favorite = await fetch(`http://localhost:3000/products/toggle-favorite/${productID}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({userID})
   })
      .then(response => response.json())
      .then(res => {
         if (res.messageError) throw new Error(res.messageError)
         return res
      })
      .catch(e => {
         return ({messageError: e.message})
      })

   return favorite
}
