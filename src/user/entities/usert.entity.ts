import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserType {
  admin = 'admin',
  student = 'student',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;
  @Column({ type: 'varchar' })
  password: string;
  @Column({ type: 'enum', enum: UserType })
  userType: UserType;
}
