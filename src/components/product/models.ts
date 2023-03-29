export type Product = {
  id: number;
  name: string;
  price: number;
  color: string;
  rating: number;
  picture: string;
};

export type Filter = {
  sortBy?: string;
  color?: string[];
  priceRange: number[];
};

export type ProductContextType = {
  products: Product[];
  filtersOpen: boolean;
  isLoading: boolean;
  filter: Filter;
  toggleFiltersOpen: () => void;
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (filter: Filter) => void;
  applyFilter: (products: Product[]) => Product[];
  query: string;
};
