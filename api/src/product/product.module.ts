import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenderModule } from 'src/gender/gender.module';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PriceModule } from 'src/price/price.module';
import { ProductMediaModule } from 'src/product-media/product-media.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), GenderModule, PriceModule, ProductMediaModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports:  [ProductService],
})
export class ProductModule {}
