import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class ProductFilter {
  @IsOptional()
  @IsUUID()
  category?: string;

  @IsOptional()
  @IsUUID()
  subCategory?: string;

  @IsOptional()
  @IsUUID()
  brand?: string;

  @IsOptional()
  @IsUUID()
  gender?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  maxPrice?: number;
}
