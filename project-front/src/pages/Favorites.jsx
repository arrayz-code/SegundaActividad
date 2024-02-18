import { useContext, useState } from 'react'
import Header from '../components/Header'
import ModalDelete from '../components/ModalDelete'
import { useSpa } from '../hooks/useSpa'
import Loader from '../components/Loader'
import ErrorModal from '../components/ErrorModal'
import CardProduct from '../components/CardProduct'
import ModalEdit from '../components/ModalEdit'
import FormProduct from '../components/FormProduct'
import { UserContext } from '../context/userContext'

function Favorites() {
   const { updateProduct, favorites, removeFavorite, loading, error, setError } = useSpa()
   const { user } = useContext(UserContext)
   const { favorites: favs } = user
   const [modalDelete, setModalDelete] = useState(false)
   const [modalEdit, setModalEdit] = useState(false)
   const [deleteReserv, setDeleteReserv] = useState(null)
   const [itemUpdate, setItemUpdate] = useState(null)

   const handleModalDelete = (data = null) => {
      if (data) setDeleteReserv(data)
      setModalDelete(!modalDelete)
   }
   
   const handleModalEdit = (data = null) => {
      if (data) setItemUpdate(data)
      setModalEdit(!modalEdit)
   }
   

   const deleteFavorites = async (id) => {
      removeFavorite(id)
      handleModalDelete()
   }

   return (
      <>
         <Header texto={'Aqui podrás gestionar tus productos favoritos'} />
         <main className='flex flex-col gap-5 py-5 mb-20 items-center'>
            <h2 className='font-bold text-2xl'>Favoritos</h2>
            <section className='grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] container w-full gap-5'>
               {loading ? (
                  <Loader/>
               ) : favorites.length === 0 ? (
                  <h2 className='font-medium text-lg'>
                     No hay productos favoritos
                  </h2>
               ) : (
                  favorites.map(favorite => (
                     
                     <CardProduct
                        key={favorite._id}
                        data={favorite}
                        favorite={favs.includes(favorite._id) ? true : false}
                        handleModalEdit={handleModalEdit}
                        handleModalDelete={handleModalDelete}
                     />
                  ))
               )}
            </section>
            {modalEdit && 
               <ModalEdit>
                  <FormProduct data={itemUpdate} showFormProduct={handleModalEdit} peticion={updateProduct}/>
               </ModalEdit>
            }
            {modalDelete && 
               <ModalDelete handleModalDelete={handleModalDelete} id={deleteReserv} peticion={deleteFavorites}/>
            }
            {!!error && 
               <ErrorModal error={error} setError={setError}/>
            }
         </main>
      </>
   )
}

export default Favorites
