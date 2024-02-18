import { useState } from 'react'
import ErrorModal from './ErrorModal'

function FormProfile({  data, showFormProduct, peticion }) {
   const [error, setError] = useState('')

   const [profile, setProfile] = useState({
      _id: data._id,
      username: data.username,
      name: data.name,
      last_name: data.last_name,
      email: data.email,
      address: data.address,
      phone: data.phone,
   })

   const handleChange = e => {
      setProfile({
         ...profile,
         [e.target.name]: e.target.value
      })
   }

   const handleSubmit = e => {
      e.preventDefault()
      const { username, name, last_name, email, phone } = profile;
      if (username.trim() === '')
         return setError('El campo username no puede estar vacio')
      if (name.trim() === '')
         return setError('El campo name no puede estar vacio')
      if (last_name.trim() === '')
         return setError('El campo last name no puede estar vacio')
      if (email.trim() === '')
         return setError('El campo email no puede estar vacio')
      if (isNaN(phone))
         return setError('El campo phone debe contener solo numeros')

      showFormProduct(false)
      if(data) return peticion(profile)
   }

   return (
      <>
         <form className='text-left text-lg ring-2 ring-sky-600 p-5 rounded-xl flex flex-col md:flex-row justify-center gap-2 md:gap-10'>
            <div className='flex flex-col gap-2'>
               <div className='flex flex-col justify-center gap-2'>
                  <label
                     htmlFor='username'
                     className='font-medium'
                  >
                     Nombre de Usuario
                  </label>
                  <input
                     type='text'
                     name='username'
                     id='username'
                     value={profile.username}
                     onChange={handleChange}
                     className='bg-sky-50 px-2 rounded-lg outline-none focus:ring-2 focus:ring-sky-600'
                  />
               </div>
               <div className='flex flex-col justify-center gap-2'>
                  <label
                     htmlFor='name'
                     className='font-medium'
                  >
                     Nombre
                  </label>
                  <input
                     type='text'
                     name='name'
                     id='name'
                     value={profile.name}
                     onChange={handleChange}
                     className='bg-sky-50 px-2 rounded-lg outline-none focus:ring-2 focus:ring-sky-600'
                  ></input>
               </div>
               <div className='flex flex-col justify-center gap-2'>
                  <label
                     htmlFor='last_name'
                     className='font-medium'
                  >
                     Apellido
                  </label>
                  <input
                     type='text'
                     name='last_name'
                     id='last_name'
                     value={profile.last_name}
                     onChange={handleChange}
                     className='bg-sky-50 px-2 rounded-lg outline-none focus:ring-2 focus:ring-sky-600'
                  />
               </div>
            </div>
            <div className='flex flex-col gap-2'>
               <div className='flex flex-col justify-center gap-2'>
                  <label
                     htmlFor='email'
                     className='font-medium'
                  >
                     Email
                  </label>
                  <input
                     type='email'
                     name='email'
                     id='email'
                     value={profile.email}
                     onChange={handleChange}
                     className='bg-sky-50 px-2 rounded-lg outline-none focus:ring-2 focus:ring-sky-600'
                  />
               </div>
               <div className='flex flex-col justify-center gap-2'>
                  <label
                     htmlFor='address'
                     className='font-medium'
                  >
                     Direccion
                  </label>
                  <input
                     type='text'
                     name='address'
                     id='address'
                     value={profile.address}
                     onChange={handleChange}
                     className='bg-sky-50 px-2 rounded-lg outline-none focus:ring-2 focus:ring-sky-600'
                  />
               </div>
               <div className='flex flex-col justify-center gap-2'>
                  <label
                     htmlFor='phone'
                     className='font-medium'
                  >
                     Telefono
                  </label>
                  <input
                     type='tel'
                     name='phone'
                     id='phone'
                     value={profile.phone}
                     onChange={handleChange}
                     className='bg-sky-50 px-2 rounded-lg outline-none focus:ring-2 focus:ring-sky-600'
                  />
               </div>
            </div>
         </form>
         <div className='flex justify-evenly mt-5 max-sm:gap-5'>
            <button
               className='bg-sky-600 text-sky-100 px-6 rounded-md'
               onClick={handleSubmit}
            >
               Editar perfil
            </button>
            <button
               onClick={() => showFormProduct(false)}
               className='bg-rose-500 text-sky-100 px-6 rounded-md disabled:bg-black/50'
            >
               Cancelar
            </button>
         </div>
         {!!error && 
            <ErrorModal error={error} setError={setError}/>
         }
      </>
   )
}

export default FormProfile
