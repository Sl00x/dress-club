import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductState } from '../entities/product.entity';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  model: string;

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
  @IsNotEmpty()
  @IsString()
  subCategoryId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  genderId: string;
}
