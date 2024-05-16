import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.constant';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @ApiBearerAuth('jwt')
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.brandService.findAll();
  }

  @Get('/:id/category')
  @Public()
  findByCategory(@Param('id') id: string) {
    return this.brandService.findAll({
      where: { 
        categories: {
          id
        } 
      }
    });
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }
}
