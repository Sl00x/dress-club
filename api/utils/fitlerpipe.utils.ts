import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FilterPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const filters = {};
    for (const key in value) {
      if (value[key] !== undefined) {
        filters[key] = value[key];
      }
    }
    return filters;
  }
}