import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { useUser } from '../hooks/useUser'
import { login } from '../services/login'
import { BsLockFill, BsPersonFill } from 'react-icons/bs'
import ErrorModal from '../components/ErrorModal'

function Login() {
   const navegar = useNavigate()
   const { setUser } = useContext(UserContext)
   const { user, handleChange } = useUser()
   const [error, setError] = useState('')

   const handleSubmit = async e => {
      e.preventDefault()
      if (user.username.trim() === '')
         return setError('El campo username no puede estar vacio')
      if (user.password.trim() === '')
         return setError('El campo password no puede estar vacio')

      const body = {
         username: user.username,
         password: user.password,
      }
      const userLoggedIn = await login(body)
      if(userLoggedIn?.messageError) return setError(userLoggedIn.messageError)
      setUser(userLoggedIn)
      navegar('/products')
   }

   return (
      <main className='flex justify-center items-center my-44'>
         <form
            className='flex flex-col justify-around font-semibold w-[23rem] bg-white ring-2 ring-black p-5 text-xl rounded-xl'
            onSubmit={handleSubmit}
         >
            <h2 className='text-2xl font-bold'>Inicio de Sesión</h2>
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
            <div className='flex justify-between items-center gap-5 py-4'>
               <p className='text-sm font-medium'>
                  ¿No tienes una cuenta?
               </p>
               <Link
                  to={'/register'}
                  className='text-sm font-medium text-sky-600'
               >
                  Crear Cuenta
               </Link>
            </div>
            <button className='bg-orange-600 text-white m-auto px-9 rounded-md'>
               Iniciar Sesion
            </button>
         </form>
         {!!error && 
            <ErrorModal error={error} setError={setError}/>
         }
      </main>
   )
}

export default Login
