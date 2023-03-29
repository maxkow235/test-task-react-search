import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../product/ProductContext';

type Props = {};

const ColorFilter = (props: Props) => {
  const [checkboxValues, setCheckboxValues] = useState<string[]>([]);
  const { products, onFilterChange, filter } = useContext(ProductContext);
  const getValues = () => {
    const colorValues = _.uniq(products.map((product) => product.color));
    setCheckboxValues(colorValues);
  };

  const handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isChecked: boolean
  ) => {
    const selected: string[] = [];
    if (isChecked) {
      selected.push(e.target.value);
    }
    onFilterChange({ ...filter, color: selected });
  };

  useEffect(() => {
    if (products.length > 0) getValues();
  }, [products]);

  return (
    <div>
      <FormGroup>
        {checkboxValues.map((value) => (
          <FormControlLabel
            key={value}
            control={
              <Checkbox
                key={value}
                onChange={handleColorChange}
                value={value}
              />
            }
            label={value}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default ColorFilter;
