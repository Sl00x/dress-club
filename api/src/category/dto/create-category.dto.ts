import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ example: ['MEN', 'WOMEN', 'KIDS'] })
  @IsArray()
  genderIds: string[];
}
