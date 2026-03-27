import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { ShoppingCart,Star } from 'lucide-react'


const MenuItemCard = ({ item }) => {

    const { addToCart } = useContext(CartContext)

    
    

  return (
    
    <div className='card bg-base-100 shadow-md hover:shadow-lg transition'>
        <figure>
            <img src={item.imageUrl} alt={item.name} className='h-40 w-full object-cover' />
            </figure>
            <div className='card-body'>
                <h2 className='card-title'>{item.name}</h2>
                <p className='text-sm text-gray-500'>{item.description}</p>
                <div className='flex justify-between items-center mt-4'>
                    <span className='text-lg font-semibold text-emerald-600'>${item.price}</span>
                    <button className='btn btn-success' onClick={() => addToCart(item)}><ShoppingCart size={16} /> Add to Cart</button>
                    
                </div>
                {item.rating &&(
                    <div className='mt-2 flex items-center gap-1 text-yellow-500 text-sm'>
                        <Star size={16} fill='currentColor' />
                        {item.rating}
                    </div>
                )}
            </div>
           
    
   
   
    </div>
  )

}

export default MenuItemCard
