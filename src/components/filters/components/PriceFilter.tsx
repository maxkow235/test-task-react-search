import { Box, Slider, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductContext } from '../../product/ProductContext';

function valuetext(value: number) {
  return `${value}°C`;
}

const minDistance = 1000;

const PriceFilter: React.FC<{}> = () => {
  const { products, isLoading, filter, onFilterChange } =
    useContext(ProductContext);
  const [value, setValue] = useState<number[]>([20, 37]);
  const [limit, setLimit] = useState({ min: 0, max: 0 });

  const setPriceRange = () => {
    const prices = products.map((product) => product.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    setLimit({ min: minPrice, max: maxPrice });
    setValue([minPrice, maxPrice]);
  };

  useEffect(() => {
    if (!isLoading && products) {
      setPriceRange();
    }
  }, [products, isLoading]);

  useEffect(() => {
    onFilterChange({ ...filter, priceRange: value });
  }, [value]);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  return (
    <div className='price-filter'>
      <Box
        sx={{
          display: 'flex',

          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TextField
          type='number'
          size={'small'}
          fullWidth
          InputProps={{
            inputProps: {
              min: limit.min,
              max: value[1] - minDistance,
            },
          }}
          value={value[0]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue((prevState) => [parseInt(e.target.value), prevState[1]]);
          }}
        />
        <Typography padding={1} variant='h6' component='div'>
          -
        </Typography>
        <TextField
          type='number'
          size={'small'}
          fullWidth
          InputProps={{
            inputProps: {
              min: limit.min + minDistance,
              max: limit.max,
            },
          }}
          value={value[1]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue((prevState) => [prevState[0], parseInt(e.target.value)]);
          }}
        />
      </Box>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value}
        disabled={isLoading && !products}
        min={limit.min}
        max={limit.max}
        onChange={handleChange}
        valueLabelDisplay='auto'
        getAriaValueText={valuetext}
        disableSwap
      />
    </div>
  );
};

export default PriceFilter;
