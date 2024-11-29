import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductState } from '../entities/product.entity';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsBoolean()
  description: string;

  @ApiProperty()
  @IsBoolean()
  vintage?: boolean;

  @ApiProperty()
  @IsBoolean()
  blockchain?: boolean;

  @ApiProperty()
  @IsBoolean()
  selled?: boolean;

  @ApiProperty({ enum: ProductState, enumName: 'ProductState' })
  @IsNotEmpty()
  @IsEnum(ProductState)
  state: ProductState;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  brandId: string;

  @ApiProperty()
  @IsString()
  subCategoryId: string;

  @ApiProperty()
  @IsString()
  categoryId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  genderId: string;
}
