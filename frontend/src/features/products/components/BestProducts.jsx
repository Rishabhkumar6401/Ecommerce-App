import React from 'react';
import { Stack, Grid, useMediaQuery, useTheme } from '@mui/material';
import { ProductCard } from './ProductCard'
import Titile from './Titile';

const LatestProducts = ({ products, handleAddRemoveFromWishlist }) => {
    const theme=useTheme()
    const is700=useMediaQuery(theme.breakpoints.down(700))
    const is600=useMediaQuery(theme.breakpoints.down(600))
   // Function to shuffle an array
   const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  // Shuffle the products and slice the first 8
  const latestProducts = shuffleArray(products).slice(0, 8);

  return (
    <>
    <div className='text-center py-4 text-3xl'>
                <Titile text1={'BEST'} text2={'PRODUCTS'} />
                <p className='w-3/4 m-auto text-xs sm:-text-sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus tempore asperiores dolorem quas animi aut quia error tenetur.
                </p>
            </div>
    <Stack rowGap={5} mt={is600 ? 2 : 0}>
      {/* product grid */}
      <Grid
        container
        spacing={is700 ? 1 : 2}
        justifyContent={"center"}
        alignContent={"center"}
        sx={{ px: { xs: 1, md: 5 } }} // Padding for different screen sizes
      >
        {latestProducts.map((product) => (
          <Grid
            item
            xs={6}  // 2 products per row on mobile (12/6 = 2 columns)
            sm={4}  // 3 products per row on small screens (12/4 = 3 columns)
            md={3}  // 4 products per row on medium screens (12/3 = 4 columns)
            key={product._id}
          >
            <ProductCard
              id={product._id}
              title={product.title}
              thumbnail={product.thumbnail}
              brand={product.brand.name}
              price={product.price}
              handleAddRemoveFromWishlist={handleAddRemoveFromWishlist}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
    </>
  );

};

export default LatestProducts;
