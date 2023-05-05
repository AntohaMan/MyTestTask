import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserData } from './types/create-user-data.interface';
import { IUserRepository } from './types/user-repository.interface';
import { UpdateUserDataInterface } from './types/update-user-data.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectRepository(User) private userModel: Repository<User>) {}

  async createAndSave(createData: CreateUserData): Promise<User> {
    const user = await this.userModel.create(createData);
    return this.userModel.save(user);
  }

  async updateById(
    UpdateData: UpdateUserDataInterface,
    userId: number,
  ): Promise<void> {
    await this.userModel.update({ id: userId }, { ...UpdateData });
  }
  async getByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOneBy({ email: email });
    return user!;
  }
  async addImage(userId: number, fileName: string): Promise<void> {
    const user = await this.userModel.findOneBy({ id: userId });
    await this.userModel.update({ id: user!.id }, { image: fileName });
  }
}
