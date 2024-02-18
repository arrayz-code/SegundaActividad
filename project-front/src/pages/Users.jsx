import Header from '../components/Header'
import Loader from '../components/Loader'
import ErrorModal from '../components/ErrorModal'
import { useSpa } from '../hooks/useSpa'
import ModalEdit from '../components/ModalEdit'
import FormProfile from '../components/FormProfile'
import { useState } from 'react'
import { useUsers } from '../hooks/useUsers'
import { BsPencilSquare } from 'react-icons/bs'

function Profile() {
   const { setError } = useSpa()
   const [modalEdit, setModalEdit] = useState(false)
   const [itemUpdate, setItemUpdate] = useState(null)
   const { users, loading, error, updateUser } = useUsers()
   
   const handleModalEdit = (data = null) => {
      if (data) setItemUpdate(data)
      setModalEdit(!modalEdit)
   }

   return (
      <>
         <Header texto={`Hola Admin, aqui puedes gestionar los usuarios`} />
         <main className='flex flex-col items-center gap-5'>
            {loading ? (
               <Loader/>
            ) : (
               <>
                  <section className='flex flex-col sm:flex-row justify-around gap-5 sm:gap-20 py-5 mx-10'>
                     {users.length === 0 ? (
                        <strong className="text-xl">
                           No hay usuarios que mostrar
                        </strong>
                     ) : (
                        users.length > 0 && (
                           <>
                              <table className="bg-sky-300 rounded-md w-full px-4 border-separate border-spacing-0 border-spacing-y-4">
                                 <thead className="px-5">
                                    <tr>
                                       <th className="p-4 text-lg">Username</th>
                                       <th className="p-4 text-lg hidden sm:table-cell">Nombre y apellido</th>
                                       <th className="p-4 text-lg hidden min-[550px]:table-cell">Correo</th>
                                       <th className="p-4 text-lg hidden md:table-cell">Telefono</th>
                                       <th className="p-4 text-lg">Accion</th>
                                    </tr>
                                 </thead>
                                 <tbody className="px-5">
                                    {users.map(user => (
                                       <tr key={user._id} className="bg-sky-400">
                                          <td className="p-4 text-lg rounded-l-2xl">{user.username}</td>
                                          <td className="p-4 text-lg hidden sm:table-cell">{user.name} {user.last_name}</td>
                                          <td className="p-4 text-lg hidden min-[550px]:table-cell">{user.email}</td>
                                          <td className="p-4 text-lg hidden md:table-cell">{user.phone}</td>
                                          <td className="p-4 text-lg rounded-r-2xl">
                                             <button
                                                className='text-sky-800 text-2xl px-6 rounded-md'
                                                onClick={() => handleModalEdit(user)}
                                             >
                                                <BsPencilSquare/>
                                             </button>
                                          </td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </>
                        )
                     )}
                  </section>
               </>
            )}
            {modalEdit && 
               <ModalEdit>
                  <FormProfile data={itemUpdate} showFormProduct={setModalEdit} peticion={updateUser}/>
               </ModalEdit>
            }
            {!!error && 
               <ErrorModal error={error} setError={setError}/>
            }
         </main>
      </>
   )
}

export default Profile
