import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { GenderModule } from './gender/gender.module';
import { MessagesModule } from './messages/messages.module';
import { MinioClientModule } from './minio-client/minio-client.module';
import { PriceModule } from './price/price.module';
import { ProductMediaModule } from './product-media/product-media.module';
import { ProductModule } from './product/product.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT ?? '5432'),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_DB,
      autoLoadEntities: true,
      synchronize: true,
      migrationsTableName: 'migrations',
      migrations: ['src/migrations/*.ts'],
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    SubCategoryModule,
    BrandModule,
    GenderModule,
    ProductModule,
    PriceModule,
    ProductMediaModule,
    MinioClientModule,
    MulterModule.register({
      dest: './files',
    }),
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
