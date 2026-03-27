import axios from 'axios'
import { Table, UtensilsCrossed } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

const HomePage = () => {
    const [tableNumber,setTableNumber]=useState("")
    const [loading,setLoading]=useState(false)

    const navigate = useNavigate()


    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!tableNumber.trim()){
            toast.error("Please enter a table number")
            return
        }
        setLoading(true)
        try{
            const res = await axios.post('http://localhost:5000/api/tables',{tableNumber})
            localStorage.setItem('tableId',res.data._id)
            toast.success("Table number added successfully")
            navigate('/menu')
            
        } catch (error) {
            if(error.response?.status === 409) {
                toast.error("Table already exists")
            } else {
                toast.error("Something went wrong")
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='min-h-screen bg-cover bg-center'
        style={{ backgroundImage: "url('/images/unsplashfood.jpg')" }}
        >
        <div className='h-screen flex flex-col items-center justify-center px-4'>
            <div className='text-center'>
                <UtensilsCrossed className='mx-auto mb-4 text-emerald-600' size={48} />
                <h1 className='text-3xl font-bold text-emerald-700 mb-2'>
                    Welcome to QuickDine
                </h1>
                <p className='text-gray-600 mb-6'>
                    Please enter your table number to start ordering
                </p>
                <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4'>
                    <input
                        type='number'
                        placeholder='Table Number'
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        className='input input-bordered input-primary w-64'
                        required
                        />
                        <button
                        type='submit'
                        className='btn btn-success w-64' disabled={loading}
                        >
                            {loading ? "Adding..." : "Start Ordering"}
                        </button>
                </form>

            </div>
        </div>
        </div>

    )
}

export default HomePage
