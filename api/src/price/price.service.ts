import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Price } from './entities/price.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>
  ) {}

  create(productId: string, price: number) {
    return this.priceRepository.save({ price, productId: productId });
  }

  findAll(options?: FindManyOptions<Price>) {
    return  this.priceRepository.find(options);
  }

  findOne(option: FindOneOptions<Price>) {
    return this.priceRepository.findOne(option);
  }
}
