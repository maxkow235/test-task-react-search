import { Container, Grid } from '@mui/material';

import SearchNavBar from './components/search/SearchNavBar';
import { ProductContextProvider } from './components/product/ProductContext';
import ProductGrid from './components/product/ProductGrid';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.scss';
import SortingBar from './components/filters/SortingBar';
import Filters from './components/filters/Filters';
function App() {
  return (
    <BrowserRouter>
      <ProductContextProvider>
        <SearchNavBar />

        <div className='main-page'>
          <SortingBar />
          <Container className='product-grid'>
            <Grid container spacing={2}>
              <Filters />
              <Grid item lg={9} xs={12}>
                <ProductGrid />
              </Grid>
            </Grid>
          </Container>
        </div>
      </ProductContextProvider>
    </BrowserRouter>
  );
}

export default App;
