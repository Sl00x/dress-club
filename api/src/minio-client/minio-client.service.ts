import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as crypto from 'crypto';
import { MinioClient, MinioService } from 'nestjs-minio-client';

@Injectable()
export class MinioClientService {
  public get client(): MinioClient {
    return this.minio.client;
  }

  constructor(private readonly minio: MinioService) {}

  public async upload(
    file: {
      buffer: Buffer;
      originalname: string;
    },
    bucket: string,
    name?: string,
  ) {
    const temp_filename = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(temp_filename)
      .digest('hex');
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const filename = (name ?? hashedFileName) + ext;
    const fileBuffer = file.buffer;
    const success = await this.client
      .putObject(bucket, filename, fileBuffer)
      .then(() => true)
      .catch((error) => {
        console.error(error);
        return false;
      });

    if (!success) {
      throw new InternalServerErrorException('upload_failed');
    }

    return {
      name: filename,
      url: `${process.env.MINIO_PUBLIC_URL}/${bucket}/${filename}`,
    };
  }

  static getPublicUrl(bucketName: string, name?: string): string | null {
    return name
      ? `${process.env.MINIO_PUBLIC_URL}/${bucketName}/${name}`
      : null;
  }
}
