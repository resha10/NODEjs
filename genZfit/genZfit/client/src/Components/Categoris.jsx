import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../Context/AppContext'

const Categories = () => {

  const { navigate } = useAppContext()

  return (
    <div className='mt-15'>
      <div className='flex items-center justify-between'>
        <p className='text-2xl md:text-3xl font-bold text-gray-900'>
          Home Décor Categories
        </p>
        <span className='hidden md:inline text-sm text-gray-500'>
          Browse by style
        </span>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6'>
        {categories.map((category, index) => (

          <div
            key={index}
            className='group cursor-pointer py-5 px-2 gap-2 rounded-lg flex flex-col justify-center items-center ring-1 ring-black/5 hover:ring-black/10 hover:shadow-md transition-all duration-200'
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`)
              scrollTo(0, 0)
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className='group-hover:scale-105 transition-transform duration-200 max-w-20'
            />

            <p className='text-sm font-medium mt-1'>
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
