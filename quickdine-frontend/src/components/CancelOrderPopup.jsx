import { XCircle } from 'lucide-react'
import React from 'react'

const CancelOrderPopup = ({onConfirm, onCancel}) => {

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
        <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center'>
            <XCircle className='text-orange-500 w-12 h-12 mx-auto mb-4'/>
            <h2 className='text-xl font-bold mb-2'>Cancel Order?</h2>
            <p className='text-gray-700 mb-6'>
                Are you sure you want to cancel your order? <br/>
                <span className='font-medium text-red-500'>This action cannot be undone</span>

            </p>
            <div className='flex justify-center gap-4'>
                <button
                    onClick={onConfirm}
                    className='bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600'>
                        Yes, Cancel Order
                    </button>
                    <button
                    onClick={onCancel}
                    className='bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-100'>
                        No, Keep Order
                    </button>
            </div>
        </div>
      
    </div>
  )
}

export default CancelOrderPopup
