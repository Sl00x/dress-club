import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender, GenderType } from 'src/gender/entities/gender.entity';
import { GenderService } from 'src/gender/gender.service';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly genderService: GenderService,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const genderPromises: Promise<Gender>[] = createCategoryDto.genderIds.map(
      async (type) => {
        return await this.genderService.findOne({
          where: { type: type as GenderType },
        });
      },
    );

    const genders: Gender[] = await Promise.all(genderPromises);

    const category = await this.categoryRepository.create();
    category.name = createCategoryDto.name;
    category.genders = genders;
    return this.categoryRepository.save(category);
  }

  findAll(options?: FindManyOptions<Category>) {
    return this.categoryRepository.find(options);
  }

  findOne(options?: string | FindOneOptions<Category>) {
    if (typeof options === 'string') {
      return this.categoryRepository.findOne({
        where: { id: options },
      });
    }
    return this.categoryRepository.findOne(options);
  }
}
