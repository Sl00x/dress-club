import { ProductState } from '@/components/Product/ProductConditionTag';
import { Brand } from './brand.interface';
import { Category } from './category.interface';
import { Gender } from './gender.interface';
import { Price } from './price.interface';
import { SubCategory } from './sub-category.interface';
import { User } from './user.interface';

export interface ProductMedia {
  id?: string;
  media: string;
  product?: Product[];
  productId?: string;
}

export interface Product {
  id: string;
  model: string;
  state: ProductState;
  prices: Price[];
  brandId?: string;
  brand: Brand;
  subCategoryId?: string;
  subCategory?: SubCategory;
  category?: Category;
  categoryId?: string;
  genderId?: string;
  gender: Gender;
  medias: ProductMedia[];
  vintage?: boolean;
  blockchain?: boolean;
  user?: User;
  likes?: User[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface ICreateProduct {
  model: string;
  state: string;
  price: number;
  brandId: string;
  subCategoryId?: string;
  categoryId?: string;
  genderId: string;
}
