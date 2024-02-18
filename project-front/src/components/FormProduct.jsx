import { useState } from 'react'
import ErrorModal from './ErrorModal'

function FormProduct({  data, showFormProduct, peticion }) {
   const [error, setError] = useState('')

   const [product, setProduct] = useState({
      titulo: data?.titulo || '',
      imagen: data?.imagen || '',
      descripcion: data?.descripcion || '',
      categoria: data?.categoria || '',
      cantidad: data?.cantidad === 0 || data?.cantidad ? data.cantidad :  1,
      precio: data?.precio || 1,
   })

   const handleChange = e => {
      setProduct({
         ...product,
         [e.target.name]: e.target.value
      })
   }

   const handleSubmit = e => {
      e.preventDefault()
      const { titulo, descripcion, categoria, cantidad, precio } = product;
      if (product.titulo.trim() === '')
         return setError('El campo titulo no puede estar vacio')
      if (product.descripcion.trim() === '')
         return setError('El campo descripcion no puede estar vacio')
      if (data ? product.cantidad < 0 : product.cantidad < 1)
         return setError(
            `Los productos deben tener una cantidad inicial minima de ${data ? '0' : '1'}`
         )
      if (product.precio < 1)
         return setError(
            'Los productos deben tener un precio minimo de $1'
         )

      const body = {
         titulo,
         descripcion,
         categoria,
         cantidad,
         precio
      }

      showFormProduct()
      if(data) return peticion(body, data._id)
      peticion(body)
   }

   return (
      <>
         <form className='text-left text-lg ring-2 ring-sky-600 p-5 rounded-xl flex flex-col md:flex-row justify-center sm:gap-10'>
            <div className='flex flex-col gap-2'>
               <div className='flex flex-col justify-center gap-2'>
                  <label
                     htmlFor='titulo'
                     className='font-medium'
                  >
                     Titulo
                  </label>
                  <input
                     type='text'
                     name='titulo'
                     id='titulo'
                     value={product.titulo}
                     onChange={handleChange}
                     className='bg-sky-50 px-2 rounded-lg outline-none focus:ring-2 focus:ring-sky-600'
                  />
               </div>
               <div className='flex flex-col justify-center gap-2'>
                  <label
                     htmlFor='descripcion'
                     className='font-medium'
                  >
                     Descripcion
                  </label>
                  <textarea
                     type='text'
                     name='descripcion'
                     id='descripcion'
                     value={product.descripcion}
                     onChange={handleChange}
                     className='bg-sky-50 px-2 rounded-lg outline-none focus:ring-2 focus:ring-sky-600 resize-none h-[100px]'
                  ></textarea>
               </div>
            </div>
            <div className='flex flex-col gap-2'>
               <div className='flex flex-col justify-center gap-2'>
                  <label
                     htmlFor='categoria'
                     className='font-medium'
                  >
                     Categoria
                  </label>
                  <input
                     type='text'
                     name='categoria'
                     id='categoria'
                     value={product.categoria}
                     onChange={handleChange}
                     className='bg-sky-50 px-2 rounded-lg outline-none focus:ring-2 focus:ring-sky-600'
                  />
               </div>
               <div className='flex flex-col justify-center gap-2'>
                  <label
                     htmlFor='cantidad'
                     className='font-medium'
                  >
                     Cantidad
                  </label>
                  <input
                     type='number'
                     name='cantidad'
                     id='cantidad'
                     min={data ? 0 : 1}
                     value={product.cantidad}
                     onChange={handleChange}
                     className='bg-sky-50 px-2 rounded-lg outline-none focus:ring-2 focus:ring-sky-600'
                  />
               </div>
               <div className='flex flex-col justify-center gap-2'>
                  <label
                     htmlFor='precio'
                     className='font-medium'
                  >
                     Precio
                  </label>
                  <input
                     type='number'
                     name='precio'
                     id='precio'
                     min={1}
                     value={product.precio}
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
               {data ? 'Editar Servicio' : 'Crear Servicio'}
            </button>
            <button
               onClick={showFormProduct}
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

export default FormProduct
