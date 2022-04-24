import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async getUsers() {
    return this.userRepository.find();
  }

  async findUsersById(id: number) {
    return this.userRepository.findOne(id);
  }

  async updateUserBalance(id: number, balance: number) {
    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ token_balance: () => `token_balance + ${balance}` })
      .where('id = :id', { id })
      .execute();

    return await this.userRepository.findOne(id);
  }
}
