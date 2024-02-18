import { useParams } from 'react-router-dom'
import { useProduct } from '../hooks/useProduct'
import { useSpa } from '../hooks/useSpa'
import Header from '../components/Header'
import Loader from '../components/Loader'
import ErrorModal from '../components/ErrorModal'

function Product() {
   const { productID } = useParams()
   const { error, setError } = useSpa()
   const { product, loading } = useProduct(productID)
   
   return (
      <>
         <Header texto={product.titulo} />
         <main className='flex flex-col items-center gap-5'>
   <img src="ruta/a/la/imagen.jpg" alt="Imagen de producto" className="w-64 h-64 object-cover" />
   {loading ? (
      <Loader/>
   ) : (
      <>
         <section className='flex flex-col sm:flex-row justify-around gap-5 py-5 mx-10'>
            <article className='flex flex-col items-center gap-5'>
               <table className="table-auto">
                  <thead>
                     <tr>
                        <th className="px-4 py-2">Descripción</th>
                        <th className="px-4 py-2">Categoría</th>
                        <th className="px-4 py-2">Cantidad</th>
                        <th className="px-4 py-2">Precio</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td className="border px-4 py-2 max-w-[75ch]">{product.descripcion}</td>
                        <td className="border px-4 py-2">{product.categoria}</td>
                        <td className="border px-4 py-2">{product.cantidad} unidades</td>
                        <td className="border px-4 py-2">${product.precio}</td>
                     </tr>
                  </tbody>
               </table>
            </article>
         </section>
         <section className="flex flex-col items-center gap-5 py-5">
            <label htmlFor="cantidad">Cantidad:</label>
            <input type="number" id="cantidad" name="cantidad" min="1" defaultValue="1" className="border border-gray-3 px-3 py-1" />
            <button className="bg-blue-500 hover:bg-white text-white font-bold py-2 px-4 rounded">Comprar</button>
         </section>
      </>
   )}
   {!!error && 
      <ErrorModal error={error} setError={setError}/>
   }
</main>


      </>
   )
}

export default Product
