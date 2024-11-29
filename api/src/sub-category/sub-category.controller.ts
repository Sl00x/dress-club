import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.constant';
import { GenderType } from 'src/gender/entities/gender.entity';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { SubCategoryService } from './sub-category.service';

@ApiTags('Sub Category')
@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post()
  @ApiBearerAuth('jwt')
  create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.subCategoryService.create(createSubCategoryDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.subCategoryService.findAll({
      order: { created_at: 'DESC' },
    });
  }

  @Get('/:name/category')
  @Public()
  findAllFromCategory(@Param('name') name: string) {
    return this.subCategoryService.findAll({
      where: {
        categories: {
          name: name,
        },
      },
    });
  }

  @Get('/:gender/gender')
  @Public()
  findAllByGender(@Param('gender') gender: GenderType) {
    return this.subCategoryService.findAll({
      where: {
        categories: {
          genders: {
            type: gender,
          },
        },
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subCategoryService.findOne(id);
  }
}
