import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenderModule } from 'src/gender/gender.module';
import { PriceModule } from 'src/price/price.module';
import { ProductMediaModule } from 'src/product-media/product-media.module';
import { UserModule } from 'src/user/user.module';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    GenderModule,
    PriceModule,
    ProductMediaModule,
    UserModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
