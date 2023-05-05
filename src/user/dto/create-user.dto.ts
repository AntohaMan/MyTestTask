import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString({ message: 'Only string' })
  @ApiProperty({ example: 'Ivan', description: 'firstName' })
  @Column({ nullable: false })
  readonly firstName: string;

  @IsNotEmpty()
  @IsString({ message: 'Only string' })
  @ApiProperty({ example: 'Ivanov', description: 'lastName' })
  @Column({ nullable: false })
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'user@gmail.com', description: 'Mail' })
  @Column({ unique: true, nullable: false })
  readonly email: string;

  @IsNotEmpty()
  @Length(6, 16, { message: '6 to 16 characters' })
  @ApiProperty({ example: '12345678ada', description: 'Password' })
  @Column({ nullable: false })
  readonly password: string;
}
