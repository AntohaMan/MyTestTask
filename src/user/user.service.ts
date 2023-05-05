import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FilesService } from '../files/files.service';
import { UserRepository } from './user.repository';
import { IUserRepository } from './types/user-repository.interface';
import { JwtService } from '@nestjs/jwt';
import { PdfService } from '../pdf/pdf.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private fileService: FilesService,
    @Inject(PdfService) private pdfService: PdfService,
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(UserRepository)
    private userNewRepository: IUserRepository,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    return this.userNewRepository.createAndSave(userDto);
  }

  async addImage(userId: number, image: any) {
    const fileName = await this.fileService.createFile(image);
    await this.userNewRepository.addImage(userId, fileName);
    return { message: 'image added' };
  }

  async createPdf(email: string) {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) {
      throw new UnauthorizedException({ message: 'Incorrect data' });
    }
    await this.pdfService.pdfCreate(user);
    return JSON.stringify(true);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new UnauthorizedException({ message: 'Incorrect data' });
    }
    return user;
  }

  async updateUser(body: any, userId: number): Promise<void> {
    return this.userNewRepository.updateById(body, userId);
  }

  async deleteUserById(id: number): Promise<MessageResponse> {
    const delUser = await this.userRepository.findOneBy({ id: id });
    if (!delUser) {
      throw new UnauthorizedException({ message: 'Incorrect data' });
    }
    await this.userRepository.remove(delUser);
    return { message: 'User was deleted' };
  }
  async getUserByEmail(email: string): Promise<User> {
    return this.userNewRepository.getByEmail(email);
  }
}

export class MessageResponse {
  message: string;
}
