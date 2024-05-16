import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    private readonly categoryService: CategoryService,
  ) {}
  async create(createBrandDto: CreateBrandDto) {
    const categories: Category[] = [];
    createBrandDto.categoryIds.forEach(async (id) => {
      const category = await this.categoryService.findOne(id);
      categories.push(category);
    });

    const brand = await this.brandRepository.create();
    brand.name = createBrandDto.name;
    const brandSaved = await this.brandRepository.save(brand);
    brandSaved.categories = categories;
    return await this.brandRepository.save(brandSaved);
  }

  findAll(options?: FindManyOptions<Brand>) {
    return this.brandRepository.find(options);
  }

  findOne(option?: string | FindOneOptions<Brand>) {
    if (typeof option === 'string')
      return this.brandRepository.findOne({
        where: { id: option },
      });
    return this.brandRepository.findOne(option);
  }
}
