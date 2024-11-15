import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class JoiValidationPipe<T> implements PipeTransform {
  constructor(private schema: Joi.ObjectSchema) {}

  transform(value: T, metadata: ArgumentMetadata): T {
    const { error } = this.schema.validate(value, {
      abortEarly: false,
      allowUnknown: false,
      convert: true,
    });

    if (error) {
      throw new BadRequestException(error.details);
    }

    return value;
  }
}
