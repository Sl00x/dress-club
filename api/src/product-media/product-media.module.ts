import { Module } from '@nestjs/common';
import { ProductMediaService } from './product-media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinioClientModule } from 'src/minio-client/minio-client.module';
import { ProductMedia } from './entities/product-media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductMedia]), MinioClientModule],
  providers: [ProductMediaService],
  exports: [ProductMediaService]
})
export class ProductMediaModule {}
