import { useLocation } from 'react-router-dom'
import GithubLogo from '../assets/Github.png'

function Footer() {
   const { pathname } = useLocation()
   const isPathAuth = pathname === '/login' || pathname === '/register'
   const isPathFavorite = pathname === '/favorites'
   return (
      <footer
         className={`${isPathAuth && 'hidden'} ${isPathFavorite && 'fixed bottom-0'} bg-amber-700 w-full h-20 flex flex-col sm:flex-row justify-around items-center text-sky-100 md:text-xl font-medium`}
      >
         <section className='flex items-center justify-center gap-5'>
            <h3>Desarrollador:</h3>
            <div className='flex items-center justify-center gap-1'>
               <p>Angel Arraiz</p>
               <a
                  href='http://github.com/arrayz-code'
                  target='_blank'
                  rel='noopener noreferrer'
               >
                  <img
                     src={GithubLogo}
                     alt='Github Logo'
                     className='hover:scale-110 w-7 sm:w-9'
                  />
               </a>
            </div>
         </section>
         <section className='flex items-center justify-center gap-5'>
            <p>FerreReact</p>
            <div className='flex items-center justify-center gap-1 border-l-2 border-l-sky-100 pl-4'>
               <p>Copyright ©️</p> <strong>2023</strong>
            </div>
         </section>
      </footer>
   )
}

export default Footer
