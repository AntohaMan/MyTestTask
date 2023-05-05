import { Inject, Injectable } from '@nestjs/common';
import { User } from '../user/user.model';
import * as pdfkit from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';
import { uuid } from 'uuidv4';
import { Buffer } from 'buffer';
import { IUserRepository } from '../user/types/user-repository.interface';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class PdfService {
  constructor(
    @Inject(UserRepository) private userNewRepository: IUserRepository,
  ) {}

  async pdfCreate(user: User) {
    if (!user.image) {
      return JSON.stringify(false);
    }
    const filePath = path.join(__dirname, `../static/${user.image}`);
    const pdf = new pdfkit();

    let pdfFile;
    const chunks: any = [];
    pdf.on('data', (chunk) => {
      chunks.push(chunk);
    });
    pdf.on('end', async () => {
      pdfFile = Buffer.concat(chunks);
      user.pdf = pdfFile;
      await this.userNewRepository.updateById({ pdf: pdfFile }, user.id);
    });
    pdf.pipe(
      fs.createWriteStream(path.join(__dirname, `../static/${uuid()}.pdf`)),
    );
    pdf
      .text(`${user.firstName} ${user.lastName}`, { align: 'left' })
      .fontSize(14);
    pdf.image(filePath, { fit: [400, 150] });
    pdf.end();
  }
}
