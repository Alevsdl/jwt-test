import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDTO from './dtos/create-user.dto';
import { User } from './entities/usert.entity';

@Injectable()
export class UserService {
  private userRepo: Repository<User>;

  constructor(@InjectRepository(User) userRepo) {
    this.userRepo = userRepo;
  }
  async create(data: CreateUserDTO) {
    const record = this.userRepo.create(data);
    await this.userRepo.save(record);
    return record;
  }
  async findOne(name: string): Promise<User | undefined> {
    return this.userRepo.findOne({
      where: {
        name,
      },
    });
  }
  findMany() {
    const records = this.userRepo.find();
    return records;
  }
}
