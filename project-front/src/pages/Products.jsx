import Header from '../components/Header'
import CardProduct from '../components/CardProduct'
import {
   BsCalendar3Week,
   BsClock,
   BsEnvelope,
   BsFacebook,
   BsInstagram,
   BsPhone,
   BsPinMapFill,
   BsWhatsapp
} from 'react-icons/bs'
import { useSpa } from '../hooks/useSpa'
import FormProduct from '../components/FormProduct'
import { useContext, useState } from 'react'
import { UserContext } from '../context/userContext'
import ModalEdit from '../components/ModalEdit'
import ModalDelete from '../components/ModalDelete'
import Loader from '../components/Loader'
import ErrorModal from '../components/ErrorModal'

function Products() {
   const { user, adminMode } = useContext(UserContext)
   const { favorites } = user
   const { products, setCategory, categorias, addProduct, updateProduct, removeProduct, updateFavorite, loading, error, setError } = useSpa()
   const [formProduct, setFormProduct] = useState(false)
   const [modalEdit, setModalEdit] = useState(false)
   const [modalDelete, setModalDelete] = useState(false)
   const [itemUpdate, setItemUpdate] = useState(null)
   const [itemDelete, setItemDelete] = useState(null)

   const handleModalDelete = (data = null) => {
      if (data) setItemDelete(data)
      setModalDelete(!modalDelete)
   }
   
   const handleModalEdit = (data = null) => {
      if (data) setItemUpdate(data)
      setModalEdit(!modalEdit)
   }

   const handleCategory = (e) =>    {
      setCategory(e.target.value);
   }

   const showFormProduct = () => {
      setFormProduct(!formProduct)
   }
   
   return (
      <>
         <Header
            texto={`¡Bienvenido ${user.username} a Nuestra Tienda Virtual!`}
         />
         <main className='flex flex-col gap-5 pt-5 items-center'>
            <div className='relative w-full flex flex-col items-center gap-2 md:block'>
               <h2 className='font-bold text-xl sm:text-2xl'>Servicios</h2>
               <div className='md:absolute top-1 right-20 flex items-center gap-2'>
                  <label htmlFor="categoria" className='font-semibold'>Filtrar: </label>
                  <select name="categoria" id="categoria" className='bg-white px-2 py-1 rounded-lg outline-none focus:ring-2 focus:ring-white' onChange={e => {handleCategory(e)}}>
                     <option value="all">All</option>
                     {categorias.map((categoria, i) => (
                        <option key={i} value={categoria}>{categoria}</option>
                       ))}
                  </select>
               </div>
            </div>
            {adminMode && 
               <section className='flex flex-col items-center gap-6 w-full bg-white p-6'>
                  <button
                     disabled={formProduct}
                     onClick={showFormProduct}
                     className='bg-orange-600    text-white text-lg px-6 rounded-md disabled:bg-black/50'
                  >
                     Agregar servicio
                  </button>
                  {formProduct && (
                     <article>
                        <FormProduct peticion={addProduct} showFormProduct={showFormProduct}/>
                     </article>
                  )}
               </section>
            }
            <section className='bg-white grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] w-full gap-5'>
               {loading ? (
                  <Loader/>
               ) : (
                  products.length === 0 ? (
                     <h2 className='font-medium text-lg'>
                        No hay servicios disponibles
                     </h2>
                  ) : (
                     user.rol === 'User' ? (
                        products.map(product => (
                           product.cantidad > 0 && (
                              <CardProduct
                                 key={product._id}
                                 data={product}
                                 favorite={favorites.includes(product._id) ? true : false}
                                 updateFavorite={updateFavorite}
                                 handleModalEdit={handleModalEdit}
                                 handleModalDelete={handleModalDelete}
                              />
                           )
                        ))
                     ) : (
                        products.map(product => (
                           <CardProduct
                              key={product._id} 
                              data={product}
                              favorite={favorites.includes(product._id) ? true : false}
                              updateFavorite={updateFavorite}
                              handleModalEdit={handleModalEdit}
                              handleModalDelete={handleModalDelete}
                           />
                        ))

                     )
                  )
               )}
            </section>
            <section className='bg-white   w-full p-5 grid grid-rows-3 sm:grid-rows-2 sm:grid-cols-2 md:grid-rows-none md:grid-cols-3 justify-around items-center text-left gap-5 break-words'>
               {/* Contenido de horario, ubicación y contacto */}
            </section>
            {/* Modales y manejo de errores */}
            {modalEdit && 
               <ModalEdit>
                  <FormProduct data={itemUpdate} showFormProduct={handleModalEdit} peticion={updateProduct}/>
               </ModalEdit>
            }
            {modalDelete && 
               <ModalDelete handleModalDelete={handleModalDelete} id={itemDelete} peticion={removeProduct}/>
            }
            {!!error && 
               <ErrorModal error={error} setError={setError}/>
            }
         </main>
      </>
   )
}

export default Products
   