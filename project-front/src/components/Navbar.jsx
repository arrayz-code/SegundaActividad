import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { BsPower } from 'react-icons/bs'
import AdminButton from './AdminButton'

function Navbar() {
   const navegar = useNavigate()
   const { user, setUser, setAdminMode } = useContext(UserContext)

   const logout = () => {
      setAdminMode(false)
      setUser(null)
      navegar('/login')
   }

   return (
      <nav className='bg-amber-700 text-sky-100 font-bold text-base md:text-xl h-auto sm:h-20 w-full flex flex-col sm:flex-row justify-between items-center px-5 py-5 sm:py-0 gap-5'>
         <section>
            <NavLink to={'/'}>
               <h1 className='hover:scale-105'>FERRE <br /><b>REACT</b></h1>
            </NavLink>
         </section>
         <section className='flex flex-col sm:flex-row justify-between items-center gap-5'>
            {user ? (
               <>
                  <NavLink
                     to={'/products'}
                     className={({ isActive }) =>
                        isActive
                           ? 'bg-sky-500/50 rounded-lg px-2 hover:bg-sky-500'
                           : 'rounded-lg px-2 hover:bg-sky-500'
                     }
                  >
                     Servicios
                  </NavLink>
                  <NavLink
                     to={'/favorites'}
                     className={({ isActive }) =>
                        isActive
                           ? 'bg-sky-500/50 rounded-lg px-2 hover:bg-sky-500'
                           : 'rounded-lg px-2 hover:bg-sky-500'
                     }
                  >
                     Favoritos
                  </NavLink>
                  <NavLink
                     to={'/profile'}
                     className={({ isActive }) =>
                        isActive
                           ? 'bg-sky-500/50 rounded-lg px-2 hover:bg-sky-500'
                           : 'rounded-lg px-2 hover:bg-sky-500'
                     }
                  >
                     Perfil
                  </NavLink>
                  {user.rol === 'Admin' && (
                     <>
                        <NavLink
                           to={'/users'}
                           className={({ isActive }) =>
                              isActive
                                 ? 'bg-sky-500/50 rounded-lg px-2 hover:bg-sky-500'
                                 : 'rounded-lg px-2 hover:bg-sky-500'
                           }
                        >
                           Usuarios
                        </NavLink>
                        <AdminButton/>
                     </>
                  )}
                  <button
                     onClick={logout}
                     className='rounded-lg p-1 hover:bg-sky-500 hover:text-sky-950 flex items-center text-2xl'
                  >
                     <BsPower />
                  </button>
               </>
            ) : (
               <>
                  <NavLink
                     to={'/login'}
                     className={({ isActive }) =>
                        isActive
                           ? 'rounded-lg px-2 hover:bg-sky-500'
                           : 'rounded-lg px-2 hover:bg-sky-500'
                     }
                  >
                     Inicio de Sesion
                  </NavLink>
                  <NavLink
                     to={'/register'}
                     className={({ isActive }) =>
                        isActive
                           ? 'rounded-lg px-2 hover:bg-sky-500'
                           : 'rounded-lg px-2 hover:bg-sky-500'
                     }
                  >
                     Registrar
                  </NavLink>
               </>
            )}
         </section>
      </nav>
   )
}

export default Navbar
