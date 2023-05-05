import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    let obj = plainToInstance(metadata.metatype!, value);
    if (metadata.type === 'param') {
      obj = { obj };
    }
    if (metadata.type === 'query') {
      return value;
    }
    const errors = await validate(obj, {});
    if (errors.length) {
      const messages = errors.map((err) => {
        return `${err.property} - ${Object.values(err.constraints!).join(
          ', ',
        )}`;
      });
      throw new HttpException(
        { message: messages.join('. ') },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
