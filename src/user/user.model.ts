import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class User {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Ivan', description: 'firstName' })
  @Column({ nullable: false, name: 'first_name' })
  firstName: string;

  @ApiProperty({ example: 'Ivanov', description: 'lastName' })
  @Column({ nullable: false, name: 'last_name' })
  lastName: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'Mail' })
  @Column({ unique: true, nullable: false })
  email: string;

  @ApiProperty({ example: '12345678', description: 'Password' })
  @Column({ nullable: false })
  password: string;

  @ApiProperty({ example: '12345678', description: 'Image' })
  @Column({ nullable: true })
  image: string;

  @ApiProperty({ example: '12345678', description: 'Password' })
  @Column({ type: 'bytea', nullable: true })
  pdf: any;
}
