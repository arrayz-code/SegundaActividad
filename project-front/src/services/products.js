export const getCategorias = async (token) => {
   const products = await fetch(`http://localhost:3000/products/categorias`,{
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

   return products
}

export const getProducts = async (token, userID) => {
   const products = await fetch(`http://localhost:3000/products/home/${userID}`,{
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

   return products
}

export const postProduct = async (data, token, userID) => {
   const product = await fetch(`http://localhost:3000/products/create-product/${userID}`,{
      method: 'POST',
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

   return product
}

export const putProduct = async (data, token, id, userID) => {
   const product = await fetch(`http://localhost:3000/products/update-product/${id}/${userID}`,{
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

   return product
}

export const deleteProduct = async (token, id, userID) => {
   const user = await fetch(`http://localhost:3000/products/delete-product/${id}/${userID}`,{
      method: 'DELETE',
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

   return user
}