import * as React from 'react';
import  { useState } from 'react'
import searchIcon from '../../../assets/images/search_icon.png';
import { Link, NavLink } from 'react-router-dom'
// import { ShopContext } from '../context/ShopContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Chip, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../../user/UserSlice';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { selectCartItems } from '../../cart/CartSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TuneIcon from '@mui/icons-material/Tune';
import { selectProductIsFilterOpen, toggleFilters } from '../../products/ProductSlice';



export const NavbarQ=({isProductList=false})=> {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userInfo=useSelector(selectUserInfo)
  const cartItems=useSelector(selectCartItems)
  const loggedInUser=useSelector(selectLoggedInUser)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const theme=useTheme()
  const is480=useMediaQuery(theme.breakpoints.down(480))

  const wishlistItems=useSelector(selectWishlistItems)
  const isProductFilterOpen=useSelector(selectProductIsFilterOpen)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleToggleFilters=()=>{
    dispatch(toggleFilters())
  }

  const settings = [
    {name:"Home",to:"/"},
    {name:'Profile',to:loggedInUser?.isAdmin?"/admin/profile":"/profile"},
    {name:loggedInUser?.isAdmin?'Orders':'My orders',to:loggedInUser?.isAdmin?"/admin/orders":"/orders"},
    {name:'Logout',to:"/logout"},
  ];
    const [visible, setVisible] = useState(false);
    // const {setShowSearch} = useContext(ShopContext);
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <Link to='/'><img src={searchIcon} alt="sdfsv" className='w-36' /></Link>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className="flex flex-col items-center gap-1">
                <p>Home</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>

            </NavLink>
            <NavLink to='/collection' className="flex flex-col items-center gap-1">
                <p>Collection</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>

            </NavLink>
            <NavLink to='/about' className="flex flex-col items-center gap-1">
                <p>About</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>

            </NavLink>
            <NavLink to='/contact' className="flex flex-col items-center gap-1">
                <p>Contact</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>

            </NavLink>

        </ul>
        
            <div className='flex items-center gap-6'>
                <Link to='/collection'><img  src={searchIcon} alt="search" className='w-5 cursor-pointer' />
                    </Link>
                <div className='group relative'>
                    <img src={searchIcon} className='w-5 cursor-pointer' alt="profile-icon" />
                    <div className='group-hover:block hidden absolute dropdown-menu r-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                        {
                loggedInUser?.isAdmin && 
              
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography component={Link} color={'text.primary'} sx={{textDecoration:"none"}} to="/admin/add-product" textAlign="center">Add new Product</Typography>
                </MenuItem>
              
              }
                            <p className='cursor-pointer hover:text-black'> My Profile</p>
                            <p className='cursor-pointer  hover:text-black'>Orders</p>
                            <p className='cursor-pointer  hover:text-black'>Logout</p>
                        </div>
                    </div>
                </div>
                {loggedInUser.isAdmin && <Button variant='contained'>Admin</Button>}
            

            
            {
            cartItems?.length>0 && 
            <Badge  badgeContent={cartItems.length} color='error'>
              <IconButton onClick={()=>navigate("/cart")}>
                <ShoppingCartOutlinedIcon />
                </IconButton>
            </Badge>
            }
                <img onClick={()=>{
                    setVisible(true)
                }} src={searchIcon} alt="menu-icon" className='w-5 cursor-pointer sm:hidden' />

            </div>
            {/* Sidebar    */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all  ${visible ? 'w-full': 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={()=>{
                        setVisible(false)
                    }} className='flex items-center gap-4 cursor-pointer p-3'>
                        <img src={searchIcon} className='h-4 rotate-180' alt="cross-icon" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={()=>{setVisible(false)}} className='py-2 pl-6 border' to='/'>Home</NavLink>
                    <NavLink onClick={()=>{setVisible(false)}} className='py-2 pl-6 border' to='/collection'>Collection</NavLink>
                    <NavLink onClick={()=>{setVisible(false)}} className='py-2 pl-6 border' to='/about'>About</NavLink>
                    <NavLink onClick={()=>{setVisible(false)}} className='py-2 pl-6 border' to='/contact'>Contact</NavLink>
                    </div>

                

            </div>
    </div>
  )
}

export default NavbarQ
