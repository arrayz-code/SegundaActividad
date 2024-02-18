import { createContext, useState } from "react";
import { useFavorites } from '../hooks/useFavorites'
import { useProducts } from '../hooks/useProducts'

export const SpaContext = createContext()

export function SpaProvider({ children }) {
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)
   const [category, setCategory] = useState('all')
   const { favorites, updateFavorite } = useFavorites(setLoading, setError)
   const { products, categorias, addProduct, updateProduct, removeProduct } = useProducts(setLoading, setError, category)

   return (
      <SpaContext.Provider value={{
         loading,
         error,
         setError,
         favorites,
         updateFavorite,
         products,
         categorias,
         setCategory,
         addProduct,
         updateProduct,
         removeProduct,
      }}>
         {children}
      </SpaContext.Provider>
   )
}
