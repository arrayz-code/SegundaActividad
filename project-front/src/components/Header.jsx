function Header({ texto, heigth = 'h-64' }) {
   return (
      <header className={`relative bg-HOME bg-cover bg-center ${heigth}`}>
         <div className='bg-black/50 absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center text-sky-100 text-xl sm:text-2xl md:text-3xl font-semibold'>
            <h1>{texto}</h1>
         </div>
      </header>
   )
}

export default Header
