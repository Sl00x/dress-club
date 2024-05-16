import { Logger } from '@nestjs/common';
import * as Minio from 'minio';

const getBucketPublicPolicy = (bucketName: string) => {
  return `
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {
            "AWS": [
              "*"
            ]
          },
          "Action": [
            "s3:GetObject"
          ],
          "Resource": [
            "arn:aws:s3:::${bucketName}/*"
          ]
        }
      ]
    }
  `;
};

const buckets = [
  {
    name: process.env.MINIO_PRODUCT_BUCKET ?? '',
    isPublic: true,
  },
];

export const createBuckets = async () => {
  const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_INTERNAL_HOST,
    port: Number(process.env.MINIO_INTERNAL_PORT),
    useSSL: false,
    accessKey: process.env.MINIO_ROOT_USER,
    secretKey: process.env.MINIO_ROOT_PASSWORD,
  });
  const logger = new Logger('MinioBucket');
  for (const { name, isPublic } of buckets) {
    if (name !== '' && !(await minioClient.bucketExists(name))) {
      const makeSuccess = await minioClient
        .makeBucket(name, 'eu-west-3')
        .then(() => true)
        .catch((error) => {
          logger.error(error);
          return false;
        });
      if (!makeSuccess)
        throw new Error(`Bucket '${name}' could not be created`);
      logger.log(`Bucket '${name}' created`);
      if (isPublic) {
        const policy = getBucketPublicPolicy(name);
        const publicSuccess = await minioClient
          .setBucketPolicy(name, policy)
          .then(() => true)
          .catch((error) => {
            logger.error(error);
            return false;
          });
        if (!publicSuccess)
          throw new Error(`Bucket '${name}' could not be set to public policy`);
        logger.log(`Bucket '${name}' set to public policy`);
      }
    }
  }
};
