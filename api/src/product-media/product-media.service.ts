import { Injectable } from '@nestjs/common';
import { CreateProductMediaDto } from './dto/create-product-media.dto';
import { UpdateProductMediaDto } from './dto/update-product-media.dto';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductMedia } from './entities/product-media.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductMediaService {
  constructor(
    @InjectRepository(ProductMedia)
    private readonly productMediaRepository: Repository<ProductMedia>,
    private readonly minioClientService: MinioClientService,
  ) {}
  async addMedia(productId: string, files: Array<Express.Multer.File>) {
    const promises = files.map(file =>
      this.minioClientService.upload(
        file,
        process.env.MINIO_PRODUCT_BUCKET,
      )
      .then(media => this.productMediaRepository.save({ productId, media: media.url }))
    );

    return Promise.all(promises);
  }

  findAll() {
    return `This action returns all productMedia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productMedia`;
  }

  update(id: number, updateProductMediaDto: UpdateProductMediaDto) {
    return `This action updates a #${id} productMedia`;
  }

  remove(id: number) {
    return `This action removes a #${id} productMedia`;
  }
}
