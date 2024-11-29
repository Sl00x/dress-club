import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum GenderType {
  MEN = 'MEN',
  WOMEN = 'WOMEN',
  BOYS = 'BOYS',
  GIRLS = 'GIRLS',
}

@Entity()
export class Gender {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  type: GenderType;
}
