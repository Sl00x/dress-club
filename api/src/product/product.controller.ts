import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
//import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest } from 'interfaces/request.interface';
import { GenderType } from 'src/gender/entities/gender.entity';
import { GenderService } from 'src/gender/gender.service';
import { Like } from 'typeorm';
import { FilterPipe } from 'utils/fitlerpipe.utils';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductFilter } from './product.filter';
import { ProductService } from './product.service';

@Controller('product')
@ApiBearerAuth('jwt')
@ApiTags('Product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly genderService: GenderService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @Req() req: AuthenticatedRequest,
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productService.create(req.user.id, createProductDto, files);
  }

  @Get()
  findAll(@Query(new FilterPipe()) filters?: ProductFilter) {
    const queries = {};
    if (filters.category) queries['categoryId'] = filters.category;
    if (filters.subCategory) queries['subCategoryId'] = filters.subCategory;
    if (filters.gender) queries['gender'] = { type: filters.gender };
    if (filters.brand) queries['brandId'] = filters.brand;
    if (filters.model) queries['model'] = Like(filters.model);

    return this.productService.findAll({
      where: queries,
      relations: {
        subCategory: true,
        brand: true,
        gender: true,
        prices: true,
        medias: true,
      },
    });
  }

  @Get('/genders')
  allGender() {
    return this.genderService.findAll();
  }

  @Get('/:subId/subcat/:gender/gender')
  findAllByGender(
    @Param('subId') subId: string,
    @Param('gender') gender: GenderType,
  ) {
    return this.productService.findAll({
      where: {
        subCategoryId: subId,
        gender: { type: gender },
      },
      relations: {
        subCategory: true,
        brand: true,
        gender: true,
        prices: true,
        medias: true,
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne({
      where: { id },
      relations: {
        subCategory: true,
        brand: true,
        user: true,
        gender: true,
        prices: true,
        medias: true,
      },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
