import React, { useEffect, useState } from "react";
import {
  FormHelperText,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { selectWishlistItems } from "../../wishlist/WishlistSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { addToCartAsync, selectCartItems, deleteCartItemByIdAsync, updateCartItemByIdAsync} from "../../cart/CartSlice";
import { motion } from "framer-motion";
import { toast } from 'react-toastify'

export const ProductCard = ({
  id,
  title,
  price,
  thumbnail,
  brand,
  stockQuantity,
  handleAddRemoveFromWishlist,
  isWishlistCard,
  isAdminCard,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const navigate = useNavigate();
  const wishlistItems = useSelector(selectWishlistItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const isProductAlreadyInWishlist = wishlistItems.some(
    (item) => item.product._id === id
  );
  const isProductAlreadyInCart = cartItems.some(
    (item) => item.product._id === id
  );

  useEffect(() => {
    // Synchronize quantity with cartItems state
    const cartItem = cartItems.find(item => item.product._id === id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1); // Reset to default if not found in cart
    }
  }, [cartItems, id]);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigation
    const data = { user: loggedInUser?._id, product: id, quantity };
    dispatch(addToCartAsync(data));
    setIsAddedToCart(true);
  };

  const handleQuantityChange = (e) => {
    e.stopPropagation(); // Prevent navigation
    const value = e.target.value;
    
    // Validate the input value
    if (/^\d*$/.test(value) && value >= 1 && value <= stockQuantity) {
      setQuantity(Number(value));
      
      // Update the cart item with the new quantity
      const cartItem = cartItems.find(item => item.product._id === id);
      if (cartItem) {
        dispatch(updateCartItemByIdAsync({ _id: cartItem._id, quantity: Number(value) }));
      }
    }
  };

  const incrementQuantity = (e) => {
    e.stopPropagation(); // Prevent navigation
  
    // Find the cart item that matches the current product id
    const cartItem = cartItems.find(item => item.product._id === id);
  
    if (cartItem) {
      const newQuantity = quantity + 1;
  
      if (newQuantity <= cartItem.product.stockQuantity) {
        // Update the cart with the new quantity
        dispatch(updateCartItemByIdAsync({ _id: cartItem._id, quantity: newQuantity }));
        setQuantity(newQuantity); // Update local state
      } else {
        // Handle case where the new quantity exceeds stock quantity
        toast.error("Quantity exceeds stock limit");
      }
    } else {
      // Handle case where cartItem is not found (if necessary)
      console.error("Cart item not found");
    }
  };

  const decrementQuantity = (e) => {
    e.stopPropagation(); // Prevent navigation
  
    // Find the cart item that matches the current product id
    const cartItem = cartItems.find(item => item.product._id === id);
    
    if (cartItem) {
      const newQuantity = quantity - 1;
  
      if (newQuantity <= 0) {
        // Remove the cart item from the cart if the quantity is 0 or less
        dispatch(deleteCartItemByIdAsync(cartItem._id));
  
        // Optionally, reset local state or perform other actions
        setQuantity(1); // Reset to default or handle as needed
        setIsAddedToCart(false); // Adjust state to reflect item is no longer in cart
      } else {
        // Update the cart with the new quantity
        dispatch(updateCartItemByIdAsync({ _id: cartItem._id, quantity: newQuantity }));
        setQuantity(newQuantity); // Update local state
      }
    } else {
      // Handle case where cartItem is not found (if necessary)
      console.error("Cart item not found");
    }
  };

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      className="p-2"
      onClick={() => navigate(`/product-details/${id}`)}
    >
      <Stack
        component={isAdminCard ? "" : isWishlistCard ? "" : Paper}
        elevation={1}
        className="p-4 h-full flex flex-col justify-between"
        sx={{
          cursor: "pointer",
          width: "100%",
          height: "100%", // Ensure all cards have consistent height
          maxHeight: "400px", // Limit max height for consistency
        }}
      >
        {/* Image display */}
        <Stack className="flex items-center justify-center">
          <img
            width="100%"
            height="auto"
            className="object-cover"
            src={thumbnail}
            alt={`${title} photo unavailable`}
            style={{ maxHeight: "200px" }} // Set consistent image size
          />
        </Stack>

        {/* Lower section */}
        <Stack flex={2} justifyContent={"flex-end"} spacing={1} rowGap={2}>
          <Stack>
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                variant="h6"
                fontWeight={400}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'block' // Ensure the text takes up the full width of the container
                }}
              >
                {title}
              </Typography>

              {!isAdminCard && (
                <motion.div
                  whileHover={{ scale: 1.3, y: -10, zIndex: 100 }}
                  whileTap={{ scale: 1 }}
                  transition={{ duration: 0.4, type: "spring" }}
                >
                  <Checkbox
                    onClick={(e) => e.stopPropagation()}
                    checked={isProductAlreadyInWishlist}
                    onChange={(e) => handleAddRemoveFromWishlist(e, id)}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite sx={{ color: "red" }} />}
                  />
                </motion.div>
              )}
            </Stack>
            <div className="flex justify-between">
              <Typography color={"text.secondary"}>{brand}</Typography>
              <Typography>₹{price}</Typography>
            </div>
          </Stack>

          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!isWishlistCard ? (
              isProductAlreadyInCart ? (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  onClick={(e) => e.stopPropagation()} // Prevent Grid onClick event
                >
                  <button onClick={decrementQuantity} className="p-1 border">-</button>
                  <input
                    type="text" // Use text type for full control
                    value={quantity}  // Bind to the state value
                    onChange={handleQuantityChange} // Use the handler function
                    className="w-12 text-center border rounded"
                    inputMode="numeric" // Restrict to numeric input
                    pattern="[0-9]*" // Allow only numbers
                    style={{ 
                      MozAppearance: 'textfield', // Firefox
                      WebkitAppearance: 'none', // Safari and Chrome
                      appearance: 'none' // Other browsers
                    }}
                  />
                  <button onClick={incrementQuantity} className="p-1 border">+</button>
                </Stack>
              ) : (
                !isAdminCard && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 1 }}
                    onClick={handleAddToCart}
                    className="bg-black text-white px-2 py-1 rounded-md text-xs md:px-3 md:py-1.5 md:text-sm"
                  >
                    <div className="flex items-center justify-center">
                      <p className="text-xs md:text-sm">Add To Cart</p>
                    </div>
                  </motion.button>
                )
              )
            ) : (
              ""
            )}
          </Stack>
          {stockQuantity <= 20 && (
            <FormHelperText sx={{ fontSize: ".9rem" }} error>
              {stockQuantity === 1
                ? "Only one item left"
                : "Hurry! Limited Stock Available"}
            </FormHelperText>
          )}
        </Stack>
      </Stack>
    </Grid>
  );
};
