import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file: Express.Multer.File): Promise<string> {
    try {
      const fileName = this.generateFileName(file);
      const filePath = path.join(__dirname, '../static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      console.log(fileName);
      return fileName;
    } catch (e) {
      throw new HttpException(
        'File creation error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  generateFileName(file: Express.Multer.File): string {
    return `${uuid.v4()}.${file.mimetype.split('/')[1]}`;
  }
}
