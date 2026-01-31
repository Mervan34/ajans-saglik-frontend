import { ProductCategory } from './product.model';

export interface ProductFilter {
  category?: ProductCategory;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
}
