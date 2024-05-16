import { ApiProperty } from '@nestjs/swagger';
import { Brand } from 'src/brand/entities/brand.entity';
import { Gender } from 'src/gender/entities/gender.entity';
import { Price } from 'src/price/entities/price.entity';
import { ProductMedia } from 'src/product-media/entities/product-media.entity';
import { SubCategory } from 'src/sub-category/entities/sub-category.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProductState {
  BAD = 'BAD',
  MEDIUM = 'MEDIUM',
  GOOD = 'GOOD',
  VERY_GOOD = 'VERY_GOOD',
  NEW = 'NEW',
}

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  model: string;

  @ApiProperty()
  @Column()
  state: ProductState;

  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

  @Column()
  brandId: string;

  @OneToMany(() => Price, (price) => price.product)
  prices: Price[];

  @OneToMany(() => ProductMedia, (pMedia) => pMedia.product)
  medias: ProductMedia[];

  @ManyToOne(() => SubCategory)
  @JoinColumn({ name: 'subCategoryId' })
  subCategory: SubCategory;

  @Column()
  subCategoryId: string;

  @ManyToOne(() => Gender)
  @JoinColumn({ name: 'genderId' })
  gender: Gender;

  @Column()
  genderId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({nullable: true})
  userId: string;

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
