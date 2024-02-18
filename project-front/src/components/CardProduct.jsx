import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { BsPencilSquare, BsStar, BsStarFill, BsTrash3Fill } from 'react-icons/bs'
import { truncatedText } from '../logic/funciones'

function CardProduct({ data, favorite = false, updateFavorite, handleModalEdit, handleModalDelete }) {
   const [fav, setFav] = useState(favorite);
   const { adminMode } = useContext(UserContext)
   
   const precio = `$${data.precio}`

   const handleFavorite = () => {
      updateFavorite(data._id)
   }
   
   return (
      <article className='relative flex flex-col gap-5 p-5 bg-sky-300 ring-2 ring-sky-600 rounded-xl max-w-[290px] w-full  mx-auto'>
         <button className="absolute right-2 top-2" onClick={handleFavorite}>
            {fav ? (
               <BsStarFill className="text-yellow-400  text-2xl hover:scale-125" />
            ) : (
               <BsStar className="text-slate-800 text-2xl hover:scale-125" />
            )}
         </button>
         <h3 className='font-bold text-lg mx-auto max-w-[20ch]'>{data.titulo}</h3>
         <p className='font-medium text-justify break-words'>{truncatedText(data.descripcion)}</p>
         <strong className='text-sky-950/70'>{precio}</strong>
         
         <div className='flex justify-evenly'>
            {adminMode && 
               <button
                  className='text-sky-800 text-2xl px-6 rounded-md'
                  onClick={() => handleModalEdit(data)}
               >
                  <BsPencilSquare/>
               </button>
            }
            <Link
               to={`/product/${data._id}`}
               className='bg-sky-700 text-sky-100 text-lg px-4 rounded-md m-auto'
            >
               Ver más
            </Link>
            {adminMode && 
               <button
                  className='text-rose-600 text-2xl px-6 rounded-md'
                  onClick={() => handleModalDelete(data._id)}
               >
                  <BsTrash3Fill/>
               </button>
            }
         </div>
      </article>
   )
}

export default CardProduct
