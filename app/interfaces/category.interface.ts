import { Gender } from './gender.interface';
import { SubCategory } from './sub-category.interface';

export enum TypeCategory {
  MEN = 'MEN',
  WOMEN = 'WOMEN',
  KIDS = 'KIDS',
}

export interface Category {
  id?: string;
  name: string;
  type: TypeCategory;
  genders: Gender[];
  subCategories: SubCategory[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
