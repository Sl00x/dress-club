import { Product } from './product.interface';

export interface Price {
  id?: string;
  price: number;
  product: Product;
  productId?: string;
}
