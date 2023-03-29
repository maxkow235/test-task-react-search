import {
  Backdrop,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useContext } from 'react';
import { ProductContext } from '../product/ProductContext';
import ColorFilter from './components/ColorFilter';
import PriceFilter from './components/PriceFilter';
import ExpandMore from '@mui/icons-material/ExpandMore';
type Props = {};

const Filters = (props: Props) => {
  const { filtersOpen, toggleFiltersOpen } = useContext(ProductContext);
  const accordionFilters = [
    {
      name: 'Price',
      component: <PriceFilter />,
    },
    {
      name: 'Color',
      component: <ColorFilter />,
    },
  ];
  return (
    <>
      <Grid
        className={`filter-sidebar ${filtersOpen ? 'open' : ''}`}
        item
        lg={3}
      >
        <Stack spacing={2}>
          {accordionFilters.map((filter, id) => (
            <Accordion defaultExpanded key={id}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`filter${id}-controls`}
                id={`filter${id}-header`}
              >
                <Typography>{filter.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>{filter.component}</AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: 8000 }}
        open={filtersOpen}
        onClick={toggleFiltersOpen}
      />
    </>
  );
};

export default Filters;
