import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
//import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest } from 'interfaces/request.interface';
import { GenderType } from 'src/gender/entities/gender.entity';
import { GenderService } from 'src/gender/gender.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { FilesInterceptor } from '@nestjs/platform-express';

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
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.productService.create(req.user.id, createProductDto, files);
  }


  @Get()
  findAll() {
    return this.productService.findAll({
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
      where: {id},
      relations: {
        subCategory: true,
        brand: true,
        gender: true,
        prices: true,
        medias: true,
      }
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
