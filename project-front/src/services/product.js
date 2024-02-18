export const getProduct = async (token, id) => {
   const product = await fetch(`http://localhost:3000/products/get-product/${id}`,{
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

   return product
}