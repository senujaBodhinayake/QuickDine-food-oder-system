import React from 'react'
import { Routes, Route } from 'react-router';

import HomePage from './Pages/HomePage.jsx'
import MenuPage from './Pages/MenuPage.jsx'
import CartPage from './Pages/CartPage.jsx'
import OrderConfirmationPage from './Pages/OrderConfirmationPage.jsx'
import toast from 'react-hot-toast';
import './App.css';




const App = () => {
  return (

        
        <div data-theme="emerald">


      <Routes>
          
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
      </Routes>
      </div>
      
      
    

  )
}

export default App
