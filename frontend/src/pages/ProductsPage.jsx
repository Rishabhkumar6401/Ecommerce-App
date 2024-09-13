import React from 'react'
import ProductsPg from '../features/products/components/ProductsPg'
import { Footer } from '../features/footer/Footer'
import { Navbar } from '../features/navigation/components/Navbar'

const ProductsPage = () => {
  return (
    <>
     <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
     <Navbar  isProductList={true} />
    <ProductsPg />
    </div>
    <Footer />
      
    </>
  )
}

export default ProductsPage
