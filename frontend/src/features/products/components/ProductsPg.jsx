import React, { useContext, useEffect, useState } from 'react'
import Titile from './Titile';
import { ProductCard } from './ProductCard';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ProductList } from './ProductList';
import { selectBrands } from '../../brands/BrandSlice'
import { useDispatch, useSelector } from 'react-redux'

const ProductsPg = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [category,setCategory] = useState([])
  const [subcategory,setSubcategory] = useState([])
  const brands=useSelector(selectBrands)

  const dispatch=useDispatch()
  


  const toggleCategory = (e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(items=> items !== e.target.value))
    }
    else{
      setCategory(prev=>[...prev,e.target.value])
    }
  }
  
  const toggleSubCategory = (e)=>{
    if(subcategory.includes(e.target.value)){
      setSubcategory(prev=>prev.filter(items=> items !== e.target.value))
    }
    else{
      setSubcategory(prev=>[...prev,e.target.value])
    }
  }
  


  useEffect(()=>{
    // applyFilter();
    console.log(category)
    console.log(subcategory)

  },[category,subcategory])

  
  return (
   
    
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
        {/* Filter Option  */}
        <div className='min-w-60'>
          <p className='my-2 text-xl flex items-center cursor-pointer gap-2' onClick={()=>{
            setShowFilter(!showFilter)
          }}><ArrowDropDownIcon/> Filters</p>
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block `}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Shadani'} onChange={toggleCategory}/> Shadani
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Zubi'} onChange={toggleCategory}/> Zubi
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Skiipi'} onChange={toggleCategory}/> Skippi
            </p>
          </div>
          </div>

          {/* Subcategory Filter  */}
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block `}>
          <p className='mb-3 text-sm font-medium'>SUBCATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory}/> Drinks
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory} />  Choclate
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory}/> Snacks
            </p>
          </div>
          </div>



        </div>

        {/* right side  */}
        <div className="flex-1">
         
          
          <ProductList />
        </div>
      
    
    </div>
  )
}

export default ProductsPg
