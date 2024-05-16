import { ApiProperty } from '@nestjs/swagger';
import { Gender } from 'src/gender/entities/gender.entity';
import { SubCategory } from 'src/sub-category/entities/sub-category.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TypeCategory {
  MEN = 'MEN',
  WOMEN = 'WOMEN',
  BOYS = 'BOYS',
  GIRLS = 'GIRLS',
}

@Entity()
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ManyToMany(() => Gender, {
    cascade: true,
  })
  @JoinTable({ name: 'category-has-gender' })
  genders: Gender[];

  @ManyToMany(() => SubCategory)
  @JoinTable({ name: 'sub-category-in-category' })
  subCategories: SubCategory[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deleted_at: Date;
}
