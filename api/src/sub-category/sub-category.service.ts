import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { SubCategory } from './entities/sub-category.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
    private readonly categoryService: CategoryService,
  ) {}
  async create(createSubCategoryDto: CreateSubCategoryDto) {
    const categories: Category[] = [];
    createSubCategoryDto.categoryIds.forEach(async (id) => {
      const category = await this.categoryService.findOne(id);
      categories.push(category);
    });

    const subCategory = await this.subCategoryRepository.create();
    subCategory.name = createSubCategoryDto.name;
    const subCategorySaved = await this.subCategoryRepository.save(subCategory);
    subCategorySaved.categories = categories;
    return await this.subCategoryRepository.save(subCategorySaved);
  }

  findAll(options?: FindManyOptions<SubCategory>) {
    return this.subCategoryRepository.find(options);
  }

  findOne(option: string | FindOneOptions<SubCategory>) {
    if (typeof option === 'string')
      return this.subCategoryRepository.findOne({
        where: { id: option },
      });
    return this.subCategoryRepository.findOne(option);
  }
}
