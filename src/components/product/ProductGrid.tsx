import React, { useContext } from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';
import { ProductContext } from './ProductContext';
import ProductCard from '../filters/ProductCard';

const ProductGrid: React.FC = () => {
  const { products, isLoading, applyFilter } = useContext(ProductContext);
  const filteredProducts = applyFilter(products);
  return (
    <Grid className='product-grid' container spacing={2}>
      {isLoading ? (
        <CircularProgress />
      ) : filteredProducts.length > 0 ? (
        filteredProducts.map((item) => (
          <Grid item xs={12} md={6} lg={3} key={item.id}>
            <ProductCard product={item} />
          </Grid>
        ))
      ) : products.length > 0 && filteredProducts.length === 0 ? (
        <Typography>No matches found</Typography>
      ) : (
        <Typography>No products</Typography>
      )}
    </Grid>
  );
};

export default ProductGrid;
