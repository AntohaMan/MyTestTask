import { CreateUserData } from './create-user-data.interface';
import { User } from '../user.model';
import { UpdateUserDataInterface } from './update-user-data.interface';

export interface IUserRepository {
  createAndSave(createData: CreateUserData): Promise<User>;
  updateById(
    UpdateData: UpdateUserDataInterface,
    userId: number,
  ): Promise<void>;
  getByEmail(email: string): Promise<User>;
  addImage(userID: number, fileName: string): Promise<void>;
}
