import { Grid, Select, Container, Button } from '@mui/material';
import React, { useContext } from 'react';
import ElevationScroll from '../utils/ElevationScroll';
import { ProductContext } from '../product/ProductContext';
import FilterList from '@mui/icons-material/FilterList';

const SortingBar: React.FC<{}> = (props) => {
  const { filter, onFilterChange, toggleFiltersOpen } =
    useContext(ProductContext);
  return (
    <ElevationScroll {...props}>
      <Grid className='sorting-bar'>
        <Container>
          <Grid
            container
            display={'flex'}
            justifyContent={'flex-end'}
            height={'70px'}
            paddingBottom={'15px'}
            alignItems={'center'}
            spacing={2}
          >
            <Grid item lg={3} xs={6}>
              <Button
                className='filter-button'
                variant={'contained'}
                fullWidth
                startIcon={<FilterList />}
                onClick={() => toggleFiltersOpen()}
              >
                Filters
              </Button>
            </Grid>
            <Grid item lg={3} xs={6}>
              <Select
                style={{ backgroundColor: 'white' }}
                size={'small'}
                defaultValue={filter.sortBy}
                onChange={(e) =>
                  onFilterChange({ ...filter, sortBy: e.target.value })
                }
                native
                inputProps={{
                  name: 'sortBy',
                  id: 'sorting',
                }}
                fullWidth
              >
                <option value={'cheap'}>Price: Low to High</option>
                <option value={'expensive'}>Price: High to Low</option>
                <option value={'popular'}>Popularity</option>
              </Select>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </ElevationScroll>
  );
};

export default SortingBar;
