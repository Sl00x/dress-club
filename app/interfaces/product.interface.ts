import { Brand } from './brand.interface';
import { Gender } from './gender.interface';
import { Price } from './price.interface';
import { SubCategory } from './sub-category.interface';

export interface ProductMedia {
  id?: string;
  media: string;
  product?: Product[];
  productId?: string;
}

export interface Product {
  id: string;
  model: string;
  state: string;
  prices: Price[];
  brandId?: string;
  brand: Brand;
  subCategoryId?: string;
  subCategory: SubCategory;
  genderId?: string;
  gender: Gender;
  medias: ProductMedia[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface ICreateProduct {
  model: string;
  state: string;
  price: number;
  brandId: string;
  subCategoryId: string;
  genderId: string;
}
