import React, { useEffect, useState } from 'react'
import { useAppContext } from '../Context/AppContext'
import ProductCard from '../Components/ProductCard'

const AllProduct = () => {
    const {products,searchQuery} = useAppContext()
    const [filteredProducts , setFilteredProducts] =  useState([])

    useEffect(() =>{
      if(searchQuery.length > 0){
        setFilteredProducts(products.filter(
          product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
        ))}else{
          setFilteredProducts(products)
        }
    },[products,searchQuery])

  return (
    <div className='mt-16 flex flex-col'>
        <div className='flex flex-col items-start mb-8'>
            <p className='text-2xl md:text-3xl font-bold text-gray-900 uppercase'>All Products</p>
            <div className='w-16 h-1 bg-[#b5835a] rounded-full mt-2'></div>
            {searchQuery.length > 0 && (
              <p className='text-gray-600 mt-4'>
                Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            )}
        </div>

        {filteredProducts.filter((product) => product.inStock).length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4">
            {filteredProducts.filter((product) => product.inStock).map((product, index) => (
              <ProductCard key={product._id || index} product={product} />     
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[60vh]">
            <p className="text-xl text-gray-500">
              {searchQuery.length > 0 ? 'No products found matching your search.' : 'No products available at the moment.'}
            </p>
          </div>
        )}
    </div>
  )
}

export default AllProduct
