function ModalDelete({ handleModalDelete, peticion, id }) {
   const handleConfirm = (id) => {
      peticion(id)
      handleModalDelete()
   }
   return (
      <section className='fixed z-10 bottom-0 right-0 left-0 top-0 bg-black/50 flex justify-center items-center'>
         <article className='flex flex-col gap-5 p-5 bg-sky-300 shadow-2xl shadow-sky-800 rounded-xl mx-auto text-lg'>
            <h2 className='font-bold text-xl'>
               Estas seguro que quieres eliminarlo?
            </h2>
            <div className="flex justify-around">
               <button
                  onClick={() => handleConfirm(id)}
                  className='bg-sky-600 text-sky-100 m-auto px-6 rounded-md col-span-1'
               >
                  Si
               </button>
               <button
                  onClick={handleModalDelete}
                  className='bg-rose-500 text-sky-100 m-auto px-6 rounded-md disabled:bg-black/50 col-span-1'
               >
                  Cancelar
               </button>
            </div>
         </article>
      </section>
   )
}

export default ModalDelete
