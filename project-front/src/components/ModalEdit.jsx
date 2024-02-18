
function ModalEdit({ children }) {
   return (
      <section className='fixed z-10 bottom-0 right-0 left-0 top-0 bg-black/50 flex justify-center items-center overflow-auto'>
         <article  className='flex flex-col gap-3 p-5 bg-sky-300 shadow-2xl shadow-sky-800 rounded-xl  mx-auto text-lg'>
            <h2 className='font-bold text-2xl'>Modificar</h2>
            {children}
         </article>
      </section>
   )
}

export default ModalEdit