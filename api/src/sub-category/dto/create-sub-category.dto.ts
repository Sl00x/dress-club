import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateSubCategoryDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ example: ['1', '2'] })
  @IsArray()
  categoryIds: string[];
}