import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Gender } from './entities/gender.entity';

@Injectable()
export class GenderService {
  constructor(
    @InjectRepository(Gender)
    private readonly genderRepository: Repository<Gender>,
  ) {}

  findAll(options?: FindManyOptions<Gender>) {
    return this.genderRepository.find(options);
  }

  findOne(options?: string | FindOneOptions<Gender>) {
    if (typeof options === 'string') {
      return this.genderRepository.findOne({
        where: { id: options },
      });
    }
    return this.genderRepository.findOne(options);
  }
}
