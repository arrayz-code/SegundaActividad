import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { UserContext } from '../context/userContext'
import { register } from '../services/register'
import { BsEnvelopeFill, BsLockFill, BsPersonFill } from 'react-icons/bs'
import ErrorModal from '../components/ErrorModal'

function Register() {
   const navegar = useNavigate()
   const [confirmPassword, setConfirmPassword] = useState('')
   const { setUser } = useContext(UserContext)
   const { user, handleChange } = useUser()
   const [error, setError] = useState('')

   const handleSubmit = async e => {
      e.preventDefault()
      if (user.username.trim() === '')
         return setError('El campo username no puede estar vacio')
      if (user.name.trim() === '')
         return setError('El campo name no puede estar vacio')
      if (user.last_name.trim() === '')
         return setError('El campo last name no puede estar vacio')
      if (user.email.trim() === '')
         return setError('El campo email no puede estar vacio')
      if (user.password.trim() === '')
         return setError('El campo password no puede estar vacio')
      if (confirmPassword.trim() === '')
         return setError('El campo Confirm Password no puede estar vacio')
      if (user.password !== confirmPassword)
         return setError('Las contraseñas no son iguales')

      const userLoggedIn = await register(user)
      if (userLoggedIn?.messageError) return setError(userLoggedIn.messageError)
      setUser(userLoggedIn.user)
      navegar('/products')
   }

   return (
      <main className='flex justify-center items-center my-10'>
         <form
            className='flex flex-col justify-around font-semibold w-[23rem] bg-white ring-2 ring-black p-5 text-xl rounded-xl'
            onSubmit={handleSubmit}
         >
            <h2 className='text-2xl font-bold'>Registro</h2>
            <label
               htmlFor='username'
               className='text-left pt-4 flex items-center gap-1'
            >
               <BsPersonFill />
               Nombre de Usuario
            </label>
            <input
               type='text'
               name='username'
               autoFocus
               value={user.username}
               onChange={handleChange}
               className='rounded-lg p-1 font-normal outline-none focus:ring-2 focus:ring-sky-600'
            />
            <label
               htmlFor='name'
               className='text-left pt-4 flex items-center gap-1'
            >
               <BsPersonFill />
               Nombre
            </label>
            <input
               type='text'
               name='name'
               autoFocus
               value={user.name}
               onChange={handleChange}
               className='rounded-lg p-1 font-normal outline-none focus:ring-2 focus:ring-sky-600'
            />
            <label
               htmlFor='last_name'
               className='text-left pt-4 flex items-center gap-1'
            >
               <BsPersonFill />
               Apellido
            </label>
            <input
               type='text'
               name='last_name'
               autoFocus
               value={user.last_name}
               onChange={handleChange}
               className='rounded-lg p-1 font-normal outline-none focus:ring-2 focus:ring-sky-600'
            />
            <label
               htmlFor='email'
               className='text-left pt-4 flex items-center gap-1'
            >
               <BsEnvelopeFill />
               Email
            </label>
            <input
               type='email'
               name='email'
               value={user.email}
               onChange={handleChange}
               className='rounded-lg p-1 font-normal outline-none focus:ring-2 focus:ring-sky-600'
            />
            <label
               htmlFor='password'
               className='text-left pt-4 flex items-center gap-1'
            >
               <BsLockFill />
               Contraseña
            </label>
            <input
               type='password'
               name='password'
               value={user.password}
               onChange={handleChange}
               className='rounded-lg p-1 font-normal outline-none focus:ring-2 focus:ring-sky-600'
            />
            <label
               htmlFor='confirmPassword'
               className='text-left pt-4 flex items-center gap-1'
            >
               <BsLockFill />
               Confirmar Contraseña
            </label>
            <input
               type='password'
               name='confirmPassword'
               value={confirmPassword}
               onChange={e => setConfirmPassword(e.target.value)}
               className='rounded-lg p-1 font-normal outline-none focus:ring-2 focus:ring-sky-600'
            />
            <div className='flex justify-between items-center gap-5 py-4'>
               <p className='text-sm font-medium'>
                ¿Ya tienes una cuenta?
               </p>
               <Link
                  to={'/login'}
                  className='text-sm font-medium text-sky-600'
               >
                  Ingresar
               </Link>
            </div>
            <button className='bg-orange-600 text-sky-100 m-auto px-9 rounded-md'>
               Registrar
            </button>
         </form>
         {!!error && 
            <ErrorModal error={error} setError={setError}/>
         }
      </main>
   )
}

export default Register
