import Header from '../components/Header'
import Loader from '../components/Loader'
import ErrorModal from '../components/ErrorModal'
import { useProfile } from '../hooks/useProfile'
import { useSpa } from '../hooks/useSpa'
import ModalEdit from '../components/ModalEdit'
import FormProfile from '../components/FormProfile'
import { useState } from 'react'

function Profile() {
   const [modalEdit, setModalEdit] = useState(false)
   const { setError } = useSpa()
   const { profile, loading, error, updateProfile } = useProfile()
   
   return (
      <>
         <Header texto={`Hola ${profile.username}, aqui puedes gestionar tu informacion personal`} />
         <main className='flex flex-col items-center gap-5'>
            {loading ? (
               <Loader/>
            ) : (
               <>
                  <section className='flex flex-col sm:flex-row justify-around gap-5 sm:gap-20 pt-5 mx-10'>
                     <article className='flex flex-col items-center gap-5'>
                        <h2 className='font-bold text-xl'>Username</h2>
                        <p className='text-lg'>{profile.username}</p>
                        <h2 className='font-bold text-xl'>Nombre</h2>
                        <p className='text-lg'>{profile.name}</p>
                        <h2 className='font-bold text-xl'>Apellido</h2>
                        <p className='text-lg'>{profile.last_name}</p>
                     </article>
                     <article className='flex flex-col items-center gap-5'>
                        <h2 className='font-bold text-xl'>Correo</h2>
                        <p className='text-lg'>{profile.email}</p>
                        <h2 className='font-bold text-xl'>Direccion</h2>
                        <p className='text-lg'>{profile.address ? profile.address : 'Sin direccion'}</p>
                        <h2 className='font-bold text-xl'>Telefono</h2>
                        <p className='text-lg'>{profile.phone ? profile.phone : 'Sin telefono'}</p>
                     </article>
                  </section>
                  <button
                     className='bg-orange-600 text-sky-100 px-6 py-1 mx-auto mb-5 rounded-md'
                     onClick={() => setModalEdit(true)}
                  >
                     Editar perfil
                  </button>
               </>
            )}
            {modalEdit && 
               <ModalEdit>
                  <FormProfile data={profile} showFormProduct={setModalEdit} peticion={updateProfile}/>
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
