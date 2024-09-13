import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { AddProduct } from '../features/admin/components/AddProduct'

export const AddProductPage = () => {
  return (
    <>
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
    <Navbar/>
    <AddProduct/>
    </div>
    </>
  )
}
