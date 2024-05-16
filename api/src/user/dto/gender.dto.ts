import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateGenderDto {
  @ApiProperty({})
  @IsUUID()
  @IsNotEmpty()
  genderId: string;
}
