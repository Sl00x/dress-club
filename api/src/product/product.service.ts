import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PriceService } from 'src/price/price.service';
import { ProductMediaService } from 'src/product-media/product-media.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly priceService: PriceService,
    private readonly productMediaService: ProductMediaService
  ) {}

  async create(userId: string, createProductDto: CreateProductDto, files: Array<Express.Multer.File>) {
    const product = await this.productRepository.save({...createProductDto, userId});
    await this.priceService.create(product.id, createProductDto.price);
    this.productMediaService.addMedia(product.id, files);
    return product;
  }

  findAll(options?: FindManyOptions<Product>) {
    return this.productRepository.find(options);
  }

  findOne(options: string | FindOneOptions<Product>) {
    if (typeof options === 'string')
      return this.productRepository.findOne({
        where: { id: options },
      });
    return this.productRepository.findOne(options);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    if(updateProductDto.price) {
      this.priceService.create(id, updateProductDto.price)
    }
    return this.productRepository.update(id, updateProductDto);
  }

  remove(id: string) {
    return this.productRepository.softDelete(id);
  }
}
