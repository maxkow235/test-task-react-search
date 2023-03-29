import React from 'react';
import { Filter, Product, ProductContextType } from './models';
import { createContext, useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

interface ProductContextProviderProps {
  children: React.ReactNode;
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  isLoading: false,
  filtersOpen: false,
  toggleFiltersOpen: () => {},
  onQueryChange: () => {},
  onFilterChange: () => {},
  filter: { priceRange: [0, 100], color: [] },
  applyFilter: () => [],
  query: '',
});

export const ProductContextProvider: React.FC<ProductContextProviderProps> = ({
  children,
}) => {
  const apiRoot = import.meta.env.VITE_API_ROOT;
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<string>(searchParams.get('query') || '');

  const [filtersOpen, setFiltersOpen] = useState(false);

  const [filter, setFilter] = useState<Filter>({
    priceRange: [0, 100],
    color: [],
  });

  const toggleFiltersOpen = () => {
    setFiltersOpen(!filtersOpen);
  };

  const applyFilter = useCallback(
    (products: Product[]) => {
      const filteredProducts: Product[] = [];
      for (const product of products) {
        if (
          !query ||
          product.name.toLowerCase().includes(query.toLowerCase())
        ) {
          filteredProducts.push(product);
        } else continue;
      }

      return filteredProducts
        .sort((a, b) => {
          switch (filter.sortBy) {
            case 'expensive':
              return b.price - a.price;
            case 'cheap':
              return a.price - b.price;
            case 'popular':
              return b.rating - a.rating;
          }
          return 0;
        })
        .filter((product) => {
          if (filter.priceRange) {
            if (
              product.price >= filter.priceRange[0] &&
              product.price <= filter.priceRange[1]
            )
              return true;
            else return false;
          }
          return true;
        })
        .filter((product) => {
          if (filter.color && filter.color.length > 0) {
            if (filter.color.includes(product.color)) return true;
            else return false;
          }
          return true;
        });
    },
    [filter, query]
  );

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length === 0) {
      searchParams.delete('query');
    } else {
      searchParams.set('query', value);
    }
    setSearchParams(searchParams, { replace: true });
    setQuery(value);
  };

  const onFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  const fetchProducts = useCallback(() => {
    setIsLoading(true);
    axios
      .get(`${apiRoot}/products`)
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        {
          console.log('Err', err);
          setIsLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilter(products);
  }, [query, filter]);

  const value = {
    products,
    isLoading,
    filter,
    query,

    filtersOpen,
    toggleFiltersOpen,
    setFiltersOpen,
    onQueryChange,
    onFilterChange,
    applyFilter,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
