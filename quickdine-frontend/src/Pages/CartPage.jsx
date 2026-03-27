import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartContext'
import toast, { Toaster } from 'react-hot-toast'


import axios from 'axios'
import { useNavigate } from 'react-router'
import Footer2 from '../components/Footer2.jsx'

const CartPage = () => {
  const {cart, updateQuantity,removeFromCart,clearCart}=useContext(CartContext)
  const [notes, setNotes] = useState({})
  const [tableId, setTableId] = useState(localStorage.getItem('tableId'))
  const [tableNumber, setTableNumber] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const navigate = useNavigate();
  const [isTableLoading, setIsTableLoading] = useState(true)

  useEffect(() => {
    
    if(!tableId) return;
    const fetchTable= async ()=>{
      try{
        const res = await axios.get(`http://localhost:5000/api/tables/${tableId}`);
        setTableNumber(res.data.tableNumber);
        console.log('Table number fetched:', res.data.tableNumber);
      } catch (err) {
        console.error('Table fetch error:', err);
      } finally{
        setIsTableLoading(false);
      }
    };
    fetchTable();
  }, [tableId]);
  
 
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  


  const handlePlaceOrder = async () => {
    console.log('cart:', cart)
    if(!tableId){
      toast.error('Table not set. Please restart your order.');
      navigate('/')
      return;
    }
    try {
      toast.loading('Placing order...')

      //creating order items
      const orderItemIds = [];
      const payload = cart.map(item => ({
        table: tableId,
        menuItem: item._id,
        quantity: item.quantity,
        price: item.price,
        notes: notes[item._id] || ''
      }));
  console.log('Sending order item:', payload);

  const res = await axios.post('http://localhost:5000/api/order-items/bulk', payload);
  console.log('bulk response: ', res.data);
  orderItemIds.push(...res.data.map(item => item._id)); // Collecting all order item IDs



      
      const orderRes = await axios.post('http://localhost:5000/api/customer-orders', {

        table: tableId,
        paymentMethod,
        items: orderItemIds,
      
      });
      toast.dismiss();
      toast.success('Order placed successfully!');
      clearCart();
      navigate(`/order-confirmation/${orderRes.data._id}`);

    } catch (error) {
      console.error(error)
      toast.dismiss();
      toast.error('Failed to place order. Please try again later.');
    }
    
  }


  return (
    <div className='min-h-screen bg-gray-50'>
    <div className=' max-w-3xl mx-auto p-6 pb-32 flex-auto'>
     
      <h1 className='text-2xl font-bold mb-6'>🛒 Your Cart</h1>
      {cart.length===0 ? (
        <p className='text-gray-500'>Your cart is empty.</p>
      ) : (
        <>
        <div className='space-y-4'>
          {cart.map(item=>(
            <div key={item._id} className='bg-white rounded-lg shadow p-4 flex items-center gap-4'>
              <img src={item.imageUrl} alt={item.name} className='h-16 w-16 object-cover rounded' />
              <div className='flex-1'>
                <h2 className='font-semibold '>{item.name}</h2>
                <p className='text-sm text-gray-500'>${item.price.toFixed(2)}</p>
                <div className='flex items-center gap-2 mt-2'>
                  <button onClick={()=> updateQuantity(item._id, item.quantity - 1)}
                  className='btn btn-xs btn-outline'
                  disabled={item.quantity <= 1}>
                    -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={()=> updateQuantity(item._id, item.quantity + 1)}
                    className='btn btn-xs btn-outline'>
                      +
                    </button>
              </div>
              <textarea
              placeholder='Special requests'
              className='textarea textarea-bordered mt-2 w-full'
              value={notes[item._id] || ''}
              onChange={(e)=>
                setNotes(prev=>({...prev, [item._id]: e.target.value}))
              }
              />
            </div>
            <button
            onClick={()=> removeFromCart(item._id)}
            className='btn btn-sm btn-error'>
              🗑️ Delete


            </button>
            </div>
          ))}
          </div>
          <div className='mt-6 p-4 bg-gray-50 rounded-lg space-y-4'>
            <div className='flex items-center gap-2'>
              <span className='font-semibold'>Table:</span>
              <span>{isTableLoading ? "Loading..." : tableNumber || "not found"}</span>
            </div>
            <div className='flex items-center gap-2'>
              <label className='font-semibold'>Payment Method:</label>
              <select className='select select-bordered'
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value='credit-card'>Credit Card</option>
                <option value='paypal'>PayPal</option>
                <option value='cash'>Cash</option>
              </select>
            </div>
            <div className='flex justify-between'>
              <span className='font-semibold'>Total:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button 
            onClick={handlePlaceOrder}
            className='btn btn-primary w-full'
            disabled={!tableId}>
              Place Order
            </button>
          </div>
        </>
      )}
      
    </div>
    <Footer2 />
    </div>
    
  )
}

export default CartPage
