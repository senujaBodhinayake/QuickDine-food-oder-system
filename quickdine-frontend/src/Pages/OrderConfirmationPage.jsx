import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate,useParams} from 'react-router'

import CancelOrderPopup from '../components/CancelOrderPopup';
import {toast} from 'react-hot-toast';
import { CheckCircle,X,Pencil,Trash2, RotateCcw } from 'lucide-react';
import Footer2 from '../components/Footer2.jsx';
// import { set } from 'mongoose';


const OrderConfirmationPage = () => {
  const {orderId} = useParams();
  const [order, setOrder] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    


    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/customer-orders/${orderId}`);
        setOrder(res.data);
        console.log("Fetching order for orderId:", orderId);
        console.log('Order fetched:', res.data);

      } catch (error) {
        toast.error('Failed to fetch order details');
      }
    };
    fetchOrder();
  }, [orderId]);

  const refreshOrder = async () => {
    const res = await axios.get(`http://localhost:5000/api/customer-orders/${orderId}`);
    setOrder(res.data);
  };

  

  const handleResetTable = async () => {
  const tableId = order?.table?._id;
  console.log('Deleting table and related data:', tableId);

  try {
    await axios.delete(`http://localhost:5000/api/tables/${tableId}/reset`);
    toast.success('Table deleted successfully');
    navigate('/');
  } catch (error) {
    console.error('Reset error:', error);
    toast.error('Failed to delete table');
  }
};


  const handleCancelOrder = async () => {
    try {
      await axios.put(`http://localhost:5000/api/customer-orders/${orderId}/status`, {
        status: 'canceled',
      });
      toast.success('Order canceled successfully');
      setShowCancelModal(false);
      refreshOrder();
    } catch (error) {
      toast.error('Failed to cancel order');
    }
  };

  const handleOrderAgain = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/customer-orders/${orderId}`);
      toast.success('Order cleared. Ready to start fresh.');
      navigate('/menu');
    } catch (error) {
      toast.error('Failed to clear order');
    }
  };
  






  if (!order) {
    return (<div className='flex items-center justify-center h-screen'>
      <span className='loading loading-spinner loading-lg text-success'/>
    </div>);
  }

  return (
    <div className='min-h-screen bg-gray-50  pb-24'>
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-3xl text-emerald-700 font-bold text bg-emerald-50 mb-4'>Order Confirmation</h1>

      <div className='bg-base-100 shadow-md rounded-lg p-6 mb-6'>
        <div className='flex justify-between items-center mb-2'>
          <h2 className='text-lg font-bold text-emerald-700'>
            Table #{order.table.tableNumber}
            </h2>
            <span
            className={`badge ${
              order.status === 'canceled'
                ? 'badge-error'
                : 'badge-success'
            } badge-outline`}
          >
            {order.status === 'canceled' ? 'Order Canceled' : 'Active Order'}
          </span>

        </div>
        <p className='text-sm text-gray-500 mb-4'>
          Placed: {new Date(order.placedTime).toLocaleString()}
        </p>
        <div className='divider before:bg-emerald-500 after:bg-emerald-500 text-emerald-600'>
          Order Summary
        </div>
        <ul className='divide-y divide-gray-200'>
          {order.items.map((item) => (
            <li key={item._id} className='py-3 flex justify-between items-center'>
              <div>
                <span className='font-medium text-gray-700'>
                  {item.menuItem.name}
                </span>{' '}
                x {item.quantity}
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-gray-600 font-semibold'>
                  ${item.price * item.quantity}
                </span>
                
              </div>
            </li>
          ))}
        </ul>
        <div className='mt-6 text-right font-bold text-lg text-emerald-700'>
          Total: ${order.totalPrice}
        </div>
      </div>
      <div className='flex gap-4'>
        {order.status !== 'canceled'? (
          <>
        
        <button
         onClick={handleResetTable}
         className='btn btn-success btn-wide gap-2 mx-auto'>
          <CheckCircle className='w-5 h-5' />
          Items Received
         </button>
         <button
          onClick={() => setShowCancelModal(true)}
          className='btn btn-outline btn-error btn-wide gap-2 mx-auto'>
            <X className='w-5 h-5' />
            Cancel Order
         </button>
         </>
        ):(
          <button
          onClick={handleOrderAgain}
          className='btn btn-outline btn-emerald btn-wide gap-2'>
           <RotateCcw className='w-5 h-5' />
           Order Again
          </button>

        )}
      </div>

        
      
      {showCancelModal && (
        <CancelOrderPopup
          onCancel={() => setShowCancelModal(false)}
          onConfirm={handleCancelOrder}
        />
      )}

    </div>
    <Footer2 />
    </div>
  )
}

export default OrderConfirmationPage
