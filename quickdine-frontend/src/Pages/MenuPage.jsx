import { Search, ShoppingCart, UtensilsCrossed } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router'
import { Link } from 'react-router'
import {CartContext} from '../context/CartContext.jsx'
import MenuItemCard from '../components/MenuItemCard.jsx'
import { categoryInfo } from '../data/categoryInfo.js'
import Footer from '../components/Footer.jsx'

const MenuPage = () => {

  const [menuItems,setMenuItems]= useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const {cart} = useContext(CartContext)

  const categories=['Starters','Main Course','Desserts','Beverages']

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu')
        const data = await response.json()
        setMenuItems(data)
        setFilteredItems(data)
      } catch (error) {
        console.error("Error fetching menu items:", error)
      }
    }

    fetchMenuItems()
  }, [])

  useEffect(() => {
    let items=[...menuItems]
    if (category){
      items = items.filter(item => item.category === category)

    }
    if (search.trim()){
      items=items.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }
    setFilteredItems(items)
  }, [menuItems, category, search])

  const groupedItems = {
    Starters: filteredItems.filter(item => item.category === 'Starters'),
    'Main Course': filteredItems.filter(item => item.category === 'Main Course'),
    Desserts: filteredItems.filter(item => item.category === 'Desserts'),
    Beverages: filteredItems.filter(item => item.category === 'Beverages'),
  }

  return (
    <div className='min-h-screen bg-gray-50 '>

    
    <div className='sticky top-0 z-50 bg-white shadow-sm px-6 py-4 flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <UtensilsCrossed className='text-emerald-600' size={28} />
        <span className='text-xl font-bold text-emerald-700'>QuickDine</span>
      </div>
      <Link to="/cart" className='flex items-center gap-2 text-emerald-600'>
        <ShoppingCart size={24} />
        {cart.length > 0 && (
          <span className='badge badge-sm badge-error absolute top-2 right-2'>
            {cart.length}
          </span>
        )}
      </Link>
    </div>
    <div className='p-6'>
      <input
      type='text'
      placeholder='search menu items...'
      className='input input-bordered w-full max-w-md mb-4'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <div className='flex gap-2 flex-wrap mb-6'>
      {categories.map(cat => (
        <button
          key={cat}
          className={`btn btn-sm ${category === cat ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setCategory(cat)}
        >
          {cat}
        </button>
        
      ))}
      {category && (
        <button
          className='btn btn-sm btn-outline'
          onClick={() => setCategory("")}
        >
          Clear Filter
        </button>
      )}
    </div>
    {filteredItems.length===0?(
      <p className='text-gray-500'>No items match your search</p>
    ) : (
      <div className='px-6 py-10 max-w-7xl mx-auto'>
        {Object.entries(groupedItems)
        .filter(([cat])=>!category || cat === category)
        .map(([cat,items])=>{
          const info = categoryInfo[cat]
          return(
            <section key={cat} className='mb-16'>
              <h2 className='text-3xl font-bold text-emerald-700'>{info.title}</h2>
              <p className='text-gray-500'>{info.description}</p>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {items.map(item => (
                  <MenuItemCard key={item._id} item={item} />
                ))}
              </div>
            </section>
          )
        })}

        
      
      </div>
    
    )}
    
  

    </div>
    <Footer />

  </div>
    
  )
}

export default MenuPage
