import { useContext } from 'react';
import { AppBar, Toolbar, TextField, InputAdornment } from '@mui/material';
import { ProductContext } from '../product/ProductContext';
import { Container } from '@mui/system';
import Search from '@mui/icons-material/Search';

type Props = {};

const SearchNavBar = (props: Props) => {
  const { query, onQueryChange } = useContext(ProductContext);

  return (
    <AppBar position='fixed' color={'primary'} elevation={0}>
      <Toolbar>
        <Container>
          <TextField
            hiddenLabel
            defaultValue={query}
            color={'info'}
            onChange={onQueryChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            }}
            placeholder='Search...'
            size={'medium'}
            margin={'normal'}
            fullWidth
          />
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default SearchNavBar;
